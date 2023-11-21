from rest_framework.views import APIView, status
from rest_framework.response import Response
from users.models import HighLevelModel
from .serializers import FAQSerializer
from rest_framework.permissions import IsAuthenticated
from .models import FAQ


class FAQAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data
            high_level_instance = HighLevelModel.objects.get(user_id=request.user.id)
            data['high_level'] = high_level_instance.id
            seralizer = FAQSerializer(
                data=data
            )
            seralizer.is_valid(raise_exception=True)
            instance = seralizer.create()
            return Response(
                {
                    "details": {
                        "id": instance
                        },
                    "message": "successfully created",
                    "success": True
                },
                status=status.HTTP_200_OK)
        except Exception:
            return Response(
                {
                    "message": "Please select your HighLevel",
                    "success": False
                },
                status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        high_level_instance = HighLevelModel.objects.get(user_id=request.user.id)
        data = FAQ.objects.filter(high_level_id=high_level_instance.id).values("id", "question", "answer")
        return Response(
            {
                "details": data,
                "success": True
            },
            status=status.HTTP_200_OK)

    def patch(self, request):
        try:
            instance = FAQ.objects.filter(id=request.data['id']).update(**request.data)
            return Response(
                {
                    "details": "updated successfully",
                    "success": True
                },
                status=status.HTTP_200_OK)
        except Exception:
            return Response(
                {
                    "details": "in valid id",
                    "success": True
                },
                status=status.HTTP_200_OK)

    def delete(self, request, id):
        try:
            high_level_instance = HighLevelModel.objects.get(user_id=request.user.id)
            instance = FAQ.objects.get(high_level_id=high_level_instance.id,id=id)
            instance.delete()
            return Response(
                {
                    "details": "deleted successfully",
                    "success": True
                },
                status=status.HTTP_200_OK)
        except Exception:
            return Response(
                {
                    "details": "in valid id",
                    "success": True
                },
                status=status.HTTP_200_OK)