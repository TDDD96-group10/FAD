from django.urls import path
from .views import HelloWorldView, HomeView, ShareView, SharePDFView


urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("home", HomeView.as_view(), name="Home"),
    path("Share_info", ShareView.as_view(), name="Share_info"),
    path("Share_pdf", SharePDFView.as_view(), name="Share_pdf")
]
