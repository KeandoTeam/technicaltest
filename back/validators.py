from django import forms
# validator for created user
class myValidateUserCreate(forms.Form) :
    
    fullname = forms.CharField(max_length=100)
    date_birth = forms.DateField()
    mobile_phone = forms.CharField(max_length=15)
    email = forms.EmailField()
    password = forms.CharField(max_length=120)
    address = forms.CharField(max_length=80)
   