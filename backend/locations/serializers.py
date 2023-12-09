from rest_framework import serializers
from locations.models import LocationModel
from datetime import datetime


class LocationModelSerializer(serializers.ModelSerializer):
    faq = serializers.SerializerMethodField(required=False)

    class Meta:
        model = LocationModel
        fields = '__all__'

    def get_faq(self, obj):
        object = obj.location.values('updated_at').order_by('updated_at').last()
        if object:
            date_string = str(object['updated_at'])
            date_string = date_string.split('Z')[0].split()[0]
        else:
            date_string = ""

        data = {
               "no_of_faqs": obj.location.values().count(),
               "enabled": True,
               "last_updated": date_string,
               "fffff": obj.location.values()}
        return data
