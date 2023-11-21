from django.urls import path
from .views import FAQAPI

urlpatterns = [
    path("frequently-asked-ques/", FAQAPI.as_view(), name="frequently-asked-ques"),
    path("frequently-asked-ques/<id>", FAQAPI.as_view(), name="frequently-asked-ques"),
]
