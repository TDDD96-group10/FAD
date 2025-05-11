# pylint: disable=missing-module-docstring, missing-class-docstring, missing-function-docstring
from django.test import TestCase
from django.core.exceptions import ValidationError
from ..models.program import Program
from ..models.post import Post
from ..models.user import User
from ..models.post_link import PostLink



class PostLinkTest(TestCase):
    def setUp(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        self.program = Program.objects.create(name="D-Sek", attributes=self.valid_attributes)
        self.author = User.objects.create(user_id="abcde000", role="admin", program=self.program, attributes={'size': "m"})

    def test_post_valid_link(self):
        post = PostLink.objects.create(
            link="https://example.com",
            author=self.author,
        )
        self.assertEqual(post.link, "https://example.com")
        self.assertEqual(post.author, self.author)

    def test_no_link(self):
        with self.assertRaises(ValidationError):
            post = PostLink(
                link="",
                author=self.author,
            )
            post.full_clean()

    def test_none_link(self):
        with self.assertRaises(ValidationError):
            post = PostLink(
                link=None,
                author=self.author,
            )
            post.full_clean()
    
    def test_no_author(self):
        with self.assertRaises(ValidationError):
            post = PostLink(
                link="https://example.com",
                author=None,
            )
            post.full_clean()
    
    def test_invalid_link(self):
        with self.assertRaises(ValidationError):
            post = PostLink(
                link="invalid_link",
                author=self.author,
            )
            post.full_clean()
    

    