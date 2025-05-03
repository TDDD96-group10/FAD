from rest_framework import serializers
from ..models import PostPdf, Program, User


class SharePdfSerializer(serializers.ModelSerializer):
    
    file_name = serializers.CharField(max_length=100)
    pdf = serializers.FileField(write_only=True)

    class Meta:
        model = PostPdf
        fields = [
            'file_name',
            'pdf'
        ]

    def create(self, validated_data):
        return PostPdf.objects.create(
            author=User.objects.first(),
            program=Program.objects.first(),
            send_notifcation=False,
            title="Test",
            text="sds",
            start_time="2025-05-01T10:30:00",
            file_name=validated_data['file_name'],
            pdf=validated_data['pdf'],
        )
