define(['marionette','mustache',],function(Marionette,Mustache){
    Marionette.Renderer.render = function(template, data){
      return Mustache.to_html(template, data);
    }
    return {};
})

    
