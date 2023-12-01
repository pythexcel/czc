from bot.serializers import (
     ValidateAllSerializer,
     BotModelSerializer,
     DeleteBotSerializer,
     TagTypeListSerializer,
     CustomTypeListSerializer,
     HeaderListTypeSerializer,
     TriggerWebhookSerializer
)
from bot.models import (
    BotModel,
    Header,
    TriggerWebhook,
    )
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework.permissions import IsAuthenticated
from bot.utils import clone_bot_data
from utils.helperfunction import open_ai_is_valid
from django.shortcuts import get_object_or_404


class CreateBotAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ValidateAllSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        result = open_ai_is_valid(request.data['bot_type']['open_ai_api_key'])
        if not result:
            return Response(
                {"success": False, "message": "please enter a valid openAi key"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        bot_instance = serializer.create()
        validate_data = serializer.validated_data
        if "tag_type" in validate_data:
            tag_serializer = TagTypeListSerializer(data=validate_data['tag_type'],
                  context ={"bot_instance": bot_instance})
            tag_serializer.is_valid(raise_exception=True)
            tag_serializer.save()
        if "custom_field_type" in validate_data:
            tag_serializer = CustomTypeListSerializer(data=validate_data['custom_field_type'],
                                               context={"bot_instance": bot_instance})
            tag_serializer.is_valid(raise_exception=True)
            tag_serializer.save()
        if "trigger_webhook_type" in validate_data:
            for trigger_goal in validate_data['trigger_webhook_type']:
                trigger_goal["bot"] = bot_instance
                if "header_type" in trigger_goal.keys():
                    header_data = trigger_goal['header_type']
                    trigger_goal.pop("header_type")
                    webhook_id = TriggerWebhook.objects.create(**trigger_goal)
                    header_serializer = HeaderListTypeSerializer(data=header_data, context={"webhook_instance": webhook_id})
                    header_serializer.is_valid(raise_exception=True)
                    header_serializer.save()
                else:
                    trigger_serializer = TriggerWebhookSerializer(data=trigger_goal)
                    trigger_serializer.is_valid()
                    trigger_serializer.save()

        return Response(
                    {"success": True, "message": "bot created successfully"},
                    status=status.HTTP_200_OK,
                )

    def get(self, request, id=None):
        user_id = request.user.id
        bot_filter = {'user_id': user_id}
        if id:
            bot_filter['id'] = id
            bot_data = get_object_or_404(BotModel, **bot_filter)
            serializer = BotModelSerializer(bot_data)
        else:
            bot_data = BotModel.objects.filter(**bot_filter)
            serializer = BotModelSerializer(bot_data, many=True)
        return Response({"details": serializer.data, "success": True}, status=status.HTTP_200_OK)

    def patch(self, request, id):
        try:
            bot_instance = get_object_or_404(BotModel, id=id, user_id=request.user.id)
            if not open_ai_is_valid(request.data['bot_type']['open_ai_api_key']):
                return Response(
                    {"success": False, "message": "please enter a valid openAi key"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            serializer = BotModelSerializer(bot_instance, data=request.data, partial=True)
            if not serializer.is_valid():
                return Response({"success": False, "message": serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)
            serializer.save()

            return Response({"message": "updated successfully", "success": True}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"success": False, "message": str(e)},
                            status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            flag=0
            data = request.data
            serializer = DeleteBotSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            bot_instance = BotModel.objects.get(
                id=serializer.validated_data["bot_id"]
            )
            if "tag_type_ids" in serializer.validated_data:
                bot_instance.bot_tagtype.filter(
                    id__in=serializer.validated_data["tag_type_ids"]
                ).delete()
                flag = 1
            if "custom_field_type_ids" in serializer.validated_data:
                bot_instance.bot_custom.filter(
                    id__in=serializer.validated_data["custom_field_type_ids"]
                ).delete()
                flag = 1
            if "trigger_webhook_type_ids" in serializer.validated_data:
                bot_instance.bot_trigger.filter(
                    id__in=serializer.validated_data["trigger_webhook_type_ids"]
                ).delete()
                flag = 1
            if "header_type_ids" in serializer.validated_data:
                Header.objects.filter(
                    id__in=serializer.validated_data["header_type_ids"]
                ).delete()
                flag = 1
            if not flag:
                bot_instance.delete() # delete the entire bot

            return Response({"message": "deleted successfully", "success": True}, status=status.HTTP_200_OK)
        except BotModel.DoesNotExist:
            return Response({"success": False, "message": "invalid bot id"}, status=status.HTTP_400_BAD_REQUEST)


class CloneBotAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data
            message, response = clone_bot_data(data['id'], data['bot_name'])
            if response:
                return Response({"message": message, "success": True},
                                status=status.HTTP_200_OK)
            return Response({"success": False, "message": message},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"success": False, "message": str(e)+" field is required"},
                            status=status.HTTP_400_BAD_REQUEST)