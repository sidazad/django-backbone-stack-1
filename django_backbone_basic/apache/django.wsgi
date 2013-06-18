import os
import sys


base='/home/sid/eclipse_work'
path = '%s/vhsites/src/'%base
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'django_backbone_basic.settings'
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()

