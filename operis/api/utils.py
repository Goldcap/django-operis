import urllib
import urllib2
import json
from math import radians, cos, sin, asin, sqrt

def dictfetchall(cursor):
    "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]
    
def clean_param(param):
    if hasattr(param, '_get_pk_val'):
        # has a pk value -- must be a model
        return str(param._get_pk_val())
    
    if callable(param):
        # it's callable, should call it.
        return str(param())

    return str(param)
