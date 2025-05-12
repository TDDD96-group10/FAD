from django.test import TestCase
from rest_framework.test import APITestCase, APIRequestFactory
from portal.models import Group, User, Program, Program
from portal.serializers.program_serializer import ProgramSerializer


class ProgramSerializerTest(APITestCase):
    def setUp(self):
        self.program = Program.objects.create(
            name="Test Program", 
            attributes={
                'key1': ['value1', 'value2'],
                'key2': ['value3', 'value4']
            })
        self.group = Group.objects.create(name="Test Group")
        self.user = User.objects.create(
            user_id="testuser",
            role="test_role",
            program=self.program,
            group=self.group,
            attributes={}
        )
        self.serializer_data = {
            'name': 'Test Program',
            'attributes': {
                'key1': ['value1', 'value2'],
                'key2': ['value3', 'value4']
            }
        }
        self.serializer = ProgramSerializer(instance=self.program)

    def test_serializer_valid(self):
        serializer = ProgramSerializer(data=self.serializer_data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['name'], self.serializer_data['name'])
        self.assertEqual(serializer.validated_data['attributes'], self.serializer_data['attributes'])

    def test_deserialize_create(self):
        serializer = ProgramSerializer(data=self.serializer_data)
        self.assertTrue(serializer.is_valid())
        program = serializer.save()
        self.assertEqual(program.name, self.serializer_data['name'])
        self.assertEqual(program.attributes, self.serializer_data['attributes'])
        self.assertTrue(Program.objects.filter(name=self.serializer_data['name']).exists())
    

    def test_partial_update(self):
        partial_data = {
            'name': 'Partially Updated Program'
        }
        serializer = ProgramSerializer(instance=self.program, data=partial_data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_program = serializer.save()
        self.assertEqual(updated_program.name, partial_data['name'])
        self.assertEqual(updated_program.attributes, self.program.attributes)

    def test_attributes_edge_cases(self):
        data = self.serializer_data.copy()
        data['attributes'] = {}
        serializer = ProgramSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        program = serializer.save()
        self.assertEqual(program.attributes, {})
    
        data = self.serializer_data.copy()
        del data['attributes']
        serializer = ProgramSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        program = serializer.save()
        self.assertEqual(program.attributes, {})
