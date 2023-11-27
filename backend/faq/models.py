from django.db import models
from users.models import HighLevelModel


class FAQ(models.Model):
    question = models.CharField(max_length=250)
    answer = models.CharField(max_length=250)
    high_level = models.ForeignKey(HighLevelModel, on_delete=models.CASCADE, null=True,
                                  related_name="high_level")
