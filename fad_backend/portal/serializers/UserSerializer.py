from django.db import models
from rest_framework import serializers
from ..models.group import Group
from ..models.program import Program



class ImportUsersSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    role = serializers.CharField()
    program = serializers.PrimaryKeyRelatedField(queryset=Program.objects.all())
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), required=False, allow_null=True)
    attributes = serializers.JSONField()

    
class ImportUsersOnlySerializer(serializers.Serializer):
    import_users = ImportUsersSerializer() 

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()