# pylint: disable=missing-module-docstring, missing-class-docstring, missing-function-docstring
from django.core.exceptions import ValidationError
from django.test import TestCase
from ..models.program import Program


class ProgramModelTest(TestCase):
    def setUp(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        self.program = Program.objects.create(name="D-Sek", attributes=self.valid_attributes)

    def test_create_object(self):
        self.assertEqual(Program.objects.count(), 1)

        retrieved_program = Program.objects.get(id=self.program.id)
        self.assertEqual(retrieved_program.name, "D-Sek")
        self.assertEqual(retrieved_program.attributes, self.valid_attributes)
        self.assertIsInstance(retrieved_program.attributes, dict)
        self.assertIn("size", retrieved_program.attributes)

    def test_validate_attributes_valid(self):
        try:
            self.program.validate_attributes({"size": "m"})
        except ValidationError:
            self.fail("validate_attributes() raised ValidationError unexpectedly with valid data.")

    def test_validate_attributes_invalid_value(self):
        with self.assertRaises(ValidationError) as context:
            self.program.validate_attributes({"size": "ms"})
        self.assertIn("size", str(context.exception))

    def test_validate_attributes_invalid_key(self):
        with self.assertRaises(ValidationError) as context:
            self.program.validate_attributes({"size_invaild": "ms"})
        self.assertIn("size", str(context.exception))
