from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import serializers
from portal.models import User
from portal.serializers.program_serializer import ProgramSerializer
from portal.serializers.group_serializer import GroupSerializer


class UserSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(read_only=True)
    group = GroupSerializer(read_only=True, allow_null=True)

    class Meta:
        model = User
        fields = ['user_id', 'role', 'program', 'group', 'attributes']
        ref_name = 'UserSerializer'
