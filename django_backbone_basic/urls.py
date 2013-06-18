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
from django.conf.urls.defaults import *
from mongo_models import NotesResource

from tastypie import api

v1_api = api.Api(api_name='v1')
v1_api.register(NotesResource())

urlpatterns = patterns('',
    (r'^login', 'django_backbone_basic.views.dologin'),
    (r'^signup', 'django_backbone_basic.views.signup'),
    (r'^doLogout', 'django_backbone_basic.views.doLogout'),
    (r'^dashboard.html', 'django_backbone_basic.views.dashboard'),
    (r'^templates/.*', 'django_backbone_basic.views.loadTemplate'),
    url(r'^api/', include(v1_api.urls)),
    (r'^.*/$', 'django_backbone_basic.views.index'),
    (r'^.*', 'django_backbone_basic.views.index'),
    
)
