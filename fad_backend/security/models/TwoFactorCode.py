from django.db import models
from django.utils import timezone
from datetime import timedelta
import random


class TwoFactorCode(models.Model):
    user_id = models.CharField(max_length=8, primary_key=True)
    code = models.CharField(max_length=6)
    expires_at = models.DateTimeField(default=timezone.now)
    is_used = models.BooleanField(default=True)

    @classmethod
    def validate_user_code(cls, user_id, submitted_code):
        instance = cls.objects.filter(user_id=user_id).first()
        return instance and instance.is_corret_code(submited_code=submitted_code)

    @classmethod
    def retrieve_code(cls, user_id):
        instance, _ = cls.objects.get_or_create(user_id=user_id)
        return instance.genreate_code()

    def is_corret_code(self, submited_code):
        if self.expires_at > timezone.now() and submited_code == self.code and not self.is_used:
            self.is_used = True
            self.save()
            return True
        return False

    def genreate_code(self):
        self.code = str(random.randint(100000, 999999))
        self.is_used = False
        self.expires_at = timezone.now() + timedelta(minutes=5)
        self.save()
        return self.code
