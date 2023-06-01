from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from Core.models import CustomUser
import requests

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        if user.avatar:
            token['avatar'] = user.avatar.url
        else:
            token['avatar'] = 'false'
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def userRegister(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    # Проверяем, что все необходимые поля указаны
    if not username or not password or not email:
        return Response({'error': 'Please provide username, password, and email'}, status=400)

    # Создаем нового пользователя
    try:
        user = CustomUser.objects.create_user(username=username, password=password, email=email)
    except Exception as e:
        return Response({'error': 'Такие логин или почта заняты'}, status=400)

    # Генерируем пару токенов
    data = {
        'username': username,
        'password': password
    }

    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def userUpdate(request):
    user = request.user

    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')
    extra_fields = request.data.get('extra_fields', {})

    result = CustomUser.objects.update_user_data(user, email=email, username=username, password=password, **extra_fields)
    return Response(result)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def avatarUpdate(request):
    user = request.user

    avatar = request.FILES.get('avatar')

    result = CustomUser.objects.update_avatar(user, avatar)
    return Response(result)
