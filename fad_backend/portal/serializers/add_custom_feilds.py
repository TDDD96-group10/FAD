from rest_framework import serializers

class AddCustomFiledsSerializer(serializers.Serializer):
    key_name = serializers.CharField(max_length=100)
    Key_value = serializers.ListField(
        child=serializers.CharField()
    )
    