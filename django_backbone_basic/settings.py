#    Copyright (c) 2010-2013 VisionHatch Technologies
#    @author Sid Azad   Email: sidazad@gmail.com  Twitter: @sid_azad
#
#    Permission is hereby granted, free of charge, to any person obtaining
#    a copy of this software and associated documentation files (the "Software"),
#    to deal in the Software without restriction, including without limitation
#    the rights to use, copy, modify, merge, publish, distribute, sublicense,
#    and/or sell copies of the Software, and to permit persons to whom the Software
#    is furnished to do so, subject to the following conditions:
#
#    The above copyright notice and this permission notice shall be included in
#    all copies or substantial portions of the Software.
#
#    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
#    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
#    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
#    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
#    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
#    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
#    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import traceback,os

BASE_DIR="/home/sid/eclipse_work"




DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@domain.com'),
)

MANAGERS = ADMINS

DATABASE_NAME = 'dbb'             # Or path to database file if using sqlite3.
DATABASE_USER = ''             # Not used with sqlite3.
DATABASE_PASSWORD = ''         # Not used with sqlite3.
DATABASE_HOST = ''             # Set to empty string for localhost. Not used with sqlite3.
DATABASE_PORT = ''             # Set to empty string for default. Not used with sqlite3.

PROJ_BASE_DIR=BASE_DIR

# MongoDB Connection

from mongoengine import connect

try:
    connect('dbb')
    print "connected to dbb..."
except Exception,ex:
    print "Could not connect"
    print traceback.print_exc()


# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1


STATIC_URL = '/static/'


# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"
#MEDIA_ROOT = '/var/www/localhost/htdocs/static/dbb/'

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = ''

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = '/media/'

EMAIL_HOST = 'localhost'
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
DEFAULT_FROM_EMAIL = 'xxxxxxxxx@xxx.com'
SERVER_EMAIL = 'xxxxxxxxx@xxx.com'


# Make this unique, and don't share it with anybody.
SECRET_KEY = 'h%ccr&9xad7x)5xs$4p$mbybb-r9b-5-ccsstm56v-abcdefg%'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django_backbone_basic.generic_templates.PystacheFilesystemLoader',
    'django_backbone_basic.generic_templates.PystacheAppDirectoriesLoader',
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)


STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
    #'/var/www/localhost/htdocs/static/',
)

# user authentication using mongoengine
AUTHENTICATION_BACKENDS = (
    'django_backbone_basic.dbb_user.DBBUserAuthBackend',
)


MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
)

SESSION_ENGINE='mongoengine.django.sessions'

ROOT_URLCONF = 'django_backbone_basic.urls'

TEMPLATE_DIRS = (
    "%s/vhsites/src/dbb/templates/"%PROJ_BASE_DIR
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.staticfiles',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django_backbone_basic',
    'tastypie',
    'tastypie_mongoengine',
)


# The number of days a password reset link is valid for
PASSWORD_RESET_TIMEOUT_DAYS = 0
