from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from ..models import PostLink
from ..serializers import PostLinkSerializer


class PostLinkView(APIView):
    @swagger_auto_schema(
        request_body=PostLinkSerializer,
        responses={201: PostLinkSerializer()}
    )
    def post(self, request):
        serializer = PostLinkSerializer(data=request.data)
        if serializer.is_valid():
            new_post = PostLink(**serializer.validated_data)
            new_post.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
