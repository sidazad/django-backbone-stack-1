require.config({
/*config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
alert("useXHR:url="+url+",protocol="+protocol+",host="+hostname+",port="+port);
                //Override function for determining if XHR should be used.
                //url: the URL being requested
                //protocol: protocol of page text.js is running on
                //hostname: hostname of page text.js is running on
                //port: port of page text.js is running on
                //Use protocol, hostname, and port to compare against the url
                //being requested.
                //Return true of false. true means "use xhr", false means
                //"fetch the .js version of this resource".
            }
        }
    },*/

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
    },
    paths: {
        jquery: '/static/js/libs/jquery/jquery.min',
        underscore: '/static/js/libs/underscore/underscore.min',
        backbone: '/static/js/libs/backbone/backbone.min',
        marionette: '/static/js/libs/backbone/backbone.marionette.min',
        mustache: '/static/js/libs/mustache/mustache',
        text: '/static/js/libs/require/text',
    }
});


require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});

