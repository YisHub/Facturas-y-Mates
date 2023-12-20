from django.urls import path
from core.homepage.views import *



urlpatterns = [
    path('', IndexViews.as_view(), name='home'),
    path('about/', AboutViews.as_view(), name='about'),
    path('products/', ProductsViews.as_view(), name='products'),

]