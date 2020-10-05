from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
from .models import  Register
from django.contrib.auth.hashers import check_password

class UserBackend(ModelBackend):

    def authenticate(request,**kwargs):
        email = kwargs['email']
        password = kwargs['password']
        try:
            customer = Register.objects.get(email=email)
            if check_password(encoded=customer.password,password=password):
                return customer
        except Register.DoesNotExist:
            pass


