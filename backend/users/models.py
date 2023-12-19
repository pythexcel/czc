from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
import uuid
import random


class User(AbstractUser):
    ROLE_CHOICE = (
        ("Admin", "Admin"),
        ("User", "User")
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    email = models.EmailField(("email_address"), unique=True, max_length=200)
    remember_me = models.BooleanField(default=False)
    reset_password = models.BooleanField(default=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICE, default="User")
    added_by = models.ForeignKey('self', on_delete=models.CASCADE, null=True,
                                 blank=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("username",)
    objects = UserManager()

    def save(self, *args, **kwargs):
        self.username = self.email
        super().save(*args, **kwargs)


class OpenAIModel(models.Model):
    open_ai_key = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


class AgencyModel(models.Model):
    agency_name = models.CharField(max_length=100)
    domain = models.URLField(max_length=100)
    agency_api_key = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.id:
            self.id = ''.join([str(random.randint(0, 9)) for _ in range(14)])