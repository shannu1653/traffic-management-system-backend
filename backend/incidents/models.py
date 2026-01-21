from django.db import models
from accounts.models import User

class Incident(models.Model):
    INCIDENT_TYPE = (
        ("accident", "Accident"),
        ("breakdown", "Vehicle Breakdown"),
        ("signal_failure", "Signal Failure"),
    )

    location = models.CharField(max_length=255)
    incident_type = models.CharField(max_length=50, choices=INCIDENT_TYPE)
    description = models.TextField()
    reported_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    reported_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.incident_type} at {self.location}"
class Violation(models.Model):
    VIOLATION_TYPE = (
        ("signal_jump", "Signal Jump"),
        ("over_speed", "Over Speeding"),
        ("no_helmet", "No Helmet"),
    )

    vehicle_number = models.CharField(max_length=20)
    violation_type = models.CharField(max_length=50, choices=VIOLATION_TYPE)
    location = models.CharField(max_length=255)
    fine_amount = models.DecimalField(max_digits=8, decimal_places=2)
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.vehicle_number
