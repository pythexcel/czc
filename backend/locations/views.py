from rest_framework.views import APIView, status
from rest_framework.response import Response
from locations.models import LocationModel
from locations.serializers import LocationModelSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


class LocationAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        queryset = LocationModel.objects.filter(agency_id=id)
        serializer = LocationModelSerializer(queryset, many=True)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_200_OK,
        )

    def patch(self, request, id):
        data = request.data
        location_instance = get_object_or_404(LocationModel, id=id)
        serializer = LocationModelSerializer(location_instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
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
