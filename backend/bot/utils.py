from bot.models import (
     TagType,
     CustomFieldType,
     TriggerWebhook,
     Header,
     BotModel,
)
from .serializers import BotModelSerializer
from django.shortcuts import get_object_or_404


def add_goals(validate_data, bot_instance):
    if "tag_type" in validate_data:
        tag_type_objects = [TagType(**{**tag_goal, "bot": bot_instance}) for tag_goal in validate_data['tag_type']]
        TagType.objects.bulk_create(tag_type_objects)
    if "custom_field_type" in validate_data:
        custom_field_objects = [CustomFieldType(**{**custom_goal, "bot": bot_instance}) for custom_goal in validate_data['custom_field_type']]
        CustomFieldType.objects.bulk_create(custom_field_objects)
    if "trigger_webhook_type" in validate_data:
        for trigger_goal in validate_data['trigger_webhook_type']:
            trigger_goal["bot"] = bot_instance
            if "header_type" in trigger_goal.keys():
                header_data = trigger_goal['header_type']
                trigger_goal.pop("header_type")
                webhook_id = TriggerWebhook.objects.create(**trigger_goal)
                header_field_objects = [Header(**{**header, "triggerwebhook": webhook_id}) for header in header_data] 
                Header.objects.bulk_create(header_field_objects)
            else:
                TriggerWebhook.objects.create(**trigger_goal)
    message = "register successfully"
    return message, True


def get_bot_data(bot_id=None, user_id=None):
    bot_filter = {'user_id': user_id}
    if bot_id:
        bot_filter['id'] = bot_id
        bot_data = get_object_or_404(BotModel, **bot_filter)
        serializer = BotModelSerializer(bot_data)
    else:
        bot_data = BotModel.objects.filter(**bot_filter)
        serializer = BotModelSerializer(bot_data, many=True)
    return serializer.data


def update_bot_record(request,  validated_data, bot_instance):
    bot_data = validated_data["bot_type"]
    bot_data["user"] = request.user
    BotModel.objects.update_or_create(
        id=bot_instance.id,
        defaults=bot_data
    )
    tag_goal_list = validated_data['tag_type']
    [TagType.objects.update_or_create(
            bot=bot_instance.id,
            tag_name=tag_goal['tag_name'],
            defaults=tag_goal
        ) for tag_goal in tag_goal_list]

    custom_goal_list = validated_data['custom_field_type']
    [CustomFieldType.objects.update_or_create(
            bot=bot_instance.id,
            field_name=custom_goal['field_name'],
            defaults=custom_goal
         ) for custom_goal in custom_goal_list]

    webhook_goal_list = validated_data['trigger_webhook_type']
    for webhook_goal in webhook_goal_list:
        header_type = webhook_goal['header_type']
        webhook_goal.pop('header_type')
        webhook_type = TriggerWebhook.objects.update_or_create(
            bot=bot_instance.id,
            goal_name=webhook_goal['goal_name'],
            defaults=webhook_goal
        )
        for header_goal in header_type:
            Header.objects.update_or_create(
               triggerwebhook_id=webhook_type[0].id,
               headers=header_goal['headers'],
               defaults=header_goal
            )
    message = "updated successfully"
    return message, True


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