from django.db import models
from .program import Program


class Calender(models.Model):
    link = models.CharField(max_length=300, null=False)
    program = models.OneToOneField(Program, on_delete=models.CASCADE, null=True, blank=True)
