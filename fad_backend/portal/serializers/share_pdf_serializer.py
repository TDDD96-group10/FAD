from rest_framework import serializers
from ..models import PostPdf

class SharePdfSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostPdf
        fields = ['file_name', 'pdf']
        