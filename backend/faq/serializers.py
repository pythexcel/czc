from rest_framework import serializers
from .models import FAQModel


class FAQSerializer(serializers.ModelSerializer):

    class Meta:
        model = FAQModel
        fields = "__all__" 
