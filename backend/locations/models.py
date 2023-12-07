from django.db import models
import django
# Create your models here.


class LocationModel(models.Model):
    id = models.CharField(primary_key=True, max_length=60)
    location_name = models.CharField(max_length=100,)
    is_enabled = models.BooleanField(default=True)
    total_faq = models.IntegerField(default=0)
    last_updated = models.DateField(default=django.utils.timezone.now)