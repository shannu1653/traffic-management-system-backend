from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Traffic
from .serializers import TrafficSerializer
from .permissions import IsAdminOrOfficer
from analytics.utils import send_notification
from accounts.models import User

class TrafficViewSet(ModelViewSet):
    queryset = Traffic.objects.all()
    serializer_class = TrafficSerializer
    permission_classes = [IsAuthenticated, IsAdminOrOfficer]

    def perform_create(self, serializer):
        traffic = serializer.save()

        if traffic.congestion_level >= 4:
            admins = User.objects.filter(role__in=["admin", "officer"])
            emails = [user.email for user in admins]

            send_notification(
                subject="High Traffic Congestion Alert",
                message=f"High congestion detected at {traffic.location}",
                recipients=emails
            )
