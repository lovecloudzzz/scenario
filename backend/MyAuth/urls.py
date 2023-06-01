from django.urls import path
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView
)
from . import views


urlpatterns = [
    path('api/token', MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register', views.userRegister),
    path('user/update', views.userUpdate),
    path('user/updateAvatar', views.avatarUpdate)
]