
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..serializers import SharePdfSerializer
from ..models import PostPdf

from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django import forms



class pdfForm(forms.Form):
    file_name = forms.CharField(max_length=100)
    pdf = forms.FileField()

class SharePDFView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'file_name': openapi.Schema(type=openapi.TYPE_STRING, description='File name'),
                'pdf': openapi.Schema(type=openapi.TYPE_FILE, description='PDF file')
            },
            required=['file_name', 'pdf']
        ),
        consumes=['multipart/form-data'],
        responses={201: SharePdfSerializer()},
    )

   # filepath: vsls:/fad_backend/portal/views/share_pdf_view.py
    def post(self, request):
        datacopy = request.data.copy()
        serializer = SharePdfSerializer(data={**request.data, **request.FILES})
        if serializer.is_valid():
            file_name = serializer.validated_data['file_name']
            pdf = serializer.validated_data['pdf']

            # Kontrollera om filen redan finns
            if PostPdf.objects.filter(file_name=file_name).exists():
                return Response("PDF already exists", status=status.HTTP_400_BAD_REQUEST)

            # Spara filen till filsystemet
            fs = FileSystemStorage()
           

            #filename = fs.save(pdf.name, pdf)
            uploaded_file_url = fs.url(file_name)

            # Spara till databasen
            #post_pdf_instance = PostPdf(file_name=file_name, pdf=uploaded_file_url)
            #post_pdf_instance.save()
            post_pdf = PostPdf(
                author=request.user,
                file_name=file_name,
                pdf=uploaded_file_url  # Save file directly
            )
            post_pdf.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)