from django.urls import path
from .views.LoginView import LoginView
from .views.GenerateTokenView import GenerateTokenView


urlpatterns = [
    path("login", LoginView.as_view(), name="Login View"),
    path("code", GenerateTokenView.as_view(), name="Get token")
]
