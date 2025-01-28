from django.test import TestCase

# Create your tests here.
class DemoAppTestCase(TestCase):
    def test_demo(self):
        """Simple test to ensure the demo app works"""
        self.assertEqual(1 + 1, 2)  # This test should pass