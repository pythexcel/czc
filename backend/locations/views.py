from rest_framework.views import APIView, status
from rest_framework.response import Response
from locations.models import LocationModel
# Create your views here.


class LocationAPI(APIView):
    def get(self, request):
        data = LocationModel.objects.all().values()
        return Response(
                    {"success": True, "data": data},
                    status=status.HTTP_200_OK,
                )