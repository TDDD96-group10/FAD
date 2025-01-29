"""
URL configuration for fad_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.apps import apps

def installed_apps_view(request):
    """
    View to return the list of installed apps.
    """
    installed_apps = [app.name for app in apps.get_app_configs()]
    return JsonResponse({"installed_apps": installed_apps})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('installed-apps/', installed_apps_view, name='installed_apps'),
    path('installed-apps2/', installed_apps_view, name='installed_apps'),
    path('installed-apps123123122/', installed_apps_view, name='installed_apps'),
    
]
