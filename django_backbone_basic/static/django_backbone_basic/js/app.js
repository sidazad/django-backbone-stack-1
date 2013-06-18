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

define([
  'jquery',
  'jqueryui',
  'underscore',
  'backbone',
  'marionette',
  'vent',
  'text',
  'views/landing',
  'views/dashboard',
  'views/new_note_dialog',
  'simplemodal',
], 
function($, jqui,_, Backbone, Marionette,vent,t,LandingView,DashboardView,NewNoteDialogView,sm) {

    var ModalRegion = Backbone.Marionette.Region.extend({
        el: "#modal",
        constructor: function(){
            console.log("ModalRegion:constructor");
            _.bindAll(this);
            Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
            this.on("show", this.showModal, this);
        },
     
        getEl: function(selector){
            console.log("ModalRegion:getEl");
            var $el = $(selector);
            return $el;
        },
     
        showModal: function(view){
            console.log("Showing modal:init="+this.init);
            $.modal(this.$el,{
                onClose: function (dialog) {
                    console.log("onclose");
                    $.modal.close();
                    $('#modal').hide();        
                }
            });
        },
 
        hideModal: function(){
            console.log("hiding modal");
            $('#modal').hide();
        }
    });

    var app = new Marionette.Application();
       
    app.addRegions({
        mainContent:'#mainContent',
        modal: ModalRegion,
    });    

    app.addInitializer(function(){
        //Backbone.history.navigate("landing");
        //app.mainContent.show(new LandingView());
        vent.on('show:landing', function(x) {
            console.log("show:landing");
            Backbone.history.navigate("landing");
            app.mainContent.show(new LandingView());
        });
        vent.on('show:dashboard', function(x) {
            console.log("vent.on:show:dashboard");
            Backbone.history.navigate("dashboard");
            app.mainContent.show(new DashboardView());
        });
        vent.on('show:newNote', function(x) {
            console.log("app: show:newNote:"+x);
            var view = new NewNoteDialogView();
            console.log("app.modal.show");
            app.modal.show(view);
        });

        app.vent.on("routing:started", function(){
            alert("routing:started");
            console.log(Backbone.History.started);
            if( ! Backbone.History.started) 
                Backbone.history.start();
            //vent.trigger("show:landing");
        });

    });
    return app;
});
