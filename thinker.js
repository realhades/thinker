(function ( $ ) {
 'use strict';
    $.fn.thinker = function( options ) {
       // Get postition of input box and set a reference to it (input_box)
        var position = $(this).position(),
            pos_height = $(this).height(),
            pos_width = $(this).width();
        var pos_left = position.left, 
            pos_top = position.top;
        var input_box = $(this);
        
        // Default setting, can override when initializing
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
        
        // Style and hide the div element that will contain the list
        settings.completionObject.css({ 
            'display': 'none',
            'position': 'fixed',
            'z-index': 2,
            'background-color': settings.backgroundColor,
            'color': settings.textColor
        });
        
        // Style the unorder-list and list-items then append them to head
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
        
        // list-item was clicked, change the input value to match
        settings.completionObject.on("click", function(event) {
           input_box.val(event.target.innerHTML); 
        });
        
        //  Check each keyup and double-click for search criteria
        input_box.on('keyup dblclick', (function() {
            //  Make sure the length is = or > minLength
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
                           // Postition the div below the input box and sets its width
                           settings.completionObject.css({ 
                               'top': pos_top + pos_height + 15,
                               'left': pos_left,
                               'width': pos_width,
                               'height': 'auto',
                               'display': 'inline-block'
                           });
                           var dataElements = "";
                           // Enforce maxResults - if the data has more than the maxResults then show only up to maxResults
                           var count = (data.items.length < settings.maxResults) ? data.items.length : settings.maxResults;
                           for (var x = 0; x < count; x++) {
                               dataElements += "<li>" + data.items[x] + "</li>";
                           }
                           // create out ul dom object
                           settings.completionObject.html("<ul id='thinker_list'>" + dataElements + "</ul>")
                       } else {  // No data matched, hide div
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
                        // For troublshooting, set the html as error message when fails
                        settings.completionObject.html(textStatus + ": " + errorThrown);
                    }
                })
            } else {
                // length of input is < minLength, hide the div
                settings.completionObject.css({ 
                    'display': 'none' });
            }
        }));
        
        //  User clicked outside of input box, hide the div
        input_box.parents().click(function() {
            settings.completionObject.css( "display", "none" );
        });
    };
 
}( jQuery ));
