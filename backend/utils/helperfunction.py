import openai
import csv
import os


def open_ai_is_valid(open_ai_key):
    openai.api_key = open_ai_key
    try:
        openai.Model.list()
        return True
    except openai.error.AuthenticationError:
        return False


def download_csv_file(faq_data):
    try:
        download_folder = os.path.expanduser("~" + os.sep + "Downloads")
        file_name = "data.csv"
        file_path = os.path.join(download_folder, file_name)
        with open(file_path, 'w') as csvfile:
            csvwriter = csv.writer(csvfile)
            csvwriter.writerow(["question", "answer"])
            for faq in faq_data:
                csvwriter.writerow(faq.values())

    except Exception as e:
        print("your error is", e)
        return str(e)
