from .views import CreateBotAPI, CloneBotAPI
from django.urls import path

urlpatterns = [
    path("bot_data", CreateBotAPI.as_view()),
    path("bot_data/<id>", CreateBotAPI.as_view()),
    path("clone_data", CloneBotAPI.as_view()),
]
