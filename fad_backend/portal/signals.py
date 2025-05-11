from django.dispatch import receiver
from .models.user import User
from fad_backend.signals import  token_created


@receiver(token_created)
def enrich_token_with_admin(sender, token, user, **kwargs):
        print(user)
        try:
            user_object = User.objects.get(pk=user.liu_id)
        except User.DoesNotExist:
            user_object = None 
        if user_object:
            token["is_admin"] = user_object.role == "admin"
            token["program"] = user_object.program.id
            token["liu_id"] = user.liu_id