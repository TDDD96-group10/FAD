from rest_framework import serializers
from portal.models import Program


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'
        ref_name = 'ProgramSerializer'
