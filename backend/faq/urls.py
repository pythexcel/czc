from django.urls import path
from .views import FAQAPI, DownloadFAQAPI

urlpatterns = [
    path("frequently-asked-ques/", FAQAPI.as_view(), name="frequently-asked-ques"),
    path("frequently-asked-ques/<id>", FAQAPI.as_view(), name="frequently-asked-ques"),
    path("download/faq/", DownloadFAQAPI.as_view(), name="download/faq/")
]
