from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from Core.models import Item, ListItem, Rating

User = get_user_model()


class UserListsViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(
            email='test1@example.com',
            username='testuser1',
            password='testpass1'
        )
        self.user2 = User.objects.create_user(
            email='test2@example.com',
            username='testuser2',
            password='testpass2'
        )
        self.item1 = Item.objects.create_item(
            title='Test Item 1',
            type='anime',
            url_id=1
        )
        self.item2 = Item.objects.create_item(
            title='Test Item 2',
            type='anime',
            url_id=2
        )
        self.list_item1 = ListItem.objects.add_to_list(
            user=self.user1,
            item=self.item1,
            type='anime',
            list='planned'
        )
        self.list_item2 = ListItem.objects.add_to_list(
            user=self.user2,
            item=self.item2,
            type='anime',
            list='planned'
        )
        self.rating1 = Rating.objects.create_rating(
            user=self.user1,
            item=self.item1,
            score=5
        )
        self.rating2 = Rating.objects.create_rating(
            user=self.user2,
            item=self.item2,
            score=8
        )

    def test_user_list(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.get('/api/user/list/anime/planned')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['url_id'], self.item1.url_id)
        self.assertEqual(response.data[0]['title'], self.item1.title)
        self.assertEqual(response.data[0]['rating'], self.rating1.score)

    def test_user_all_lists(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(f'/api/{self.user1.username}/lists')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)
        self.assertIn('anime', response.data)
        self.assertIn('planned', response.data['anime'])
        self.assertEqual(len(response.data['anime']['planned']), 1)
        self.assertEqual(response.data['anime']['planned'][0]['url_id'], self.item1.url_id)
        self.assertEqual(response.data['anime']['planned'][0]['title'], self.item1.title)
        self.assertEqual(response.data['anime']['planned'][0]['rating'], self.rating1.score)

    def test_user_all_type_lists(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(f'/api/{self.user1.username}/anime/lists')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 4)
        self.assertIn('planned', response.data)
        self.assertEqual(len(response.data['planned']), 1)
        self.assertEqual(response.data['planned'][0]['url_id'], self.item1.url_id)
        self.assertEqual(response.data['planned'][0]['title'], self.item1.title)
        self.assertEqual(response.data['planned'][0]['rating'], self.rating1.score)

    def test_item_add_to_list(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.post('/api/user/add/anime/planned/1/Test Item')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(ListItem.objects.count(), 3)

    def test_rating_add(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.post('/api/user/rating/anime/1/Test Item/8')
        self.assertEqual(response.status_code, 200)
        rating = Rating.objects.filter_ratings(user=self.user1, item=self.item1)
        self.assertEqual(rating, 5)
