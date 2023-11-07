from bot.models import (
     TagType,
     CustomFieldType,
     TriggerWebhook,
     Header

)


def add_goals(validate_data, bot_instance):
    tag_goal_list = validate_data['tag_type']
    custom_goal_list = validate_data['custom_field_type']
    trigger_webhook_goal_list = validate_data['trigger_webhook_type']
    for tag_goal in tag_goal_list:
        tag_goal["bot_id"] = bot_instance
        TagType.objects.create(**tag_goal)

    for custom_goal in custom_goal_list:
        custom_goal['bot_id'] = bot_instance
        CustomFieldType.objects.create(**custom_goal)

    for trigger_goal in trigger_webhook_goal_list:
        trigger_goal["bot_id"] = bot_instance
        header_data = trigger_goal['header_type']
        trigger_goal.pop("header_type")
        webhook_id = TriggerWebhook.objects.create(**trigger_goal)
        for header in header_data:
            header["triggerwebhook_id"] = webhook_id
            Header.objects.create(**header)

    message = "register successfully"
    return message, True
