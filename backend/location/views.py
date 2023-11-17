from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView, Response, status
from .serializers import LocationModelSerializer
import googlemaps


class AddLoctionAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            print("ok its fine ")
            serializer = LocationModelSerializer(
                data=request.data
             )
            if not serializer.is_valid():
                return Response({
                        "message": serializer.errors,
                        "success": False
                        },
                        status=status.HTTP_400_BAD_REQUEST)
            client = googlemaps.Client(request.data['api_key'])
            location = client.geocode('india')
             
            print("your location", location)
            return Response("api key is valid")

        except Exception as e:
            print("error", e)
            return Response({
                        "error": str(e),
                        "success": False
                        },
                        status=status.HTTP_400_BAD_REQUEST)
