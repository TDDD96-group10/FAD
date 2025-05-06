from rest_framework.views import APIView, Response, status
from drf_yasg.utils import swagger_auto_schema
from portal.models import Program
from ..serializers import AddCustomFiledsSerializer

class CustomMultiTagsView(APIView):
    @swagger_auto_schema(request_body=AddCustomFiledsSerializer)
    def post(self, request):
        serializer = AddCustomFiledsSerializer(data=request.data)
        if serializer.is_valid():
            print("we are vaild")
            key_name = serializer.validated_data['key_name']
            values = serializer.validated_data['Key_value']
            program = Program.objects.first()
            if not program:
                return Response({"error": "No Program found"}, status=status.HTTP_404_NOT_FOUND)
            program.attributes[key_name] = values
            program.save()
            return Response({"message": f"Key '{key_name}' added."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    