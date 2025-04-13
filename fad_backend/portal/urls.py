from django.urls import path
from .views import HelloWorldView

urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
]
