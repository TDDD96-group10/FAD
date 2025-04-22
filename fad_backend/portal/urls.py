from django.urls import path
from .views import HelloWorldView
from .views import SharePDFView
urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("share_pdf",SharePDFView.as_view(), name = "Share PDF" )
]
