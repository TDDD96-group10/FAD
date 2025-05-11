import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from portal.models import Post, User, Program
from portal.serializers.post_serializer import PostSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
logger = logging.getLogger(__name__)



class PostListView(APIView):
    # permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={200: PostSerializer(many=True)})
    def get(self, request):
        
        posts = Post.objects.order_by('-created_at')
        serializer = PostSerializer(posts, many=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)
