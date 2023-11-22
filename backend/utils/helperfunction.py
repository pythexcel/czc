import openai
from django.conf import settings
import  csv


def open_ai_is_valid(open_ai_key):
    openai.api_key = open_ai_key
    try:
        openai.models.list()
        return True
    except openai.APIError:
        return False


def download_csv_file(faq_data):
    filename = settings.MEDIA_ROOT/'data.csv'
    with open(filename, 'w') as csvfile:
        csvwriter = csv.writer(csvfile)
        for faq in faq_data:
            csvwriter.writerow(faq.values())