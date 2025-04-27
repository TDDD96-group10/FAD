# pylint: disable=missing-module-docstring, missing-class-docstring, missing-function-docstring
from django.test import TestCase
from django.core.exceptions import *
from django.db import IntegrityError
from ..models.program import Program
from ..models.group import Group
from ..models.user import *


class UserModelTest(TestCase):
    def setUp(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        self.program = Program.objects.create(
            name="D-Sek", attributes=self.valid_attributes
        )
        self.group = Group.objects.create(name="Test Group")

    def test_create_valid_user(self):
        user = User.objects.create(
            user_id="abcde000",
            role="admin",
            program=self.program,
            attributes={"size": "m"},
        )
        self.assertEqual(user.user_id, "abcde000")
        self.assertEqual(user.role, "admin")
        self.assertEqual(user.program, self.program)
        self.assertEqual(user.attributes, {"size": "m"})

    def test_create_multiple_users_and_add_to_program(self):
        User.objects.create(
            user_id="abcde000",
            role="admin",
            program=self.program,
            attributes={"size": "m"},
        )
        User.objects.create(
            user_id="abcde001",
            role="admin",
            program=self.program,
            attributes={"size": "m"},
        )
        User.objects.create(
            user_id="abcde002",
            role="admin",
            program=self.program,
            attributes={"size": "m"},
        )
        self.assertEqual(self.program.users.count(), 3)

    def test_create_duplicate_user_id(self):
        user1 = User(
            user_id="abcde000",
            role="admin",
            program=self.program,
            attributes={"size": "m"},
        )
        user1.full_clean()
        user1.save()
        with self.assertRaises(ValidationError):
            user2 = User(
                user_id="abcde000",
                role="admin",
                program=self.program,
                attributes={"size": "m"},
            )
            user2.full_clean()

    def test_user_id_max_length(self):
        user = User(
            user_id="abcde0000",
            role="admin",
            program=self.program,
            attributes={"size": "m"},
        )
        with self.assertRaises(ValidationError):
            user.full_clean()

    def test_no_user_id(self):
        user = User(
            user_id="",
            role="admin",
            program=self.program,
            attributes={"size": "m"},
        )
        with self.assertRaises(ValidationError):
            user.full_clean()

    def test_none_user_id(self):
        user = User(
            user_id=None,
            role="admin",
            program=self.program,
            attributes={"size": "m"},
        )
        with self.assertRaises(ValidationError):
            user.full_clean()
    
    def test_create_user_with_max_length_role(self):
        user = User(
            user_id="abcde013",
            role="a" * 100,  # Max length role
            program=self.program,
            attributes={"size": "m"},
        )
        user.full_clean()  # Should not raise ValidationError
        user.save()
        self.assertEqual(user.role, "a" * 100)
        
    def test_role_exceed_max_length(self):
        user = User(
            user_id="abcde000",
            role="a" * 101,  # Assuming max_length is 100
            program=self.program,
            attributes={"size": "m"},
        )
        with self.assertRaises(ValidationError):
            user.full_clean()

    def test_no_role(self):
        user = User.objects.create(
            user_id="abcde000",
            role="",
            program=self.program,
            attributes={"size": "m"},
        )
        retrieved_user = User.objects.get(user_id="abcde000")
        self.assertEqual(retrieved_user.role, "")
        self.assertEqual(self.program.users.count(), 1)


    def test_none_role(self):
        user = User(
            user_id="abcde000",
            role=None,
            program=self.program,
            attributes={"size": "m"},
        )
        with self.assertRaises(ValidationError):
            user.full_clean()

    def test_create_user_with_group(self):
        user = User.objects.create(
            user_id="abcde000",
            role="member",
            program=self.program,
            group=self.group,
            attributes={"size": "s"},
        )
        self.assertEqual(user.group, self.group)
        self.assertEqual(self.group.users.count(), 1)

    def test_create_user_without_group(self):
        user = User.objects.create(
            user_id="abcde000",
            role="member",
            program=self.program,
            attributes={"size": "l"},
            group=None,
        )
        self.assertIsNone(user.group)
        self.assertEqual(self.group.users.count(), 0)

    def test_invalid_attributes(self):
        user = User(
            user_id="abcde000",
            role="member",
            program=self.program,
            attributes={"size": "invalid"},  # Invalid size
        )
        with self.assertRaises(ValidationError):
            user.full_clean()

    def test_missing_attributes(self):
        user = User(
            user_id="abcde000",
            role="member",
            program=self.program,
            attributes={},  # Missing required attributes
        )
        with self.assertRaises(ValidationError):
            user.full_clean()

    def test_none_attributes(self):
        user = User(
            user_id="abcde000",
            role="member",
            program=self.program,
            attributes=None,
        )
        with self.assertRaises(ValidationError):
            user.full_clean()


    def test_delete_program_cascades(self):
        user = User.objects.create(
            user_id="abcde000",
            role="member",
            program=self.program,
            attributes={"size": "m"},
        )
        self.program.delete()
        self.assertFalse(User.objects.filter(user_id="abcde000").exists())

    def test_delete_group_cascades(self):
        user = User.objects.create(
            user_id="abcde000",
            role="member",
            program=self.program,
            group=self.group,
            attributes={"size": "m"},
        )
        self.assertTrue(User.objects.filter(user_id="abcde000").exists())
        self.group.delete()
        self.assertFalse(User.objects.filter(user_id="abcde000").exists())



    def test_invalid_attributes(self):
        user = User(
            user_id="abcde012",
            role="member",
            program=self.program,
            attributes={"size": "invalid"},  # Invalid size
        )
        with self.assertRaises(ValidationError):
            user.full_clean()


    def test_invalid_json_attributes(self):
        user = User(
            user_id="abcde014",
            role="member",
            program=self.program,
            attributes=["invalid"],  # Invalid JSON structure
        )
        with self.assertRaises(ValidationError):
            user.full_clean()
