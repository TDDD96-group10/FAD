from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from portal.models import Post
from django.shortcuts import get_object_or_404
from portal.serializers.post_serializer import PostSerializer


class PostView(APIView):
    @swagger_auto_schema(responses={200: PostSerializer()})
    def get(self, request, id):
        post = get_object_or_404(Post, id=id)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, id):
        post = get_object_or_404(Post, id=id)
        post.delete()
        return Response({"detail": "Post deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
