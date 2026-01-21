from rest_framework.routers import DefaultRouter
from .views import TrafficViewSet

router = DefaultRouter()
router.register("traffic", TrafficViewSet)

urlpatterns = router.urls
