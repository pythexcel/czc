from .views import CreateBotAPI, CloneBotAPI
from django.urls import path

urlpatterns = [
    path("", CreateBotAPI.as_view(), name="create-bot"),
    path("<id>/", CreateBotAPI.as_view(), name="get-bot"),
    path("clone", CloneBotAPI.as_view(), name="clone-bot"),
]
