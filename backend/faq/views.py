import pandas as pd
import os
from rest_framework.views import APIView, status
from rest_framework.response import Response
from .serializers import FAQSerializer 
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import FAQModel
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from locations.models import LocationModel


class FAQAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        seralizer = FAQSerializer(
            data=request.data)
        seralizer.is_valid(raise_exception=True)
        seralizer.save()
        return Response(
            {
                "message": "Selected faq added successfully!",
                "success": True
            },
            status=status.HTTP_200_OK)

    def get(self, request, location_id=None, faq_id=None):
        if faq_id:
            faq_instace = FAQModel.objects.filter(id=faq_id).order_by('-updated_at')

        else:
            query = request.GET.get('query', None)
            if query:
                faq_instace = FAQModel.objects.filter((Q(question__icontains=query) | Q(answer__icontains=query)), location_id=location_id).order_by('-updated_at')
            else:
                faq_instace = FAQModel.objects.filter(location_id=location_id).order_by('-updated_at')
        serializer = FAQSerializer(faq_instace, many=True)

        return Response(
            {
                "details": serializer.data,
                "success": True
            },
            status=status.HTTP_200_OK)

    def patch(self, request, location_id=None, faq_id=None):
        try:
            instance = get_object_or_404(FAQModel, id=faq_id, location_id=location_id)
            serializer = FAQSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {
                    "details": "updated successfully",
                    "success": True
                },
                status=status.HTTP_200_OK
            )

        except Exception:
            return Response(
                {
                    "details":serializer.errors,
                    "success": False
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, location_id=None, faq_id=None):
        if faq_id:
            get_object_or_404(FAQModel, id=faq_id).delete()
        else:
            FAQModel.objects.filter(location_id=location_id).delete()
        return Response(
            {
                "details": "deleted successfully",
                "success": True
            },
            status=status.HTTP_200_OK)


class DownloadFAQAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        try:
            location_instance = get_object_or_404(LocationModel, id=id)
            faq_data = list(FAQModel.objects.filter(location_id=location_instance.id).values("question", "answer"))
            df = pd.DataFrame(faq_data)
            csv_data = df.to_csv(index=False)
            response = HttpResponse(csv_data, content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="data.csv"'
            return response
        except Exception:
            return Response("Download failed")


class ImportFAQFile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            location_id = request.data['location_id']
            agency_instance = get_object_or_404(LocationModel, id=location_id)
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
                FAQModel.objects.filter(agency_id=agency_instance.id).delete()

            df = pd.read_csv(filename, skiprows=0)
            faq_list = []
            for row in df.iterrows():
                faq_list.append(
                    FAQModel(question=row[1]['question'], answer=row[1]['answer'],
                        location_id=location_id)
                    )
            FAQModel.objects.bulk_create(faq_list)
            return Response(
                    {
                        "message": "added data successfully",
                        "success": True
                    },
                    status=status.HTTP_200_OK)

        except Exception as e:
            return Response(str(e))
