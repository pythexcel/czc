from django.urls import path
from .views import FAQAPI, DownloadFAQAPI, ImportFAQFile

urlpatterns = [
    path("frequently-asked-ques/", FAQAPI.as_view(), name="frequently_asked_ques"),
    path("frequently-asked-ques/<id>", FAQAPI.as_view(), name="frequently_asked_ques"),
    path("download/faq/<id>", DownloadFAQAPI.as_view(), name="download_faq"),
    path("import/faq", ImportFAQFile.as_view(), name="import_faq")

]
