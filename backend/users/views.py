from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, BotSerializer, GoalSerializer, CustomFieldSerializer
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
from utils.helper import check_openai_api_key

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


# class BotCreateAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         data = request.data
#         data["user"] = request.user.id
#         goals_data = data.pop('add_goal', [])
#         serializer = BotSerializer(data=data)
#         if serializer.is_valid():
#             bot_instance = serializer.save()
#             for goal_data in goals_data:
#                 if 'goal_name' in goal_data:
#                     goal_data['bot'] = bot_instance.id
#                     goal_serializer = GoalSerializer(data=goal_data)
#                     if goal_serializer.is_valid():
#                         goal_serializer.save()
#                     else:
#                         # Handle goal validation errors
#                         bot_instance.delete()  # Delete the bot if goal creation fails
#                         return Response(goal_serializer.errors, status=400)
#                 elif 'field_name' in goal_data:
#                     goal_data['bot'] = bot_instance.id
#                     custom_field_serializer = CustomFieldSerializer(data=goal_data)
#                     if custom_field_serializer.is_valid():
#                         custom_field_serializer.save()
#                     else:
#                         # Handle custom field validation errors
#                         bot_instance.delete()  # Delete the bot if custom field creation fails
#                         return Response(custom_field_serializer.errors, status=400)
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)


# ----------------------------------------------
class BotCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        data["user"] = request.user.id
        goals_data = data.pop('add_goal', [])
        openai_key = check_openai_api_key(request.data['ai_key'])
        if openai_key is False:
            return Response({'message': 'The OpenAI API key you have entered is invalid!'}, status=400)
        serializer = BotSerializer(data=data)
        
        if serializer.is_valid():
            bot_instance = self.save_bot(serializer)
            if bot_instance:
                print(bot_instance, "xscjxjbvcbxjv")
                result = self.create_goals_and_fields(goals_data, bot_instance)
                if result.get('success'):
                    serializer.data['add_goal'] = result.get('data')
                    print(result.get('data'), "serializer.data ")
                    
                    return Response(serializer.data, status=201)
                else:
                    bot_instance.delete()
                    return Response(result['errors'], status=400)
            else:
                return Response("Failed to create bot", status=400)
        return Response(serializer.errors, status=400)

    def save_bot(self, serializer):
        if serializer.is_valid():
            return serializer.save()
        return None

    def create_goals_and_fields(self, goals_data, bot_instance):
        response = {'success': True, 'data': [], 'errors': []}
        for goal_data in goals_data:
            if 'goal_name' in goal_data:
                success, errors = self.create_goal(goal_data, bot_instance)
                if not success:
                    response['success'] = False
                    response['errors'] += errors
                    break
                else:
                    response['data'].append(goal_data)
            elif 'field_name' in goal_data:
                success, errors = self.create_custom_field(goal_data, bot_instance)
                if not success:
                    response['success'] = False
                    response['errors'] += errors
                    break
                else:
                    response['data'].append(goal_data)
            elif 'webhook_name' in goal_data:
                success, errors = self.create_webhook(goal_data, bot_instance)
                if not success:
                    response['success'] = False
                    response['errors'] += errors
                    break
                else:
                    response['data'].append(goal_data)
        return response

    def create_goal(self, goal_data, bot_instance):
        goal_data['bot'] = bot_instance.id
        goal_serializer = GoalSerializer(data=goal_data)
        if goal_serializer.is_valid():
            goal_serializer.save()
            return True, goal_data
        else:
            return False, goal_serializer.errors

    def create_custom_field(self, field_data, bot_instance):
        field_data['bot'] = bot_instance.id
        custom_field_serializer = CustomFieldSerializer(data=field_data)
        if custom_field_serializer.is_valid():
            custom_field_serializer.save()
            return True, []
        else:
            return False, custom_field_serializer.errors
        
    def create_webhook(self, webhook_data, bot_instance):

        webhook_data['bot'] = bot_instance.id
        custom_field_serializer = CustomFieldSerializer(data=webhook_data)
        if custom_field_serializer.is_valid():
            custom_field_serializer.save()
            return True, []
        else:
            return False, custom_field_serializer.errors



# class BotCreateAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         data = request.data
#         data["user"] = request.user.id
#         goals_data = data.pop('add_goal', [])

#         serializer = BotSerializer(data=data)

#         if serializer.is_valid():
#             bot_instance = self.save_bot(serializer)
#             if bot_instance:
#                 result = self.create_goals_and_fields(goals_data, bot_instance)
#                 if result.get('success'):
#                     return Response(serializer.data, status=201)
#                 else:
#                     bot_instance.delete()
#                     return Response(result['errors'], status=400)
#             else:
#                 return Response("Failed to create bot", status=400)
#         return Response(serializer.errors, status=400)

#     # ... Existing methods remain unchanged ...

#     def create_goals_and_fields(self, goals_data, bot_instance):
#         response = {'success': True, 'errors': []}
#         for goal_data in goals_data:
#             if goal_data.get('tag_name'):
#                 success, errors = self.create_goal(goal_data, bot_instance)
#             elif goal_data.get('field_name'):
#                 success, errors = self.create_custom_field(goal_data, bot_instance)
#             elif goal_data.get('trigger'):
#                 success, errors = self.create_webhook(goal_data, bot_instance)
#             else:
#                 continue

#             if not success:
#                 response['success'] = False
#                 response['errors'] += errors
#                 break
#         return response

    # The rest of the code remains unchanged

    # def create_webhook(self, webhook_data, bot_instance):
    #     webhook_data['bot'] = bot_instance.id
    #     webhook_serializer = WebhookSerializer(data=webhook_data)
    #     if webhook_serializer.is_valid():
    #         webhook_serializer.save()
    #         if 'headers' in webhook_data:
    #             headers_data = webhook_data['headers']
    #             if isinstance(headers_data, dict):
    #                 for key, value in headers_data.items():
    #                     header = {'bot': bot_instance.id, 'webhook': webhook_serializer.data['id'], 'headers': key, 'value': value}
    #                     header_serializer = WebhookHeadersSerializer(data=header)
    #                     if header_serializer.is_valid():
    #                         header_serializer.save()
    #                     else:
    #                         return False, header_serializer.errors
    #         return True, []
    #     else:
    #         return False, webhook_serializer.errors


# class BotCreateView(APIView):
#     def post(self, request):

#         data = request.data
#         data["user"] = request.user.id
#         openai_key = check_openai_api_key(request.data['ai_key'])
#         if openai_key is False:
#             return Response({'message': 'The OpenAI API key you have entered is invalid!'}, status=400)
#         serializer = BotSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)