from django.test import TestCase
from rest_framework.test import APITestCase
from portal.models import Group
from portal.models.user import User
from portal.models.program import Program
from portal.serializers.group_serializer import GroupSerializer


class GroupSerializerTest(APITestCase):
    def setUp(self):
        self.group = Group.objects.create(name="Test Group")
        self.serializer = GroupSerializer(instance=self.group)

    def test_serializer_fields(self):
        data = self.serializer.data
        expected_fields = {'id', 'name'}
        self.assertEqual(set(data.keys()), expected_fields)
        self.assertEqual(data['name'], "Test Group")
        self.assertEqual(data['id'], self.group.id)

    def test_create_group(self):
        data = {'name': 'New Group'}
        serializer = GroupSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        group = serializer.save()
        self.assertEqual(group.name, 'New Group')
        self.assertIsInstance(group, Group)
    
    def test_update_group(self):
        data = {'name': 'Updated Group'}
        serializer = GroupSerializer(instance=self.group, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        group = serializer.save()
        self.assertEqual(group.name, 'Updated Group')
        self.assertIsInstance(group, Group)


