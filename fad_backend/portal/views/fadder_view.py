from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from portal.models import User, Program


class FadderView(APIView):

    def post(self, request, liu_id):
        program = Program.objects.first()
        User.objects.create(
        user_id=liu_id,
        program=program,
        email=f"{liu_id}@student.liu.se",
        attributes={}
        )
        return Response({"message": "User created"}, status=status.HTTP_201_CREATED)