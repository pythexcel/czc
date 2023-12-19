
from django.http import JsonResponse


class CustomMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if response.status_code == 500:
            data = {"message": "internal server error", "success": False}
            return JsonResponse(data, status=500)

        return response