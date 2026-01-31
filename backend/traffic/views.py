from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Traffic
from .serializers import TrafficSerializer
from .permissions import IsAdminOrOfficer

from analytics.utils import send_notification
from accounts.models import User

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


class TrafficViewSet(ModelViewSet):
    queryset = Traffic.objects.all().order_by("-recorded_at")
    serializer_class = TrafficSerializer
    permission_classes = [IsAuthenticated, IsAdminOrOfficer]

    def perform_create(self, serializer):
        traffic = serializer.save()

        # ===============================
        # EMAIL ALERT
        # ===============================
        if traffic.congestion_level >= 4:
            admins = User.objects.filter(role__in=["admin", "officer"])
            emails = [u.email for u in admins if u.email]

            if emails:
                send_notification(
                    subject="High Traffic Congestion Alert",
                    message=f"High congestion detected at {traffic.location}",
                    recipients=emails
                )

        # ===============================
        # BUILD FULL DASHBOARD PAYLOAD
        # ===============================
        total_vehicles = Traffic.objects.count()

        payload = {
            "total_vehicles": total_vehicles,
            "active_signals": 8,
            "incidents": 2,
            "violations": 5,
            "traffic_flow": [
                {"time": "09:00", "count": 30},
                {"time": "10:00", "count": 55},
                {"time": "11:00", "count": 80},
            ],
        }

        # ===============================
        # WEBSOCKET BROADCAST
        # ===============================
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "traffic_updates",
            {
                "type": "send_traffic_update",
                "data": payload,
            }
        )


class TrafficStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_vehicles = Traffic.objects.count()

        return Response({
            "total_vehicles": total_vehicles,
            "active_signals": 8,
            "incidents": 2,
            "violations": 5,
            "traffic_flow": [
                {"time": "09:00", "count": 30},
                {"time": "10:00", "count": 55},
                {"time": "11:00", "count": 80},
            ],
        })
