from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from portal.models import User, Program
from portal.serializers.user_serializer import UserSerializer
from portal.serializers.editable_user_serializer import EditableUserSerializer


class UserProfileView(APIView):
    @swagger_auto_schema(responses={200: UserSerializer()})
    def get(self, request):
        program = Program.objects.first()
        users = User.objects.filter(program=program)[0]
        print("sdsdsadsadsadsadsadsad")
        print(users)
        print("sdsdsadsadsadsadsadsad")
        print("sdsdsadsadsadsadsadsad")
        print("sdsdsadsadsadsadsadsad")
        print("sdsdsadsadsadsadsadsad")
        
        serializer = UserSerializer(users)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=EditableUserSerializer,
        responses={
            200: EditableUserSerializer,
            400: 'Validation Error',
            404: 'User not found'
        },
        operation_description="Update user profile information.",
        operation_summary="Update user fields (first name, last name, phone number, email)"
    )
    def put(self,request):
        user = User.objects.get(user_id="teste112")

        serializer = EditableUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    

