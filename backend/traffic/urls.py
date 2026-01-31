from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrafficViewSet, TrafficStatsView

router = DefaultRouter()
router.register("", TrafficViewSet, basename="traffic")

urlpatterns = [
    path("stats/", TrafficStatsView.as_view(), name="traffic-stats"),
    path("", include(router.urls)),
]
