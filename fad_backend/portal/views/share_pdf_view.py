from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from ..serializers import SharePdfSerializer
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser




class SharePDFView(APIView):
    parser_classes = (FormParser, MultiPartParser, FileUploadParser)
    @swagger_auto_schema(
        request_body=SharePdfSerializer()
    )
    def post(self, request):
        serializer = SharePdfSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)