from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import parsers, renderers, status
from drf_yasg.utils import swagger_auto_schema
from ..models.user import User
from ..models.program import Program
from ..models.group import Group
from ..serializers.UserSerializer import FileUploadSerializer
import csv
import io
import json


class ImportUsersView(APIView):
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.FileUploadParser)
    renderer_classes = (renderers.JSONRenderer,)

    @swagger_auto_schema(
        request_body=FileUploadSerializer,
        operation_description="""
        API endpoint for bulk importing users from a CSV file.

        This view handles file uploads containing user data in CSV format,
        creates User instances along with related Program and Group objects,
        and returns import statistics.

        Example CSV Format:
            user_id,role,program,group,attributes
            123,student,"Program Name,attr1:value1",Group A,"{key:value}"
            456,teacher,"Program Name,attr2:value2",Group B,"{key:value}"
        """,
        responses={200: "OK", 400: "Upload error"}
    )
    def post(self, request):
        """
        This method processes a CSV file upload and creates User instances with related objects.
        """
        upload_serializer = FileUploadSerializer(data=request.data)
        if not upload_serializer.is_valid():
            return Response(upload_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Decode the uploaded CSV file
        csv_file = upload_serializer.validated_data['file']
        decoded_file = csv_file.read().decode('utf-8')
        io_string = io.StringIO(decoded_file)
        reader = csv.DictReader(io_string)

        for row in reader:
            try:
                # Creates and saves user objects in the data base
                cleaned_row = {k.strip(): v for k, v in row.items()}
                User.objects.create(
                    user_id=cleaned_row['user_id'],
                    role=cleaned_row['role'],
                    program=Program.objects.create(
                        name=self.extract_before_comma(cleaned_row['program']),
                        attributes=self.create_dict_from_string(cleaned_row['program'])),
                    group=Group.objects.get_or_create(name=cleaned_row['group'].strip()),
                    attributes=cleaned_row['attributes']
                )
            except Exception as e:
                print(f"Error on row: {row} - {e}")
                return Response(upload_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        users = list(reader)
        return Response({
            "Message": "Users imported successfully",
            "Number of imported Users": len(users)
        }, status=status.HTTP_200_OK)

    @classmethod
    def extract_before_comma(input_string):
        """Returns the part of the string that appears before the first comma"""
        if input_string.startswith('"'):
            input_string = input_string[1:]
        return input_string.split(",", 1)[0].strip()

    @classmethod
    def create_dict_from_string(input_string):
        """Returns a dictionary parsed from the JSON portion of the input string"""
        if input_string.startswith('"'):
            input_string = input_string[1:]
        if input_string.endswith('"'):
            input_string = input_string[:-1]
        name, json_part = input_string.split(",", 1)
        attributes = json.loads(json_part.strip())
        return attributes
