from django.test import TestCase
from ..models.program import Program
from ..models.user import User


class UserModelTest(TestCase):
    def setUp(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        self.program = Program.objects.create(name="D-Sek", atributes=self.valid_attributes)

    def test_create_user(self):
        User.objects.create(user_id="belba436", role="admin", program=self.program, atributes={'size': "m"})

    def test_create_multiple_users_and_add_to_program(self):
        user1 = User.objects.create(user_id="belba436", role="admin", program=self.program, atributes={'size': "m"})
        user2 = User.objects.create(user_id="belba437", role="admin", program=self.program, atributes={'size': "m"})
        user3 = User.objects.create(user_id="belba438", role="admin", program=self.program, atributes={'size': "m"})

        self.assertEqual(len(self.program.users.all()), 3)





