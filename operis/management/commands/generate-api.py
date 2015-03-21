import datetime                         
import sys
import os.path
import pprint
from inspect import getmembers, isclass
from collections import defaultdict
from optparse import make_option

from django.core.management.base import BaseCommand, CommandError
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.db.models.base import ModelBase

from jinja2 import FileSystemLoader, Environment, PackageLoader, ChoiceLoader

from operis.log import log
from operis.utils import clean, convert, convert_friendly, underscore

class Command(BaseCommand):
    help = 'Creates Generic API Scaffolding' 
    logger = None
    
    option_list = BaseCommand.option_list + (
        make_option('--regenerate',
            action='store_true',
            dest='regenerate',
            default=False,
            help='Wipe Prior instances'),
        )

    def handle(self, *args, **options):
        
        self.logger = log( self )
        
        wipe = False
        if options['regenerate']:
            wipe = True
        
        modules = map(__import__, settings.EMBER_MODELS)
        
        model_history = []
        model_instances = []
        for model in modules:
            for name, obj in getmembers(model.models):
                if isclass(obj):
                    if isinstance(obj, ModelBase):
                        self.logger.log("Object Name is: %s",[obj.__name__],"notice")
                        if obj.__name__ in settings.EMBER_MODEL_EXCLUSIONS:
                            continue
                        
                        field_history = []
                        fields_extended = []
                        
                        for aname in obj._meta.get_all_field_names():
                            f, modelItem, direct, m2m = obj._meta.get_field_by_name(aname)
                            #self.logger.log("Field Name :: %s",[f.name],"info")
                            #self.logger.log("Field Class :: %s",[type(f).__name__],"info")
                            try:
                                assert(f.get_internal_type())
                                #self.logger.log("Field Type :: %s",[f.get_internal_type()],"debug")
                            except:
                                #for a in dir(f):
                                #    print "%s = %s" % (a,getattr(f,a))
                                continue
                                #sys.exit(0)
                        
                            if hasattr(obj ,"Ember") and hasattr(obj.Ember,'fields'):
                                if f.name not in obj.Ember.fields:
                                    continue
                                    
                            if convert(f.name) not in field_history:
                                field = {}
                                field['name'] = convert(f.name) 
                                field['name_underscore'] = underscore(f.name) 
                                field['name_friendly'] = convert_friendly(f.name)
                                field['type'] = f.get_internal_type()
                                field['class'] = type(f).__name__
                                
                                if field['type'] == "ForeignKey" or field['type'] == "ManyToManyField":
                                    has_parent = True
                                    field['parent'] = underscore(f.rel.to.__name__)
                                    field['parent_class'] = f.rel.to.__name__
                                    field['parent_class_app'] = str(f.rel.to._meta.app_label)
                                    
                                field_history.append(convert(f.name))
                                fields_extended.append(field)
                        
                        #print fields_extended
                        
                        index_list = ['id']
                        index_converted = ''
                        
                        fields = ['id']
                        fields_converted = ''
                        
                        filter_fields = ['id']
                        filter_fields_converted = ''
                        
                        search_fields = ['id']
                        search_fields_converted = ''
                        
                        singular = None
                        plural = None
                        
                        fixture_seed = 1
                        
                        if hasattr(obj._meta ,"verbose_name"):
                            singular = unicode(obj._meta.verbose_name)
                        else:
                            singular = obj.__name__.title()
                        
                        if singular.lower() in model_history:
                            continue
                            
                        if hasattr(obj._meta ,"verbose_name_plural"):
                            plural = unicode(obj._meta.verbose_name_plural)
                        else:
                            plural = obj.__name__
                        
                        #Add to our Plural-Item Controllers
                        if hasattr(obj ,"Ember"):
                            if hasattr(obj.Ember,'fields'):
                                fields = []
                                for f in obj.Ember.fields:
                                    fields.append(convert(f))
                                
                            if hasattr(obj.Ember,'index_list'):
                                index_list = []
                                for f in obj.Ember.index_list:
                                    index_list.append(convert(f))
                            
                            if hasattr(obj.Ember,'filter_fields'):
                                filter_fields = obj.Ember.filter_fields
                                
                            if hasattr(obj.Ember,'search_fields'):
                                search_fields = obj.Ember.search_fields
                            
                            if hasattr(obj.Ember,'fixture_seed'):
                                fixture_seed = obj.Ember.fixture_seed
                                
                        fields_converted = "fields = ('" + "','".join(fields) + "')"
                        index_converted = "fields = ('" + "','".join(index_list) + "')"
                        filter_fields_converted = "filter_fields = ['" + "','".join(filter_fields) + "']"
                        search_fields_converted = "search_fields = ['" + "','".join(search_fields) + "']"
                        
                        item = {    "model": name, 
                                    "fixture_seed": fixture_seed,
                                    "singular": clean(singular),
                                    "singular_converted": convert(singular),
                                    "plural": clean(plural),
                                    "plural_converted": convert(plural),
                                    "index_converted": index_converted,
                                    "fields": fields_extended,
                                    "fields_converted": fields_converted,
                                    "filter_fields_converted": filter_fields_converted,
                                    "search_fields_converted": search_fields_converted,
                                }
                        
                        model_history.append(singular.lower())
                                
                        model_instances.append(item)
                        print "=============================="
                        #print obj.__name__
        #sys.exit(0)
                         
        global_exts = getattr(settings, 'JINJA_EXTS', ())
        #env = Environment(extensions=global_exts,loader=FileSystemLoader('templates'))
        env = Environment(extensions=global_exts,loader=PackageLoader('operis','templates'))
        basedir = settings.PROJECT_DIR + "/../" + settings.API_APP_NAME
        
        #Create Operis Subdirectories        
        if not os.path.exists(basedir):
            os.makedirs(basedir)
        if not os.path.exists(basedir+ "/django_operis"):
            os.makedirs(basedir+ "/django_operis")
        if not os.path.isfile(basedir+ "/django_operis/__init__.py"):
            file = open(basedir+ "/django_operis/__init__.py", "w")
            file.write('')
            file.close()                          
        if not os.path.exists(basedir+ "/tests"):
            os.makedirs(basedir+ "/tests")
        if not os.path.isfile(basedir+ "/tests/__init__.py"):
            file = open(basedir+ "/tests/__init__.py", "w")
            file.write('')
            file.close()
                        
        self.logger.log("Directory is %s",[basedir],"notice")
        source = "%s/../../templates/api" % (os.path.dirname(__file__))
        self.logger.log("Source is %s",[source],"notice")
        
        self.logger.log("Creating Base Serializers",[],"success")
        template = env.get_template('api/serializers.py')
        filename = basedir + "/django_operis/serializers.py"
        args = {"app":settings.API_APP_NAME,"imports":settings.EMBER_MODELS,"models":model_instances,"app_name":settings.API_APP_NAME}
        output = template.render(args)
        file = open(filename, "w")
        file.write(output)
        file.close()
        
        self.logger.log("Creating Base Views",[],"success")
        template = env.get_template('api/views.py')
        filename = basedir + "/django_operis/views.py"
        args = {"app":settings.API_APP_NAME,"imports":settings.EMBER_MODELS,"models":model_instances,"app_name":settings.API_APP_NAME}
        output = template.render(args)
        file = open(filename, "w")
        file.write(output)
        file.close()
        
        self.logger.log("Creating Base URLs",[],"success")
        template = env.get_template('api/urls.py')
        filename = basedir + "/django_operis/urls.py"
        args = {"app":settings.API_APP_NAME,"imports":settings.EMBER_MODELS,"models":model_instances,"app_name":settings.API_APP_NAME}
        output = template.render(args)
        file = open(filename, "w")
        file.write(output)
        file.close()
        
        self.logger.log("Creating Base Tests",[],"success")
        template = env.get_template('api/test.py')
        filename = basedir + "/tests/test.py"
        args = {"app":settings.API_APP_NAME,"imports":settings.EMBER_MODELS,"fields":fields, "models":model_instances,"app_name":settings.API_APP_NAME}
        output = template.render(args)
        file = open(filename, "w")
        file.write(output)
        file.close()
        
        self.logger.log("Done, templates are in %s",[settings.EMBER_APP_NAME],"info")
        