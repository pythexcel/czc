from rest_framework import serializers

from bot.models import BotModel, TriggerWebhook, Header, TagType, CustomFieldType


class BotModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotModel
        fields = "__all__"


class TriggerWebhookSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriggerWebhook
        fields = "__all__"


class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Header
        fields = "__all__"


class TagTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagType
        fields = "__all__"


class CustomFieldTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomFieldType
        fields = "__all__"
