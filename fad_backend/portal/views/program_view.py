from rest_framework.views import APIView, Response, status
from drf_yasg.utils import swagger_auto_schema
from portal.models import Program
from ..serializers import AddAtributeTextSerializer


class ProgramView(APIView):
    @swagger_auto_schema(request_body=AddAtributeTextSerializer)
    def post(self, request):
        serializer = AddAtributeTextSerializer(data=request.data)
        if serializer.is_valid():
            key_name = serializer.validated_data['key_name']
            program = Program.objects.first()
            if not program:
                return Response({"error": "No Program found"}, status=status.HTTP_404_NOT_FOUND)
            free_text = program.attributes.get("custom_free_text")
            if free_text is None:
                program.attributes["custom_free_text"] = [key_name]
            else:
                 free_text.append(key_name)
            program.save()
            return Response({"message": f"Key '{key_name}' added."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
