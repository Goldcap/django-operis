import urllib 

from django.contrib.auth.models import User

from rest_framework import authentication
from rest_framework import exceptions

from oauth2_provider.models import *
from oauth2_provider.views.application import ApplicationOwnerIsUserMixin

#http://www.django-rest-framework.org/api-guide/authentication/
class KeyAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        
        model = get_application_model()
        application = None
        
        key = request.META.get('HTTP_AUTHORIZATION')
        
        if 'key' in request.query_params:
            key = request.query_params['key']
            key = urllib.unquote(key)
        
        if key:
            application = model.objects.get(client_id=key)
            
        if not application:
            raise exceptions.AuthenticationFailed('No such key')
        
        try:
            user = application.user
            #user = User.objects.get(pk=1)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)