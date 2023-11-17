from django.db import models

# Create your models here.


class LocationModel(models.Model):
    name = models.CharField(max_length=100,)
    location_id = models.CharField(max_length=500, )
    api_key = models.CharField(max_length=100)