from django.db import models
from .post import Post


class PostPdf(Post):
    file_name = models.CharField(max_length=100)
    pdf = models.FileField(upload_to='pdfs/')
