from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
#imports CLASS POST from models
from ..models import Post 
from django.utils import timezone
from rest_framework import serializers


class PostSerializer(serializers.Serializer):
    #author is fixed and white spaces are allowed
    author = serializers.CharField(required=True, allow_blank= True,max_length=8 )
    
    created_at = serializers.DateTimeField(read_only= True)

    title = serializers.CharField(required=True, allow_blank= True,max_length=100 )

    text = serializers.CharField(required=True, allow_blank= True,max_length=100 )

    start_time = serializers.DateTimeField(read_only= True)

class HomeView(APIView):
    @swagger_auto_schema(responses={200: PostSerializer()})
    def get(self,request):

        #Get todays time 
        today = timezone.now()
        #Retrieve all post for today
        r = Post.objects.filter(start_time__gte=today).order_by("start_time")#[:2]

        #-----------TODAY-------------
        #Get the two posts nearest in time
        post_1 = r[0]
        #post_2 = r[1]
        
        #-----------TOMORROW-------------

        #serialize data
        serializer = PostSerializer(data=post_1)
        if serializer.is_valid():
            return Response(serializer.data )
        
        #Bad call, return error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        #for element in allPosts:
         #   print(f"title:{element.title}, author:{element.author}, created at:{element.created_at}")
     
    

