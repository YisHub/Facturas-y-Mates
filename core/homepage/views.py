from django.shortcuts import render

from django.views.generic import TemplateView

# Create your views here.
class IndexViews(TemplateView):
    template_name = 'index.html'
class AboutViews(TemplateView):
    template_name = 'about.html'
class ProductsViews(TemplateView):
    template_name = 'products.html'