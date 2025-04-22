from django.urls import path
from .views import HelloWorldView, HomeView, ShareView


urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("home", HomeView.as_view(), name="Home"),
    path("Share_info", ShareView.as_view(), name="Share_info")
]
