import pandas as pd
import os
from rest_framework.views import APIView, status
from rest_framework.response import Response
from users.models import HighLevelModel
from .serializers import FAQSerializer
from rest_framework.permissions import IsAuthenticated
from .models import FAQ
from django.shortcuts import get_object_or_404
from utils.helperfunction import download_csv_file


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
        except Exception:
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
            download_csv_file(faq_data)
            return Response(
                {    
                    "details": "download csv file",
                    "success": True
                },
                status=status.HTTP_200_OK)
        except Exception:
            return Response("Please integrate your high level Integrations")


class ImportFAQFile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            high_level_instance = HighLevelModel.objects.get(user_id=request.user.id)
            filename = request.data.get('file')
            file, extension = os.path.splitext(str(filename))
            if extension != '.csv':
                return Response(
                 {
                    "message": "Please select a .csv file only",
                    "success": False
                 },
                 status=status.HTTP_400_BAD_REQUEST)
            delete_existing_faq = request.data.get('delete_exiting_faq', None)
            if delete_existing_faq == "yes":
                FAQ.objects.filter(high_level_id=high_level_instance.id).delete()

            df = pd.read_csv(filename, skiprows=0)
            faq_list = []
            for row in df.iterrows():
                faq_list.append(
                    FAQ(question=row[1]['question'],
                        answer=row[1]['answer'],
                        high_level_id=high_level_instance.id)
                    )
            FAQ.objects.bulk_create(faq_list)
            return Response(
                    {
                        "details": "added data successfully",
                        "success": True
                    },
                    status=status.HTTP_200_OK)

        except Exception as e:
            return Response(str(e))