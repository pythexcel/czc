from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from django.contrib.postgres.fields import JSONField
# Create your models here.

class User(AbstractUser):

    email =  models.EmailField(('email_address'), unique=True, max_length=200)
    remember_me = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)
    
    objects = UserManager()

    def save(self, *args, **kwargs):
        self.username = self.email
        super().save(*args, **kwargs)
    

class Bot(models.Model):

    AI_TYPE_CHOICES = (
        ('Booking', 'Booking'),
        ('Non Booking', 'Non Booking')
    )

    PROMPT_TYPE_CHOICES = (
        ('Text', 'Text'),
        ('Custom Field', 'Custom Field'),
        ('Custom Value', 'Custom Value')
    )
    
    TIME_ZONE_CHOICES = (
        ('Contact', 'Contact'),
        ('Location', 'Location')
    )

    TIME_ZONE_FORMAT_CHOICES = (
        ('Abbreviated', 'Abbreviated'), 
        ('Hidden', 'Hidden')
    )

    TIME_FORMAT_CHOICES = (
        ('12 H', '12 H'), 
        ('24 H', '24 H')
    )

    GPT_MODEL_CHOICES = (
        ('GPT-3', 'GPT-3'),
        ('GPT-3.5', 'GPT-3.5'),
        ('GPT-4', 'GPT-4')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ai_type = models.CharField(max_length=20, choices=AI_TYPE_CHOICES)
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
    add_goal = models.JSONField(default=dict)

    def __str__(self):
        return self.bot


class Goal(models.Model):
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE)
    goal_name = models.CharField(max_length=100)
    goal_description = models.CharField(max_length=500)

class CustomField(models.Model):
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE)
    field_name = models.CharField(max_length=100)
    field_type = models.CharField(max_length=50)
    field_description = models.CharField(max_length=500)
    allow_overwrite = models.BooleanField(default=False)

class Webhook(models.Model):
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE)
    webhook_name = models.CharField(max_length=100)
    trigger = models.CharField(max_length=100)
    webhook_url = models.URLField()
    webhook_description = models.CharField(max_length=500)
    headers = models.JSONField(default=dict)
    webhook_request_method = models.CharField(max_length=10)



# class Bot(models.Model):

#     AI_TYPE_CHOICES = (
#         ('Booking', 'Booking'),
#         ('Non Booking', 'Non Booking')
#     )

#     PROMPT_TYPE_CHOICES = (
#         ('Text', 'Text'),
#         ('Custom Field', 'Custom Field'),
#         ('Custom Value', 'Custom Value')
#     )

#     TIME_ZONE_CHOICES = (
#         ('Contact', 'Contact'),
#         ('Location', 'Location')
#     )

#     TIME_ZONE_FORMAT_CHOICES = (
#         ('Abbreviated', 'Abbreviated'), 
#         ('Hidden', 'Hidden')
#     )

#     TIME_FORMAT_CHOICES = (
#         ('12 H', '12 H'), 
#         ('24 H', '24 H')
#     )

#     GPT_MODEL_CHOICES = (
#         ('GPT-3', 'GPT-3'),
#         ('GPT-3.5', 'GPT-3.5'),
#         ('GPT-4', 'GPT-4')
#     )

#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     ai_type = models.CharField(max_length=20, choices=AI_TYPE_CHOICES)
#     bot = models.CharField(max_length=100, unique=True)
#     bot_description = models.CharField(max_length=500, blank=True, null=True)
#     prompt_type = models.CharField(max_length=20, choices=PROMPT_TYPE_CHOICES)
#     prompt = models.CharField(max_length=100)
#     intro_message_type = models.CharField(max_length=20, choices=PROMPT_TYPE_CHOICES)
#     intro_message = models.CharField(max_length=200)
#     ai_key = models.CharField(max_length=100)
#     conversation_limit = models.IntegerField()
#     time_zone_reference = models.CharField(max_length=10, choices=TIME_ZONE_CHOICES)
#     time_zone_format = models.CharField(max_length=15, choices=TIME_ZONE_FORMAT_CHOICES)
#     time_format = models.CharField(max_length=10, choices=TIME_FORMAT_CHOICES)
#     gpt_model = models.CharField(max_length=20, choices=GPT_MODEL_CHOICES)
#     message_delay = models.IntegerField(blank=True, null=True)


# class Goal(models.Model):
#     GOAL_CHOICES = (
#         ('Tag Name', 'Tag Name'),
#         ('Custom Field Type', 'Custom Field Type'),
#         ('Trigger Webhook', 'Trigger Webhook')
#     )

#     bot = models.ForeignKey(Bot, on_delete=models.CASCADE)
#     add_goal = models.CharField(max_length=20, choices=GOAL_CHOICES)
#     # Fields related to 'Tag Name'
#     tag_name = models.CharField(max_length=50, blank=True, null=True)
#     goal_description = models.CharField(max_length=200, blank=True, null=True)
#     # Fields related to 'Custom Field Type'
#     field_name = models.CharField(max_length=50, blank=True, null=True)
#     field_type = models.CharField(max_length=50, blank=True, null=True)
#     field_description = models.CharField(max_length=200, blank=True, null=True)
#     allow_overwrite = models.BooleanField(default=False)
#     # Fields related to 'Trigger Webhook'
#     goal_name = models.CharField(max_length=50, blank=True, null=True)
#     trigger = models.CharField(max_length=50, blank=True, null=True)
#     webhook_url = models.URLField(max_length=200, blank=True, null=True)
#     webhook_description = models.CharField(max_length=200, blank=True, null=True)
#     headers = models.CharField(max_length=200, blank=True, null=True)
#     headers_value = models.CharField(max_length=200, blank=True, null=True)
#     webhook_request_method = models.CharField(max_length=20, blank=True, null=True)


class OpenAI(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    openAI_key = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"OpenAI key: {self.openAI_key}"


class Highlevel(models.Model):

    ACCOUNT_TYPE_CHOICES = (
        ('agency', 'Agency'),
        ('location', 'Location'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPE_CHOICES)
    agency_name = models.CharField(max_length=100, blank=True)
    agency_domain = models.CharField(max_length=100, blank=True)
    agency_apiKey = models.CharField(max_length=100, blank=True)
    
    def save(self, *args, **kwargs):
        if self.account_type != 'agency':
            self.agency_name = ''
            self.agency_domain = ''
            self.agency_apiKey = ''
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Highlevel account_type: {self.account_type}"

'''
in zappychat we have a form and having that field 
class Bot(models.Model):

    AI_TYPE_CHOICES = (
        ('Booking', 'Booking'),
        ('Non Booking', 'Non Booking')
    )

    PROMPT_TYPE_CHOICES = (
        ('Text', 'Text'),
        ('Custom Field', 'Custom Field'),
        ('Custom Value', 'Custom Value')
    )
    
    TIME_ZONE_CHOICES = (
        ('Contact', 'Contact'),
        ('Location', 'Location')
    )

    TIME_ZONE_FORMAT_CHOICES = (
        ('Abbreviated', 'Abbreviated'), 
        ('Hidden', 'Hidden')
    )

    TIME_FORMAT_CHOICES = (
        ('12 H', '12 H'), 
        ('24 H', '24 H')
    )

    GPT_MODEL_CHOICES = (
        ('GPT-3', 'GPT-3'),
        ('GPT-3.5', 'GPT-3.5'),
        ('GPT-4', 'GPT-4')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ai_type = models.CharField(max_length=20, choices=AI_TYPE_CHOICES)
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


and one more field is there add_goal
add goal is a dropdown when user click on add goal he got 3 values (tag name, custom field type, trigger webhook)
when user click on tag name they got two fields (tag name, goal description) when click tag name then they again same field 
when user click on custom field type they got (field name, field type, field description, alloew overwrite which is default false)
when user click on trigger webhook they got (goal name, trigger, webhook url, webhook description, headers, webhook request method) and when user click on headers they got (headers, value of headers) inside the trigger webhook

if user want to user any one of three and if user want to add all at a same time 

'''