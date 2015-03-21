import json

from django.test import TestCase
from django.test import Client

from autofixture import AutoFixture
from rest_framework import status
from operis.api.test.client import OperisTestClient

{% for animport in imports %}
from {{animport}} import *
{% endfor %}

{% for model in models %}
#http://www.django-rest-framework.org/api-guide/testing/
class {{ model.singular }}Test(TestCase):
    
    def setUp(self):
        # Every test needs a client.
        self.client = OperisTestClient()
        self.generate_fixtures()
        
    def generate_fixtures(self):
        {% for aclass in models %}
        self.client.register_fixtures({{ aclass.singular }},{{aclass.fixture_seed}})
        {% endfor %}        

    def test_details(self):
        
        {% for field in model.fields -%}
        {% if field.parent_class -%}
        #We create any Foreign Key objects
        #Edit that record
        fixture = AutoFixture({{field.parent_class}})
        fixture.create(1)
        {% endif %}
        {%- endfor %}
        
        # Issue a GET request for NO Records
        list_response = self.client.get('/api/v1/{{ model.plural_converted}}')
        # Check that the response is 200 OK.
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        list_data = json.loads(list_response.content)
        # Check that the rendered context contains 5 customers.
        self.assertEqual(len(list_data['{{ model.plural_converted}}']), {{model.fixture_seed}})
        
        test_data = self.client.generate_test_data({{model.singular}},{{model.fields}})
        
        # Create a record
        post_response = self.client.post('/api/v1/{{ model.plural_converted}}', test_data)
        self.assertEqual(post_response.status_code, status.HTTP_201_CREATED)
        
        itemcount = {{model.fixture_seed}} + 1
        # Issue a GET request for ONE Record
        list_response = self.client.get('/api/v1/{{ model.plural_converted}}')
        # Check that the response is 200 OK.
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        list_data = json.loads(list_response.content)
        # Check that the rendered context contains 5 customers.
        self.assertEqual(len(list_data['{{ model.plural_converted}}']), itemcount)
        
        for item in list_data['{{ model.plural_converted}}']:
            #Check for that Record
            item_response = self.client.get('/api/v1/{{ model.plural_converted}}/%s' % item['id'])    
            self.assertEqual(item_response.status_code, status.HTTP_200_OK)
            item_data = json.loads(item_response.content)
            
            self.assertEqual(len(item_data),1)        
            self.assertEqual(item,item_data['{{ model.plural_converted}}'])
            
            test_data_one = self.client.generate_test_data({{model.singular}},{{model.fields}})
            
            {% for field in model.fields -%}
            {% if field.name != 'id' -%}
            #Edit that record
            patch_response = self.client.patch('/api/v1/{{ model.plural_converted}}/%s' % item['id'], {'{{field.name}}': test_data_one['{{field.name}}']})
            self.assertEqual(patch_response.status_code, status.HTTP_200_OK)
            {% endif %}
            {%- endfor %}
            
            #Check for that Record
            item_response = self.client.get('/api/v1/{{ model.plural_converted}}/%s' % item['id'])    
            self.assertEqual(item_response.status_code, status.HTTP_200_OK)
            item_data = json.loads(item_response.content)
            
            self.assertEqual(len(item_data),1)        
            self.assertNotEqual(item,item_data['{{ model.plural_converted}}'])
            {% for field in model.fields -%}
            {% if field.name != 'id' -%}
            self.assertEqual(test_data_one['{{field.name}}'],item_data['{{ model.plural_converted}}']['{{field.name}}']) 
            {% endif %}
            {%- endfor %}
            
            #Delete that record
            patch_response = self.client.delete('/api/v1/{{ model.plural_converted}}/%s' % item['id'])
            self.assertEqual(patch_response.status_code, status.HTTP_204_NO_CONTENT)
           
        # Issue a GET request for NO Records
        list_response = self.client.get('/api/v1/{{ model.plural_converted}}')
        # Check that the response is 200 OK.
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        list_data = json.loads(list_response.content)
        # Check that the rendered context contains 5 customers.
        self.assertEqual(len(list_data['{{ model.plural_converted}}']), 0)

{% endfor %}        