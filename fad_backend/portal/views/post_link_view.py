from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers.post_link_serializer import PostLinkSerializer
from rest_framework import status


class PostLinkView(APIView):
   
   """def get(self, request):
        return Response()"""
   
   def post(self, request):
       #return Response()

     serializer = PostLinkSerializer(data=request.data)
     if serializer.is_valid():
          # Typically, you'd save to the DB here, but we'll echo it back
          return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    
