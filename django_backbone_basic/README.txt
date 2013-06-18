Objectives:

- Framework that I understand
- Use Stable plugins
- Plan for easy switching between client-side and server-side rendering/templating



Server side template rendering
------------------------------

Pystache - Not required for client side rendering but useful if rendering mustache templates on server side itself.

generic_templates.py: Custom pystache templated loader from http://vilimpoc.org/blog/2012/12/08/custom-pystache-template-and-loader-classes-for-django/

Had to modify settings.py to use generic_templates.py template loaders

Client side template rendering
------------------------------

Mustache.js - For rendering client side templates

Fetching templates from server: Wrote a python view "loadTemplate" to load raw text of templates. Currently doing them at the start of a JavaScript view module.
Did not use Marionette/marionette-async as seemed broken/complicated but may have to in the future if on demand loading is slow or because of this: 
http://johndavidmathis.wordpress.com/2012/09/13/preloading-backbone-marionette-templates-2/

Client side framework
---------------------

require.js - For proper dependency management on client side and providing a decent entry point into backbone.

text.js: plugin for requirejs to easily upload templates as plain text. If this were missing we did have to do an explicit $.get() to get the templates. This nicely integrates with require.js.

Backbone.js - MVxx

marionette_mustache.js is taken from: http://stackoverflow.com/questions/11084021/how-to-use-backbone-marionette-itemview-with-mustache to make it easier to render raw text templates obtained from the server side, with client side data.


Backbone.Syphon
---------------

Used to easily serialize forms.

http://lostechies.com/derickbailey/2012/05/17/backbone-syphon-serialize-form-inputs-to-javascript-objects/


References:
===========

require.js
----------

- Great video for basics of require.js -    

backbone
--------

http://backbonetutorials.com/organizing-backbone-using-modules/
http://joshbohde.com/blog/backbonejs-and-django

Marionette
----------

'''Uses of Different views in Marionette'''
https://github.com/marionettejs/backbone.marionette/wiki/Use-cases-for-the-different-views

'''Derick Bailey's posts'''
http://lostechies.com/derickbailey/

Backbone+TastyPie
-----------------

- http://paltman.com/2012/04/30/integration-backbonejs-tastypie/
- https://github.com/PaulUithol/backbone-tastypie

Other
-----

http://duganchen.ca/single-page-web-app-architecture-done-right/

'''Syphon Plugin'''

http://lostechies.com/derickbailey/2012/05/17/backbone-syphon-serialize-form-inputs-to-javascript-objects/





