from django.db import models
from .program import Program
from .group import Group


class User(models.Model):
    user_id = models.CharField(max_length=8, primary_key=True)
    first_name = models.CharField(max_length=50, default="Förnamn")
    last_name = models.CharField(max_length=50, default="Efternamn")
    phone_number = models.CharField(max_length=20, default="000-000-0000")
    email = models.EmailField(unique=True, null=True)
    role = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='users')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    attributes = models.JSONField()

    def clean(self):
        super().clean()
        if hasattr(self.program, 'validate_attributes'):
            self.program.validate_attributes(self.attributes)
