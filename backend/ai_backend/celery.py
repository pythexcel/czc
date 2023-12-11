from __future__ import absolute_import, unicode_literals
from celery import Celery
import os
import django

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ai_backend.settings")
django.setup()

# Create a Celery instance and configure it using the settings from Django.
app = Celery('ai_backend', broker='redis://127.0.0.1:6379')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps, so you don't have to manually import them.
app.autodiscover_tasks()