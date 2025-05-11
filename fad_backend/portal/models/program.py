from django.db import models
from django.core.exceptions import ValidationError


class Program(models.Model):
    name = models.CharField(max_length=200, null=False)
    attributes = models.JSONField(default=dict)

    def validate_attributes(self, value):
        if not isinstance(value, dict):
            raise ValidationError("Attributes must be a dictionary.")

        for key, val in value.items():
            if key not in self.attributes:
                raise ValidationError(f"Invalid attribute key: {key}")
            if "list" in key:
                if not isinstance(val, list):
                    raise ValidationError(f"The value for key '{key}' must be a list.")
                if "ALL" in self.attributes[key]:
                    return
                for value in val:
                    if value not in self.attributes[key]:
                        raise ValidationError(f"Invalid value '{val}' for key '{key}'. Allowed: {self.attributes[key]}")
            elif val not in self.attributes[key] or self.attributes[key] == "ALL":
                raise ValidationError(f"Invalid value '{val}' for key '{key}'. Allowed: {self.attributes[key]}")


    def get_tags_name(self):
        return ["Liu-ID","Namn", "Telefon", "Orbi-mail", "Grupper"] + self.getFreeTextags() + self.getMultivalueTagsNames()


    def getFreeTextags(self):
        free_text = self.attributes.get("custom_free_text")
        if free_text is None:
            return []
        return free_text
    
    def getMultivalueTagsNames(self):
        multivalueTagsNames = []
        for key, value in self.attributes.items():
            if isinstance(value,list) and key != "tags" and key != "custom_free_text": 
                multivalueTagsNames.append(key)
        return multivalueTagsNames
      
    def getMultivalueTags(self):
        multivalueTags = {}
        for key, value in self.attributes.items():
            if isinstance(value,list) and key != "tags" and key != "custom_free_text": 
                multivalueTags[key] = value
        return multivalueTags


