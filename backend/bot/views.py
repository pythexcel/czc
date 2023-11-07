from bot.serializers import (
     CreateBotSerializer
)
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework.permissions import IsAuthenticated
from bot.utils import add_goals


class CreateBotAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateBotSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        bot_instance = serializer.create()
        message, response = add_goals(serializer.validated_data, bot_instance)
        if not response:
            return Response(
                {"sucess": False, "message": message},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
                {"sucess": True, "message": "register successfully"},
                status=status.HTTP_200_OK,
            )


