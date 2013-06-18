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
    'text!/templates/new_note_dialog.mustache',
    'modules/note_modules',
], 
function($, _, Backbone, Marionette,vent,t,Mustache,MM,newNoteDialogTemplate,NoteModules) {
    var NewNoteDialogView = Marionette.ItemView.extend({
        template:newNoteDialogTemplate,
        ui: {
            title: "#newNoteTitle",
            text: "#newNoteText",
        },
        events:{
            'click #saveNote':'saveNote',
        },
        saveNote:function() {
            console.log("saveNote");
            console.log(this.ui.title.val());
            console.log(this.ui.text.val());
            var note=new NoteModules.NoteModel();
            note.save({title:this.ui.title.val(),text:this.ui.text.val()});
            $.modal.close();
            vent.trigger("show:dashboard");
            // @todo  trigger model fetch
        }
    });
    // Our module now returns our view
    return NewNoteDialogView;
});


