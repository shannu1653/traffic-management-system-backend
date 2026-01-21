from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from traffic.models import Traffic
from incidents.models import Incident, Violation

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_traffic = Traffic.objects.count()
        high_congestion = Traffic.objects.filter(congestion_level__gte=4).count()

        total_incidents = Incident.objects.count()
        unresolved_incidents = Incident.objects.filter(is_resolved=False).count()

        total_violations = Violation.objects.count()

        data = {
            "traffic": {
                "total_records": total_traffic,
                "high_congestion": high_congestion,
            },
            "incidents": {
                "total": total_incidents,
                "unresolved": unresolved_incidents,
            },
            "violations": {
                "total": total_violations,
            }
        }

        return Response(data)
