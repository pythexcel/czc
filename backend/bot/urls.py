from .views import CreateBotAPI, CloneBotAPI
from django.urls import path

urlpatterns = [
    path("bot", CreateBotAPI.as_view()),
    path("bot/<id>", CreateBotAPI.as_view()),
    path("bot/clone_data/", CloneBotAPI.as_view()),
]
