from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from rest_framework import serializers

from portal.models import User, Program, Group

from portal.serializers.ProgramSerializer import ProgramSerializer
from portal.serializers.GroupSerializer import GroupSerializer


class UserModelSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(read_only=True)
    group = GroupSerializer(read_only=True, allow_null=True)

    class Meta:
        model = User
        fields = ['user_id', 'role', 'program', 'group', 'attributes'] # TODO: Add diet, shirt_size etc