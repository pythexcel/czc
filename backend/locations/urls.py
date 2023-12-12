from .views import LocationAPI
from django.urls import path

urlpatterns = [
    path("get/<id>", LocationAPI.as_view(), name="locations"),
]
