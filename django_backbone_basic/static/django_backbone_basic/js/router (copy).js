define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'text',
  'views/landing',
  'views/dashboard',
],  
    function($, _, Backbone, Marionette,t,LandingView,DashboardView){
        var AppRouter = Backbone.Router.extend({
        routes: {
          // Define some URL routes
          '': 'showLanding',
          'projects': 'showProjects',
          'users/': 'showUsers',
          // Default
          '*actions': 'defaultAction'
        },
        navigate_to: function(model){
                alert("navigate_to");
            },

        showProjects: function() {},
        showLanding: function() {},
    });

    var initialize = function() {
        var app_router = new AppRouter;
        Backbone.View.prototype.event_aggregator = _.extend({}, Backbone.Events);
        // Extend the View class to include a navigation method goTo
        Backbone.View.prototype.goTo = function (loc) {
            app_router.navigate(loc, true);
        };
        app_router.on('route:showLanding', function(){
            var landing = new LandingView();
        });
        app_router.on('route:showProjects', function(){
            var dashboard=new DashboardView();
        });
        app_router.on('showUsers', function(){
            alert("showUsers");
        });
        app_router.on('defaultAction', function(actions){
            alert("No routes");
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        });
        Backbone.history.start({pushState: true});
    };
    return {
        initialize: initialize
    };
});

