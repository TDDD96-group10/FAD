# pylint: disable=missing-module-docstring, missing-class-docstring, missing-function-docstring
from django.test import TestCase
from django.core.exceptions import ValidationError
from ..models.program import Program
from ..models.group import Group
from ..models.user import User
from ..models.calender import Calender


class CalenderTest(TestCase):
    def setUp(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        self.program = Program.objects.create(
            name="D-Sek", attributes=self.valid_attributes
        )
        self.group = Group.objects.create(name="Test Group")

    def test_create_valid_calendar(self):
        calendar = Calender.objects.create(
            link="https://example.com/calendar", program=self.program
        )
        self.assertEqual(calendar.link, "https://example.com/calendar")
        self.assertEqual(calendar.program, self.program)

    def test_create_calendar_without_program(self):
        calendar = Calender.objects.create(link="https://example.com/calendar")
        self.assertEqual(calendar.link, "https://example.com/calendar")
        self.assertIsNone(calendar.program)
    
    def test_max_length_link(self):
        link = "a" * 300
        calendar = Calender.objects.create(link=link)
        self.assertEqual(calendar.link, link)

    def test_link_exceeds_max_length(self):
        link = "a" * 301
        with self.assertRaises(ValidationError):
            calendar = Calender(link=link)
            calendar.full_clean()

    def test_no_link(self):
        with self.assertRaises(ValidationError):
            calendar = Calender(link="")
            calendar.full_clean()

    def test_none_link(self):
        with self.assertRaises(ValidationError):
            calendar = Calender(link=None)
            calendar.full_clean()