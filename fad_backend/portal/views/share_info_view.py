from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema

from ..models import Post, User, Program
from django.utils import timezone
from portal.serializers.textpostserializer import TextPostSerializer


class ShareView(APIView):
    @swagger_auto_schema(
        request_body=TextPostSerializer,
        responses={201: TextPostSerializer()}
    )
    def post(self, request):
        current_Datetime = timezone.now()
        serializer = TextPostSerializer(data=request.data)
        print(f"{request.data} här kommer datan")
        print("we are Vaild")
        if serializer.is_valid():
            start_time = serializer.validated_data.get('start_time')
            print("We are vaild")
            if start_time and start_time.date() < current_Datetime.date():
                return Response({"error": "Post cant already have happend."}, status=status.HTTP_400_BAD_REQUEST)

            author = User.objects.first()
            program = Program.objects.first()
            new_post = Post(**serializer.validated_data)
            new_post.author = author
            new_post.program = program
            new_post.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print(f"We are not vaild{serializer.error_messages}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            
