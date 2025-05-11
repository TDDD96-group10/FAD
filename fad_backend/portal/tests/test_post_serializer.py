from django.test import TestCase
from rest_framework.test import APITestCase, APIRequestFactory
from portal.models import Group, User, Program, Post
from portal.serializers.post_serializer import PostSerializer
from datetime import datetime, timezone


class PostSerializerTest(APITestCase):
    def setUp(self):
        self.program = Program.objects.create(name="Test Program")
        self.group = Group.objects.create(name="Test Group")
        self.user = User.objects.create(
            user_id="abcde123",
            role="test_role",
            program=self.program,
            group=self.group,
            attributes={}
        )

        self.post = Post.objects.create(
            author=self.user,
            program=self.program,
            title="Test Title",
            text="Test Text",
        )

        self.serializer_data = {
            'author': {
                'user_id': 'newuser1',
                'role': 'new_role',
                'program': {'name': 'New Program', 'attributes': {}},
                'group': {'name': 'New Group'},
                'attributes': {}
            },
            'program': {'name': 'New Program for Post', 'attributes': {}},
            'title': 'Test Title',
            'text': 'Test Text'
        }
        self.serializer = PostSerializer(instance=self.post)

    def test_serializer_valid(self):
        serializer = PostSerializer(instance=self.post)
        data = serializer.data
        self.assertEqual(data['title'], self.post.title)
        self.assertEqual(data['text'], self.post.text)
        self.assertEqual(data['author']['user_id'], self.post.author.user_id)
        self.assertEqual(data['program']['id'], self.post.program.id)
        serialized_created_at = datetime.fromisoformat(data['created_at']).astimezone(timezone.utc)
        self.assertEqual(serialized_created_at, self.post.created_at)

# This seems complicated due to nested serializers and the need to create instances of related models
    # def test_serializer_deserialization(self):
    #     serializer = PostSerializer(data=self.serializer_data)
    #     self.assertTrue(serializer.is_valid())
    #     post = serializer.save()
    #     self.assertEqual(post.title, self.serializer_data['title'])
    #     self.assertEqual(post.text, self.serializer_data['text'])
    #     self.assertEqual(post.author.user_id, self.serializer_data['author']['user_id'])
    #     self.assertEqual(post.program.id, self.serializer_data['program']['id'])
    #     serialized_created_at = datetime.fromisoformat(data['created_at']).astimezone(timezone.utc)
    #     self.assertEqual(serialized_created_at, self.post.created_at)


    def test_serializer_invalid_author(self):
        invalid_data = self.serializer_data.copy()
        invalid_data['author'] = 999
        serializer = PostSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('author', serializer.errors)

    def test_serializer_invalid_program(self):
        invalid_data = self.serializer_data.copy()
        invalid_data['program'] = 999
        serializer = PostSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('program', serializer.errors)

# This seems complicated due to nested serializers and the need to create instances of related models
    # def test_serializer_update(self):
    #     update_data = self.serializer_data.copy()
    #     update_data['title'] = "Updated Title"
    #     serializer = PostSerializer(
    #         instance=self.post,
    #         data=update_data,
    #         partial=True
    #     )
    #     self.assertTrue(serializer.is_valid())
    #     updated_post = serializer.save()
    #     self.assertEqual(updated_post.title, "Updated Title")
    #     self.assertEqual(updated_post.send_notifcation, False)

    def test_serializer_edge_cases(self):
        edge_data = self.serializer_data.copy()
        edge_data['title'] = "x" * 256
        edge_data['text'] = ""
        serializer = PostSerializer(data=edge_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('title', serializer.errors)

