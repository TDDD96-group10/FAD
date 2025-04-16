from django.urls import path
from .views import HelloWorldView
from portal.views.import_users_view import ImportUsersView
from portal.views.import_users_view import CSVUploadView



urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("import-users", ImportUsersView.as_view(), name="import-users"),
    path("upload-csv", CSVUploadView.as_view(), name="upload-csv")
]
