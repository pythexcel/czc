from ai_backend.celery import app
import requests
from locations.models import LocationModel


@app.task
def get_celery_task(agency_api_key, agency_id):
    try:
        api_url = "https://rest.gohighlevel.com/v1/locations/"
        headers = {
            'Authorization': 'Bearer ' + agency_api_key,
            }
        response = requests.get(api_url, headers=headers)
        data = response.json()
        for location in data['locations']:
            LocationModel.objects.update_or_create(
                location_id=location['id'],
                defaults={'location_name': location['name'], 'agency_id': agency_id})

    except Exception as e:
        print("agency api key is wrong",str(e))
