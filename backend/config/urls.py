from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
    path("api/", include("traffic.urls")),
    path("api/", include("incidents.urls")),
    path("api/analytics/", include("analytics.urls")),
]
