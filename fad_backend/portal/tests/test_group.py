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
        program = Program.objects.create(name="D-Sek", atributes=self.valid_attributes)
        User.objects.create(user_id="belba436", role="admin", program=program, atributes={'size': "m"},group=group)

        self.assertEqual(len(group.users.all()), 1)

    def test_create_group_and_add_user(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        group = Group.objects.create(name="Test")
        program = Program.objects.create(name="D-Sek", atributes=self.valid_attributes)
        User.objects.create(user_id="belba436", role="admin", program=program, atributes={'size': "m"},group=group)
        User.objects.create(user_id="belba437", role="admin", program=program, atributes={'size': "m"},group=group)
        User.objects.create(user_id="belba438", role="admin", program=program, atributes={'size': "m"},group=group)

        self.assertEqual(len(group.users.all()), 3)


    



