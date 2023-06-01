from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from Core.models import Item, ListItem, Rating, TYPE_CHOICES, LIST_CHOICES, CustomUser


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def userList(request, type, listname):
    user = request.user
    list_items = ListItem.objects.filter_listItems(user=user, type=type, list=listname)

    serialized_list_items = []
    for list_item in list_items:
        item = list_item.item
        rating = Rating.objects.filter_ratings(user=user, item=item)
        serialized_list_item = {
            "url_id": item.url_id,
            "title": item.title,
            "rating": rating
        }
        serialized_list_items.append(serialized_list_item)
    return Response(serialized_list_items)


@api_view(['GET'])
def userAllLists(request,username):
    user = CustomUser.objects.get_user_by_username(username)
    if not user:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    types = [choice[0] for choice in TYPE_CHOICES]
    listnames = [choice[0] for choice in LIST_CHOICES]

    serialized_lists = {}
    for type in types:
        type_lists = {}
        for listname in listnames:
            list_items = ListItem.objects.filter_listItems(user=user, type=type, list=listname)
            serialized_list_items = []
            for list_item in list_items:
                item = list_item.item
                rating = Rating.objects.filter_ratings(user=user, item=item)
                serialized_list_item = {
                    "url_id": item.url_id,
                    "title": item.title,
                    "rating": rating
                }
                serialized_list_items.append(serialized_list_item)
            type_lists[listname] = serialized_list_items
        serialized_lists[type] = type_lists

    return Response(serialized_lists)

@api_view(['GET'])
def userAllTypeLists(request, username, type):
    user = CustomUser.objects.get_user_by_username(username)
    if not user:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    listnames = [choice[0] for choice in LIST_CHOICES]

    serialized_lists = {}
    for listname in listnames:
        list_items = ListItem.objects.filter_listItems(user=user, type=type, list=listname)
        serialized_list_items = []
        for list_item in list_items:
            item = list_item.item
            rating = Rating.objects.filter_ratings(user=user, item=item)
            serialized_list_item = {
                "url_id": item.url_id,
                "title": item.title,
                "rating": rating
            }
            serialized_list_items.append(serialized_list_item)
        serialized_lists[listname] = serialized_list_items

    return Response(serialized_lists)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def itemAddToList(request, type, listname, id, title):
    user = request.user

    # Проверяем, существует ли элемент с заданным ID
    try:
        item = Item.objects.get_item(type=type, url_id=id)
        if item == None:
            raise Item.DoesNotExist
    except Item.DoesNotExist:
        # Если элемент не существует, создаем новый
        item = Item.objects.create_item(title=title, type=type, url_id=id)

    # Создаем ListItem с заданными значениями
    list_item = ListItem.objects.add_to_list(user=user, item=item, type=type, list=listname)

    return Response({'success': 'Item added to list'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ratingAdd(request, type, id, title, score):
    user = request.user

    # Проверяем, существует ли объект Item с заданными значениями type и url_id
    item = Item.objects.get_item(type=type, url_id=id)

    # Если объект не найден, создаем новый с указанным title
    if item == None:
        item = Item.objects.create_item(title=title, type=type, url_id=id)

    rating = Rating.objects.create_rating(user=user, item=item, score=score)
    return Response({'success': 'Rating added'})