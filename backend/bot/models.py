from django.db import models
from users.models import User


# Create your models here.
class BotModel(models.Model):
    AI_TYPE_CHOICES = (("Booking", "Booking"), ("Non Booking", "Non Booking"))
    PROMPT_TYPE_CHOICES = (
        ("Text", "Text"),
        ("Custom Field", "Custom Field"),
        ("Custom Value", "Custom Value"),
    )
    TIME_FORMAT_CHOICES = (("12 H", "12 H"), ("24 H", "24 H"))
    TIME_ZONE_FORMAT_CHOICES = (("Abbreviated", "Abbreviated"), ("Hidden", "Hidden"))
    GPT_MODEL_CHOICES = (("GPT-3", "GPT-3"), ("GPT-3.5", "GPT-3.5"), ("GPT-4", "GPT-4"))
    TIME_ZONE_CHOICES = (("Contact", "Contact"), ("Location", "Location"))

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bot = models.CharField(max_length=100)
    bot_description = models.CharField(max_length=500, blank=True, null=True)
    prompt_type = models.CharField(max_length=20, choices=PROMPT_TYPE_CHOICES)
    prompt = models.CharField(max_length=100)
    intro_message_type = models.CharField(max_length=20, choices=PROMPT_TYPE_CHOICES)
    intro_message = models.CharField(max_length=200)
    ai_key = models.CharField(max_length=100)
    converstation_limit = models.IntegerField()
    time_zone_reference = models.CharField(max_length=10, choices=TIME_ZONE_CHOICES)
    time_zone_format = models.CharField(max_length=15, choices=TIME_ZONE_FORMAT_CHOICES)
    time_format = models.CharField(max_length=10, choices=TIME_FORMAT_CHOICES)
    gpt_model = models.CharField(max_length=20, choices=GPT_MODEL_CHOICES)
    message_delay = models.IntegerField(blank=True, null=True)


class TagType(models.Model):
    bot_id = models.ForeignKey(BotModel, on_delete=models.CASCADE)
    tag_name = models.CharField(
        max_length=100,
    )
    goal_description = models.TextField(blank=True, null=True)


class CustomFieldType(models.Model):
    bot_id = models.ForeignKey(BotModel, on_delete=models.CASCADE)
    field_name = models.CharField(max_length=100)
    field_type = models.CharField(
        max_length=50,
    )
    field_description = models.TextField(blank=True, null=True)
    allow_overwrite = models.BooleanField(default=False)


class TriggerWebhook(models.Model):
    TRIGGER_TYPE_CHOICES = (
        ("Once only", "Once only"),
        ("Multiple Times", "Multiple Times"),
    )
    REQUEST_METHOD_CHOICES = (("GET", "GET"), ("POST", "POST"))
    bot_id = models.ForeignKey(BotModel, on_delete=models.CASCADE)
    goal_name = models.CharField(
        max_length=100,
    )
    triggers = models.CharField(max_length=100)
    webhook_description = models.TextField(
        choices=TRIGGER_TYPE_CHOICES, null=True, blank=True
    )
    webhook_url = models.URLField(blank=True, null=True)
    webhook_request_method = models.CharField(
        max_length=40, choices=REQUEST_METHOD_CHOICES
    )


class Header(models.Model):
    triggerwebhook_id = models.ForeignKey(TriggerWebhook, on_delete=models.CASCADE)
    headers = models.CharField(max_length=100)
    value_of_header = models.CharField(max_length=100, blank=True, null=True)
