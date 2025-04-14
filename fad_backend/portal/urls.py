from django.urls import path
from .views import HelloWorldView, HomeView


urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("home", HomeView.as_view(), name="Home")
]
