from django.core.management.base import BaseCommand
from portal.models import Program, Group, User, Post, PostPdf
import os


class Command(BaseCommand):
    help = 'Initialize portal defaults'

    def handle(self, *args, **kwargs):
        program, _ = Program.objects.get_or_create(
            name="Default Program",
            attributes={"size": ["XS", "S", "M", "L", "XL"], "age": "ALL", "Matpreferens": ["Vegan", "Laktos", "Fisk"]}
        )
        group, _ = Group.objects.get_or_create(name="Default")

        userAdmin, _ = User.objects.get_or_create(
            user_id="admin123",
            first_name="Admin",
            last_name="Adminsson",
            attributes={"size": "M", "age": "22", "Matpreferens": []},
            role="Admin",
            program=program,
            group=group
        )


        user, _ = User.objects.get_or_create(
            user_id="antan123",
            first_name="Anton",
            last_name="Antonsson",
            attributes={"size": "L", "age": "22", "Matpreferens":["Laktos", "Fisk"]},
            role="Default",
            program=program,
            group=group,
            phone_number="0701234567",
            email="antan123@student.liu.se"
        )
        user1, _ = User.objects.get_or_create(
            user_id="berbe123",
            first_name="Bertil",
            last_name="Bertilsson",
            attributes={"size": "M", "age": "22", "Matpreferens":[]},
            role="Default",
            program=program,
            group=group,
            phone_number="0701234567",
            email="berbe123@student.liu.se"
        )
        user2, _ = User.objects.get_or_create(
            user_id="cecce123",
            first_name="Cecilia",
            last_name="Ceciliasson",
            attributes={"size": "S", "age": "22", "Matpreferens":["Vegan"]},
            role="Default",
            program=program,
            group=group,
            phone_number="0701234567",
            email="cecce123@student.liu.se"
        )
        user3, _ = User.objects.get_or_create(
            user_id="davda123",
            first_name="David",
            last_name="Davidsson",
            attributes={"size": "XS", "age": "22", "Matpreferens":[]},
            role="Default",
            program=program,
            group=group,
            phone_number="0701234567",
            email="davda123@student.liu.se"
        )
        user5, _ = User.objects.get_or_create(
            user_id="erier123",
            first_name="Erik",
            last_name="Eriksson",
            attributes={"size": "L", "age": "22", "Matpreferens":[]},
            role="Default",
            program=program,
            group=group,
            phone_number="0701234567",
            email="erier123@student.liu.se"
        )

        """post, _ = Post.objects.get_or_create(
            author=userAdmin,
            program=program,
            title="Welcome to the Program! ",
            text="This is an important announcement for all new students.here comes the ss",
            send_notifcation=True,
            start_time="2025-04-16 14:00:00+00:00"
        )"""

        post1, _ = Post.objects.get_or_create(
            author=userAdmin,
            program=program,
            title="Campusvandring",
            text="Vi går runt på campus",
            send_notifcation=False
        )

        post2, _ = Post.objects.get_or_create(
            author=userAdmin,
            program=program,
            title="Hajken",
            text="Det är ju hajken!",
            send_notifcation=False
        )

        post3, _ = Post.objects.get_or_create(
            author=userAdmin,
            program=program,
            title="Hoben",
            text="Gott med öl!",
            send_notifcation=False
        )

        postPdf, _ = PostPdf.objects.get_or_create(
            author=userAdmin,
            program=program,
            title="Mottagningspolicyn 2025",
            text="Här kommer policyn för mottagningen 2025",
            send_notifcation=True,
            file_name="Mottagningspolicyn-2025.pdf",
        )

        current_dir = os.path.dirname(__file__)
        file_path = os.path.join(current_dir, 'Mottagningspolicyn-2025.pdf')
        with open(file_path, 'rb') as f:
            postPdf.pdf.save('Mottagningspolicyn-2025.pdf', f, save=True)
        self.stdout.write(self.style.SUCCESS("✅ Portal initialized!"))
