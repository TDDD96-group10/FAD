from django.urls import path
from .views.hello_world_view import HelloWorldView
from .views.fadder_overview_view import UserListView

urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("users", UserListView.as_view(), name="User List")

]