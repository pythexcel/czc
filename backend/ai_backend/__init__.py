from celery import Celery


app = Celery('ai_backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()