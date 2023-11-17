from location.models import LocationModel
from rest_framework import serializers


class LocationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationModel
        fields = "__all__"