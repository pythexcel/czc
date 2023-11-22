from rest_framework.views import APIView, status
from rest_framework.response import Response
from users.models import HighLevelModel
from .serializers import FAQSerializer
from rest_framework.permissions import IsAuthenticated
from .models import FAQ
import csv
from django.conf import settings
from django.shortcuts import get_object_or_404


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
            instance = seralizer.save().id
            return Response(
                {
                    "details": {
                        "id": instance
                        },
                    "message": "successfully created",
                    "success": True
                },
                status=status.HTTP_200_OK)
        except Exception as e:
            print("error e",e)
            return Response(
                {
                    "message": "Please select your HighLevel",
                    "success": False
                },
                status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        data = FAQ.objects.filter(high_level__user_id=request.user.id).values("id", "question", "answer")    
        return Response(
            {
                "details": data,
                "success": True
            },
            status=status.HTTP_200_OK)

    def patch(self, request):
        try:
            instance = FAQ.objects.get(id=request.data['id'])
            serializer = FAQSerializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {
                    "id": instance.id,
                    "details": "updated successfully",
                    "success": True
                },
                status=status.HTTP_200_OK
            )
        except FAQ.DoesNotExist:
            return Response(
                {
                    "details": "Invalid ID",
                    "success": False
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception:
            return Response(
                {
                    "details":serializer.errors,
                    "success": False
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, id):
        instance = get_object_or_404(FAQ, id=id)
        instance.delete()
        return Response(
            {
                "details": "deleted successfully",
                "success": True
            },
            status=status.HTTP_200_OK)


class DownloadFAQAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            high_level_instance = HighLevelModel.objects.get(user_id=request.user.id)
            faq_data = list(FAQ.objects.filter(high_level_id=high_level_instance.id).values("question", "answer"))
            filename = 'data.csv'
            with open(filename, 'w') as csvfile:
                csvwriter = csv.writer(csvfile)
                for faq in faq_data:
                    csvwriter.writerow(faq.values())
                   
            return Response(
                {
                    "details": "download csv file ",
                    "success": True
                },
                status=status.HTTP_200_OK)
        except Exception as e:
            return Response("your error is "+str(e))