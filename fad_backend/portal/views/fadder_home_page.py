from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import serializers

from portal.models import Post
from portal.serializers.post_serializer import PostSerializer


class PostListView(APIView):
    @swagger_auto_schema(responses={200: PostSerializer(many=True)})
    def get(self, request):
        posts = Post.objects.order_by('-created_at')
        serializer = PostSerializer(posts, many=True) # indicating it's a list with many=True
        return Response(serializer.data, status=status.HTTP_200_OK)

