from rest_framework import serializers
from portal.models import Post
from portal.serializers.program_serializer import ProgramSerializer
from portal.serializers.user_serializer import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    program = ProgramSerializer()

    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'created_at', 'author', 'program']
        ref_name = 'PostSerializer'
