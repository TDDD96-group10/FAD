from django.urls import path
from .views.login_view import LoginView
from .views.generate_token_view import GenerateTokenView


urlpatterns = [
    path("login", LoginView.as_view(), name="Login View"),
    path("code", GenerateTokenView.as_view(), name="Get token")
]
