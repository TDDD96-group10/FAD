from rest_framework import serializers


class CodeSubmitSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)
    username = serializers.CharField(max_length=8)
