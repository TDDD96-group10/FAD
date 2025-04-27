# pylint: disable=missing-module-docstring, missing-class-docstring, missing-function-docstring
from django.test import TestCase
from ..models.program import Program
from ..models.post import Post
from ..models.user import User
from datetime import datetime, timezone



class UserModelTest(TestCase):
    def setUp(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        self.program = Program.objects.create(name="D-Sek", attributes=self.valid_attributes)
        self.author = User.objects.create(user_id="abcde000", role="admin", program=self.program, attributes={'size': "m"})

    def test_create_post(self):
        post = Post.objects.create(
            author=self.author,
            program=self.program,
            title="Test Post",
            text="This is a test post.",
            send_notifcation=True,
            start_time="2023-10-01T12:00:00Z"
        )

        self.assertEqual(Post.objects.count(), 1)

        retrieved_post = Post.objects.get(id=post.id)
        self.assertEqual(retrieved_post.title, "Test Post")
        self.assertEqual(retrieved_post.text, "This is a test post.")
        self.assertEqual(retrieved_post.author, self.author)
        self.assertEqual(retrieved_post.program, self.program)
        self.assertTrue(retrieved_post.send_notifcation)
        self.assertIsInstance(retrieved_post.created_at, datetime)  # Updated assert
        self.assertIsInstance(retrieved_post.start_time, datetime)  # Updated assert
        self.assertEqual(retrieved_post.start_time, datetime(2023, 10, 1, 12, 0, 0, tzinfo=timezone.utc))
        self.assertEqual(retrieved_post.author.user_id, "abcde000")
        self.assertEqual(retrieved_post.author.role, "admin")
        self.assertEqual(retrieved_post.author.program, self.program)
        self.assertEqual(retrieved_post.program.name, "D-Sek")
        self.assertEqual(retrieved_post.program.attributes, self.valid_attributes)

    def test_create_multiple_posts(self):
        Post.objects.create(
            author=self.author,
            program=self.program,
            title="Test Post 1",
            text="This is a test post 1.",
            send_notifcation=True,
            start_time="2023-10-01T12:00:00Z"
        )
        Post.objects.create(
            author=self.author,
            program=self.program,
            title="Test Post 2",
            text="This is a test post 2.",
            send_notifcation=False,
            start_time="2023-10-02T12:00:00Z"
        )

        self.assertEqual(Post.objects.count(), 2)

