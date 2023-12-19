from django.db import models
from users.models import User
import uuid
import random


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
    updated_at = models.DateTimeField(auto_now=True)
   # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    ai_type = models.CharField(max_length=100, choices=AI_TYPE_CHOICES)
    bot_name = models.CharField(max_length=100,)
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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.id:
            self.id = ''.join([str(random.randint(0, 9)) for _ in range(16)])


class TagType(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bot = models.ForeignKey(BotModel, on_delete=models.CASCADE,
                               null=True,
                               related_name="bot_tagtype")
    tag_name = models.CharField(
        max_length=100,
    )
    goal_description = models.TextField(blank=True, null=True)


class CustomFieldType(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    FIELD_TYPE_CHOICES = (      
                                ("Text", "Text"),
                                ("Number", "Number"),
                                ("Date", "Date"),
                                ("Contact Full Name", "Contact Full Name"),
                                ("Contact Date of Birth", "Contact Date of Birth"),
                                ("Contact Email", "Contact Email"),
                                ("Contact Address", "Contact Address"),
                                ("Contact Timezone", "Contact Timezone"),
                                ("Phone", "Phone"),
                                ("Email", "Email"),
                                ("Contact Business Name", "Contact Business Name"))
    bot = models.ForeignKey(
        BotModel, on_delete=models.CASCADE,
        null=True,
        related_name="bot_custom"
    )
    field_name = models.CharField(max_length=100)
    field_type = models.CharField(choices=FIELD_TYPE_CHOICES, max_length=50,)
    field_description = models.TextField(blank=True, null=True)
    allow_overwrite = models.BooleanField(default=False)


class TriggerWebhook(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    TRIGGER_TYPE_CHOICES = (
        ("Once Only", "Once Only"),
        ("Multiple Times", "Multiple Times"),
    )
    REQUEST_METHOD_CHOICES = (("GET", "GET"), ("POST", "POST"))

    bot = models.ForeignKey(
        BotModel, on_delete=models.CASCADE,
        null=True,
        related_name="bot_trigger"
    )
    goal_name = models.CharField(
        max_length=100,
        null=True
    )
    triggers = models.CharField(choices=TRIGGER_TYPE_CHOICES, max_length=100)
    webhook_description = models.TextField(
        null=True, blank=True
    )
    webhook_url = models.URLField(blank=True, null=True)
    webhook_request_method = models.CharField(
        max_length=40, choices=REQUEST_METHOD_CHOICES
    )


class Header(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    triggerwebhook = models.ForeignKey(TriggerWebhook,
                                          on_delete=models.CASCADE,
                                          null=True,
                                          related_name="webhook_header")
    headers = models.CharField(max_length=100)
    value_of_header = models.CharField(max_length=100, blank=True, null=True)
