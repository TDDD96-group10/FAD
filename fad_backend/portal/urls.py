from django.urls import path
from .views import HelloWorldView
from .views import PostLinkView

urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("post-link", PostLinkView.as_view(), name="Post Link"),
]