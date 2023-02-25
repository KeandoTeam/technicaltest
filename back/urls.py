from django.urls import path
#urls app
from . import views as api

urlpatterns = [
   path('users', api.create_user, name="create_user"), 
   path('users/login', api.login, name="login"),
   path('usersList', api.get_users, name='usersList'),
   path('user/<int:id_user>', api.get_user, name="get_user"),
   path('users/<int:id_user>', api.update_user, name="update_user"),
   path('userDelete/<int:id_user>', api.delete_user, name="delete_user"),
]

