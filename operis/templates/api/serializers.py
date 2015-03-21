from datetime import time,tzinfo

from django.conf import settings   
from django.contrib.auth.models import User, Group

from rest_framework import serializers

from operis.api.serializers import *
from operis.api.mixins import *
{% for animport in imports %}
from {{animport}} import *
{% endfor %}
{% for model in models %}
class {{ model.singular }}Serializer(BaseSerializer):
    
    class Meta:
        model = {{ model.singular }}
        resource_name = '{{model.plural_converted}}'
        {{ model.fields_converted }}

{% endfor %}