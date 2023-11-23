import openai
import csv
import os
from .hardCodedString import download_path

def open_ai_is_valid(open_ai_key):
    openai.api_key = open_ai_key
    try:
        openai.models.list()
        return True
    except openai.APIError:
        return False


def download_csv_file(faq_data):
    try:
        DOWNLOADS_DIR = download_path.format(os.getlogin())
        filename = DOWNLOADS_DIR + "\\"+'data.csv'
        with open(filename, 'w') as csvfile:
            csvwriter = csv.writer(csvfile)
            for faq in faq_data:
                csvwriter.writerow(faq.values())

    except Exception as e:
        print("your error is",e)
