from django.db import models
from locations.models import LocationModel


class FAQModel(models.Model):
    location = models.ForeignKey(LocationModel, on_delete=models.CASCADE, related_name="location_reference")
    question = models.CharField(max_length=500)
    answer = models.CharField(max_length=500)
    updated_at = models.DateTimeField(auto_now=True)
