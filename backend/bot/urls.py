from .views import CreateBotAPI, CloneBotAPI
from django.urls import path

urlpatterns = [
    path("", CreateBotAPI.as_view()),
    path("<id>/", CreateBotAPI.as_view()),
    path("clone/", CloneBotAPI.as_view()),
]
