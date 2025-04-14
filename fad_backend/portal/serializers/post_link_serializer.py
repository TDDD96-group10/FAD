from rest_framework import serializers

class PostLinkSerializer(serializers.Serializer):
    title = serializers.CharField()
    url = serializers.CharField()
    author = serializers.IntegerField()
    program = serializers.IntegerField()
    send_notifcation = serializers.BooleanField()
    text  = serializers.CharField()