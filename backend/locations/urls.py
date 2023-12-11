from .views import LocationAPI
from django.urls import path

urlpatterns = [
    path("get/", LocationAPI.as_view(), name="locations"),
]
