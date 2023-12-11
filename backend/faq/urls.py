from django.urls import path
from .views import FAQAPI, DownloadFAQAPI, ImportFAQFile

urlpatterns = [
    path("", FAQAPI.as_view(), name="frequently_asked_ques"),
    path("<id>", FAQAPI.as_view(), name="frequently_asked_ques"),
    path("download/<id>", DownloadFAQAPI.as_view(), name="download_faq"),
    path("import/", ImportFAQFile.as_view(), name="import_faq")

]
