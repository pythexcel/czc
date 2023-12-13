from django.db import models
from users.models import AgencyModel


class LocationModel(models.Model):
    bot_name = models.CharField(max_length=100, default="Traning bot")
    location_id = models.CharField(max_length=50)
    location_name = models.CharField(max_length=100,)
    is_enabled = models.BooleanField(default=True)
    agency = models.ForeignKey(AgencyModel, on_delete=models.CASCADE)