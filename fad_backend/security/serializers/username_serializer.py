from rest_framework import serializers


class UsernameSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
