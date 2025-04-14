from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
#imports CLASS POST from models
from ..models import Post 

from rest_framework import serializers



class HomeView(APIView):
    #@swagger_auto_schema(responses={200: UserOnlySerializer()})
    def get(self,request):
        #Retrieve all posts
        allPosts = Post.objects.all()
        #for element in allPosts:
         #   print(f"title:{element.title}, author:{element.author}, created at:{element.created_at}")
        return Response(Post.objects.all()) #Should be custom for every request
    

class PostSerializer(serializers.Serializer):
    #author is fixed and white spaces are allowed
    author = serializers.CharField(required=True, allow_blank= True,max_length=8 )
    
    created_at = serializers.DateTimeField(read_only= True)

    title = serializers.CharField(required=True, allow_blank= True,max_length=100 )

    text = serializers.CharField(required=True, allow_blank= True,max_length=100 )

