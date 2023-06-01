from django.test import TestCase
from .models import CustomUser, Item, ListItem, Rating
from rest_framework.test import APIClient


class ModelTests(TestCase):
    def setUp(self):
        # Create test data for the models
        self.user = CustomUser.objects.create_user(
            email='test@example.com', username='testuser1', password='testpassword'
        )
        self.item = Item.objects.create_item(
            title='Test Item', type='anime', url_id=1
        )
        self.list_item = ListItem.objects.add_to_list(
            user=self.user, item=self.item, type='anime', list='Planned'
        )
        self.rating = Rating.objects.create_rating(
            user=self.user, item=self.item, score=8
        )

    def test_custom_user_creation(self):
        self.assertEqual(CustomUser.objects.count(), 1)

    def test_item_creation(self):
        self.assertEqual(Item.objects.count(), 1)

    def test_list_item_creation(self):
        self.assertEqual(ListItem.objects.count(), 1)

    def test_rating_creation(self):
        self.assertEqual(Rating.objects.count(), 1)

    def test_get_user_by_username(self):
        user = CustomUser.objects.get_user_by_username(username='testuser1')
        self.assertEqual(user, self.user)

    def test_filter_ratings(self):
        score = Rating.objects.filter_ratings(user=self.user, item=self.item)
        self.assertEqual(score, 8)

    def test_filter_ratings_nonexistent(self):
        score = Rating.objects.filter_ratings(user=self.user, item=Item.objects.create_item(
            title='Nonexistent Item', type='anime', url_id=2
        ))
        self.assertEqual(score, 0)

    def test_create_superuser(self):
        superuser = CustomUser.objects.create_superuser(
            email='admin@example.com', username='admin', password='adminpassword'
        )
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_staff)

    def test_update_user_data(self):
        updated_data = CustomUser.objects.update_user_data(
            user=self.user, email='updated@example.com', username='updateduser', password='newpassword'
        )
        self.assertIn('success', updated_data)
        self.assertEqual(updated_data['success'], 'User data updated successfully.')
        updated_user = CustomUser.objects.get_user_by_username(username='updateduser')
        self.assertEqual(updated_user.email, 'updated@example.com')

    def test_update_user_data_duplicate_email(self):
        duplicate_email_data = CustomUser.objects.update_user_data(
            user=self.user, email='test@example.com', username='updateduser', password='newpassword'
        )
        self.assertIn('success', duplicate_email_data)
        self.assertEqual(duplicate_email_data['success'], 'User data updated successfully.')

    def test_update_user_data_duplicate_username(self):
        duplicate_username_data = CustomUser.objects.update_user_data(
            user=self.user, email='updated@example.com', username='testuser1', password='newpassword'
        )
        self.assertIn('success', duplicate_username_data)
        self.assertEqual(duplicate_username_data['success'], 'User data updated successfully.')

    def test_get_item(self):
        retrieved_item = Item.objects.get_item(type='anime', url_id=1)
        self.assertEqual(retrieved_item, self.item)

    def test_get_item_nonexistent(self):
        nonexistent_item = Item.objects.get_item(type='anime', url_id=2)
        self.assertIsNone(nonexistent_item)

    def test_filter_items(self):
        filtered_items = Item.objects.filter_items(type='anime')
        self.assertEqual(len(filtered_items), 1)

    def test_filter_items_empty(self):
        filtered_items = Item.objects.filter_items(type='film')
        self.assertEqual(len(filtered_items), 0)

    def test_filter_list_items(self):
        filtered_list_items = ListItem.objects.filter_listItems(
            user=self.user, type='anime', list='Planned'
        )
        self.assertEqual(len(filtered_list_items), 1)

    def test_filter_list_items_empty(self):
        filtered_list_items = ListItem.objects.filter_listItems(
            user=self.user, type='anime', list='Dropped'
        )
        self.assertEqual(len(filtered_list_items), 0)



class FilmSerialViewsTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_films_view(self):
        response = self.client.get('/films/1')
        self.assertEqual(response.status_code, 200)

        # Add additional assertions based on the expected response data

    def test_film_or_serial_view(self):
        response = self.client.get('/film/123')
        self.assertEqual(response.status_code, 404)

        # Add additional assertions based on the expected response data

    def test_serials_view(self):
        response = self.client.get('/serials/1')
        self.assertEqual(response.status_code, 200)

        # Add additional assertions based on the expected response data

    def test_animes_view(self):
        response = self.client.get('/animes/1')
        self.assertEqual(response.status_code, 200)

        # Add additional assertions based on the expected response data

    def test_anime_view(self):
        response = self.client.get('/anime/123')
        self.assertEqual(response.status_code, 200)

        # Add additional assertions based on the expected response data
