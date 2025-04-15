from rest_framework import serializers
from ..models import Post


class TextPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['author', 'program', 'send_notifcation', 'title', 'text', 'start_time']
