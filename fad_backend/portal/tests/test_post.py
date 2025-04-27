# pylint: disable=missing-module-docstring, missing-class-docstring, missing-function-docstring
from django.test import TestCase
from django.core.exceptions import *
from ..models.program import Program
from ..models.post import Post
from ..models.user import User
from datetime import datetime, timezone



class UserModelTest(TestCase):
    def setUp(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        self.program = Program.objects.create(name="D-Sek", attributes=self.valid_attributes)
        self.author = User.objects.create(user_id="abcde000", role="admin", program=self.program, attributes={'size': "m"})

    def test_create_valid_post(self):
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
        Post.objects.create(
            author=self.author,
            program=self.program,
            title="Test Post 3",
            text="This is a test post 3.",
            send_notifcation=True,
            start_time="2023-10-03T12:00:00Z"
        )

        self.assertEqual(Post.objects.count(), 3)

    def test_create_post_without_program(self):
        post = Post.objects.create(
            author=self.author,
            title="No Program Post",
            text="This post has no program.",
            send_notifcation=False,
            start_time=None
        )

        self.assertEqual(Post.objects.count(), 1)
        retrieved_post = Post.objects.get(id=post.id)
        self.assertEqual(retrieved_post.title, "No Program Post")
        self.assertEqual(retrieved_post.program, None)
        self.assertFalse(retrieved_post.send_notifcation)
        self.assertIsNone(retrieved_post.start_time)

    def test_create_post_with_empty_title(self):
        post = Post(author=self.author, title="", text="Invalid post")
        with self.assertRaises(ValidationError):
            post.full_clean()

    def test_create_post_with_long_title(self):
        long_title = "x" * 201
        post = Post(author=self.author, title=long_title, text="Invalid post")
        with self.assertRaises(ValidationError):
            post.full_clean()
    
    def test_create_post_with_maximum_length_title(self):
        max_length_title = "x" * 200
        post = Post(author=self.author, title=max_length_title, text="Valid post")
        post.full_clean()
        self.assertEqual(post.title, max_length_title)

    def test_create_post_with_empty_title(self):
        post = Post(author=self.author, title="", text="Invalid post")
        with self.assertRaises(ValidationError):
            post.full_clean()
    
    def test_create_post_with_none_title(self):
        post = Post(author=self.author, title=None, text="Invalid post")
        with self.assertRaises(ValidationError):
            post.full_clean()

    def test_create_post_without_text(self):
        post = Post.objects.create(
            author=self.author,
            title="No Text Post",
            text="",
            send_notifcation=True
        )

        self.assertEqual(Post.objects.count(), 1)
        retrieved_post = Post.objects.get(id=post.id)
        self.assertEqual(retrieved_post.text, "")
    
    def test_create_post_with_none_text(self):
        post = Post(author=self.author, title="None Text Post", text=None)
        with self.assertRaises(ValidationError):
            post.full_clean()


    def test_post_auto_created_at(self):
        before_creation = datetime.now(timezone.utc)
        post = Post.objects.create(
            author=self.author,
            title="Test Post",
            text="Testing created_at"
        )
        after_creation = datetime.now(timezone.utc)

        self.assertIsInstance(post.created_at, datetime)
        self.assertTrue(before_creation <= post.created_at <= after_creation)

    def test_post_send_notification_default(self):
        post = Post.objects.create(
            author=self.author,
            title="Test Post",
            text="Testing send_notification default"
        )
        self.assertFalse(post.send_notifcation)

    def test_post_send_notification_true(self):
        post = Post.objects.create(
            author=self.author,
            title="Test Post",
            text="Testing send_notification true",
            send_notifcation=True
        )
        self.assertTrue(post.send_notifcation)
    
    def test_post_start_time_default(self):
        post = Post.objects.create(
            author=self.author,
            title="Test Post",
            text="Testing start_time default"
        )
        self.assertIsNone(post.start_time)

    def test_post_start_time_not_none(self):
        post = Post.objects.create(
            author=self.author,
            title="Test Post",
            text="Testing start_time not None",
            start_time="2023-10-01T12:00:00Z"
        )
        retrieved_post = Post.objects.get(id=post.id)
        self.assertIsInstance(retrieved_post.start_time, datetime)
        self.assertEqual(retrieved_post.start_time, datetime(2023, 10, 1, 12, 0, 0, tzinfo=timezone.utc))

    def test_post_cascade_delete_author(self):
        post = Post.objects.create(
            author=self.author,
            title="Test Post",
            text="This post will be deleted"
        )
        self.assertEqual(Post.objects.count(), 1)
        self.author.delete()
        self.assertEqual(Post.objects.count(), 0)

    def test_post_cascade_delete_program(self):
        post = Post.objects.create(
            author=self.author,
            program=self.program,
            title="Test Post",
            text="This post will be deleted"
        )
        self.assertEqual(Post.objects.count(), 1)
        self.program.delete()
        self.assertEqual(Post.objects.count(), 0)

    def test_post_related_name(self):
        Post.objects.create(
            author=self.author,
            title="Post 1",
            text="First post"
        )
        Post.objects.create(
            author=self.author,
            title="Post 2",
            text="Second post"
        )
        self.assertEqual(self.author.posts.count(), 2)
        self.assertEqual(self.program.posts.count(), 0)
