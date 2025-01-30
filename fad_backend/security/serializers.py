from rest_framework import serializers
from .models import AdminUser, RegularUser

# 🔹 Serializer for Admin Users
class AdminUserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = AdminUser
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        return AdminUser.objects.create_user(**validated_data)


# 🔹 Serializer for Regular Users
class RegularUserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = RegularUser
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        return RegularUser.objects.create_user(**validated_data)
