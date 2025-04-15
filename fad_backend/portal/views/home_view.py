from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema

# imports CLASS POST from models
from ..models import Post
from django.utils import timezone
from portal.serializers.postSerializer import PostSerializer


class HomeView(APIView):
    @swagger_auto_schema(responses={200: PostSerializer(many=True)})
    def get(self, request):

        # Get todays time
        today = timezone.now()
        # Retrieve all post for today
        r = Post.objects.filter(start_time__gte=today).order_by("start_time")[:2]
        serializer = PostSerializer(r, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
