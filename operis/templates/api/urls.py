from django.conf.urls import patterns, url, include
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.auth.models import User, Group

admin.autodiscover()

from rest_framework import routers

from {{app}}.django_operis.views import *

# Routers provide an easy way of automatically determining the URL conf
router = routers.DefaultRouter(trailing_slash=False)
{% for model in models -%}
router.register(r'api/v1/{{model.plural_converted}}', {{model.singular}}ViewSet)
{% endfor %}

urlpatterns = patterns('',
     {% for model in models -%}
     url(r'api/v1/{{model.plural_converted}}/(?P<pk>\d+)($|/$)',{{model.singular}}View.as_view()),
     {% endfor %}
     url(r'^', include(router.urls)),
) 
