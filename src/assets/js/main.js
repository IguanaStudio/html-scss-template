$(document).ready(function(){


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
				$('html').addClass('is-minimize');
			else
				$('html').removeClass('is-minimize');
		}).scroll();
	}
}