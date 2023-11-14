from rest_framework import serializers

from bot.models import (BotModel,
                        TriggerWebhook,
                        Header,
                        TagType,
                        CustomFieldType)


class CreateBotSerializer(serializers.Serializer):
    bot_type = serializers.JSONField()
    tag_type = serializers.ListField()
    custom_field_type = serializers.ListField()
    trigger_webhook_type = serializers.ListField()

    def validate(self, attrs):
        print(attrs.keys())
        request = self.context["request"]
        bot_data = attrs["bot_type"]
        bot_data["user"] = request.user.id
        bot_serializer = BotModelSerializer(
            data=bot_data
        )
        bot_serializer.is_valid(raise_exception=True)
        custom_field_data = attrs["custom_field_type"]
        custom_field_serializer = CustomFieldTypeSerializer(
            data=custom_field_data, many=True
        )
        custom_field_serializer.is_valid(raise_exception=True)

        tag_field_data = attrs["tag_type"]
        tag_field_serializer = TagTypeSerializer(
            data=tag_field_data, many=True
        )
        tag_field_serializer.is_valid(raise_exception=True)

        webhook_field_data = attrs['trigger_webhook_type']
        webhook_field_serializer = TriggerWebhookSerializer(
            data=webhook_field_data, many=True
        )
        webhook_field_serializer.is_valid(raise_exception=True)
        return super().validate(attrs)

    def create(self):
        request = self.context["request"]
        bot_type_data = self.validated_data['bot_type']
        bot_type_data.pop('user')
        bot_type_data["user"] = request.user
        bot_instance = BotModel.objects.create(**bot_type_data)
        return bot_instance


class BotModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotModel
        fields = "__all__"


class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Header
        fields = "__all__"


class TriggerWebhookSerializer(serializers.ModelSerializer):
    header_type = HeaderSerializer(many=True)

    class Meta:
        model = TriggerWebhook
        fields = "__all__"


class TagTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagType
        fields = "__all__"


class CustomFieldTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomFieldType
        fields = "__all__"
