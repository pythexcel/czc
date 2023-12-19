from .views import LocationAPI
from django.urls import path

urlpatterns = [
    path("get/<agency_id>/", LocationAPI.as_view(), name="locations"),
    path("get/<agency_id>/<location_id>", LocationAPI.as_view(), name="locations"),

]
