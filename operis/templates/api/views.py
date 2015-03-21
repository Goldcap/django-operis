import datetime

from django.template.context import RequestContext
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, get_list_or_404, get_object_or_404, \
                             redirect, render
from django.utils.safestring import SafeString
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from django.utils.translation import ugettext as _  

from rest_framework import filters
from rest_framework import generics,viewsets
from rest_framework import permissions

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope

from operis.api.renderers import EmberJSONRenderer 
from operis.api.filters import *
from operis.api import mixins
from operis.api.authentication import KeyAuthentication
{% for animport in imports %}
from {{animport}} import *
{% endfor %}

from {{app}}.django_operis.serializers import *

{% for model in models %}
class {{ model.singular }}ViewSet(viewsets.ModelViewSet):
    #permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    permission_classes = [permissions.AllowAny]
    model = {{ model.singular }}
    serializer_class = {{ model.singular }}Serializer
    renderer_classes = (EmberJSONRenderer,)
    filter_backends = (SearchFilter,)
    queryset = {{ model.singular }}.objects.all()
    {{model.filter_fields_converted}}
    {{model.search_fields_converted}}

class {{ model.singular}}View(mixins.ListByIdMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    model =  {{ model.singular }}
    serializer_class =  {{ model.singular }}Serializer
    renderer_classes = (EmberJSONRenderer,)
{% endfor %}
