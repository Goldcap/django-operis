from rest_framework.test import APIClient
from datetime import datetime

from django.utils import timezone
from django.db import models
from django.apps import apps

from autofixture import AutoFixture 

class OperisTestClient(APIClient):

    models = {}
    
    def register_fixtures(self,model,count):
        fixture = AutoFixture(model)
        items = fixture.create(count)
        self.models[model] = items
        return True
        
    def create_fixture(self,model):
        fixture = AutoFixture(model)
        return fixture.create()
        
    def generate_test_data(self,model,fields,omit_id=True):
        item = {}
        for field in fields:
            if field['name'] == 'id' and omit_id:
                continue
            value = self.generate_field_data(model,field)
            if value:
                item[field['name']] = value
        return item
            
    def generate_field_data(self,model,field):
        """
        """
        #We create unique FK Instances, in case the field requires "Unique"
        if field['type'] == 'ForeignKey':
            model = apps.get_model(app_label=field['parent_class_app'], model_name=field['parent_class'])
            instance = self.create_fixture(model)
            value = instance[0]
        else:
            fixture = AutoFixture(model)
            fixture.return_default_values = True
            field,modelItem,direct,m2m = model._meta.get_field_by_name(field['name'])
            value = fixture.get_value(field)
        if isinstance(value,datetime):
            value = str(value.isoformat())
            if value.endswith('+00:00'):
                value = value[:-6] + 'Z'
            return value
        if value == AutoFixture.IGNORE_FIELD:
            return None
        if isinstance(value, models.Model):
            return value.pk
        return value
        