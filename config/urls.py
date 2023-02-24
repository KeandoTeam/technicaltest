from django.contrib import admin
from django.urls import path,include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

# api urls
urlpatterns = [
    path('api/v1/', include('back.urls')), 
    path('documentation', SpectacularSwaggerView.as_view(), name='doc'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
