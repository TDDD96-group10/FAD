from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers
from portal.models import User, Program, Post

# Serializer for the Program model, assuming it has a name field
class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'  # Or specify fields like ['id', 'name'] if known
        ref_name = 'PostProgramSerializer'  # Explicit ref_name to avoid conflicts