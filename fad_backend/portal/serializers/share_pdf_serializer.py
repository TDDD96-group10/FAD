from rest_framework import serializers
from ..models import PostPdf

class SharePdfSerializer(serializers.ModelSerializer):
    file_name = serializers.CharField(max_length=100)
    pdf = serializers.FileField(write_only=True)

    class Meta:
        model = PostPdf
        fields = ['file_name', 'pdf']
