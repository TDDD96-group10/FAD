import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class EmailSender:
    def __init__(self, gmail_user, app_password):
        """
        Initialize the EmailSender with Gmail credentials.
        :param gmail_user: Your Gmail email address.
        :param app_password: The generated App Password.
        """
        self.gmail_user = gmail_user
        self.app_password = app_password
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        self.domain = "@student.liu.se"

    def send_email(self, to_email, subject, body):
        """
        Sends an email using Gmail SMTP with App Password.
        :param to_email: Recipient email address.
        :param subject: Email subject.
        :param body: Email body content.
        """
        try:
            # Create Email Message
            msg = MIMEMultipart()
            msg["From"] = self.gmail_user
            msg["To"] = to_email
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain"))

            # Connect to Gmail SMTP Server
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()  # Upgrade to secure connection
            server.login(self.gmail_user, self.app_password)  # Log in with App Password
            server.sendmail(self.gmail_user, to_email, msg.as_string())  # Send email
            server.quit()
            print("✅ Email sent successfully!")

        except Exception as e:
            print("❌ Error:", e)
