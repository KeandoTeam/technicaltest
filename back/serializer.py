from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User
# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('fullname', 'date_birth', 'address', 'password', 'mobile_phone', 'email')