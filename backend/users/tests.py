from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from users.models import User
from django.contrib.auth.hashers import make_password


class SignUpViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/signup/'

    def test_signup_success(self):
        payload = {
            'email': 'user@mailnator.com',
            'password': 'user@123',
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)                                  
        self.assertEqual(response.data['message'], 'User Created.')
        user = User.objects.get(email=payload['email'])
        self.assertEqual(user.email, payload['email'])

    def signup_with_invalid_data(self):
        payload = {
            'email': 'userexample.com',
            'password': 'user@123',
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_signup_duplicate_email(self):
        User.objects.create(
            email='user1@malinator.com',
            password='testpassword',
        )
        payload = {
            'email': 'user1@malinator.com',
            'password': 'testpassword2',
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_signup_password_encryption(self):
        payload = {
            'email': 'test_user@mailinator.com',
            'password': 'test_user@123',
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(email=payload['email'])
        self.assertTrue(user.check_password(payload['password']))


class SignInTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/signin/'
        self.username = 'testuser@example.com'
        self.password = 'Testpassword@123'
        self.user = User.objects.create(
            email=self.username, password=make_password(self.password)
        )

    def test_signin_success(self):
        payload = {
            'username': self.username,
            'password': self.password,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Login successfully')

    def test_signin_invalid_data(self):
        payload = {
            'username': "testuser@excom",
            'password': self.password,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_signin_invalid_password(self):
        payload = {
            'username': self.username,
            'password': "ghgjhgjhgj",
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_with_missing_dat(self):
        payload = {}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)