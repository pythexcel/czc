from celery import shared_task
import requests
from locations.models import LocationModel


@shared_task
def get_celery_task(agency_api_key):
    try:
        api_url = "https://rest.gohighlevel.com/v1/locations/"
        headers = {
            'Authorization': 'Bearer ' + agency_api_key,
            }
        response = requests.get(api_url, headers=headers)
        data = response.json()
        location_data = []
        for location in data['locations']:
            location_data.append(LocationModel(id=location['id'], location_name=location['name']))
        return location_data

    except Exception:
        return []
