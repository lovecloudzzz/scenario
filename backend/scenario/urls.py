"""
URL configuration for scenario project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from backend.app1 import views

urlpatterns = [
    path('', views.home),
    path('admin/', admin.site.urls),
    path('films/', views.films_by_page),
    path('films/shedule', views.films_schedule),
    path('film/<int:id>', views.film_by_id),
    path('animes/', views.animes_by_page),
    path('animes/shedule', views.animes_schedule),
    path('anime/<int:id>', views.anime_by_id),
    path('serials/', views.serials_by_page),
    path('serials/shedule', views.serials_schedule),
    path('serial/<int:id>', views.serial_by_id),
    path('user/<str:username>/', views.user_profile),
    path('user/<str:username>/settings', views.user_settings),
    path('user/<str:username>/list/<int:list_id>', views.list_by_id),
    path('user/<str:username>/lists/<str:type>', views.lists_by_type),

]
