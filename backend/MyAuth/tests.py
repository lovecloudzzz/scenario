from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from Core.models import CustomUser

class AuthenticationTests(APITestCase):

    def test_user_register(self):
        url = reverse('user-register')
        data = {
            'username': 'Testuser',
            'password': 'Testpassword',
            'email': 'test@example.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_token_obtain_pair(self):
        url = reverse('token_obtain_pair')  # Update the URL pattern name here
        data = {
            'username': 'Cursed21312',
            'password': 'mSDASDADASDAsdad1'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_token_obtain_pair_invalid_credentials(self):
        url = reverse('token_obtain_pair')  # Update the URL pattern name here
        data = {
            'username': 'invaliduser',
            'password': 'invalidpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
