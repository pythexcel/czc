from .views import CreateBotAPI
from django.urls import path

urlpatterns = [
    path("bot_data", CreateBotAPI.as_view()),
]
