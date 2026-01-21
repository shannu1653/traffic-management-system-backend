from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Incident, Violation
from .serializers import IncidentSerializer, ViolationSerializer
from traffic.permissions import IsAdminOrOfficer
from analytics.utils import send_notification
from accounts.models import User

class IncidentViewSet(ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        incident = serializer.save(reported_by=self.request.user)

        admins = User.objects.filter(role__in=["admin", "officer"])
        emails = [user.email for user in admins]

        send_notification(
            subject="New Traffic Incident Reported",
            message=f"Incident at {incident.location}: {incident.incident_type}",
            recipients=emails
        )

class ViolationViewSet(ModelViewSet):
    queryset = Violation.objects.all()
    serializer_class = ViolationSerializer
    permission_classes = [IsAuthenticated, IsAdminOrOfficer]
