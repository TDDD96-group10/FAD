from rest_framework.views import APIView
from rest_framework import status
from django.http import FileResponse
from rest_framework.response import Response
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

    def delete(self, request, pdf_id):
        try:
            pdf = PostPdf.objects.get(id=pdf_id)
        except PostPdf.DoesNotExist:
            return Response({'detail': 'PDF not found.'}, status=status.HTTP_404_NOT_FOUND)
        pdf.delete()
        return Response({'detail': 'PDF deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)