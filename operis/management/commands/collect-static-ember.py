import datetime                         
import sys
import os.path
import pprint
import subprocess
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

#This command takes an input table of artifacts, of a specific format,
#And ensures that image attatchments for each artifact in the table are created
#Then sets those images up to be parsed by the IKGEN.py

class Command(BaseCommand):
    help = 'Merge Static Ember Assets' 
    logger = None
    
    def handle(self, *args, **options):
        
        self.logger = log( self )
        
        source = "%s/../operis/templates/ember/static/*" % (settings.PROJECT_DIR)
        destination = "%s/../%s/app" % (settings.PROJECT_DIR,settings.EMBER_APP_NAME)
        command = "rsync -av %s %s" % (source,destination)
        
        self.logger.log("Copy assets from %s",[source],"info")
        self.logger.log("Copy assets to %s",[destination],"info")
        self.logger.log("Command %s",[command],"info")
        
        subprocess.check_call([command],shell=True)
            
        self.logger.log("Done, assets are merged to %s",[settings.EMBER_APP_NAME],"info")
        