"""
Provides generic filtering backends that can be used to filter the results
returned by list views.
"""
from functools import reduce
import operator

from __future__ import unicode_literals
from django.db import models
from django.http.request import QueryDict
from django.conf import settings   
import django_filters

from rest_framework import filters
from rest_framework.compat import django_filters, six

from operis.utils import unconvert

FilterSet = django_filters and django_filters.FilterSet or None