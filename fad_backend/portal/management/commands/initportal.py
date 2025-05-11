from django.core.management.base import BaseCommand
from portal.models import Program, Group, User, Post, PostPdf
import os


class Command(BaseCommand):
    help = 'Initialize portal defaults'

    def handle(self, *args, **kwargs):
        program, _ = Program.objects.get_or_create(
            name="Default Program",
            attributes={"size": ["s", "m", "l"], "age": "ALL", "deaite_list": ["vegan", "laktos", "Fish"]}
        )
        group, _ = Group.objects.get_or_create(name="Default")

        user, _ = User.objects.get_or_create(
            user_id="teste112",
            attributes={"size": "m", "age": "22", "deaite_list":["laktos", "Fish"]},
            role="Default",
            program=program,
            group=group
        )

        post, _ = Post.objects.get_or_create(
            author=user,
            program=program,
            title="Welcome to the Program! ",
            text="This is an important announcement for all new students.here comes the ss",
            send_notifcation=True,
            start_time="2025-04-16 14:00:00+00:00"
        )

        postPdf, _ = PostPdf.objects.get_or_create(author=user,
            program=program,
            title="Welcome to the Program!",
            text="This is an important announcement for all new students.Here comes the pdf",
            send_notifcation=True,
            start_time="2025-04-16 14:00:00+00:00",
            file_name="pdf.pdf",
            )
        
        current_dir = os.path.dirname(__file__)
        file_path = os.path.join(current_dir, 'pdf.pdf')
        with open(file_path, 'rb') as f:
            postPdf.pdf.save('pdf.pdf', f, save=True)
        self.stdout.write(self.style.SUCCESS("✅ Portal initialized!"))
