from rest_framework import serializers
from .models import FAQ


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"

    def create(self):
        instance = FAQ.objects.create(**self.validated_data)
        return instance.id