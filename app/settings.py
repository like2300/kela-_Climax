"""
Django settings for app project.
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-bk!ch%r5ht%mg8o00$6=(la&k963or&+_76y78i&)o$q8d2$ek'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True  # Doit être True pour activer le rechargement

ALLOWED_HOSTS = ["*"]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_components',
    'pwa',
    'core',
]

# Ajout conditionnel de django_browser_reload uniquement en mode DEBUG
if DEBUG:
    INSTALLED_APPS += ['django_browser_reload']

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', 
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Ajout conditionnel du middleware de rechargement uniquement en mode DEBUG
if DEBUG:
    MIDDLEWARE += ["django_browser_reload.middleware.BrowserReloadMiddleware"]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'builtins': ['django_components.templatetags.component_tags'],
        },
    },
]

PWA_APP_NAME = 'Mon App Django'
PWA_APP_DESCRIPTION = "Consulter les résultats même hors-ligne"
PWA_APP_THEME_COLOR = '#063eb0'
PWA_APP_BACKGROUND_COLOR = '#ffffff'
PWA_APP_DISPLAY = 'standalone'
PWA_APP_SCOPE = '/'
PWA_APP_START_URL = '/'
PWA_APP_ICONS = [
    {
        'src': '/static/icons/android-icon-192x192.png',
        'sizes': '192x192',
        'type': 'image/png',
    },
    {
        'src': '/static/icons/android-icon-144x144.png',
        'sizes': '144x144',
        'type': 'image/png',
    },
]

PWA_SERVICE_WORKER_PATH = os.path.join(BASE_DIR, 'core/static/js/serviceworker.js')

WSGI_APPLICATION = 'app.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Components config
DJANGO_COMPONENTS = {
    "components_root": BASE_DIR / "app" / "components"
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'