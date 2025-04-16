from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import parsers, renderers, serializers, status
from drf_yasg.utils import swagger_auto_schema
from ..models.user import User
from ..models.program import Program
from ..models.group import Group
from ..serializers.UserSerializer import ImportUsersOnlySerializer
from ..serializers.UserSerializer import FileUploadSerializer
import csv
import io
import json

class ImportUsersView(APIView):
    def post(self, request):

        upload_serializer = ImportUsersOnlySerializer(data=request.data)
        if not upload_serializer.is_valid():
            return Response(upload_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        csv_file = upload_serializer.validated_data['file']

        decoded_file = csv_file.read().decode('utf-8')
        io_string = io.StringIO(decoded_file)
        reader = csv.DictReader(io_string)
        
        for row in reader:
            User.objects.create(
                user_id=row['user_id'],
                role=row['role'],
                program=row['program'],
                group=row['group'],
                attributes=row['attributes']
            )

        #for index, row in enumerate(reader, start=1):
        #    serializer = PersonSerializer(data=row)
        #    if serializer.is_valid():
        #        return


        
        return Response(0)


    

class CSVUploadView(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.FileUploadParser)
    renderer_classes = (renderers.JSONRenderer,)
    
    @swagger_auto_schema(
        request_body=FileUploadSerializer,
        operation_description="Ladda upp en CSV-fil med användardata",
        responses={200: "OK", 400: "Fel i uppladdning"}
    )
    
    def post(self, request):
        upload_serializer = FileUploadSerializer(data=request.data)
        if not upload_serializer.is_valid():
            return Response(upload_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        csv_file = upload_serializer.validated_data['file']
        decoded_file = csv_file.read().decode('utf-8')
        io_string = io.StringIO(decoded_file)
        reader = csv.DictReader(io_string)

           
        for row in reader:
            print(row)

            try:
                # Rensa ev. whitespace i nycklar
                cleaned_row = {k.strip(): v for k, v in row.items()}
                # Print test
                print("name: ", type(extract_before_comma(cleaned_row['program'])))
                print("attributes: ", type(create_dict_from_string(cleaned_row['program'])))
                User.objects.create(
                    user_id=cleaned_row['user_id'],
                    role=cleaned_row['role'],
                    program=Program.objects.create( 
                        name = extract_before_comma(cleaned_row['program']),  
                        attributes = create_dict_from_string(cleaned_row['program'])),
                    group=Group.objects.create(cleaned_row['group'].strip()),
                    attributes=cleaned_row['attributes']
                )
            except Exception as e:
                print(f"Fel vid rad: {row} - {e}")


        # Gör vad du vill med raderna i reader
        users = list(reader)
        #print("test", users[0]["user_id"])


        return Response({
            "antal_rader": len(users),
            "förhandsgranskning": users[:2]  # visa t.ex. de 2 första
        }, status=status.HTTP_200_OK)
    
def extract_before_comma(input_string):
         # Ta bort första tecknet om det är ett citattecken
    if input_string.startswith('"'):
        input_string = input_string[1:]
    return input_string.split(",", 1)[0].strip()

def create_dict_from_string(input_string):
    # Ta bort citattecknen om de finns i början och slutet
    if input_string.startswith('"'):
        input_string = input_string[1:]
    if input_string.endswith('"'):
        input_string = input_string[:-1]
    
    # Dela upp strängen vid första kommatecknet
    name, json_part = input_string.split(",", 1)
    
    # Ta bort extra mellanslag och skapa en dictionary från JSON-delen
    attributes = json.loads(json_part.strip())
    
    return attributes

   
            
