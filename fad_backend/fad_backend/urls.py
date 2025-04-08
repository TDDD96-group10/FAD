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
from django.urls import path, include, re_path
from django.http import JsonResponse
from django.apps import apps
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import (TokenRefreshView,)


def installed_apps_view(request):
    """
    View to return the list of installed apps.
    """
    installed_apps = [app.name for app in apps.get_app_configs()]
    return JsonResponse({"installed_apps": installed_apps})


# Define Schema View
schema_view = get_schema_view(
    openapi.Info(
        title="Fad API",
        default_version='v1',
        description="Fadder protal",
        terms_of_service="https://your-terms.com",
        contact=openapi.Contact(email="your-email@example.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('installed-apps/', installed_apps_view, name='installed_apps'),
    path("health/", include("health_check.urls")),
    path("auth/", include("security.urls")),
    path("portal/",include("portal.urls")),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
]
