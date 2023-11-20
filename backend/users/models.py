from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from uuid import uuid4


class User(AbstractUser):
    ROLE_CHOICE = (
        ("Admin", "Admin"),
        ("User", "User")
    )

    email = models.EmailField(("email_address"), unique=True, max_length=200)
    remember_me = models.BooleanField(default=False)
    reset_password = models.BooleanField(default=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICE, default="User")
    reference = models.UUIDField(max_length=60, unique=True, default=uuid4)
    added_by = models.ForeignKey('self', on_delete=models.CASCADE, null=True,
                                 blank=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("username",)
    objects = UserManager()

    def save(self, *args, **kwargs):
        self.username = self.email
        self.reference = str(self.reference).replace("-", "")
        super().save(*args, **kwargs)


class OpenAIModel(models.Model):
    open_ai_key = models.CharField(max_length=100)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)