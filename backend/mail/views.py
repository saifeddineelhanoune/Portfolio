from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ContactSerializer

class ContactFormView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            # Save the contact form data to the database
            contact = serializer.save()
            
            # Send email notification
            try:
                send_mail(
                    subject=f"Portfolio Contact Form: {contact.subject}",
                    message=f"Name: {contact.name}\nEmail: {contact.email}\n\nMessage:\n{contact.message}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.DEFAULT_FROM_EMAIL],  # Send to yourself
                    fail_silently=False,
                )
                return Response(
                    {"message": "Your message has been sent successfully!"},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                # Still save the contact form even if email sending fails
                return Response(
                    {"message": "Your message was saved but there was an issue sending the email notification."},
                    status=status.HTTP_201_CREATED
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
