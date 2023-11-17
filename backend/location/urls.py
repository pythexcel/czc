from .views import AddLoctionAPI
from django.urls import path


urlpatterns = [
    path("add_location", AddLoctionAPI.as_view())
]
