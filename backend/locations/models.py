from django.db import models
from users.models import AgencyModel


class LocationModel(models.Model):
    location_id = models.CharField(unique=True, max_length=50)
    location_name = models.CharField(max_length=100,)
    agency = models.ForeignKey(AgencyModel, on_delete=models.CASCADE)