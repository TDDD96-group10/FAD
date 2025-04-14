from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
#imports from models
from ..models import post 

from rest_framework import serializers



class HomeView(APIView):
    #@swagger_auto_schema(responses={200: UserOnlySerializer()})
    def get(self,request):

       #allPosts = post.models.CharField.
        print()
        return Response(69) #Should be custom for every request
    

class PostSerializer(serializers.Serializer):
    #author is fixed and white spaces are allowed
    author = serializers.CharField(required=True, allow_blank= True,max_length=8 )
    created_at = serializers.DateTimeField(read_only= True)
    title = serializers.CharField(required=True, allow_blank= True,max_length=100 )
    text = serializers.CharField(required=True, allow_blank= True,max_length=100 )

