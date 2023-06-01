from django.contrib import admin

from .models import Item, ListItem, Rating, CustomUser

admin.site.register(Item)
admin.site.register(ListItem)
admin.site.register(Rating)
admin.site.register(CustomUser)