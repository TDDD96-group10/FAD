from .views import HomeView
from .views.fadder_home_page import PostListView
from .views import PostLinkView
from .views.fadder_overview_view import UserListView
from .views import HelloWorldView
from .views import UserProfileView
from .views import PDFView
from portal.views.import_users_view import ImportUsersView
from django.urls import path
from .views import HelloWorldView, HomeView, ShareView, SharePDFView


urlpatterns = [
    path("home", HomeView.as_view(), name="Home"),
    path("posts", PostListView.as_view(), name="Posts list"),
    path("post-link", PostLinkView.as_view(), name="Post Link"),
    path("users", UserListView.as_view(), name="User List"),
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("home", HomeView.as_view(), name="Home"),
    path("Share_info", ShareView.as_view(), name="Share_info"),
    path("Share_pdf", SharePDFView.as_view(), name="Share_pdf")
]
