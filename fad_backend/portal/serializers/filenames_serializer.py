from rest_framework import serializers
from ..models import PostPdf

class FileNamesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)  
    class Meta:
        model = PostPdf
        fields = ['id', 'file_name']