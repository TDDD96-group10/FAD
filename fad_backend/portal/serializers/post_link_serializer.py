from rest_framework import serializers
from ..models import PostLink


class PostLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLink
        fields = ['author', 'program', 'send_notifcation', 'title', 'text', 
                  'link']
