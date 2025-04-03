from django.test import override_settings
import tempfile
import shutil
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from ..models.post_pdf import PostPdf
from ..models.program import Program
from ..models.user import User
from ..models.group import Group


TEMP_MEDIA_ROOT = tempfile.mkdtemp()

@override_settings(MEDIA_ROOT=TEMP_MEDIA_ROOT)
class PostPDFTestCase(TestCase):
    def setUp(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        self.program = Program.objects.create(name="D-Sek", atributes=self.valid_attributes)
        self.user =  User.objects.create(user_id="belba436", role="admin", program=self.program, atributes={'size': "m"})



    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(TEMP_MEDIA_ROOT)
        super().tearDownClass()

    def test_pdf_upload(self):
        fake_pdf = SimpleUploadedFile(
            "test.pdf", 
            b"%PDF-1.4 dummy content here",
            content_type="application/pdf"
        )

        post_pdf = PostPdf.objects.create(
            file_name="PDF Test",
            pdf=fake_pdf,
            author=self.user
        )

        self.assertTrue(post_pdf.pdf.name.startswith("pdfs/"))


    def test_create_program_and_add_post_pdf(self):
        self.valid_attributes = {"size": ["m", "s", "l"]}
        fake_pdf = SimpleUploadedFile(
            "test.pdf", 
            b"%PDF-1.4 dummy content here",
            content_type="application/pdf"
        )

        post_pdf = PostPdf.objects.create(
            file_name="PDF Test",
            pdf=fake_pdf,
            author=self.user,
            program=self.program
        )

        self.assertEqual(len(self.program.posts.all()), 1)