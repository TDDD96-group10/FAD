from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..serializers.UsernameSerializer import UsernameSerializer
from ..models.TwoFactorCode import TwoFactorCode
from ..utils.EmailSender import EmailSender


class LoginView(APIView):
    @swagger_auto_schema(
        request_body=UsernameSerializer,
        responses={
            200: openapi.Response(
                description="Success",
                examples={
                    "application/json": {"message": "The code is sent to the email"}
                },
            ),
            400: openapi.Response(
                description="Validation Error",
                examples={
                    "application/json": {"username": ["This field is required."]}
                },
            ),
        },
    )
    def post(self, request):
        serializer = UsernameSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            code = TwoFactorCode.retrieve_code(user_id=username)
            sender = EmailSender("baticbelmin10@gmail.com", "cojz kldx nqwv diwf")
            sender.send_email("belba436@student.liu.se", "T factor code", f"Your code is {code}")
            return Response({"message": "The code is sent to the email"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
