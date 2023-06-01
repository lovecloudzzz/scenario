import os
import re

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

import requests


KP_API_TOKEN = os.getenv("X-API-KEY2")
SHIKI_TOKEN = os.getenv("SHIKI_TOKEN")

@api_view(['GET'])
def filmOrSerial(request, id):
    # Выполнение запроса к API
    headers = {
        'X-API-KEY': KP_API_TOKEN,
        'Content-Type': 'application/json',
    }
    response = requests.get(f"https://api.kinopoisk.dev/v1.3/movie/{id}", headers=headers)
    # Проверка статуса ответа
    if response.status_code == 200:
        # Извлечение полей из JSON-документа
        data = response.json()

        # Создание словаря с нужными полями
        film_data = {
            'id': data.get('id'),
            'name': data.get('name'),
            'year': data.get('year'),
            'description': data.get('description'),
            'score': data.get('rating', {}).get('kp'),
            'rating': data.get('ratingMpaa'),
            'poster': data.get('poster', {}).get('url'),
            'genres': [genre.get('name') for genre in data.get('genres', [])],
            'similar': [{'id': movie.get('id'), 'name': movie.get('name'), 'poster': movie.get('poster', {}).get('url')} for movie in data.get('similarMovies', [])]
        }

        # Отправка словаря в качестве ответа
        return Response(film_data)
    else:
        return Response(status=response.status_code)


@api_view(['GET'])
def films(request, page):
    params = {
        'page': page,
        'type': 'movie',
        'limit': '30'
    }
    headers = {
        'X-API-KEY': KP_API_TOKEN,
        'Content-Type': 'application/json',
    }
    response = requests.get('https://api.kinopoisk.dev/v1.3/movie', params=params, headers=headers)

    if response.status_code == 200:
        response_data = response.json()
        # Проверяем наличие фильмов/сериалов в ответе
        if 'docs' in response_data:
            films_data = []

            # Итерируемся по каждому фильму/сериалу
            for film in response_data['docs']:
                # Проверяем наличие полей 'poster', 'year', 'description', 'rating', 'genres' и 'names'
                if 'poster' in film and 'year' in film and 'description' in film and 'rating' in film and 'genres' in film and 'names' in film:
                    ru_name = next((name['name'] for name in film['names'] if name.get('language') == 'RU'), None)
                    if ru_name:
                        film_data = {
                            'id': film['id'],
                            'poster': film['poster']['url'],
                            'year': film['year'],
                            'description': film['description'],
                            'score': film['rating']['kp'],
                            'genres': [genre['name'] for genre in film['genres']],
                            'name': ru_name
                        }
                        films_data.append(film_data)

            return Response(films_data)

    return Response(status=response.status_code)


@api_view(['GET'])
def serials(request, page):
    params = {
        'page': page,
        'type': 'tv-series',
        'limit': '50'
    }
    headers = {
        'X-API-KEY': KP_API_TOKEN,
        'Content-Type': 'application/json',
    }
    response = requests.get('https://api.kinopoisk.dev/v1.3/movie', params=params, headers=headers)

    if response.status_code == 200:
        response_data = response.json()
        # Проверяем наличие фильмов/сериалов в ответе
        if 'docs' in response_data:
            films_data = []

            # Итерируемся по каждому фильму/сериалу
            for film in response_data['docs']:
                # Проверяем наличие полей 'poster', 'year', 'description', 'rating', 'genres' и 'names'
                if 'poster' in film and 'year' in film and 'description' in film and 'rating' in film and 'genres' in film and 'names' in film:
                    ru_name = next((name['name'] for name in film['names'] if name.get('language') == 'RU'), None)
                    if ru_name:
                        film_data = {
                            'id': film['id'],
                            'poster': film['poster']['url'],
                            'year': film['year'],
                            'description': film['description'],
                            'rating': film['rating']['kp'],
                            'genres': [genre['name'] for genre in film['genres']],
                            'ru_name': ru_name
                        }
                        films_data.append(film_data)

            return Response(films_data)

    return Response(status=response.status_code)



@api_view(['GET'])
@permission_classes([AllowAny])
def anime(request, id):
    headers = {
        'User-Agent': 'Api Test',
        'Authorization': SHIKI_TOKEN
    }
    url = f"https://shikimori.me/api/animes/{id}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        name = data.get('russian')
        poster = str('https://shikimori.me/'+data.get('image', {}).get('original'))
        score = data.get('score')
        year = data.get('aired_on')[:4] if data.get('aired_on') else 3000
        rating = data.get('rating')
        description = data.get('description')
        genres = [genre.get('name') for genre in data.get('genres', [])]

        clean_description = re.sub(r'(\[.*?\]|\r\n|[\[\]])', '', description)

        anime_data = {
            'name': name,
            'poster': poster,
            'score': score,
            'year': year,
            'rating': rating,
            'description': clean_description,
            'genres': genres,
        }

        # Отправка дополнительного запроса для получения похожих аниме
        similar_url = f"https://shikimori.me/api/animes/{id}/similar"
        similar_response = requests.get(similar_url, headers=headers)
        if similar_response.status_code == 200:
            similar_data = similar_response.json()
            similar_anime = []
            for similar in similar_data:
                similar_name = similar.get('russian')
                similar_poster = str('https://shikimori.me/'+similar.get('image', {}).get('original'))
                similar_year = similar.get('aired_on')[:4] if similar.get('aired_on') else 3000
                similar_id = similar.get('id')

                similar_anime.append({
                    'name': similar_name,
                    'poster': similar_poster,
                    'year': similar_year,
                    'id': similar_id
                })

            anime_data['similar'] = similar_anime

        return Response(anime_data)
    else:
        return Response(status=response.status_code)



@api_view(['GET'])
@permission_classes([AllowAny])
def animes(request, page):
    params = {
        'page': page,
        'limit': '18',
        'order': 'ranked'
    }
    headers = {
        'User-Agent': 'Api Test',  # Замените 'YourAppName' на имя вашего OAuth2-приложения
        'Authorization': SHIKI_TOKEN  # Замените 'ACCESS_TOKEN' на ваш полученный Access Token
    }
    url = f"https://shikimori.me/api/animes"
    # Выполнение запроса к API
    response = requests.get(url, headers=headers, params=params)
    # Проверка статуса ответа
    if response.status_code == 200:
        # Извлечение полей из JSON-документа
        data = response.json()
        anime_data_list = []

        for anime in data:
            anime_id = anime.get('id')

            # Выполнение запроса для получения данных по каждому id
            anime_url = f"https://shikimori.me/api/animes/{anime_id}"
            anime_response = requests.get(anime_url, headers=headers)

            if anime_response.status_code == 200:
                anime_data = anime_response.json()
                name = anime_data.get('russian')
                poster = str('https://shikimori.me/'+anime_data.get('image', {}).get('original'))
                score = anime_data.get('score')
                year = anime_data.get('aired_on')[:4] if anime_data.get('aired_on') else 3000
                description = anime_data.get('description')
                genres = [genre.get('name') for genre in anime_data.get('genres', [])]

                clean_description = re.sub(r'(\[.*?\]|\r\n|[\[\]])', '', description)

                # Создание словаря с нужными полями
                anime_data_dict = {
                    'id': anime_id,
                    'name': name,
                    'poster': poster,
                    'score': score,
                    'year': year,
                    'description': clean_description,
                    'genres': genres,
                }

                anime_data_list.append(anime_data_dict)

        # Преобразование списка словарей в JSON-строку

        # Отправка JSON-строки в качестве ответа
        return Response(anime_data_list)
    else:
        return Response(status=response.status_code)
