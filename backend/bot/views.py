from bot.serializers import (
    BotModelSerializer,
)
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework.permissions import IsAuthenticated
from bot.utils import add_goals


class CreateBotAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            bot_data = request.data["bot_type"]
            serializer = BotModelSerializer(data=bot_data)
            bot_data["user"] = request.user.id
            if not serializer.is_valid():
                return Response(
                    {"sucess": False, "message": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            id = serializer.save().id
            message, response = add_goals(request, id)
            if response:
                return Response(
                    {"sucess": True, "message": message},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"sucess": False, "message": message},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Exception as e:
            return Response(
                {"sucess": False, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
