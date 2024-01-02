from django.db import models
from users.models import AgencyModel
from bot.models import BotModel


class LocationModel(models.Model):
    bot_name = models.ForeignKey(BotModel, on_delete=models.CASCADE, null=True)
    location_id = models.CharField(max_length=50)
    location_name = models.CharField(max_length=100,)
    is_enabled = models.BooleanField(default=True)
    agency = models.ForeignKey(AgencyModel, on_delete=models.CASCADE)