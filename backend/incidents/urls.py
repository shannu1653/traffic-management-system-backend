from rest_framework.routers import DefaultRouter
from .views import IncidentViewSet, ViolationViewSet

router = DefaultRouter()
router.register("incidents", IncidentViewSet)
router.register("violations", ViolationViewSet)

urlpatterns = router.urls
