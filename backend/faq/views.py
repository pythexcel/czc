import pandas as pd
import os
from rest_framework.views import APIView, status
from rest_framework.response import Response
from users.models import HighLevelModel
from .serializers import FAQSerializer 
from rest_framework.permissions import IsAuthenticated
from .models import FAQ
from django.shortcuts import get_object_or_404
from django.http import HttpResponse


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

    def get(self, request, id=None):
        if id:
            data = get_object_or_404(FAQ, id=id)
            serializer = FAQSerializer(data)
        else:
            data = FAQ.objects.filter(high_level__user_id=request.user.id)
            serializer = FAQSerializer(data, many=True)
        return Response(
            {
                "details": serializer.data,
                "success": True
            },
            status=status.HTTP_200_OK)

    def patch(self, request, id=None):
        try:
            if id:
                instance = get_object_or_404(FAQ, id=id)
                serializer = FAQSerializer(instance, data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(
                    {
                        "details": "updated successfully",
                        "success": True
                    },
                    status=status.HTTP_200_OK
                )
            return Response(
                {
                    "details": "Id is required",
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
            df = pd.DataFrame(faq_data)
            csv_data = df.to_csv(index=False)
            response = HttpResponse(csv_data, content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="my_file.csv"'
            return response
        except Exception:
            return Response("Download failed")


class ImportFAQFile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
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
