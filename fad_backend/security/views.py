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
