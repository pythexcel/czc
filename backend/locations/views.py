from rest_framework.views import APIView, status
from rest_framework.response import Response
from locations.models import LocationModel
from locations.serializers import LocationModelSerializer
from rest_framework.permissions import IsAuthenticated


class LocationAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        queryset = LocationModel.objects.filter(agency_id=id)
        serializer = LocationModelSerializer(queryset, many=True)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_200_OK,
        )