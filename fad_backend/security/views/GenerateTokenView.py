from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers.CodeSubmitSerializer import CodeSubmitSerializer
from ..models.TwoFactorCode import TwoFactorCode
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class GenerateTokenView(APIView):
    @swagger_auto_schema(
        request_body=CodeSubmitSerializer,
        responses={
            200: openapi.Response(
                description="Token successfully generated",
                examples={
                    "application/json": {
                        "refresh": "your-refresh-token-here",
                        "access": "your-access-token-here"
                    }
                }
            ),
            400: openapi.Response(
                description="Validation Error",
                examples={
                    "application/json": {"code": ["This field is required."], "username": ["This field is required."]}
                },
            ),
            401: openapi.Response(
                description="Invalid authentication code",
                examples={
                    "application/json": {"detail": "Something went wrong"}
                }
            ),
        },
    )
    def post(self, request):
        serializer = CodeSubmitSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            code = serializer.validated_data["code"]
            if TwoFactorCode.validate_user_code(user_id=username, submitted_code=code):
                token = RefreshToken.for_user(User(username))
                tokens = {"refresh": str(token), "access": str(token.access_token)}
                return Response(tokens, status=status.HTTP_200_OK)
            return Response("Something whent wrong", status=status.HTTP_401_UNAUTHORIZED)


class User:
    def __init__(self, user_id):
        self.id = user_id
