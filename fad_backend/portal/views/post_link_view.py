from rest_framework.views import APIView
from rest_framework.response import Response
#from ..serializers.post_link_serializer import PostLinkSerializer
from rest_framework import status
from rest_framework import serializers
from drf_yasg.utils import swagger_auto_schema

class PostLinkSerializer(serializers.Serializer):
    title = serializers.CharField()
    url = serializers.CharField()
    author = serializers.IntegerField()
    program = serializers.IntegerField()
    send_notifcation = serializers.BooleanField()
    text  = serializers.CharField()


class PostLinkView(APIView):
   
   #Vad gö
   """@swagger_auto_schema(responses={200: PostLinkSerializer()}   )
   def get(self, request):
        return Response({
            "user": {
                "title": request.title,
                "url": request.url,
                "author": request.author,
                "program": request.program,
                "send_notification": request.send_notification,
                "text" : request.text
            }
        })"""
   

   @swagger_auto_schema(
        request_body=PostLinkSerializer,
        responses={201: PostLinkSerializer()}
    )
   def post(self, request):
     serializer = PostLinkSerializer(data=request.data)
     if serializer.is_valid():
        #Spara till databas
        return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    
