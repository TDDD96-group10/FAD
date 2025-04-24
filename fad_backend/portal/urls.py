from django.urls import path
from .views import HelloWorldView
from portal.views.import_users_view import ImportUsersView

urlpatterns = [
    path("hello-world", HelloWorldView.as_view(), name="Hello World"),
    path("import-users", ImportUsersView.as_view(), name="import-users")
   
]
