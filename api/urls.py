from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('gets', views.trial),
    path('getUserData/<int:pk>', views.getLoginUserData),
    path('getPerformance/<int:pk>', views.getPerformance),
    path('getTopUsers', views.getTopUsers),
    path('getProfileData/<int:pk>', views.edit_profile),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]