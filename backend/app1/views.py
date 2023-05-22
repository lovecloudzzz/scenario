from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Item, User, List, ListItem, Rating
from django.contrib.auth.decorators import login_required

@login_required
def list_by_id(request, list_id):
    user = get_object_or_404(User, id = request.user.id)
    list_obj = get_object_or_404(List, id= list_id)
    list_items = ListItem.objects.filter_by_list_id(list=list_obj)
    items_with_rating = []

    for list_item in list_items:
        item = get_object_or_404(Item, id=list_item.item)
        rating = get_object_or_404(Rating, user=user,item=item)
        item_with_rating = {
            'title': item.title,
            'rating': rating.score
        }
        items_with_rating.append(item_with_rating)
    return JsonResponse({'data': items_with_rating})

@login_required
def user_info(request):
    user = get_object_or_404(User, id = request.user.id)
    data = {
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "avatar": user.avatar
    }
    return JsonResponse({'data': data})

def film_by_id(request, item_id):
    pass

def anime_by_id(request, item_id):
    pass

def serial_by_id(request, item_id):
    pass

def films_by_page(request, page):
    pass

def animes_by_page(request, page):
    pass

def serials_by_page(request, page):
    pass

def user_settings(request):
    pass

def user_profile(request):
    pass