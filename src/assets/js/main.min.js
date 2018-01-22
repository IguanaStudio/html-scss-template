$(function() {

	if ($.fn.fancybox) {
		$.extend(true, $.fancybox.defaults, {
			hash : false,
			lang : 'pl',
			i18n : {
				'pl' : {
					CLOSE       : 'Zamknij',
					NEXT        : 'Następny',
					PREV        : 'Poprzedni',
					ERROR       : 'Zawartość nie mogła zostać wczytana. <br/> Spróbuj później.',
					PLAY_START  : 'Uruchom pokaz',
					PLAY_STOP   : 'Zatrzymaj pokaz',
					FULL_SCREEN : 'Pełny ekran',
					THUMBS      : 'Miniaturki'
				}
			}
		});

		$('.js-magnific').fancybox();
		
		$(document).on('click', '.js-modal', function(e) {
			var modal = $(this).data('modal');
            
			if ($(modal).length)
			{
				openModal(modal, $(this));
				e.preventDefault();
			}
		});
		
		$(document).on('click', '.js-modal-close', function(e) {
			e.preventDefault();
			$.fancybox.close();
		});
        
        $('.modal').on('click', '[data-fancybox]', function(){
            parent.jQuery.fancybox.getInstance().close();
        });
		
		function openModal(src, $trigger)
        {
            $.fancybox.close();
			$.fancybox.open({
				src: src,
				type: 'inline',
				opts : {
					modal : true,
					smallBtn: false,
					beforeShow: function( instance, current ) {

					},
					afterClose: function( instance, current ) {

					}
				}
			});
        }
        
        if (window.location.hash !== '') {
            if ($(window.location.hash+'-modal').length) {
                if ($('#alerts-modal .alert').length) {
                    $('.modal__inner', $(window.location.hash+'-modal')).prepend($('#alerts-modal .alert'));
                    $('#alerts-modal').remove();
                }
                
                openModal(window.location.hash+'-modal');
            }
        }
	}
	
	if($.fn.validate) {
		$.validator.setDefaults({
            highlight: function(element, errorClass, validClass) {
                var $element = $(element);
                $element.addClass(errorClass).removeClass(validClass);
                if ($element.attr('type') == 'checkbox' || $element.attr('type') == 'radio' || $element.attr('type') == 'file') {
                    if ($element.attr('type') == 'checkbox') {
                        $element.closest('.checkbox').addClass('error-checkbox');
                    } else if ($element.attr('type') == 'radio') {
                        $element.closest('.radio').addClass('error-radio');
                    } else if ($element.attr('type') == 'file') {
                        $element.closest('.fileuploader').addClass('error-fileuploader');
                    }
                } else if ($element.prop("tagName") == 'SELECT') {
                    $element.closest('.select').addClass('error-select');
                } else if ($element.prop("tagName") == 'TEXTAREA') {
                    $element.closest('.wysiwyg-editor').addClass('error-wysiwyg');
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                var $element = $(element);
                $element.removeClass(errorClass).addClass(validClass);
                if ($element.attr('type') == 'checkbox' || $element.attr('type') == 'radio' || $element.attr('type') == 'file') {
                    if ($element.attr('type') == 'checkbox') {
                        $element.closest('.checkbox').removeClass('error-checkbox');
                    } else if ($element.attr('type') == 'radio') {
                        $element.closest('.radio').removeClass('error-radio');
                    } else if ($element.attr('type') == 'file') {
                        $element.closest('.fileuploader').removeClass('error-fileuploader');
                    }
                } else if ($element.prop("tagName") == 'SELECT') {
                    $element.closest('.select').removeClass('error-select');
                } else if ($element.prop("tagName") == 'TEXTAREA') {
                    $element.closest('.wysiwyg-editor').removeClass('error-wysiwyg');
                }
            },
            errorPlacement: function(error, element) {
                if (element.closest('.select').hasClass('error-select'))
                    error.insertAfter(element.closest('.select'));
                else if (element.closest('.checkbox').hasClass('error-checkbox'))
                    error.insertAfter(element.closest('.checkbox'));
                else if (element.closest('.radio').hasClass('error-radio'))
                    error.insertAfter(element.closest('.radio'));
                else if (element.closest('.wysiwyg-editor').hasClass('error-wysiwyg'))
                    error.insertAfter(element.closest('.wysiwyg-editor'));
                else if (element.closest('.fileuploader').hasClass('error-fileuploader'))
                    error.insertAfter(element.closest('.fileuploader'));
                else
                    error.insertAfter(element);
            },
            ignore: ':hidden:not([type="hidden"]):not(select)'
        });

		$('form.js-validate').each(function() {
			$(this).validate();
		});
	}

    if($.fn.owlCarousel) {
        $('.js-slider').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            stagePadding: 0,
            navText: ['Poprzedni','Następny'],
            responsiveClass: true,
            responsive: {
                0:{
                    items: 1
                },
                600:{
                    items: 1
                },
                1000:{
                    items: 1
                }
            }
        });
    }

	if (typeof jcf == 'object') {
		jcf.setOptions('Select', {
			fakeDropInBody: false,
		    maxVisibleItems: 5,
		    wrapNative: false,
		    wrapNativeOnMobile: true,
			useCustomScroll: false
		});

        jcf.replace($('.js-select-jcf'));
		jcf.replace($('.js-radio'));
		jcf.replace($('.js-checkbox'));
	}
    
    if ($.fn.select2) {
        $('.js-select-default').each(function(){
            var customSelectParent = $(this).parent('.select');
            
            $(this).select2({
                language: 'pl',
                placeholder: 'Wybierz',
                dropdownParent: customSelectParent,
                minimumResultsForSearch: Infinity
            });
        });

        $('.js-select-filter').each(function(){
            var customSelectParent = $(this).parent('.select');
            
            $(this).select2({
                language: 'pl',
                placeholder: 'Wybierz',
                dropdownParent: customSelectParent
            });
        });
        
        $('.js-select-multiple').each(function(){
            var customSelectParent = $(this).parent('.select');
            
            $(this).select2({
                language: 'pl',
                placeholder: 'Wybierz',
                dropdownParent: customSelectParent
            });
        });
    }
    
	$('.wysiwyg iframe').each(function(){
		$(this).wrap('<div class="embed-responsive embed-responsive--16by9"></div>');
	});

	$('.wysiwyg table').each(function(){
		var mT = $(this).css('margin-top'),
            mB = $(this).css('margin-bottom');
		$(this).css('margin-bottom','0').css('margin-top','0').wrap('<div class="table-responsive" style="margin-bottom: '+mB+'; margin-top: '+mT+';"></div>');
	});
    
    $(document).on('click', '.js-mobile-menu', function() {
        $('html').toggleClass('is-menu-open');
    });
    
    $(document).on('click', '.js-jumper', function(e) {
        jumper($(this).data('target'), $(this).data('offset'));
        e.preventDefault();
    });
    
    var prevWindowMode = null,
        windowWidth = $(window).width();
    
    $(window).on('resize.rwd', function(e) {
    	var windowMode = 0;
        
    	windowWidth = $(window).width();
    	
    	if (windowWidth > 1199) {
    		windowMode = 0;
        } else {
    		windowMode = 1;
    	}
    	
        if (windowMode != prevWindowMode)
        {
            prevWindowMode = windowMode;
            switch (windowMode)
            {
                case 0:
                    $('html').removeClass('is-menu-open');
                    break;
                 case 1:
                    break;
            }
        } 
    }).trigger('resize.rwd');

    
    shadowTop();
	minimizeTop(); 
});


$(window).on('load', function() {
    
    $('[data-preload]').addClass('is-loaded');
    $('[data-preloader]').addClass('is-loaded');
});


function shadowTop()
{
	$(window).scroll(function(){
        if ($(window).scrollTop() > 0)
            $('html').addClass('is-top-shadow');
        else
            $('html').removeClass('is-top-shadow');
    }).scroll();
}

function minimizeTop()
{
	var scrollOffset = parseInt($('.top').data('minimize-offset')) > 0 ? parseInt($('.top').data('minimize-offset')) : false;
	if (scrollOffset !== false)
	{
		$(window).scroll(function(){
			if ($(window).scrollTop() >= scrollOffset)
				$('html').addClass('is-top-minimize');
			else
				$('html').removeClass('is-top-minimize');
		}).scroll();
	}
} 

function jumper(target, offset) {
    offset = ($.isNumeric(parseInt(offset)) ? parseInt(offset) : 0);
    
    $('html, body').animate({
        scrollTop: $(target).offset().top + offset
    }, 1000);
}