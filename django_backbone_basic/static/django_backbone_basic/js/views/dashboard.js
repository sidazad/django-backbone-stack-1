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
    'views/dashboard_menu_view',
    'text!/templates/dashboard.mustache',
    'text!/templates/notes_list.mustache',
    'modules/note_modules',
], 
function($, _, Backbone, Marionette,vent,t,Mustache,MM,DashboardMenuView,/*NotesListView,*/
dashboardTemplate,notesListTemplate,NoteModules) {

    var NoteView = Backbone.Marionette.ItemView.extend({
        template: notesListTemplate,
        initialize : function () {
            console.log('itemviewrender');
        },
    });


    var NotesListView = Marionette.CollectionView.extend({
        itemView:NoteView,
        initialize: function () {
            console.log("noteslistview:init:"+this.collection);
            /*var note=new NoteModules.NoteModel();
            note.save({title:"A note"});*/
            this.collection.fetch();
        },
        events:{

        },
        onRender: function() {
        },
    });

    /*var notes = [
        {
            username: "dbailey",
            fullname: "Derick Bailey"
        },
        {
            username: "jbob",
            fullname: "Joe Bob"
        },
        {
            username: "fbar",
            fullname: "Foo Bar"
        }
    ];*/


    var DashboardView = Marionette.Layout.extend({
        template:dashboardTemplate,
        regions:{
            dashboardMenuRegion:'#dashboardMenuRegion',
            notesListRegion:'#notesListRegion',
            activityFeedRegion:'#activityFeedRegion',
        },
        initialize: function () {
            this.dashboardMenuView=new DashboardMenuView();
            //this.notesListView=new NotesListView({collection:new Backbone.Collection(notes)});
            console.log(NoteModules);
            this.notesListView=new NotesListView({collection:new NoteModules.NoteCollection()});    
            console.log("initialize");
            console.log(this.dashboardMenuView);
            console.log(this.notesListView);
        },

        onRender: function() {
            this.dashboardMenuRegion.show(this.dashboardMenuView);
            this.notesListRegion.show(this.notesListView);
            console.log("onRender");
            console.log(this.dashboardMenuView);
            console.log(this.notesListView);
        }
    });
    // Our module now returns our view
    return DashboardView;
});


