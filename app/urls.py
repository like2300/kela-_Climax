from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

# ========== URL Configuration ==========
urlpatterns = [
    path('admin/', admin.site.urls),

    # Core app
    path('', include('core.urls')),

    # Progressive Web App
    path('', include('pwa.urls')),
]

# ========== Static & Media Files ==========
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # Django Browser Reload (dev only)
    urlpatterns += [path("__reload__/", include("django_browser_reload.urls"))]

# ========== Error Handlers ==========
handler404 = 'core.views_errors.handler404'
handler500 = 'core.views_errors.handler500'
handler403 = 'core.views_errors.handler403'
handler400 = 'core.views_errors.handler400'
