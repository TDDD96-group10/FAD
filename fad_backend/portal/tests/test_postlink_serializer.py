from django.test import TestCase
from rest_framework.test import APITestCase, APIRequestFactory
from portal.models import Group, User, Program, PostLink
from portal.serializers.post_link_serializer import PostLinkSerializer


class PostLinkSerializerTest(APITestCase):
    def setUp(self):
        self.program = Program.objects.create(name="Test Program")
        self.group = Group.objects.create(name="Test Group")
        self.user = User.objects.create(
            user_id="testuser",
            role="test_role",
            program=self.program,
            group=self.group,
            attributes={}
        )
        self.post_link = PostLink.objects.create(
            author=self.user,
            program=self.program,
            link="http://example.com",
            title="Test Title",
            text="Test Text",
            send_notifcation=True
        )
        self.serializer_data = {
            'author': self.user.user_id,
            'program': self.program.id,
            'send_notifcation': True,
            'title': "Test Title",
            'text': "Test Text",
            'link': "http://example.com"
        }
        self.serializer = PostLinkSerializer(instance=self.post_link)

    def test_serializer_valid(self):
        serializer = PostLinkSerializer(instance=self.post_link)
        data = serializer.data
        self.assertEqual(data['link'], self.post_link.link)
        self.assertEqual(data['title'], self.post_link.title)
        self.assertEqual(data['text'], self.post_link.text)
        self.assertEqual(data['author'], self.post_link.author.user_id)
        self.assertEqual(data['program'], self.post_link.program.id)
        self.assertEqual(data['send_notifcation'], self.post_link.send_notifcation)

    def test_serializer_deserialization(self):
        serializer = PostLinkSerializer(data=self.serializer_data)
        self.assertTrue(serializer.is_valid())
        post_link = serializer.save()
        self.assertEqual(post_link.link, self.serializer_data['link'])
        self.assertEqual(post_link.title, self.serializer_data['title'])
        self.assertEqual(post_link.text, self.serializer_data['text'])
        self.assertEqual(post_link.author.user_id, self.serializer_data['author'])
        self.assertEqual(post_link.program.id, self.serializer_data['program'])
        self.assertEqual(post_link.send_notifcation, self.serializer_data['send_notifcation'])

    def test_serializer_invalid_link(self):
        invalid_data = self.serializer_data.copy()
        invalid_data['link'] = 'not-a-url'
        serializer = PostLinkSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('link', serializer.errors)

    def test_serializer_invalid_author(self):
        invalid_data = self.serializer_data.copy()
        invalid_data['author'] = 999
        serializer = PostLinkSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('author', serializer.errors)

    def test_serializer_invalid_program(self):
        invalid_data = self.serializer_data.copy()
        invalid_data['program'] = 999
        serializer = PostLinkSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('program', serializer.errors)

    def test_serializer_missing_required_fields(self):
        invalid_data = self.serializer_data.copy()
        del invalid_data['link']
        serializer = PostLinkSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('link', serializer.errors)

    def test_serializer_update(self):
        update_data = self.serializer_data.copy()
        update_data['title'] = "Updated Title"
        update_data['send_notifcation'] = False
        serializer = PostLinkSerializer(
            instance=self.post_link,
            data=update_data,
            partial=True
        )
        self.assertTrue(serializer.is_valid())
        updated_post_link = serializer.save()
        self.assertEqual(updated_post_link.title, "Updated Title")
        self.assertEqual(updated_post_link.send_notifcation, False)
        self.assertEqual(updated_post_link.link, self.post_link.link)

    def test_serializer_edge_cases(self):
        edge_data = self.serializer_data.copy()
        edge_data['title'] = "x" * 256
        edge_data['text'] = ""
        serializer = PostLinkSerializer(data=edge_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('title', serializer.errors)

    def test_serializer_no_notification(self):
        no_notif_data = self.serializer_data.copy()
        no_notif_data['send_notifcation'] = False
        serializer = PostLinkSerializer(data=no_notif_data)
        self.assertTrue(serializer.is_valid())
        post_link = serializer.save()
        self.assertFalse(post_link.send_notifcation)