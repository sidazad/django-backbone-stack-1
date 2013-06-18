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
    'underscore',
    'backbone',
    'marionette',
    'vent',
    'text',
    'mustache',
    'marionette_mustache',
    'text!/templates/landing.mustache',
    'text!/templates/login.mustache',
    'text!/templates/signup.mustache',
], 
function($, _, Backbone, Marionette, vent, t,Mustache,MM,landingTemplate,loginTemplate,signupTemplate) {

    var LoginModel = Backbone.Model.extend({
        url:'/login',
        parse : function(resp, xhr) {
            return {};
        },
    });

    var SignupModel = Backbone.Model.extend({
        url:'/signup',
        parse : function(resp, xhr) {
            return {};
        },

    });

    var LoginView = Marionette.ItemView.extend({
        template:loginTemplate,
        ui: {
            username: "#username",
            password: "#password",
        },
        events:{
            'click #loginbtn':'handleLogin',
        },

        initialize: function(){
            _.bindAll(this, 'handleLogin','onShow');
            this.model=new LoginModel();
        },
        onRender: function(){
        },
        onShow:function() {
        },
        handleLogin:function() {
            console.log("handleLogin");
            this.model.set({username: this.ui.username.val()});
            this.model.set({password: this.ui.password.val()});
            this.model.save({},{
                success: _.bind(function(model, response) {
                    vent.trigger("show:dashboard");
                }, this),
                error: function() {alert("save error");},                
            });

            return false;
        },

    }); // end of LoginView

    var SignupView = Marionette.ItemView.extend({
        template:signupTemplate,
        ui: {
            nick: "#signup_nickname",
            username: "#signup_username",
            password: "#signup_password",
        },
        events:{
            'click #signupbtn':'handleSignup',
        },
        initialize: function () {
            _.bindAll(this, 'handleSignup');
            this.model=new SignupModel();
            //this.render();
        },
        handleSignup:function() {
            //alert("handleSignup");
            this.model.set({username: this.ui.username.val()});
            this.model.set({password: this.ui.password.val()});
            this.model.set({nickname: this.ui.nick.val()});
            var roles=new Array();
            $.each($('input[name="accounttype"]:checked'),function(){roles.push($(this).val())});
            console.log(roles);
            this.model.set({roles: roles});
            this.model.save({},{
                success: _.bind(function(model, response) {
                    //alert("logged in:"+response.status);
                    vent.trigger("show:dashboard");
                    //this.goTo("projects");
                }, this),
                error: function() {alert("save error");},                
            });
        },
        onRender: function() {
            //alert("signupview:onRender");
        }
    }); // end of SignupView


    var LandingView = Marionette.Layout.extend({
        template:landingTemplate,
        regions:{
            loginregion : '#loginview',
            signupregion : '#signupview'
        },
        events:{
            'click #signuplink': 'showSignup',
            'click #loginlink': 'showLogin',
        },
        initialize: function(){
            this.loginview=null;
            this.signupview=null;
        },
        onRender: function(){
            if(this.loginview===null) 
                this.loginview=new LoginView();
            this.loginregion.show(this.loginview);
        },

        showLogin:function(evt) {
            evt.preventDefault();
            this.signupregion.$el.hide();
            this.loginregion.$el.show();
        },
        showSignup:function(evt) {
            evt.preventDefault();
            this.loginregion.$el.hide();
            if (this.signupview===null) {
                this.signupview=new SignupView();
                this.signupregion.show(this.signupview);
            }
            else
                this.signupregion.$el.show();
        },
    }); // end of LandingView
    // Our module now returns our view
    return LandingView;
});


