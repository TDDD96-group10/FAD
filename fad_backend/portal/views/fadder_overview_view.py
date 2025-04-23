from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from rest_framework import serializers

from portal.models import User
from portal.serializers.user_serializer import UserSerializer


class UserListView(APIView):
    @swagger_auto_schema(responses={200: UserSerializer(many=True)})
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
