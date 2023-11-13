from django.db import models
from users.models import User
import uuid


class BotModel(models.Model):
    AI_TYPE_CHOICES = (("Booking", "Booking"), ("Non Booking", "Non Booking"))
    PROMPT_TYPE_CHOICES = (
        ("Text", "Text"),
        ("Custom Field", "Custom Field"),
        ("Custom Value", "Custom Value"),
    )
    TIME_FORMAT_CHOICES = (("12 H", "12 H"), ("24 H", "24 H"))
    TIME_ZONE_FORMAT_CHOICES = (("Abbreviated", "Abbreviated"), ("Hidden", "Hidden"))
    GPT_MODEL_CHOICES = (("GPT-3", "GPT-3"), ("GPT-3.5", "GPT-3.5"), ("GPT-4", "GPT-4"),("GPT-4-turbo","GPT-4-turbo"))
    TIME_ZONE_CHOICES = (("Contact", "Contact"), ("Location", "Location"))

    user = models.ForeignKey(User, on_delete=models.CASCADE)
   # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ai_type = models.CharField(max_length=100, choices=AI_TYPE_CHOICES)
    bot_name = models.CharField(max_length=100)
    bot_description = models.CharField(max_length=500, blank=True, null=True)
    prompt_type = models.CharField(max_length=20, choices=PROMPT_TYPE_CHOICES)
    prompt = models.CharField(max_length=100)
    intro_message_type = models.CharField(max_length=20, choices=PROMPT_TYPE_CHOICES)
    intro_message = models.CharField(max_length=200)
    open_ai_api_key = models.CharField(max_length=100)
    converstation_limit = models.IntegerField()
    gpt_model = models.CharField(max_length=20, choices=GPT_MODEL_CHOICES)
    time_zone_reference = models.CharField(max_length=10, choices=TIME_ZONE_CHOICES)
    time_zone_format = models.CharField(max_length=15, choices=TIME_ZONE_FORMAT_CHOICES)
    time_format = models.CharField(max_length=10, choices=TIME_FORMAT_CHOICES)
    message_delay = models.IntegerField()


class TagType(models.Model):
   # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bot_id = models.ForeignKey(BotModel, on_delete=models.CASCADE,
                               null=True,
                               related_name="tag_field")
    tag_name = models.CharField(
        max_length=100,
    )
    goal_description = models.TextField(blank=True, null=True)


class CustomFieldType(models.Model):
  #  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bot_id = models.ForeignKey(
        BotModel, on_delete=models.CASCADE,
        null=True,
        related_name="bot_custon_field"
    )
    field_name = models.CharField(max_length=100)
    field_type = models.CharField(
        max_length=50,
    )
    field_description = models.TextField(blank=True, null=True)
    allow_overwrite = models.BooleanField(default=False)


class TriggerWebhook(models.Model):
   # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    TRIGGER_TYPE_CHOICES = (
        ("Once only", "Once only"),
        ("Multiple Times", "Multiple Times"),
    )
    REQUEST_METHOD_CHOICES = (("GET", "GET"), ("POST", "POST"))
    bot_id = models.ForeignKey(
        BotModel, on_delete=models.CASCADE,
        null=True,
        related_name="bot_trigger"
    )
    goal_name = models.CharField(
        max_length=100,
        null=True
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
    #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    triggerwebhook_id = models.ForeignKey(TriggerWebhook, on_delete=models.CASCADE, null=True)
    headers = models.CharField(max_length=100)
    value_of_header = models.CharField(max_length=100, blank=True, null=True)
