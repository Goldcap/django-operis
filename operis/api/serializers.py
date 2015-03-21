from rest_framework import pagination
from rest_framework.response import Response
from rest_framework import serializers

class CustomPaginationSerializer(pagination.PageNumberPagination):
    # Takes the page object as the source
    #meta = CustomMetaSerializer(source='*')
    results_field = 'results'
    
    def get_paginated_response(self, data):
        return Response({
            'meta': {
               'count': self.page.paginator.count,
               'num_pages': self.page.paginator.num_pages,
               'current_page': self.page.number,
               'rpp': self.page.paginator.per_page
            },
            'results': data
        })
        
class BaseSerializer(serializers.ModelSerializer):
    
    pass