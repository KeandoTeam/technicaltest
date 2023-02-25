from django.db import models

# model to user
class User(models.Model):
    
    fullname = models.CharField(max_length=100)
    date_birth = models.CharField(max_length=15)
    address = models.CharField(max_length=80, )
    token = models.CharField(max_length=100, null=False)
    password = models.CharField(max_length=120)
    mobile_phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=70, unique=True)
    
