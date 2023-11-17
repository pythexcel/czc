from django.urls import path
from .views import (SignupAPI,
                    SigninAPI,
                    LogoutAPI,
                    ForgetPassword,
                    ResetPassword,
                    ManageUserAPI)

urlpatterns = [
    path("signup/", SignupAPI.as_view(), name="signup"),
    path("signin/", SigninAPI.as_view(), name="signin"),
    path("logout/", LogoutAPI.as_view(), name="logout"),
    path("forget-password/", ForgetPassword.as_view(), name="forget-password"),
    path("reset-password", ResetPassword.as_view(), name="rest-password"),
    path("create-user", ManageUserAPI.as_view(), name="create-user"),
]
