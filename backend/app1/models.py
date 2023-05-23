from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import UserManager
from django.db import models

TYPE_CHOICES = (
    ('anime', 'Anime'),
    ('serial', 'Serial'),
    ('film', 'Film'),
)


class MyUserManager(UserManager):
    def _create_user(self, email, password, username, commit=True, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        if commit:
            user.save(using=self._db)
        return user

    def create_user(self, email, password=None, username=None, **extra_fields):
        return self._create_user(email, password, username, **extra_fields)


class User(AbstractBaseUser):
    objects = MyUserManager()
    email = models.EmailField(unique=True, null=True)
    username = models.CharField(max_length=255, unique=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    lists = models.ManyToManyField("List")


class ListManager(models.Manager):
    def filter_by_type(self, user, title__type):
        return self.filter(user=user, type=title__type)


class List(models.Model):
    objects = ListManager()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    items = models.ManyToManyField("Item", through='ListItem')
    type = models.CharField(max_length=100, choices=TYPE_CHOICES)


class Item(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class ListItemManager(models.Manager):
    def filter_by_list_id(self, list_id):
        return self.filter(list__id=list_id)


class ListItem(models.Model):
    objects = ListItemManager()
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)


class ViewedManager(models.Manager):
    def filter_by_list_id(self, list_id):
        return self.filter(list__id=list_id)


class Viewed(models.Model):
    objects = ViewedManager()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES)


class PlannedManager(models.Manager):
    def filter_by_list_id(self, list_id):
        return self.filter(list__id=list_id)


class Planned(models.Model):
    objects = PlannedManager()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES)


class DroppedManager(models.Manager):
    def filter_by_list_id(self, list_id):
        return self.filter(list__id=list_id)


class Dropped(models.Model):
    objects = DroppedManager()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES)


class DeferredManager(models.Manager):
    def filter_by_list_id(self, list_id):
        return self.filter(list__id=list_id)


class Deferred(models.Model):
    objects = DeferredManager()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES)


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    score = models.IntegerField()


class News(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    banner = models.ImageField(upload_to='banner/', blank=True, null=True)
