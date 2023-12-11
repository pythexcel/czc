from rest_framework.views import APIView, status
from rest_framework.response import Response
from locations.models import LocationModel
from locations.serializers import LocationModelSerializer


class LocationAPI(APIView):
    def get(self, request):
        queryset = LocationModel.objects.all()
        serializer = LocationModelSerializer(queryset, many=True)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_200_OK,
        )