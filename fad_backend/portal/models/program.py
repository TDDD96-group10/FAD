from django.db import models
from django.core.exceptions import ValidationError


class Program(models.Model):
    name = models.CharField(max_length=200, null=False)
    atributes = models.JSONField(default=dict)

    def validate_attributes(self, value):
        if not isinstance(value, dict):
            raise ValidationError("Attributes must be a dictionary.")

        for key, val in value.items():
            if key not in self.atributes:
                raise ValidationError(f"Invalid attribute key: {key}")
            if val not in self.atributes[key] or self.atributes[key] == "ALL":
                raise ValidationError(f"Invalid value '{val}' for key '{key}'. Allowed: {self.atributes[key]}")
