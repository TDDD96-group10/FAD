from django.db import models
from .post import Post


class PostLink(Post):
    link = models.URLField(null=False, blank=False)
