from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from phonenumber_field.modelfields import PhoneNumberField
from django.db import models


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
    REQUIRED_FIELDS = []


class List(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    items = models.ManyToManyField("Item", through='ListItem')

    def __str__(self):
        return self.title


class Item(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    score = models.IntegerField()

    def __str__(self):
        return f"Rating {self.id}"

class ListItemManager(models.Manager):
    def filter_by_list_id(self, list_id):
        return self.filter(list__id=list_id)

class ListItem(models.Model):
    objects = ListItemManager()
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

    def __str__(self):
        return f"ListItem {self.id}"


class News(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title
