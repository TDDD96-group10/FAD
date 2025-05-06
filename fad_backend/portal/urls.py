from .views import HomeView
from .views.fadder_home_page import PostListView
from .views import PostLinkView
from .views.fadder_overview_view import UserListView
from .views import HelloWorldView
from .views import UserProfileView
from .views import PDFView

from portal.views.import_users_view import ImportUsersView
from django.urls import path
from .views import HelloWorldView, HomeView,  ShareView, SharePDFView, ProgramView, TagView, CustomMultiTagsView, FilesView, PDFView, UserProfileView

urlpatterns = [
    path("home", HomeView.as_view(), name="Home"),
    path("posts", PostListView.as_view(), name="Posts list"),
    path("post-link", PostLinkView.as_view(), name="Post Link"),
    path("users", UserListView.as_view(), name="User List"),
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("home", HomeView.as_view(), name="Home"),
    path("Share_info", ShareView.as_view(), name="Share_info"),
    path("Share_pdf", SharePDFView.as_view(), name="Share_pdf"),
    path("import-users", ImportUsersView.as_view(), name="import-users"),
    path("add-atribute", ProgramView.as_view(), name="Add atribute"),
    path("fadder-tags", TagView.as_view(), name="Add Tag"),
    path("add-mutivalue-fileds", CustomMultiTagsView.as_view(), name="multi-value"),
    path("files", FilesView.as_view(), name="files"),
    path("pdf_view/<int:pdf_id>", PDFView.as_view(), name="pdf view"),
    path("profile-meta-data", UserProfileView.as_view(), name="profile-meta-data")
]
