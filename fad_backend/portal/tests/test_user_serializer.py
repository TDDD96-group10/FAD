from django.test import TestCase
from rest_framework.test import APITestCase, APIRequestFactory
from portal.models import Group, User, Program, Program
from portal.serializers.user_serializer import UserSerializer
from django.core.exceptions import ValidationError


class UserSerializerTest(APITestCase):
    def setUp(self):
        # Create a program with attribute validation rules
        self.program = Program.objects.create(
            name="Test Program",
            attributes={
                'key1': ['value1', 'value2'],
                'key2': ['value3', 'value4']
            }
        )
        # Create a group
        self.group = Group.objects.create(name="Test Group")
        # Create a user linked to the program and group
        self.user = User.objects.create(
            user_id="abcde123",
            role="test_role",
            program=self.program,
            group=self.group,
            attributes={'key1': 'value1'}
        )

    def test_serialize_user(self):
        serializer = UserSerializer(instance=self.user)
        data = serializer.data
        self.assertEqual(data['user_id'], "abcde123")
        self.assertEqual(data['role'], "test_role")
        self.assertEqual(data['program']['name'], "Test Program")
        self.assertEqual(data['group']['name'], "Test Group")
        self.assertEqual(data['attributes'], {'key1': 'value1'})
    
    def test_serialize_user_with_invalid_program(self):
        self.user.program = None
        serializer = UserSerializer(instance=self.user)
        data = serializer.data
        self.assertIsNone(data['program'])

    def test_serialize_user_with_invalid_group(self):
        self.user.group = None
        serializer = UserSerializer(instance=self.user)
        data = serializer.data
        self.assertIsNone(data['group'])