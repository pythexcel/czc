from django.urls import path
from .views import (SignupAPI,
                    SigninAPI,
                    LogoutAPI,
                    ForgetPassword,
                    ResetPassword,
                    ManageUserAPI,
                    OpenAIAPI,
                    )

urlpatterns = [
    path("signup/", SignupAPI.as_view(), name="signup"),
    path("signin/", SigninAPI.as_view(), name="signin"),
    path("logout/", LogoutAPI.as_view(), name="logout"),
    path("forget-password/", ForgetPassword.as_view(), name="forget-password"),
    path("reset-password", ResetPassword.as_view(), name="rest-password"),
    path("manage-user/", ManageUserAPI.as_view(), name="manage-user"),
    path("manage-user/<id>", ManageUserAPI.as_view(), name="manage-user"),
    path("manage-open-ai/", OpenAIAPI.as_view(), name="manage-open")

]
