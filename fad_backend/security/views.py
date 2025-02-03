from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AdminUserRegisterSerializer, RegularUserRegisterSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated




class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Protected endpoint that requires JWT authentication",
        manual_parameters=[
            openapi.Parameter(
                "Authorization",
                openapi.IN_HEADER,
                description="Bearer Token: 'Bearer <your_access_token>'",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={200: openapi.Response("Authenticated response")}
    )
    def get(self, request):
        return Response({"message": "You have accessed a protected route!"})

class AdminRegisterView(APIView):
    def post(self, request):
        serializer = AdminUserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Admin registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegularUserRegisterView(APIView):
    @swagger_auto_schema(
        operation_description="Belmin",
        request_body= RegularUserRegisterSerializer,
        responses={200:  RegularUserRegisterSerializer()},
    )
    def post(self, request):
        serializer = RegularUserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class TestSwaggerView(APIView):
    @swagger_auto_schema(
        operation_description="Register a new admin user",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["username", "password"],
            properties={
                "username": openapi.Schema(type=openapi.TYPE_STRING, description="Admin username"),
                "password": openapi.Schema(type=openapi.TYPE_STRING, description="Admin password"),
            },
        ),
        responses={201: openapi.Response(description="Admin registered successfully")},
    )

    def post(self, request):
        return Response({"message": "Admin registered successfully"}, status=status.HTTP_201_CREATED)
    
    admin_id_param = openapi.Parameter(
        "admin_id",
        openapi.IN_PATH,  # Parameter is in the URL path
        description="ID of the admin user",
        type=openapi.TYPE_INTEGER,
        required=True,
    )
    # Define query parameter (?role=superuser)
    role_query_param = openapi.Parameter(
        "role",
        openapi.IN_QUERY,  # Parameter is in the query string
        description="Role of the admin (e.g., superuser, staff)",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(
        operation_description="Retrieve admin details",
        manual_parameters=[admin_id_param, role_query_param],  # Document path/query parameters
       
        responses={200: RegularUserRegisterSerializer()},  # Expected response
    )
    def get(self, request,admin_id,role):
        return Response({"message": "Admin registered successfully"}, status=status.HTTP_201_CREATED)
    
    admin_id_param = openapi.Parameter(
        "admin_id",
        openapi.IN_PATH,  # This means it's a path parameter
        description="ID of the admin user",
        type=openapi.TYPE_INTEGER,
        required=True,
    )

    @swagger_auto_schema(
        operation_description="Delete an admin user",
        manual_parameters=[admin_id_param],  # Documenting path parameter
        responses={204: openapi.Response(description="Admin deleted successfully")},
    )
    def delete(self, request,admin_id):
        return Response({"message": "Admin registered successfully"}, status=status.HTTP_201_CREATED)
    
    @swagger_auto_schema(
        operation_description="Update an admin user",
        manual_parameters=[admin_id_param],  # Path parameter
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["username", "email"],
            properties={
                "username": openapi.Schema(type=openapi.TYPE_STRING, description="New admin username"),
                "email": openapi.Schema(type=openapi.TYPE_STRING, description="New admin email"),
            },
        ),
        responses={200: openapi.Response(description="Admin updated successfully")},
    )
    def put(self, request,admin_id):
        return Response({"message": "Admin registered successfully"}, status=status.HTTP_201_CREATED)


        
