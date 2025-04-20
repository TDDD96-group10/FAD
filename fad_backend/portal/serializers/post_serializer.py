from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers
from portal.models import User, Program, Post
from portal.serializers.program_serializer import ProgramSerializer
from portal.serializers.user_serializer import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    program = ProgramSerializer()
    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'created_at', 'author', 'program']
        ref_name = 'PostSerializer'