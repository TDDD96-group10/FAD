from django.urls import path
from .views import HelloWorldView, HomeView
from .views.hello_world_view import HelloWorldView
from .views.fadder_home_page import PostListView

from .views import PostLinkView

urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("home", HomeView.as_view(), name="Home"),
    path("posts", PostListView.as_view(), name="Posts list")
    path("post-link", PostLinkView.as_view(), name="Post Link"),
]
