from bot.models import (
     TagType,
     CustomFieldType,
     TriggerWebhook,
     Header,
     BotModel

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


def get_bot_data(user_id):
    data = list(BotModel.objects.filter(user_id=user_id).values("bot_name", "bot_description", "prompt_type", "prompt", "ai_type","open_ai_api_key", "gpt_model_one", "calender_type"))
    return data


def update_bot_record(request,  validated_data, bot_instance):
    bot_data = validated_data["bot_type"]
    bot_data["user"] = request.user
    BotModel.objects.update_or_create(
        id=bot_instance.id,
        defaults=bot_data
    )
    tag_goal_list = validated_data['tag_type']
    [TagType.objects.update_or_create(
            bot_id=bot_instance,
            tag_name=tag_goal['tag_name'],
            defaults=tag_goal
        ) for tag_goal in tag_goal_list]

    custom_goal_list = validated_data['custom_field_type']
    [CustomFieldType.objects.update_or_create(
            bot_id=bot_instance, 
            field_name=custom_goal['field_name'],
            defaults=custom_goal
         ) for custom_goal in custom_goal_list]

    webhook_goal_list = validated_data['trigger_webhook_type']
    for webhook_goal in webhook_goal_list:
        header_type = webhook_goal['header_type']
        webhook_goal.pop('header_type')
        webhook_type = TriggerWebhook.objects.update_or_create(
            bot_id=bot_instance,
            goal_name=webhook_goal['goal_name'],
            defaults=webhook_goal
        )
        for header_goal in header_type:
            Header.objects.update_or_create(
               triggerwebhook_id=webhook_type[0],
               headers=header_goal['headers'],
               defaults=header_goal
            )
    message = "updated successfully"
    return message, True
