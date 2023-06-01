from django.urls import path
from . import views

urlpatterns = [
    path('films/<int:page>', views.films),
    path('film/<int:id>', views.filmOrSerial),
    path('serials/<int:page>', views.serials),
    path('serial/<int:id>', views.filmOrSerial),
    path('animes/<int:page>', views.animes),
    path('anime/<int:id>', views.anime),
]

# path('user/<str:username>', ),
# path('user/settings', )