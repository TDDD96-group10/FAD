from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers
from portal.models import User, Program, Post
from portal.serializers.ProgramSerializer import ProgramSerializer
from portal.serializers.UserSerializer import UserSerializer

# Serializer for the Post model, including nested serializers for author and program
class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    program = ProgramSerializer()
    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'created_at', 'author', 'program']
        ref_name = 'PostSerializer'  # Explicit ref_name for clarity