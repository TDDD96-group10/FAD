from rest_framework import serializers
from portal.models import Post
from portal.serializers.program_serializer import ProgramSerializer
from portal.serializers.user_serializer import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    program = ProgramSerializer()

    can_delete = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'created_at', 'author', 'program', 'can_delete']
        ref_name = 'PostSerializer'

    def get_can_delete(self, obj):
        return True