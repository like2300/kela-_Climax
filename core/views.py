from django.shortcuts import render, redirect
from django.http import HttpResponse 
from django.views.generic import TemplateView
from django.views.generic.edit import CreateView
from django.views.generic.edit import UpdateView
from django.views.generic.edit import DeleteView
from django.views.generic.list import ListView
from django.views.generic import RedirectView

# Create your views here.

class IndexView(TemplateView):
    template_name = 'startviews/start.html'

class OfflineView(TemplateView):
    template_name = 'offline.html'













