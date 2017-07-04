$(document).ready(function(){

	if($.fn.fancybox) {
		$.extend(true, $.fancybox.defaults, {
			hash : false
		});

		$('.magnific').fancybox();
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
					$element.closest('.custom-select, .custom-select2, .custom-select2-multiple').addClass('select-error');
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
					$element.closest('.custom-select, .custom-select2, .custom-select2-multiple').removeClass('select-error');
				}
			},
			errorPlacement: function() {
			},
			ignore: ':hidden:not([type="hidden"]):not(select)'
		});

		$('form.validate').each(function() {
			$(this).validate();
		});
	}

    if($.fn.owlCarousel) {
        $('.slider').owlCarousel({
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

		jcf.replace($('.custom-select select'));
		jcf.replace($('[type="radio"]'));
		jcf.replace($('[type="checkbox"]'));
	}

	$('.wysiwyg iframe').each(function(){
		$(this).wrap('<div class="embed-responsive embed-responsive--16by9"></div>');
	});

	$('.wysiwyg table').each(function(){
		var mT = $(this).css('marginTop');
		var mB = $(this).css('marginBottom');
		$(this).css('marginBottom','0').css('marginTop','0').wrap('<div class="table-responsive" style="margin-bottom: '+mB+'; margin-top: '+mT+';"></div>');
	});

	$('.menu-trigger').on('click', function(){
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
