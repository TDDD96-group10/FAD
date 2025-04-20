from django.urls import path
from .views.hello_world_view import HelloWorldView
from .views.fadder_home_page import PostListView




urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("posts", PostListView.as_view(), name="Posts list")
]
