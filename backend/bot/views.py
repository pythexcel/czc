from bot.serializers import (
     CreateBotSerializer
)
from bot.models import (
    BotModel
    )
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework.permissions import IsAuthenticated
from bot.utils import (add_goals,
                       get_bot_data,
                       update_bot_record,
                       open_ai_is_valid,
                       delete_bot_data,
                       clone_bot_data)


class CreateBotAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateBotSerializer(
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
        message, response = add_goals(serializer.validated_data, bot_instance)
        if not response:
            return Response(
                {"success": False, "message": message},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
                {"success": True, "message": "register successfully"},
                status=status.HTTP_200_OK,
            )

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        data = get_bot_data(user_id)
        return Response({"details": data, "success": True}, status=status.HTTP_200_OK)

    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        try:
            bot_instance = BotModel.objects.get(id=id)
            serializer = CreateBotSerializer(
                data=request.data,
                context={"request": request},
                partial=True
            )

            if not serializer.is_valid(raise_exception=True):
                return Response({"success": False, "message": serializer.errors}, status=status.HTTPHTTP_400_BAD_REQUEST)

            result = open_ai_is_valid(request.data['bot_type']['open_ai_api_key'])
            if not result:
                return Response(
                    {"success": False, "message": "please enter a valid openAi key"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            message, response = update_bot_record(request, request.data, bot_instance)
            if response:
                return Response({"message": message, "success": True},
                                status=status.HTTP_200_OK)
            return Response({"message": message, "success": False},
                            status=status.HTTP_400_BAD_REQUEST)

        except BotModel.DoesNotExist:
            return Response({"success": False, "message": "invalid bot id"},
                            status=status.HTTP_400_BAD_REQUEST)

    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        try:
            value = id.split("=")
            goal_name = value[0]
            goal_id = value[1]
            message, response = delete_bot_data(goal_name, goal_id)
            if response:
                return Response({"message": message, "success": True}, status=status.HTTP_200_OK)
            return Response({"success": False, "message": "invalid bot id"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"success": False, "message": "id is required"}, status=status.HTTP_400_BAD_REQUEST)


class CloneBotAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        message, response = clone_bot_data(data['id'], data['bot_name'])
        if response:
            return Response({"message": message, "success": True},
                            status=status.HTTP_200_OK)
        return Response({"success": False, "message": message},
                        status=status.HTTP_400_BAD_REQUEST)
