from rest_framework.views import APIView, status
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import logout
import base64
from django.core.mail import send_mail
from django.template.loader import render_to_string
from ai_backend.hardCodedString import resert_link_string


class SignupAPI(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "User Created.", "success": True},
                        status=status.HTTP_200_OK)


class SigninAPI(APIView):
    def post(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        if serializer.is_valid():
            user = get_object_or_404(User, email=request.data["username"])
            user.remember_me = request.data.get("remember_me", True)
            user_data = serializer.validated_data["user"]
            if user.remember_me:
                request.session.set_expiry(settings.SESSION_COOKIE_AGE)
                request.session.modified = True
            refresh = RefreshToken.for_user(user_data)
            access_token = str(refresh.access_token)
            data = {
                "id": user_data.id,
                "email": user_data.email,
                "access": access_token,
            }

            return Response(
                {"message": "Login successfully", "success": True, "data": data},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args):
        logout(request)
        return Response({"message": "Logout successfully",
                         "success": True}, status=status.HTTP_200_OK)


class ForgetPassword(APIView):
    def post(self, request):
        try:
            email = request.data["username"]
            encoded_email = base64.urlsafe_b64encode(email.encode("utf-8")).decode(
                "utf-8"
            )
            user = User.objects.get(email=email)
            user.reset_password = False
            user.save()
            reset_link = resert_link_string.format(encoded_email)
            subject = "Notification: You requested a password reset!"
            context = {
                "reset_link": reset_link,
            }
            message = render_to_string("EmailTemplate.html", context)
            email_from = settings.EMAIL_HOST_USER

            recipient_list = [
                request.data["username"],
            ]
            send_mail(subject, None, email_from, recipient_list, html_message=message)
            return Response(
                {
                    "message": "A request has been submitted and you will get an email if you have a valid account!"
                },
                status=status.HTTP_200_OK,
            )
        except Exception:
            return Response(
                {"message": "The email submitted is not correct!"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ResetPassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            encoded_email = request.GET.get("token")
            email = base64.urlsafe_b64decode(encoded_email).decode("utf-8")
            user = User.objects.get(email=email)
            if not user.reset_password:
                new_password = request.data["new_password"]
                confirm_password = request.data["confirm_password"]
                if new_password != confirm_password:
                    return Response(
                        {"message": "Passwords do not match",
                         "success": False},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                user.set_password(confirm_password)
                user.reset_password = True
                user.save()
                return Response(
                    {"message": "Password change successfully",
                     "success": False},
                    status=status.HTTP_200_OK
                )
            return Response(
                    {"message": "Your reset URL has expired Please generate a new URL",
                     "success": False},
                    status=status.HTTP_200_OK
                )
        except User.DoesNotExist:
            return Response(
                {"message": "Invalid email", "success": False},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"message": str(e) + " field is required", "success": False},
                status=status.HTTP_400_BAD_REQUEST
            )


class ManageUserAPI(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        try:
            serializer = UserSerializer(
                data=request.data,
                context={"added_by": request.user.id}
            )
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            data = {
                "id": user.reference,
                "email": user.email
            }
            return Response(
                {
                    "Message": "User added with role 'User' and linked to the requester.",
                    "success": True,
                    "data": data
                },
                status=status.HTTP_200_OK
            )
        except Exception:
            return Response(
                {
                    "message": serializer.errors,
                    "success": False
                 },
                status=status.HTTP_400_BAD_REQUEST
            )

    permission_classes = [IsAdminUser]

    def get(self, request):
        user = User.objects.filter(added_by_id=request.user.id).values("reference", "email")
        return Response(
                {
                    "message": user,
                    "success": True
                },
                status=status.HTTP_200_OK
            )
    permission_classes = [IsAdminUser]

    def patch(self, request):
        try:
            user_instance = User.objects.get(id= request.data['user_id'], added_by_id=request.user.id)
            user_instance.set_password(request.data['password'])
            user_instance.save()
            return Response(
                    {
                        "message": "updated successfully",
                        "success": True
                    },
                    status=status.HTTP_200_OK
                )
        except User.DoesNotExist:
            return Response(
                {
                    "message": "invalid user id",
                    "success": False
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {
                    "message": str(e) + "  field is required",
                    "success": False
                },
                status=status.HTTP_400_BAD_REQUEST
            )

    permission_classes = [IsAdminUser]

    def delete(self, request):
        try:
            user_instance = User.objects.get(id=request.data['user_id'], added_by_id=request.user.id)
            user_instance.delete()
            return Response(
                    {
                        "message": "deleted successfully",
                        "success": True
                    },
                    status=status.HTTP_200_OK
                )
        except User.DoesNotExist:
            return Response(
                {
                    "message": "invalid user id",
                    "success": False
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {
                    "message": str(e) + "  field is required",
                    "success": False
                },
                status=status.HTTP_400_BAD_REQUEST
            )