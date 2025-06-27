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















# core/views_errors.py ou dans views.py
from django.shortcuts import render

def handler404(request, exception):
    return render(request, 'errors/404.html', status=404)

def handler500(request):
    return render(request, 'errors/500.html', status=500)

def handler403(request, exception):
    return render(request, 'errors/403.html', status=403)

def handler400(request, exception):
    return render(request, 'errors/400.html', status=400)
