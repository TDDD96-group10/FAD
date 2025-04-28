from rest_framework.views import APIView
from django.http import FileResponse
from drf_yasg.utils import swagger_auto_schema
from portal.models import PostPdf
from portal.serializers.user_serializer import UserSerializer


class PDFView(APIView):
    @swagger_auto_schema(responses={200: UserSerializer()})
    def get(self, request,pdf_id):
        pdf = PostPdf.objects.get(id=pdf_id)
        response = FileResponse(pdf.pdf.open('rb'), content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="{pdf.file_name}"'
        return response
