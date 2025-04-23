from rest_framework import serializers
from portal.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        ref_name = 'UserSerializer'
