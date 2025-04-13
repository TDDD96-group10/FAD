from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from rest_framework import serializers

from portal.models import User, Program, Group

from portal.serializers.UserModelSerializer import UserModelSerializer


# class ProgramSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Program
#         fields = '__all__'  # Or specify fields like ['id', 'name'] if known



# class GroupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Group
#         fields = '__all__'  # Or specify fields like ['id', 'name'] if known


# class UserModelSerializer(serializers.ModelSerializer):
#     program = ProgramSerializer(read_only=True)
#     group = GroupSerializer(read_only=True, allow_null=True)

#     class Meta:
#         model = User
#         fields = ['user_id', 'role', 'program', 'group', 'attributes'] # TODO: Add diet, shirt_size etc

class UserListView(APIView):
    @swagger_auto_schema(responses={200: UserModelSerializer(many=True)})
    def get(self, request):
        users = User.objects.all()  # Fetch all users from the database
        serializer = UserModelSerializer(users, many=True)  # Serialize the queryset
        return Response(serializer.data, status=status.HTTP_200_OK)
    
