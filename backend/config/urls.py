from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # ACCOUNTS (LOGIN / REGISTER / PROFILE)
    path("api/", include("accounts.urls")),

    # OTHER MODULES
    path("api/traffic/", include("traffic.urls")),
    path("api/", include("incidents.urls")),
    path("api/analytics/", include("analytics.urls")),
]
