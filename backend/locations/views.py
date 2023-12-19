from rest_framework.views import APIView, status
from rest_framework.response import Response
from locations.models import LocationModel
from locations.serializers import LocationModelSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Q


class LocationAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, agency_id=None, location_id=None):
        query = request.GET.get('query', None)
        if query:
            queryset = LocationModel.objects.filter(
                (Q(location_name__icontains=query)), agency_id=agency_id)
        else:
            queryset = LocationModel.objects.filter(agency_id=agency_id)
        serializer = LocationModelSerializer(queryset, many=True)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_200_OK,
        )

    def patch(self, request, agency_id=None, location_id=None):

        data = request.data
        if location_id:
            location_instance = get_object_or_404(LocationModel, id=location_id)
            serializer = LocationModelSerializer(location_instance, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            LocationModel.objects.filter(agency_id=agency_id).update(**data)
        if 'is_enabled' in data:
            return Response(
                {"success": True, "data": "Location Successfully updated!"},
                status=status.HTTP_200_OK,
            )
        if 'bot_name' in data:
            return Response(
                {"success": True, "data": "Successfully updated bot for the location!"},
                status=status.HTTP_200_OK,
            )
