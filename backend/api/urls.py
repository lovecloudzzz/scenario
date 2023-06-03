from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API Documentation",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/doc/swagger<str:format>', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/doc/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/doc/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/<str:username>/lists', views.userAllLists, name='user-all-lists'),
    path('api/user/list/<str:type>/<str:listname>', views.userList, name='user-list'),
    path('api/<str:username>/<str:type>/lists', views.userAllTypeLists, name='user-all-type-lists'),
    path('api/user/add/<str:type>/<str:listname>/<int:id>/<str:title>', views.itemAddToList, name='item-add-to-list'),
    path('api/user/rating/<str:type>/<int:id>/<str:title>/<int:score>', views.ratingAdd, name='rating-add'),
]
from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API Documentation",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/doc/swagger<str:format>', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/doc/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/doc/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/<str:username>/lists', views.userAllLists, name='user-all-lists'),
    path('api/user/list/<str:type>/<str:listname>', views.userList, name='user-list'),
    path('api/<str:username>/<str:type>/lists', views.userAllTypeLists, name='user-all-type-lists'),
    path('api/user/add/<str:type>/<str:listname>/<int:id>/<str:title>', views.itemAddToList, name='item-add-to-list'),
    path('api/user/rating/<str:type>/<int:id>/<str:title>/<int:score>', views.ratingAdd, name='rating-add'),
    path('api/user/delete/<str:type>/<str:listname>/<int:url_id>', views.deleteListItem),
    path('api/user/rating/<str:type>/<int:url_id>/<str:title>', views.ratingGet),
    path('api/user/last-ratings', views.lastRatings, name='last-ratings'),
]
