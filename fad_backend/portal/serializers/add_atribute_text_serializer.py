from rest_framework import serializers

class AddAtributeTextSerializer(serializers.Serializer):
    key_name = serializers.CharField(max_length=100)
    
