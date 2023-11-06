from bot.serializers import (
    TagTypeSerializer,
    CustomFieldTypeSerializer,
    TriggerWebhookSerializer,
    HeaderSerializer,
)


def add_goals(request, id):
    data = request.data
    keys = data.keys()
    if "tag_type" in keys:
        tag_data = request.data["tag_type"]
        serializer = TagTypeSerializer(data=tag_data)
        tag_data["bot_id"] = id
        if not serializer.is_valid():
            message = serializer.errors
            return message, False
        serializer.save()

    if "custom_field_type" in keys:
        custom_field_data = request.data["custom_field_type"]
        serializer = CustomFieldTypeSerializer(data=custom_field_data)
        custom_field_data["bot_id"] = id
        if not serializer.is_valid():
            message = serializer.errors
            return message, False
        serializer.save()

    if "trigger_webhook_type" in keys:
        trigger_webhook_data = request.data["trigger_webhook_type"]
        serializer = TriggerWebhookSerializer(data=trigger_webhook_data)
        trigger_webhook_data["bot_id"] = id
        if not serializer.is_valid():
            message = serializer.errors
            return message, False
        webhook_id = serializer.save().id

        if "header_type" in keys:
            header_data = request.data["header_type"]
            serializer = HeaderSerializer(data=header_data)
            header_data["triggerwebhook_id"] = webhook_id

            if not serializer.is_valid():
                message = serializer.errors
                return message, False
            serializer.save()

    message = "added successfully"

    return message, True
