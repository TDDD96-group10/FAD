from django.db import models
from .user import User
from .program import Program


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='posts', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    send_notifcation = models.BooleanField(default=False)
    title = models.CharField(max_length=200, null=False)
    text = models.TextField()
    start_time = models.DateTimeField(null=True, blank=True)

