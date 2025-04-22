
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from ..serializers import SharePdfSerializer
from ..models import PostPdf

from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage

class SharePDFView(APIView):
    @swagger_auto_schema(
        request_body=SharePdfSerializer,
        responses={201: SharePdfSerializer()}
     )
     
    def post(self, request):

        print(request.FILES)
        serializer = SharePdfSerializer(data=request.data)
        if serializer.is_valid():
            instance = PostPdf(**serializer.validated_data)
            instance.save()
            return Response("PDF saved to database", status=status.HTTP_201_CREATED)
        
        return Response("PDF upload failed", status=status.HTTP_400_BAD_REQUEST)