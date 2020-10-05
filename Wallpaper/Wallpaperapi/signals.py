from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
@receiver(user_logged_in)
def user_logged_in send_token(sender, user, request, **kwargs):
     #token,_=Token.objects.get_or_create(user=user)
     print("signal recied")