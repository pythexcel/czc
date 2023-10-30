from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout
import base64
from django.core.mail import send_mail
from django.template.loader import render_to_string

class SignupAPI(APIView):

    def post(self, request):
       
        data = request.data

        serializer = UserSerializer(data=data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message': 'User Created.'}, status=200)
    
class SigninAPI(APIView):
    def post(self, request):

        serializer = AuthTokenSerializer(data=request.data)
        user = get_object_or_404(User, email=request.data["username"])
        user.remember_me = int(request.data.get("remember_me", 1))

        if serializer.is_valid():
            user1 = serializer.validated_data['user']
            if user.remember_me:
                    request.session.set_expiry(settings.SESSION_COOKIE_AGE)
                    request.session.modified = True
            
            refresh = RefreshToken.for_user(user1)
            access_token = str(refresh.access_token)
            data = {
                    'id': user1.id,
                    'email': user1.email,
                    'access': access_token,
                }

            return Response({'message': 'Login successfully', 'data': data}, status=200)
        return Response(serializer.errors, status=401)


class LogoutAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args):
        logout(request)
        return  Response({'message': 'Logout successfully'}, status=200)


class ForgetPassword(APIView):

    def post(self, request):

        user = User.objects.get(email=request.data['username'])

        if user:
            email = request.data['username']
            encoded_email = base64.urlsafe_b64encode(email.encode('utf-8')).decode('utf-8')
            reset_link = f"http://localhost:5180/resetpassword?token={encoded_email}"
            subject = "Notification: You requested a password reset!"
            context = {
                'reset_link': reset_link,
            }
            message = render_to_string('EmailTemplate.html', context)
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [request.data['username'],]
            send_mail(subject, None, email_from, recipient_list, html_message=message)
            return Response({"message": "A request has been submitted and you will get an email if you have a valid account!"}, status=200)
        else:
            return Response({'message': 'The email submitted is not correct!'}, status=400)


class ResetPassword(APIView):

     def post(self,request):

        encoded_email = request.GET.get('token')
        email = base64.urlsafe_b64decode(encoded_email).decode('utf-8')
        user = User.objects.get(email=email)
      
        new_password = request.data['new_password']
        confirm_password = request.data['confirm_password']                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        
        if new_password != confirm_password:
            return Response({'message': 'Passwords do not match'}, status=400)
        if email:
            user.set_password(confirm_password)
            user.save()
            return Response({'message': 'Password change successfully'}, status=200)
        else:
            return Response({'message': 'Invalid password'}, status=400)
