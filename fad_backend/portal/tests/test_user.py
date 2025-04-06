# pylint: disable=missing-module-docstring, missing-class-docstring, missing-function-docstring
from django.test import TestCase
from ..models.program import Program
from ..models.user import User


class UserModelTest(TestCase):
    def setUp(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        self.program = Program.objects.create(name="D-Sek", attributes=self.valid_attributes)

    def test_create_user(self):
        User.objects.create(user_id="belba436", role="admin", program=self.program, attributes={'size': "m"})

    def test_create_multiple_users_and_add_to_program(self):
        User.objects.create(user_id="belba436", role="admin", program=self.program, attributes={'size': "m"})
        User.objects.create(user_id="belba437", role="admin", program=self.program, attributes={'size': "m"})
        User.objects.create(user_id="belba438", role="admin", program=self.program, attributes={'size': "m"})

        self.assertEqual(len(self.program.users.all()), 3)
