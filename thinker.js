(function ( $ ) {
 'use strict';
    $.fn.thinker = function( options ) {

       // Get postition of input box and set a reference to it (input_box)

       // Get postition of input box and set a reference to it (input_box)

        var position = $(this).position(),
            pos_height = $(this).height(),
            pos_width = $(this).width();
        var pos_left = position.left,
            pos_top = position.top;
        var input_box = $(this);
        // Create the menu container to hold the list
        var $div = $("<div id='thinker-results'></div>").appendTo("body");

        // Default setting, can override when initializing
        var settings = $.extend({
            url: 'thinker.php',
            type: 'POST',
            backgroundColor: 'white',
            textColor: 'black',
            backgroundColorHover: 'blue',
            textColorHover: 'white',
            minLength: 1,
            maxResults: 10
        }, options);

        // Style and hide the div element that will contain the list
        $div.css({
            'display': 'none',
            'position': 'fixed',
            'z-index': 0,
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

        $(input_box).attr('autocomplete', 'off');

        // list-item was clicked, change the input value to match
        $div.on("click", function(event) {
           input_box.val(event.target.innerHTML);
        });

        $(window).on('scroll resize', function() {
            position = input_box.position();
            pos_height = input_box.height();
            pos_width = input_box.width();
            pos_left = position.left;
            pos_top = position.top;
            $div.css({
               'top': pos_top + pos_height - $(window).scrollTop() + 10,
               'left': pos_left - $(window).scrollLeft(),
               'width': pos_width
            });
        })

        //  Check each keyup and double-click for search criteria
        input_box.on('keyup dblclick', (function() {
            position = input_box.offset();
            pos_height = input_box.height();
            pos_width = input_box.width();
            pos_left = position.left;
            pos_top = position.top;

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
                       if (data.items.length !== 0) {
                           var dataElements = "";
                           // Enforce maxResults - if the data has more than the maxResults then show only up to maxResults
                           var count = (data.items.length < settings.maxResults) ? data.items.length : settings.maxResults;
                           for (var x = 0; x < count; x++) {
                               dataElements += "<li>" + data.items[x] + "</li>";
                           }
                           // create out ul dom object
                           $div.html("<ul id='thinker_list'>" + dataElements + "</ul>")
                           // Postition the div below the input box and sets its width
                           $div.css({
                               'top': pos_top + pos_height - $(window).scrollTop() + 10,
                               'left': pos_left - $(window).scrollLeft(),
                               'width': pos_width,
                               'height': 'auto',
                               'display': 'inline-block'
                           });
                       } else {  // No data matched, hide div
                           $div.html("");
                           $div.css({ 'display': 'none'});
                       }
                   },
                    error: function(jqXHR, textStatus, errorThrown) {
                        $div.css({
                               'top': pos_top + pos_height,
                               'left': pos_left,
                               'width': pos_width,
                               'height': 'auto',
                               'display': 'inline-block'
                           });
                        // For troublshooting, set the html as error message when fails
                        $div.html(textStatus + ": " + errorThrown);
                    }
                })
            } else {
                // length of input is < minLength, hide the div
                $div.css({
                    'display': 'none' });
            }
        }));

        //  User clicked outside of input box, hide the div
        input_box.parents().click(function() {
            $div.css( "display", "none" );
        });
    };

}( jQuery ));
