from rest_framework import serializers
from ..models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'author', 'created_at', 'title', 'text', 'start_time']
