from django.core.management.base import BaseCommand
from portal.models import Program, Group, User, Post


class Command(BaseCommand):
    help = 'Initialize portal defaults'

    def handle(self, *args, **kwargs):
        program, _ = Program.objects.get_or_create(
            name="Default Program",
            attributes={"size": ["s", "m", "l"]}
        )
        group, _ = Group.objects.get_or_create(name="Default")

        user, _ = User.objects.get_or_create(
            user_id="teste123",
            attributes={"size": "m"},
            role="Default",
            program=program,
            group=group
        )

        post, _ = Post.objects.get_or_create(
            author=user,
            program=program,
            title="Welcome to the Program!",
            text="This is an important announcement for all new students.",
            send_notifcation=True
        )

        self.stdout.write(self.style.SUCCESS("✅ Portal initialized!"))
