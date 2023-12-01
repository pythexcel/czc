from bot.models import (
     TagType,
     CustomFieldType,
     TriggerWebhook,
     Header,
     BotModel,
)


def clone_bot_data(bot_id, bot_name):
    try:
        bot_data = list(BotModel.objects.filter(id=bot_id).values())
        bot_data = bot_data[0]
        bot_data.pop('id')
        bot_data['bot_name'] = bot_name
        bot_instance = BotModel.objects.create(**bot_data)
        tag_data = list(TagType.objects.filter(bot_id=bot_id).values())
        for tag_goal in tag_data:
            tag_goal.pop('id')
            tag_goal['bot_id'] = bot_instance.id
            TagType.objects.create(**tag_goal)

        custom_data = list(CustomFieldType.objects.filter(bot_id=bot_id).values())
        for custom_goal in custom_data:
            custom_goal.pop('id')
            custom_goal['bot_id'] = bot_instance.id
            CustomFieldType.objects.create(**custom_goal)

        webhook_data = list(TriggerWebhook.objects.filter(bot_id=bot_id).values())
        for webhook_goal in webhook_data:
            webhook_id = webhook_goal['id']
            webhook_goal.pop('id')
            webhook_goal['bot_id'] = bot_instance.id
            header_data = list(Header.objects.filter(triggerwebhook_id=webhook_id).values())
            webhook_instance = TriggerWebhook.objects.create(**webhook_goal)
            for header_goal in header_data:
                header_goal.pop('id')
                header_goal['triggerwebhook_id'] = webhook_instance.id
                Header.objects.create(**header_goal)

        message = "clone successfully"
        return message, True
    except IndexError:
        message = "invalid id"
        return message, False
    except Exception as e:
        print("errror", e)
        message = "bot_name must be unique"
        return message, False