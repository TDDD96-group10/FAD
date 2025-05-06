from rest_framework import serializers
from ..models import PostLink


class PostLinkSerializer(serializers.ModelSerializer):

    title = serializers.CharField(default="Default Title")
    text = serializers.CharField(default="Default Text")

    class Meta:
        model = PostLink
        fields = ['author', 'program', 'send_notifcation', 'title', 'text', 'link']

