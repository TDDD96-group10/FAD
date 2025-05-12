# pylint: disable=missing-module-docstring, missing-class-docstring, missing-function-docstring
from django.test import TestCase
from ..models.group import Group
from ..models.user import User
from ..models.program import Program


class GroupModelTest(TestCase):

    def test_create_group(self):
        Group.objects.create(name="Test")

    def test_create_group_and_add_user(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        group = Group.objects.create(name="Test")
        program = Program.objects.create(name="D-Sek", attributes=self.valid_attributes)
        User.objects.create(user_id="belba436", role="admin", program=program, attributes={'size': "m"}, group=group)

        self.assertEqual(len(group.users.all()), 1)

    def test_create_group_and_add_users(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        group = Group.objects.create(name="Test")
        program = Program.objects.create(name="D-Sek", attributes=self.valid_attributes)
        User.objects.create(user_id="belba436", role="admin", program=program, attributes={'size': "m"}, group=group)
        User.objects.create(user_id="belba437", role="admin", program=program, attributes={'size': "m"}, group=group)
        User.objects.create(user_id="belba438", role="admin", program=program, attributes={'size': "m"}, group=group)

        self.assertEqual(len(group.users.all()), 3)

    def test_max_length_name(self):
        name = "a" * 200
        group = Group.objects.create(name=name, atrributes=self.valid_attributes)
        self.assertEqual(group.name, name)
        self.assertEqual(len(group.name), 200)

    def test_max_length_name_exceed(self):
        name = "a" * 201
        with self.assertRaises(Exception):
            Group.objects.create(name=name, atrributes=self.valid_attributes)