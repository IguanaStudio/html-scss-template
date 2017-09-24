$(document).ready(function(){

	if($.fn.fancybox) {
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
		
		/*$(document).on('click', '.js-modal', function(e) {
			var modal = $(this).data('modal');
            
			if ($(modal).length)
			{
				openModal(modal, $(this));
				e.preventDefault();
			}
		});*/
		
		$(document).on('click', '.js-modal-close', function (e) {
			e.preventDefault();
			$.fancybox.close();
		});
		
		/*function openModal(src, $trigger)
        {
            var modalTitle, modalHiddenData = null;
            
            $trigger = (typeof $trigger !== 'undefined') ?  $trigger : false;
            
            if ($trigger !== false)
            {
                modalTitle = $trigger.data('title');
                modalHiddenData = $trigger.data('hidden-data');

                modalTitle = (typeof modalTitle !== 'undefined' && modalTitle !== '') ?  modalTitle : null;
                modalHiddenData = (typeof modalHiddenData !== 'undefined' && modalHiddenData !== '') ?  modalHiddenData : null;
            }

            $.fancybox.close();
			$.fancybox.open({
				src: src,
				type: 'inline',
				opts : {
					modal : true,
					smallBtn: false,
					beforeShow: function( instance, current ) {
						if (modalTitle !== null) $('.modal__title', $(src)).html(modalTitle);
						if (modalHiddenData !== null) $('.modal__hidden-data', $(src)).val(modalHiddenData);
					},
					afterClose: function( instance, current ) {
						if (modalTitle !== null) $('.modal__title', $(src)).html('');
						if (modalHiddenData !== null) $('.modal__hidden-data', $(src)).val('');
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
        }*/
	}
	
	if($.fn.validate) {
		$.validator.setDefaults({
            highlight: function(element, errorClass, validClass) {
                var $element = $(element);
                $element.addClass(errorClass).removeClass(validClass);
                if ($element.attr('type') == 'checkbox' || $element.attr('type') == 'radio') {
                    if ($element.attr('type') == 'checkbox') {
                        $element.closest('.checkbox').addClass('error-checkbox');
                    } else if ($element.attr('type') == 'radio') {
                        $element.closest('.radio').addClass('error-radio');
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
                if ($element.attr('type') == 'checkbox' || $element.attr('type') == 'radio') {
                    if ($element.attr('type') == 'checkbox') {
                        $element.closest('.checkbox').removeClass('error-checkbox');
                    } else if ($element.attr('type') == 'radio') {
                        $element.closest('.radio').removeClass('error-radio');
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

		jcf.replace($('.select-jcf select'));
		jcf.replace($('[type="radio"]'));
		jcf.replace($('[type="checkbox"]'));
	}
    
//    .select-default select
//    .select-filter select
//    .select-multiple select
    
    
	$('.wysiwyg iframe').each(function(){
		$(this).wrap('<div class="embed-responsive embed-responsive--16by9"></div>');
	});

	$('.wysiwyg table').each(function(){
		var mT = $(this).css('marginTop');
		var mB = $(this).css('marginBottom');
		$(this).css('marginBottom','0').css('marginTop','0').wrap('<div class="table-responsive" style="margin-bottom: '+mB+'; margin-top: '+mT+';"></div>');
	});

	$('.js-mobile-menu').on('click', function(){
		$('html').toggleClass('is-menu-open');
	});

	minimizeTop();
        
        
        
        
        
});

$(window).on('load', function(){

});

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
