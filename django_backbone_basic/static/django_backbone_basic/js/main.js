/*
    Copyright (c) 2010-2013 VisionHatch Technologies
    @author Sid Azad   Email: sidazad@gmail.com  Twitter: @sid_azad

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
        },
        marionette: {
          deps: ["backbone"],
          exports: "Backbone.Marionette"
        },
        backbonetastypie: {
          deps: ["backbone"],
          exports: "backbone-tastypie"
        },
        simplemodal: {
          deps: ["jquery"],
          exports: "simplemodal"
        },
        jqueryui: {
          deps: ["jquery"],
          exports: "jqueryui"
        },
    },
    paths: {
        jquery: '/static/js/libs/jquery/jquery.min',
        jqueryui: '/static/jquery/jquery-ui-1.8.23.custom/js/jquery-ui-1.8.23.custom.min',
        underscore: '/static/js/libs/underscore/underscore.min',
        backbone: '/static/js/libs/backbone/backbone.min',
        marionette: '/static/js/libs/backbone/backbone.marionette.min',
        syphon: '/static/js/libs/backbone/backbone.syphon.min',
        mustache: '/static/js/libs/mustache/mustache',
        text: '/static/js/libs/require/text',
        //tastypiefix: '/static/js/libs/backbone/backbone.tastypiefix',
        backbonetastypie: '/static/js/libs/backbone/backbone-tastypie',
        simplemodal: '/static/jquery/SimpleModal/jquery.simplemodal.1.4.1.min',
    }
});


require([

  // Load our app module and pass it to our definition function
//  'app','vent','backbone','tastypiefix','router','controller',   
'app','vent','backbone','backbonetastypie','router','controller',
], 
function(app,vent,Backbone,btp,Router,Controller) {
    app.start();

    new Router({
        controller : Controller
    });
    console.log("Starting routing");
    app.vent.trigger("routing:started");
    //Backbone.history.navigate("landing");



    //Backbone.history.start({pushState: true});
});

