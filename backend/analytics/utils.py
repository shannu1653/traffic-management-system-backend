from django.core.mail import send_mail
from django.conf import settings

def send_notification(subject, message, recipients):
    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        recipients,
        fail_silently=True,
    )
