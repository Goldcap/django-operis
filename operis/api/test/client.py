from rest_framework.test import APIClient
from datetime import datetime

from django.utils import timezone 

from autofixture import AutoFixture 

class OperisTestClient(APIClient):

    models = {}
    
    def register_fixtures(self,model,count):
        fixture = AutoFixture(model)
        items = fixture.create(count)
        self.models[model] = items
        return True
    
        
    def generate_test_data(self,model,fields,omit_id=True):
        item = {}
        for field in fields:
            if field['name'] == 'id' and omit_id:
                continue
            item[field['name']] = self.generate_field_data(model,field)
        return item
            
    def generate_field_data(self,model,field):
        """
        """
        fixture = AutoFixture(model)
        field,modelItem,direct,m2m = model._meta.get_field_by_name(field['name'])
        return fixture.get_value(field)
        