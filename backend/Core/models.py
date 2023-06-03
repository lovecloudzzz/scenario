from django.core.files.storage import default_storage
from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
import urllib.parse


SCORE_CHOICES = [(i, i) for i in range(1, 11)]
TYPE_CHOICES = (
    ('anime', 'Anime'),
    ('serial', 'Serial'),
    ('film', 'Film'),
)
LIST_CHOICES = (
    ('planned', 'Planned'),
    ('dropped', 'Dropped'),
    ('deferred', 'Deferred'),
    ('viewed', 'Viewed'),
)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)

    def update_user_data(self, user, email=None, username=None, password=None, **extra_fields):
        if email:
            if self.model.objects.filter(email=email).exclude(pk=user.pk).exists():
                return {'error': 'User with this email already exists.'}
            user.email = email

        if username:
            if self.model.objects.filter(username=username).exclude(pk=user.pk).exists():
                return {'error': 'User with this username already exists.'}
            user.username = username

        if password:
            user.set_password(password)

        for field, value in extra_fields.items():
            setattr(user, field, value)

        user.save()

        if 'error' in extra_fields:
            return {'error': extra_fields['error']}
        else:
            return {'success': 'User data updated successfully.'}

    def get_user_by_username(self, username):
        try:
            return self.get(username=username)
        except self.model.DoesNotExist:
            return None

    def update_avatar(self, user, avatar):
        if user.avatar:
            default_storage.delete(user.avatar.name)

        # Save the new avatar file
        user.avatar = avatar
        user.save()

class CustomUser(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    objects = CustomUserManager()


class ItemManager(models.Manager):
    def create_item(self, title, type, url_id):
        item = self.create(title=urllib.parse.unquote(title), type=type, url_id=url_id)
        item.save(using=self._db)  # Сохранение элемента в базу данных
        return item

    def get_item(self, type, url_id):
        try:
            item = self.get(type=type, url_id=url_id)
            return item
        except Item.DoesNotExist:
            return None

    def filter_items(self, type):
        return self.filter(type=type)


class Item(models.Model):
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES)
    url_id = models.IntegerField()
    objects = ItemManager()


class ListItemManager(models.Manager):
    def add_to_list(self, user, item, type, list):
        listItem_obj = self.create(user=user, item=item, type=type, list=list)
        listItem_obj.save(using=self._db)
        return listItem_obj

    def filter_listItems(self, user, type, list):
        return self.filter(user=user, type=type, list=list)


class ListItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES)
    list = models.CharField(max_length=100, choices=LIST_CHOICES)
    objects = ListItemManager()


class RatingManager(models.Manager):
    def create_rating(self, user, item, score):
        rating, created = self.get_or_create(user=user, item=item, defaults={'score': score})

        if not created:
            rating.score = score
            rating.save(using=self._db)

        return rating

    def filter_ratings(self, user, item):
        rating = self.filter(user=user, item=item).first()
        return rating.score if rating else 0


class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    score = models.IntegerField(choices=SCORE_CHOICES)
    objects = RatingManager()


