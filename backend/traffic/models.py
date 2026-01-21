from django.db import models

class Traffic(models.Model):
    location = models.CharField(max_length=255)
    congestion_level = models.IntegerField(help_text="1 = Low, 5 = High")
    vehicle_count = models.IntegerField()
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.location
