import os

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Item, User, List, ListItem, Rating
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import requests


KP_API_TOKEN = os.getenv("X-API-KEY")

@login_required
def home(request):
    pass


@login_required
def user_settings(request, username):
    user = get_object_or_404(User, username=username)
    data = {
        "username": user.username,
    }
    data = {
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "avatar": user.avatar
    }
    return JsonResponse({'data': data})


@login_required
def user_profile(request, username):
    user = get_object_or_404(User, username=username)
    data = []


@login_required
def lists_by_type(request, username, title__type):
    user = get_object_or_404(User, username=username)
    lists = List.objects.filter_by_type(user=user, type=title__type)
    data = []
    for i in lists:
        list_info = {
            'title': i.title,
            'id': i.id
        }
        data.append(list_info)
    return JsonResponse({'data': data})


@login_required
def list_by_id(request, username, list_id):
    user = get_object_or_404(User, username=username)
    list_obj = get_object_or_404(List, id=list_id)
    list_items = ListItem.objects.filter_by_list_id(list=list_obj)
    items_with_rating = []

    for list_item in list_items:
        item = get_object_or_404(Item, id=list_item.item)
        rating = get_object_or_404(Rating, user=user, item=item)
        item_with_rating = {
            'title': item.title,
            'rating': rating.score
        }
        items_with_rating.append(item_with_rating)
    return JsonResponse({'data': items_with_rating})


def film_by_id(request, item_id):
    r = requests.get(f"https://kinopoiskapiunofficial.tech/api/v2.2/films/{item_id}",headers={
        'X-API-KEY': KP_API_TOKEN,
        'Content-Type': 'application/json',
    }
                     )
    return r


def anime_by_id(request, item_id):
    r = requests.get(f"https://shikimori.me/api/animes/{item_id}")
    return r


def serial_by_id(request, item_id):
    r = requests.get(f"https://kinopoiskapiunofficial.tech/api/v2.2/films/{item_id}", headers={
        'X-API-KEY': KP_API_TOKEN,
        'Content-Type': 'application/json',
    }
                     )
    return r


def films_by_page(request, page):
    r = requests.get(f"https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&page={page}", headers={
        'X-API-KEY': KP_API_TOKEN,
        'Content-Type': 'application/json',
    }
                     )
    return r


def animes_by_page(request, page):
    r = requests.get(f"https://shikimori.me/api/animes?limit=15&page={page}")
    return r


def serials_by_page(request, page):
    r = requests.get(f"https://kinopoiskapiunofficial.tech/api/v2.2/films?type=TV_SERIES&page={page}", headers={
        'X-API-KEY': KP_API_TOKEN,
        'Content-Type': 'application/json',
    }
                     )
    return r


def animes_schedule(request):
    pass


def films_schedule(request):
    pass


def serials_schedule(request):
    pass
