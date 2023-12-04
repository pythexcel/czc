from rest_framework import serializers
from django.shortcuts import get_object_or_404

from bot.models import (BotModel,
                        TriggerWebhook,
                        Header,
                        TagType,
                        CustomFieldType)


class ValidateAllSerializer(serializers.Serializer):
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

    def create(self, validated_data):
        bot_instance = self.context['bot_instance']
        header_data = validated_data.pop('header_type')
        validated_data['bot'] = bot_instance
        webhook_id = TriggerWebhook.objects.create(**validated_data) 
        header_serializer = HeaderListTypeSerializer(data=header_data, context={"webhook_instance": webhook_id})
        header_serializer.is_valid(raise_exception=True)
        header_serializer.save()
        return webhook_id


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
    tag_type = serializers.ListField(required=False)
    custom_field_type = serializers.ListField(required=False)
    trigger_webhook_type = serializers.ListField(required=False)

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

    def update(self, instance, validated_data):
        tag_type = validated_data.pop('tag_type', None)
        custom_field_type = validated_data.pop('custom_field_type', None)
        trigger_webhook_type = validated_data.pop('trigger_webhook_type', None)
        if tag_type:
            for tag in tag_type:
                if 'id' in tag:
                    tag_instance = get_object_or_404(TagType, id=tag['id'])
                    serializer = TagTypeSerializer(tag_instance, data=tag, partial=True)
                else:
                    tag['bot'] = instance.id
                    serializer = TagTypeSerializer(data=tag)
                serializer.is_valid(raise_exception=True)
                serializer.save()

        if custom_field_type:
            for custom_field in custom_field_type:
                if 'id' in custom_field:
                    custom_field_instance = get_object_or_404(CustomFieldType, id=custom_field.pop('id'))
                    serializer = CustomFieldTypeSerializer(custom_field_instance, data=custom_field, partial=True)
                else:
                    custom_field['bot'] = instance.id
                    serializer = CustomFieldTypeSerializer(data=custom_field)
                serializer.is_valid(raise_exception=True)
                serializer.save()

        if trigger_webhook_type:
            for trigger_webhook in trigger_webhook_type:
                header_type = trigger_webhook['header_type']
                if 'id' in trigger_webhook:
                    webhook_id = trigger_webhook['id']
                    trigger_webhook_instance = get_object_or_404(TriggerWebhook, id=trigger_webhook.pop('id'))
                    serializer = TriggerWebhookSerializer(trigger_webhook_instance, data=trigger_webhook, partial=True)
                    for header in header_type:
                        header['triggerwebhook'] = webhook_id
                        if 'id' in header:
                            header_instance = get_object_or_404(Header, id=header.pop('id'))
                            serializer = HeaderSerializer(header_instance, data=header, partial=True)
                        else:
                            serializer = HeaderSerializer(data=header)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()
                else:
                    serializer = TriggerWebhookSerializer(data=trigger_webhook, context={"bot_instance": instance})
                serializer.is_valid(raise_exception=True)
                serializer.save()

        return super().update(instance, validated_data)


class DeleteBotSerializer(serializers.Serializer):
    bot_id = serializers.CharField()
    tag_type_ids = serializers.ListField(required=False)
    custom_field_type_ids = serializers.ListField(required=False)
    trigger_webhook_type_ids = serializers.ListField(required=False)
    header_type_ids = serializers.ListField(required=False)


class TagTypeListSerializer(serializers.ListSerializer):
    child = TagTypeSerializer()

    def create(self, validated_data):
        bot_instance = self.context['bot_instance']
        tag_type_objects = [TagType(**{**tag_goal, "bot": bot_instance})
                            for tag_goal in validated_data]
        return TagType.objects.bulk_create(tag_type_objects)


class CustomTypeListSerializer(serializers.ListSerializer):
    child = CustomFieldTypeSerializer()

    def create(self, validated_data):
        bot_instance = self.context['bot_instance']
        custom_type_objects = [CustomFieldType(**{**custom_goal, "bot": bot_instance})
                            for custom_goal in validated_data]
        return CustomFieldType.objects.bulk_create(custom_type_objects)


class HeaderListTypeSerializer(serializers.ListSerializer):
    child = HeaderSerializer()

    def create(self, validated_data):
        webhook_instance = self.context['webhook_instance']
        header_type_objects = [Header(**{**header_goal, "triggerwebhook": webhook_instance})
                             for header_goal in validated_data]
        return Header.objects.bulk_create(header_type_objects)
