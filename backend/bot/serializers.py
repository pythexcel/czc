from rest_framework import serializers

from bot.models import (BotModel,
                        TriggerWebhook,
                        Header,
                        TagType,
                        CustomFieldType)


class CreateBotSerializer(serializers.Serializer):
    bot_type = serializers.JSONField()
    tag_type = serializers.ListField(required=False)
    custom_field_type = serializers.ListField(required=False)
    trigger_webhook_type = serializers.ListField(required=False)

    def validate(self, attrs):
        request = self.context["request"]
        bot_data = attrs["bot_type"]
        bot_data["user"] = request.user.id
        bot_serializer = BotModelSerializer(
            data=bot_data
        )
        bot_serializer.is_valid(raise_exception=True)
        all_field_type = attrs.keys()
        if "custom_field_type" in all_field_type:
            custom_field_data = attrs["custom_field_type"]
            custom_field_serializer = CustomFieldTypeSerializer(
                data=custom_field_data, many=True
            )
            custom_field_serializer.is_valid(raise_exception=True)
        if "tag_type" in all_field_type:
            tag_field_data = attrs["tag_type"]
            tag_field_serializer = TagTypeSerializer(
                data=tag_field_data, many=True
            )
            tag_field_serializer.is_valid(raise_exception=True)
        if "trigger_webhook_type" in all_field_type:
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


class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Header
        fields = "__all__"


class TriggerWebhookSerializer(serializers.ModelSerializer):
    header_type = HeaderSerializer(many=True, required=False)
    header_field = serializers.SerializerMethodField()

    def get_header_field(self, obj):
        return obj.webhook_header.values()

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


class BotModelSerializer(serializers.ModelSerializer):
    goal = serializers.SerializerMethodField()

    def get_goal(self, obj):
        data = {
                "tag_type": obj.bot_tagtype.values(),
                "custom_field_type": obj.bot_custom.values(),
                "trigger_webhook_field": TriggerWebhookSerializer(
                    obj.bot_trigger.all(), many=True
                  ).data,
                }
        return data

    class Meta:
        model = BotModel
        fields = "__all__"


class DeleteBotSerializer(serializers.Serializer):
    bot_id = serializers.CharField()
    tag_type_ids = serializers.ListField(required=False)
    custom_field_type_ids = serializers.ListField(required=False)
    trigger_webhook_type_ids = serializers.ListField(required=False)
    header_type_ids = serializers.ListField(required=False)
