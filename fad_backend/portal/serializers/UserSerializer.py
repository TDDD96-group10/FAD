from django.db import models
from rest_framework import serializers
from ..models.group import Group
from ..models.program import Program


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()