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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteListItem(request, type, listname, url_id):
    user = request.user

    # Get the item and list item to be deleted
    item = Item.objects.get_item(type=type, url_id=url_id)
    list_item = ListItem.objects.filter(user=user, item=item, type=type, list=listname).first()

    # Check if the list item exists
    if list_item is None:
        return Response({'error': 'List item not found.'}, status=404)

    # Delete the list item
    list_item.delete()

    return Response({'success': 'List item deleted successfully.'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ratingGet(request, type, url_id, title):
    user = request.user

    # Check if the item exists
    item = Item.objects.get_item(type=type, url_id=url_id)
    if item is None:
        # If the item doesn't exist, create a new one
        item = Item.objects.create_item(title=title, type=type, url_id=url_id)

    # Retrieve the rating for the item
    rating = Rating.objects.filter_ratings(user=user, item=item)

    serialized_rating = {
        "rating": rating
    }

    return Response(serialized_rating)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def lastRatings(request):
    user = request.user

    # Получаем последние 10 рейтингов пользователя
    ratings = Rating.objects.filter(user=user).order_by('-id')[:10]

    serialized_ratings = []
    for rating in ratings:
        item = rating.item
        serialized_rating = {
            "item_title": item.title,
            "item_type": item.type,
            "item_url_id": item.url_id,
            "score": rating.score
        }
        serialized_ratings.append(serialized_rating)

    return Response(serialized_ratings)
