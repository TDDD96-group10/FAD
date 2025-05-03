from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from portal.models import PostPdf
from portal.serializers.filenames_serializer  import FileNamesSerializer


class FilesView(APIView):
    @swagger_auto_schema(responses={200: FileNamesSerializer(many=True)})
    def get(self, request):
        users = PostPdf.objects.all()
        serializer = FileNamesSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, file_id):
        try:
            file_instance = PostPdf.objects.get(id=file_id)
            file_instance.delete()
            return Response({"message": f"File with id {file_id} deleted."}, status=status.HTTP_200_OK)
        except PostPdf.DoesNotExist:
            return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)

