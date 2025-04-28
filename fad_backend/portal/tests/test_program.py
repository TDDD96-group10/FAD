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

    def test_create_multiple_programs(self):
        Program.objects.create(name="Program 1", attributes=self.valid_attributes)
        Program.objects.create(name="Program 2", attributes=self.valid_attributes)
        self.assertEqual(Program.objects.count(), 3)  # 1 from setUp + 2 new programs

    def test_no_name(self):
        program = Program(name="", attributes=self.valid_attributes)
        with self.assertRaises(ValidationError):
            program.full_clean()

    def test_none_name(self):
        program = Program(name=None, attributes=self.valid_attributes)
        with self.assertRaises(ValidationError):
            program.full_clean()

    def test_name_max_length(self):
        long_name = "x" * 200
        program = Program(name=long_name, attributes=self.valid_attributes)
        program.full_clean()
        self.assertEqual(program.name, long_name)

    def test_name_max_length_exceeded(self):
        program = Program(name="x" * 201, attributes=self.valid_attributes)
        with self.assertRaises(ValidationError):
            program.full_clean()

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

    def test_validate_attributes_not_dict(self):
        with self.assertRaises(ValidationError) as context:
            self.program.validate_attributes(["size", "m"])
        self.assertIn("Attributes must be a dictionary.", str(context.exception))

    def test_validate_attributes_empty_dict(self):
        try:
            self.program.validate_attributes({})
        except ValidationError:
            self.fail("validate_attributes() raised ValidationError unexpectedly with empty dict.")

    def test_validate_attributes_multiple_valid_entries(self):
        self.program.attributes = {"size": ["m", "s", "l"], "color": ["red", "blue"]}
        try:
            self.program.validate_attributes({"size": "m", "color": "blue"})
        except ValidationError:
            self.fail("validate_attributes() raised ValidationError unexpectedly with multiple valid entries.")

    def test_validate_attributes_all_option(self):
        self.program.attributes = {"category": "ALL"}
        try:
            self.program.validate_attributes({"category": "any_value"})
        except ValidationError:
            self.fail("validate_attributes() raised ValidationError unexpectedly with 'ALL' option.")

    def test_attributes_default_empty_dict(self):
        program = Program.objects.create(name="Test-Program")
        self.assertEqual(program.attributes, {})
