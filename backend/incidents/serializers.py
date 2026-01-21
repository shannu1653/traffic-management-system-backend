from rest_framework import serializers
from .models import Incident, Violation

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = "__all__"

class ViolationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Violation
        fields = "__all__"
