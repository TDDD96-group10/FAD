from rest_framework import serializers
from portal.models import User

class EditableUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_number', 'email']  
