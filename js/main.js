function sendForm(token) {}

(function ($) {
    "use strict"; //use of strict

    $('#loading').delay('500').fadeOut(2000);

    if ($('#contactform').length){
        var phoneSPMaskB = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        }, phoneSPOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(phoneSPMaskB.apply({}, arguments), options);
            }
        };
        $('#ContactPhonetel').mask(phoneSPMaskB, phoneSPOptions);
        $('#ContactCpf').mask('000.000.000-00');

        var form = $('#contactform');

        window.sendForm = function(token) {
            
            // Serialize the form data.
            var formData = form.serialize();

            var validated = true;
            form.find(":input[required=true],textarea[required=true]").each(function() {
                if (!$.trim($(this).val())) { //if this field is empty
                    $(this).css("border-color", "red"); //change border color to red  
                    validated = false; //set do not proceed flag
                }
                //check invalid email
                var pattren = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
                if ($(this).attr("type") == "email" && !pattren.test($.trim($(this).val()))) {
                    $(this).css("border-color", "red"); //change border color to red  
                    validated = false; //set do not proceed flag             
                }
            });

            if (validated) {
                var button_html = form.find(".submit > input").val();
                form.find(".submit > input").attr("disabled", true);
                form.find(".submit > input").val("Aguarde...");
                $.ajax({
                    type: 'POST',
                    url: form.attr('action'),
                    data: formData
                }).done(function(text) {
                    form.find(".submit > input").attr("disabled", false);
                    form.find(".submit > input").val(button_html);
                    form[0].reset();
                    if (text.indexOf("Erro") >= 0)
                        form.find(".submit > input").after('<div class="alert alert-danger col-12 mt-4" role="alert"><p class="mb-0">' + text + '</p></div>');
                    else
                        form.find(".submit > input").after('<div class="alert alert-success col-12 mt-4" role="alert"><p class="mb-0">' + text + '</p></div>');
                    setTimeout(function(){
                        form.find(".alert").remove();
                    }, 6000);
                    grecaptcha.reset();
                });
            } else
                grecaptcha.reset();
        }

        // Set up an event listener for the contact form.
        form.submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();
            grecaptcha.execute();
        });

    }
    
    $(document).on('ready', function () {

        if ($('.whatsapp_chat_support').length) {
            $('.whatsapp_chat_support').whatsappChatSupport({defaultMsg: ''});
        }

        /*====  side-widget-menu  =====*/
        $(document).on('click','.side-menu-wrap .side-menu-ul .sidenav__item .menu-plus-icon', function () {
            $(this).closest('.sidenav__item').siblings().removeClass('active').find('.side-sub-menu').slideUp(200);
            $(this).closest('.sidenav__item').toggleClass('active').find('.side-sub-menu').slideToggle(200);
            return false;
        });

        $(window).on('scroll', function () {
            //header fixed animation and control
            if ($(window).width() >= 1200) {
                if($(window).scrollTop() > $('.header-menu-area').outerHeight()) {
                    $('.header-menu-area').addClass('header-fixed');
                }else if($(window).scrollTop() == 0){
                    $('.header-menu-area').removeClass('header-fixed');
                }
            }
        }).trigger('scroll');


        /*=========== Mobile Menu Open Control ============*/
        $(document).on('click','.logo-right-button .side-menu-open', function () {
            $('.side-nav-container').addClass('active');
        });

        /*=========== Mobile Menu Close Control ============*/
        $(document).on('click','.humburger-menu .side-menu-close', function () {
            $(".side-nav-container").removeClass('active');
        });

        /*=========== Counter up ============*/
        if ($('.counter').length){
            $('.counter').counterUp({
                delay: 50,
                time: 2000
            });
        }

        /*==== testimonial-carousel =====*/
        if ($(".testimonial-carousel").length) {
            $('.testimonial-carousel').owlCarousel({
                loop: true,
                items: 1,
                nav: true,
                dots: true,
                smartSpeed: 500,
                autoplay: false,
                navText: ["<i class='la la-angle-left'></i>", "<i class='la la-angle-right'></i>"]
            });
        }

        /*==== content-carousel3 =====*/
        if ($(".content-carousel3").length) {
            $('.content-carousel3').owlCarousel({
                loop: true,
                items: 3,
                nav: true,
                dots: false,
                smartSpeed: 500,
                autoplay: true,
                margin: 30,
                navText: ["<i class='la la-angle-left'></i>", "<i class='la la-angle-right'></i>"],
                responsive : {
                    // breakpoint from 0 up
                    320 : {
                        items: 1
                    },
                    // breakpoint from 991 up
                    767: {
                        items: 2
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 3
                    }
                }
            });
        }

        /*==== homepage-slide1 =====*/
        if ($(".homepage-slide1").length) {
            $('.homepage-slide1').owlCarousel({
                loop: true,
                margin: 0,
                smartSpeed: 1000,
                nav: true,
                dots: false,
                autoplay: true,
                autoplayHoverPause: true,
                items: 1,
                navText: ["<i class='la la-angle-left'></i>", "<i class='la la-angle-right'></i>"]
            });
        }

        /*==== fancybox =====*/
        if ($('[data-fancybox="gallery"]').length){
            $('[data-fancybox="gallery"]').fancybox({
                // Options will go here
                buttons: [
                    "zoom",
                    "slideShow",
                    "fullScreen",
                    "thumbs",
                    "close"
                ],
            });
            $.fancybox.defaults.animationEffect = "zoom";
        }
        if ($('[data-fancybox="video"]').length){
            $('[data-fancybox="video"]').fancybox({
                buttons: ["share", "fullScreen", "close"]
            });
            $.fancybox.defaults.animationEffect = "zoom";
        }

        /*=========== tooltip ============*/
        $('[data-toggle="tooltip"]').tooltip();

        $('[data-toggle="popover"]').popover();

    });
})(jQuery);