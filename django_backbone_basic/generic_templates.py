"""
Copyright (c) 2012 Max Vilimpoc

Permission is hereby granted, free of charge, to any person obtaining 
a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom 
the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR 
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE 
OR OTHER DEALINGS IN THE SOFTWARE.
"""

# GITHUB: https://github.com/nuket/pystache-django-native/blob/master/README.md

from django.template.loaders import app_directories, filesystem
from django.template.base import TemplateDoesNotExist
import pystache
import os

"""
Based on:

https://docs.djangoproject.com/en/dev/ref/templates/api/#django.template.Template
https://docs.djangoproject.com/en/dev/ref/templates/api/#loading-templates
https://docs.djangoproject.com/en/dev/ref/templates/api/#using-an-alternative-template-language
"""

class PystacheTemplate():
    def __init__(self, templateString):
        self.parsed   = pystache.parse(templateString)
        self.raw=templateString
        self.renderer = pystache.Renderer()

    def render(self, context):
        # Flatten the Django Context into a single dictionary.
        flatContext = {}
        for d in context.dicts:
            flatContext.update(d)

        return self.renderer.render(self.parsed, flatContext)
    
    def getraw(self):
        return self.raw 

"""
Based on:

https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types

Yeah, it's two identical classes separated by a name.
Metaprogramming comes to mind.

According to django.template.loader.BaseLoader:

"A loader may return an already-compiled template instead of the actual
template source. In that case the path returned should be None, since the
path information is associated with the template during the compilation,
which has already been done."

---

We can make the Loader check the file extension as well,
so it will only parse Mustache-compatible files:

.handlebars, .hbs, .mustache, and so on.

This means you can actually keep using the normal Django loaders
too, for other file extensions!

---

The key piece is in django/template/loader.py

def find_template(name, dirs=None):
    [...]
    for loader in template_source_loaders:
        try:
            source, display_name = loader(name, dirs)
            return (source, make_origin(display_name, loader, name, dirs))
        except TemplateDoesNotExist:
            pass
    raise TemplateDoesNotExist(name)
    [...]

Note: 

This could still mess up if the custom loader passes 
through a Handlebars template with an .html extension.

Later loaders would then throw a fit.
"""

EXTENSIONS = ['.handlebars', '.hbs', '.mustache']

class PystacheAppDirectoriesLoader(app_directories.Loader):
    is_usable = True

    def load_template(self, template_name, template_dirs=None):
        # Only allow certain template types.
        filename, extension = os.path.splitext(template_name)
        if extension not in EXTENSIONS:
            raise TemplateDoesNotExist

        source, origin = self.load_template_source(template_name, template_dirs)
        template = PystacheTemplate(source)
        return template, None

class PystacheFilesystemLoader(filesystem.Loader):
    is_usable = True

    def load_template(self, template_name, template_dirs=None):
        # Only allow certain template types.
        filename, extension = os.path.splitext(template_name)
        if extension not in EXTENSIONS:
            raise TemplateDoesNotExist

        source, origin = self.load_template_source(template_name, template_dirs)
        template = PystacheTemplate(source)
        return template, None

"""
Now update the settings.py file to use the custom Loaders,
putting them ahead of Django's default Loaders in the
TEMPLATE_LOADERS setting.

TEMPLATE_LOADERS = (
    'exchange.templates.PystacheFilesystemLoader',
    'exchange.templates.PystacheAppDirectoriesLoader',
    [...]
)
"""