from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema

# imports CLASS POST from models
from ..models import Post
from django.utils import timezone
from portal.serializers.textpostserializer import TextPostSerializer


class ShareView(APIView):
    @swagger_auto_schema(
        request_body=TextPostSerializer,
        responses={201: TextPostSerializer()}
    )
    def post(self, request):
        today = timezone.now()

        serializer = TextPostSerializer(data=request.data)
        if serializer.is_valid():
            # Check if the post is for today
            start_time = serializer.validated_data.get('start_time')
            # Can't post things from the past
            if start_time and start_time.date() < today.date():
                return Response({"error": "Post cant already have happend."}, status=status.HTTP_400_BAD_REQUEST)

            # Save the post to the database
            new_post = Post(**serializer.validated_data)
            new_post.save()
        return Response("", status=status.HTTP_201_CREATED)
