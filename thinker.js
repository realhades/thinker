(function ( $ ) {
 'use strict';
    $.fn.thinker = function( options ) {
        var position = $(this).position(),
            pos_height = $(this).height(),
            pos_width = $(this).width();
        var pos_left = position.left, 
            pos_top = position.top;
        var input_box = $(this);
        
        var settings = $.extend({
            url: 'thinker.php',
            type: 'POST',
            completionObject: $( "#completion-results" ),
            backgroundColor: 'white',
            textColor: 'black',
            backgroundColorHover: 'blue',
            textColorHover: 'white',
            minLength: 1,
            maxResults: 10
        }, options);
        
        settings.completionObject.css({ 
            'display': 'none',
            'position': 'fixed',
            'z-index': 2,
            'background-color': settings.backgroundColor,
            'color': settings.textColor
        });
        
        $("<style>")
            .prop("type", "text/css")
            .html("\
            #thinker_list {\
                list-style:none;\
                margin: 0;\
                padding: 4px 0;\
                cursor: pointer;\
                border-top:1px solid #999;\
                border-left:1px solid #999;\
                border-bottom:1px solid #999;\
                border-right:1px solid #999;\
                box-shadow: 4px 4px 2px #888888;\
            }\
            #thinker_list > li { \
                width: 100%;\
                background-color:" + settings.backgroundColor + "\
                color:" + settings.textColor + "; }\
            #thinker_list > li:hover { \
                background-color:" + settings.backgroundColorHover + ";\
                color:" + settings.textColorHover + ";")
            .appendTo("head");
        
        settings.completionObject.on("click", function(event) {
           input_box.val(event.target.innerHTML); 
        });
        
        //  Check each keyup for search criteria
        input_box.on('keyup dblclick', (function() {
            //  Make sure the length is = or > min text length
            if (input_box.val().length >= settings.minLength) {
                $.ajax({
                   type: settings.type,
                   url: settings.url,
                   dataType: "json",
                   data: { 
                       'key':input_box.val(),
                       'maxResults': settings.maxResults
                   },
                   success: function(data){
                       if (data.length !== 0) { 
                           settings.completionObject.css({ 
                               'top': pos_top + pos_height + 15,
                               'left': pos_left,
                               'width': pos_width,
                               'height': 'auto',
                               'display': 'inline-block'
                           });
                           var dataElements = "";
                           var count = (data.items.length < settings.maxResults) ? data.items.length : settings.maxResults;
                           for (var x = 0; x < count; x++) {
                               dataElements += "<li>" + data.items[x] + "</li>";
                           }
                           settings.completionObject.html("<ul id='thinker_list'>" + dataElements + "</ul>")
                       } else {
                           settings.completionObject.html("");
                           settings.completionObject.css({ 'display': 'none'});
                       }
                   },
                    error: function(jqXHR, textStatus, errorThrown) {
                        settings.completionObject.css({ 
                               'top': pos_top + pos_height + 15,
                               'left': pos_left,
                               'width': pos_width,
                               'height': 'auto',
                               'display': 'inline-block'
                           });
                        settings.completionObject.html(textStatus + ": " + errorThrown);
                    }
                })
            } else {
                settings.completionObject.css({ 
                    'display': 'none' });
            }
        }));
        
        //  User clicked outside of input box
        input_box.parents().click(function() {
            settings.completionObject.css( "display", "none" );
        });
        
//        return this;
    };
 
}( jQuery ));
