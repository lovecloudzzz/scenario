from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Item, User, List, ListItem, Rating


def list_info(request, user_id, list_id):
    user = get_object_or_404(User, id = user_id)
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
    return JsonResponse({'items_with_rating': items_with_rating})
