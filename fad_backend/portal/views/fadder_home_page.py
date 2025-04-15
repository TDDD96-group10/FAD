from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from rest_framework import serializers

from portal.models import Post

from portal.serializers.PostSerializer import PostSerializer

# # Serializer for the User model, including only id and username
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'  # Or specify fields like ['id', 'name'] if known
#         ref_name = 'PostUserSerializer'  # Explicit ref_name to avoid conflicts

# # Serializer for the Program model, assuming it has a name field
# class ProgramSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Program
#         fields = '__all__'  # Or specify fields like ['id', 'name'] if known
#         ref_name = 'PostProgramSerializer'  # Explicit ref_name to avoid conflicts

# # Serializer for the Post model, including nested serializers for author and program
# class PostSerializer(serializers.ModelSerializer):
#     author = UserSerializer()
#     program = ProgramSerializer()
#     class Meta:
#         model = Post
#         fields = ['id', 'title', 'text', 'created_at', 'author', 'program']
#         ref_name = 'PostSerializer'  # Explicit ref_name for clarity



# API view to retrieve all posts, ordered by most recent first
class PostListView(APIView):
    @swagger_auto_schema(responses={200: PostSerializer(many=True)})
    def get(self, request):
        # Query all posts, ordered by created_at in descending order
        posts = Post.objects.order_by('-created_at')
        # Serialize the posts queryset, indicating it's a list with many=True
        serializer = PostSerializer(posts, many=True)
        # Return the serialized data as a JSON response
        return Response(serializer.data, status=status.HTTP_200_OK)


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi

# from rest_framework import serializers

# from portal.models import User, Program, Group




# class ProgramSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Program
#         fields = '__all__'  # Or specify fields like ['id', 'name'] if known



# class GroupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Group
#         fields = '__all__'  # Or specify fields like ['id', 'name'] if known


# class UserModelSerializer(serializers.ModelSerializer):
#     program = ProgramSerializer(read_only=True)
#     group = GroupSerializer(read_only=True, allow_null=True)

#     class Meta:
#         model = User
#         fields = ['user_id', 'role', 'program', 'group', 'attributes'] # TODO: Add diet, shirt_size etc

# class PostListView(APIView):
#     @swagger_auto_schema(responses={200: UserModelSerializer(many=True)})
#     def get(self, request):
#         users = User.objects.all()  # Fetch all users from the database
#         serializer = UserModelSerializer(users, many=True)  # Serialize the queryset
#         return Response(serializer.data, status=status.HTTP_200_OK)
        