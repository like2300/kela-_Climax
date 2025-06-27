from django.urls import path,include
from  core.views import IndexView,OfflineView

urlpatterns = [
    path('',IndexView.as_view(),name='index'),
    path('offline/', OfflineView.as_view(), name='offline'),
]