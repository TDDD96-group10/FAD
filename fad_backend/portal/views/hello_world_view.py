from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers
from time import daylight 


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField()


class UserOnlySerializer(serializers.Serializer):
    user = UserSerializer()


class HelloWorldView(APIView):
    @swagger_auto_schema(responses={200: UserOnlySerializer()})
    def get(self, request):
        return Response({
            "user": {
                "id": 20,
                "username": "belmin123",
                "email": "belmin@example.com"
            }
        })

    @swagger_auto_schema(
        request_body=UserOnlySerializer,
        responses={201: UserOnlySerializer()}
    )
    def post(self, request):
        serializer = UserOnlySerializer(data=request.data)
        if serializer.is_valid():
            #Typically, you'd save to the DB here, but we'll echo it back
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
