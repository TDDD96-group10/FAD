from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from fad_backend.signals import  token_created

class CustomObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token_created.send(sender="security.views.login_view", token=token, user=user)
        return token