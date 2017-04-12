/**********************

custom.js
=============

Author:  Gino Aliaj
Template: Swimmerland - Water Park HTML Template
Version: 1.0

Author URI: gnodesign.com
***************************/


(function ($) {

    "use strict";


    $(window).on('load', function () {
        /*----------------------------------------------------
          LOADING PAGE
        ----------------------------------------------------*/

        $(".loading").delay(800).fadeOut(1000);


    }); // end of window load function





    $(document).ready(function () {

        $(window).on('scroll', function () {
            /*----------------------------------------------------
              STICKY HEADER
            ----------------------------------------------------*/

            if ($('header').length > 0) {

                var window_height = $(this).scrollTop();
                var headerheight = $('header').height();

                if (window_height > headerheight) {

                    // Check if Header is fixed or not
                    if ($("header").hasClass('fixed')) {
                        $("header").addClass('navbar-sticky');
                    }

                } else {
                    $("header").removeClass("navbar-sticky");
                }
            }

        }); // end of window scroll function





        /*----------------------------------------------------
          NAVIGATION SCROLL
        ----------------------------------------------------*/

        $('#main-nav .navbar-nav').onePageNav({
            currentClass: 'active',
            scrollThreshold: 0.5, // Adjust if Navigation highlights too early or too late
            scrollSpeed: 1800,
            changeHash: true,
            easing: 'easeInOutExpo'
        });
        
        
        
        
        /*----------------------------------------------------
           PUSH MENU
         ----------------------------------------------------*/

        (function ($) {

            $.fn.jPushMenu = function (customOptions) {
                var o = $.extend({}, $.fn.jPushMenu.defaultOptions, customOptions);

                /* add class to the body.*/

                $('body').addClass(o.bodyClass);
                $(this).addClass('jPushMenuBtn');
                $(this).on('click', function () {
                    var target = '',
                        push_direction = '';


                    if ($(this).is('.' + o.showLeftClass)) {
                        target = '.cbp-spmenu-left';
                        push_direction = 'toright';
                    } else if ($(this).is('.' + o.showRightClass)) {
                        target = '.cbp-spmenu-right';
                        push_direction = 'toleft';
                    } else if ($(this).is('.' + o.showTopClass)) {
                        target = '.cbp-spmenu-top';
                    } else if ($(this).is('.' + o.showBottomClass)) {
                        target = '.cbp-spmenu-bottom';
                    }


                    $(this).toggleClass(o.activeClass);
                    $(target).toggleClass(o.menuOpenClass);

                    if ($(this).is('.' + o.pushBodyClass)) {
                        $('body').toggleClass('cbp-spmenu-push-' + push_direction);
                    }

                    /* disable all other button*/
                    $('.jPushMenuBtn').not($(this)).toggleClass('disabled');

                    return false;
                });
                var jPushMenu = {
                    close: function (o) {
                        $('.jPushMenuBtn,body,.cbp-spmenu').removeClass('disabled active cbp-spmenu-open cbp-spmenu-push-toleft cbp-spmenu-push-toright');
                    }
                }

                if (o.closeOnClickOutside) {
                    $(document).on('click', function () {
                        jPushMenu.close();
                    });

                    $(document).on('click touchstart', function () {
                        jPushMenu.close();
                    });

                    $('.cbp-spmenu,.toggle-menu').on('click', function (e) {
                        e.stopPropagation();
                    });

                    $('.cbp-spmenu,.toggle-menu').on('click touchstart', function (e) {
                        e.stopPropagation();
                    });
                }

                // On Click Link
                if (o.closeOnClickLink) {
                    $('.cbp-spmenu a').on('click', function () {
                        jPushMenu.close();
                    });
                }
            };

            /* in case you want to customize class name,
             *  do not directly edit here, use function parameter when call jPushMenu.
             */
            $.fn.jPushMenu.defaultOptions = {
                bodyClass: 'cbp-spmenu-push',
                activeClass: 'menu-active',
                showLeftClass: 'menu-left',
                showRightClass: 'menu-right',
                showTopClass: 'menu-top',
                showBottomClass: 'menu-bottom',
                menuOpenClass: 'cbp-spmenu-open',
                pushBodyClass: 'push-body',
                closeOnClickOutside: true,
                closeOnClickInside: true,
                closeOnClickLink: true
            };
        })(jQuery);
        
        //initilizer
        $('.toggle-menu').jPushMenu({
            closeOnClickLink: true
        });


        
        
        
        /*----------------------------------------------------
          INITIALIZE SWIPER
        ----------------------------------------------------*/
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 7000,
            loop: true,
            simulateTouch: false
        });



        /*----------------------------------------------------
          SHUFFLE IMAGE GALLERY
        ----------------------------------------------------*/

        var shuffleme = (function ($) {
            'use strict';
            var $grid = $('#grid'), //locate what we want to sort 
                $filterOptions = $('.gallery-sorting li'), //locate the filter categories
                $sizer = $grid.find('.shuffle_sizer'), //sizer stores the size of the items

                init = function () {

                    // None of these need to be executed synchronously
                    setTimeout(function () {
                        listen();
                        setupFilters();
                    }, 100);

                    // initialize the plugin
                    $grid.shuffle({
                        itemSelector: '[class*="col-"]',
                        sizer: $sizer,
                        speed: 300
                    });
                },



                // Set up button clicks
                setupFilters = function () {
                    var $btns = $filterOptions.children();
                    $btns.on('click', function (e) {
                        e.preventDefault();
                        var $this = $(this),
                            isActive = $this.hasClass('active'),
                            group = isActive ? 'all' : $this.data('group');

                        // Hide current label, show current label in title
                        if (!isActive) {
                            $('.gallery-sorting li a').removeClass('active');
                        }

                        $this.toggleClass('active');

                        // Filter elements
                        $grid.shuffle('shuffle', group);
                    });

                    $btns = null;
                },


                // Re layout shuffle when images load. This is only needed
                // below 768 pixels because the .picture-item height is auto and therefore

                listen = function () {
                    var debouncedLayout = $.throttle(300, function () {
                        $grid.shuffle('update');
                    });

                    // Get all images inside shuffle
                    $grid.find('img').each(function () {
                        var proxyImage;

                        // Image already loaded
                        if (this.complete && this.naturalWidth !== undefined) {
                            return;
                        }

                        // If none of the checks above matched, simulate loading on detached element.
                        proxyImage = new Image();
                        $(proxyImage).on('load', function () {
                            $(this).off('load');
                            debouncedLayout();
                        });

                        proxyImage.src = this.src;
                    });

                    setTimeout(function () {
                        debouncedLayout();
                    }, 500);
                };

            return {
                init: init
            };
        }(jQuery));

        shuffleme.init(); //filter portfolio




        /*----------------------------------------------------
          MAGNIFIC POP UP
        ----------------------------------------------------*/

        $('section#gallery .gallery-items').each(function () { // the containers for all your galleries
            $(this).magnificPopup({
                delegate: 'a', // the selector for gallery item
                type: 'image',
                mainClass: 'mfp-fade',

                gallery: {
                    enabled: true
                },

                retina: {
                    ratio: 1, // Increase this number to enable retina image support.
                    replaceSrc: function (item, ratio) {
                        return item.src.replace(/\.\w+$/, function (m) {
                            return '@2x' + m;
                        });
                    }
                },

                zoom: {
                    enabled: true, // change to 'false' if you want to disable the zoming effect
                    duration: 300, // duration of the effect, in milliseconds
                    easing: 'ease-in-out', // CSS transition easing function
                    opener: function (openerElement) {
                        return openerElement.is('img') ? openerElement : openerElement.find('img');
                    }
                }

            });
        });
        
        // pop up for videos
        var video_popup = $('.popup-video');
        
        $(video_popup).magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',

            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                        index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                        id: 'v=', // String that splits URL in a two parts, second part should be %id%
                        // Or null - full URL will be returned
                        // Or a function that should return %id%, for example:
                        // id: function(url) { return 'parsed id'; }

                        src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }

                    // you may add here more sources

                },

                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            }
        });



        /*----------------------------------------------------
          SKILLBAR
        ----------------------------------------------------*/
        var skill_bar = $('.skillbar');
        var animated_bar = $('.skillbar-bar');
        
        jQuery(skill_bar).each(function () {
            jQuery(this).find(animated_bar).animate({
                width: jQuery(this).attr('data-percent')
            }, 6000);
        });




        /*----------------------------------------------------
          TEAM MEMBERS ACTIVE CLASS
        ----------------------------------------------------*/

        var teamMember = $('.team-member');

        $(teamMember).on('click', function () {
            $(teamMember).removeClass('active');
            $(this).closest(teamMember).addClass('active');
        });





        /*----------------------------------------------------
          MAILCHIMP
        ----------------------------------------------------*/
        $('.mailchimp').ajaxChimp({
            callback: mailchimpFunct,
            url: "your-mailchimp-url-here" //Replace this with your own mailchimp post URL. Paste the url inside "".  
        });

        function mailchimpFunct(response) {
            if (response.result === 'success') {
                $('#subscribe-result').html('<div class="alert alert-success">' + resp.msg + '</div>').fadeIn(500).delay(5000).fadeOut(1000);

            } else if (response.result === 'error') {
                $('#subscribe-result').html('<div class="alert alert-danger">' + resp.msg + '</div>').fadeIn(500).delay(5000).fadeOut(1000);
            }
        }




        /*----------------------------------------------------
          PARTNERS OWL SLIDER
        ----------------------------------------------------*/
        $('.client-testimonial').owlCarousel({
            // Most important features
            items: 1,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [992, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],

            //Basic Speeds
            slideSpeed: 800,
            paginationSpeed: 1400,

            //Autoplay
            autoPlay: 8000,
            stopOnHover: false,

            // Navigation
            navigation: true,
            navigationText: ["<i class='lnr lnr-chevron-left'></i>", "<i class='lnr lnr-chevron-right'></i>"],
            rewindNav: true,
            scrollPerPage: false,

            //Pagination
            pagination: false,

            // Responsive 
            responsive: true,
            responsiveRefreshRate: 200
        });





        /*----------------------------------------------------
          INITIALIZE COUNT UP
        ----------------------------------------------------*/
        $('section#countup').on('inview', function (event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).find('.counter').each(function () {
                    var $this = $(this);
                    $('.counter').countTo({
                        speed: 3000,
                        refreshInterval: 50
                    });
                });
                $(this).unbind('inview');
            }
        });




        /*----------------------------------------------------
          PARTNERS OWL SLIDER
        ----------------------------------------------------*/
        $('.partners-slider').owlCarousel({
            // Most important features
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [992, 4],
            itemsTablet: [768, 3],
            itemsTabletSmall: false,
            itemsMobile: [479, 2],

            //Basic Speeds
            slideSpeed: 200,
            paginationSpeed: 800,

            //Autoplay
            autoPlay: 8000,
            stopOnHover: false,

            // Navigation
            navigation: false,
            navigationText: ["prev", "next"],
            rewindNav: true,
            scrollPerPage: false,

            //Pagination
            pagination: true,

            // Responsive 
            responsive: true,
            responsiveRefreshRate: 200
        });
        
        
        
        
        
        /*----------------------------------------------------
          CONTACT FORM
        ----------------------------------------------------*/
        $("#contact-form").on('submit', function (e) {
            e.preventDefault();

            //Get input field values from HTML form
            var user_name = $("input[name=name]").val();
            var user_email = $("input[name=email]").val();
            var user_subject = $("input[name=subject]").val();
            var user_message = $("textarea[name=message]").val();


            //Input validation
            var proceed = true; //Set proceed as true

            //If empty set border colors red
            if (user_name == "") {
                $("input[name=name]").css('border-color', 'red');
                proceed = false;
            }

            if (user_email == "") {
                $("input[name=email]").css('border-color', 'red');
                proceed = false;
            }

            if (user_message == "") {
                $("textarea[name=message]").css('border-color', 'red');
                proceed = false;
            }

            if (user_subject == "") {
                $("input[name=subject]").css('border-color', 'red');
                proceed = false;
            }


            //Everything it's ok...
            if (proceed) {

                //Data to be sent to server
                var post_data;
                var output;
                post_data = {
                    'user_name': user_name,
                    'user_email': user_email,
                    'user_subject': user_subject,
                    'user_message': user_message
                };

                //Ajax post data to server
                $.post('php/email.php', post_data, function (response) {

                    //Response server message
                    if (response.type == 'error') {
                        output = '<div class="alert alert-danger">' + response.text + '</div>';

                    } else {
                        output = '<div class="alert alert-success">' + response.text + '</div>';
                        //If success clear inputs
                        $("input").val('');
                        $("textarea").val('');
                    }

                    $("#contact-result").fadeIn(500).html(output).fadeIn(500).delay(5000).fadeOut(1000);
                    
                }, 'json');

            }
        });

        //Reset border colors
        $("input, textarea").on("change keyup", function (event) {
            $("input, textarea").css('border-color', '');
            $("#contact-result").fadeOut(500);
        });
        
        
        
        /*----------------------------------------------------
          GOOGLE MAP
        ----------------------------------------------------*/
        
        // Asynchronously Load the map API
        jQuery(function ($) {
            var script = document.createElement('script');
            script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
            document.body.appendChild(script);
        });
        
        window.initialize = function(){
            var map;
            var bounds = new google.maps.LatLngBounds();
            var mapOptions = { mapTypeId: 'roadmap', scrollwheel: false, draggable: true, styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }] };
            

            // Display a map on the page
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            map.setTilt(45);

            // Multiple Markers
            var markers = [
                ['Duric', 40.716323, -74.004326],
            ];

            // Info Window Content
            var infoWindowContent = [
                ['<div class="info_content">' +
                '<h5>Duric</h5>' +
                '<p>Your address here</p>' + '</div>']
            ];

            // Display multiple markers on a map
            var infoWindow = new google.maps.InfoWindow(),
                marker, i;

            // Loop through our array of markers & place each one on the map
            for (i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0]
                });

                // Allow each marker to have an info window
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent(infoWindowContent[i][0]);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));

                // Automatically center the map fitting all markers on the screen
                map.fitBounds(bounds);
            }

            // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
            var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
                this.setZoom(14);
                google.maps.event.removeListener(boundsListener);
            });

        }



    }); //end of document ready function



})(jQuery);