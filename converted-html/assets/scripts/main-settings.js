$(function() {

	// // ==========================================================================
	// // Safari special footer settings
	// // ==========================================================================
	function WhichBrowser() {
		//IE
		if (navigator.appName == "Microsoft Internet Explorer") {
			return "msie";
		}

		//Chrome
		if ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (
				navigator.userAgent.toLowerCase().indexOf('safari') > -1) && (navigator.appName ==
				"Netscape")) {
			return "chrome";
		}
		//Firefox
		if ((navigator.userAgent.toLowerCase().indexOf('firefox') > -1) && (
				navigator.appName == "Netscape")) {
			return "firefox";
		}
		//Safari
		if ((navigator.userAgent.toLowerCase().indexOf('safari') > -1) && !(
				navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (navigator.appName ==
				"Netscape")) {

			$('body, footer').addClass('safari');

			$('section').last().removeClass('footer-push');

			return "safari";
		}

		//Opera
		if (navigator.appName == "Opera") {
			return "opera";
		}
	}

	WhichBrowser();


	// // ==========================================================================
	// // Footer-push resize
	// // ==========================================================================
	(function() {


		var tablet = 991,
			resizedWidth;

		$(window).on('resize', function() {
			(!window.requestAnimationFrame) ? setTimeout(specialFooter, 300):
				window.requestAnimationFrame(specialFooter);
		});

		specialFooter();

		function checkWindowWidth() {

			var windowSize = $(window).width() + 15;

			$(window).on('resize', function() {
				resizedWidth = $(window).width() + 15;
				// console.log(resizedWidth);
			});

			if (resizedWidth >= tablet || windowSize >= tablet) {
				// console.log('true');
				return true;
			} else {
				// console.log('false');
				return false;
			}
		}

		function specialFooter() {
			var desktop = checkWindowWidth();
			if (desktop) {

				$('body').removeClass('footer-mobile');

				if ($('main').find('.footer-push')) {
					console.log('true');
					var footerHeight = $('footer').height() + 'px';

					//set footerpush margin to same height as footer
					$('.footer-push').css('margin-bottom', footerHeight);

					$('body').css('height', '100%');
				}

			} else {

				$('main').find('.footer-push').css('margin-bottom', 0);
				$('body').addClass('footer-mobile');
			}
		}

		// ==========================================================================
		// Accordian Tabs
		// ==========================================================================

		$('.panel-left a').on('click', function(e) {
			console.log('left');
			getFh = $('.has-height').height();
			// console.log(getFh);


			if ($(this).parents('.panel').children('.panel-collapse').hasClass('in')) {
				e.stopPropagation();
			}
			if ($(this).parents('.panel').hasClass('active')) {
				//do nothing cus its active
			}
			//add border bottom to panel if not active
			if (!$(this).parents('.panel').hasClass('active')) {
				$("#accordion1 > div").each(function() {
					$(this).removeClass("active");
				});

				$(this).parents('.panel').addClass('active');

				adjustWindow();

				specialFooter();
			}
		});

		//TODO: Check to remove right side JS
		//Accordian Right side
		//Disable pricing table Tabs all being closed at once.
		$('.panel-right a').on('click', function(e) {
			console.log('right');
			if ($(this).parents('.panel').children('.panel-collapse').hasClass('in')) {
				e.stopPropagation();
			}
			if ($(this).parents('.panel').hasClass('active')) {
				//do nothing cus its active
			}
			//add border bottom to panel if not active
			if (!$(this).parents('.panel').hasClass('active')) {
				$("#accordion > div").each(function() {
					$(this).removeClass("active");
				});

				$(this).parents('.panel').addClass('active');

			}
		});


		// ==========================================================================

		// Setup variables
		$window = $(window);
		$slide = $('.homeSlide');
		$slideTall = $('.homeSlideTall');
		$slideTall2 = $('.homeSlideTall2');
		$body = $('body');
		$footer = $('footer');

		//FadeIn all sections
		$body.imagesLoaded(function() {
			setTimeout(function() {

				// Resize sections
				adjustWindow();

				// Fade in sections
				$body.removeClass('loading').addClass('loaded');
				$footer.removeClass('loading').addClass('loaded');

			}, 800);
		});

		function adjustWindow() {

			// Init Skrollr
			var s = skrollr.init({
				render: function(data) {

					//Debugging - Log the current scroll position.
					// console.log(data.curTop);
				},
				//disable for smmother effect
				smoothScrolling: false
			});

			// Get window size
			winH = $window.height();

			// Keep minimum height 550
			if (winH <= 550) {
				winH = 550;
			}

			// Resize our slides
			// $slide.height(winH);
			$slideTall.height(winH * 2);
			$slideTall2.height(winH * 3);

			// Refresh Skrollr after resizing our sections
			s.refresh($('.homeSlide'));

		}


	})();

	// var windowSize = $(window).width();
	// var tablet = 768;


	// $(window).on('resize', function(){
	// 	windowSize = $(window).width();
	// }

	// if(windowSize > tablet){

	// 	if($('section').last().hasClass('footer-push')){

	// 		var footerHeight = $('footer').height() + 'px';

	// 		//set footerpush margin to same height as footer
	// 		$('.footer-push').css('margin-bottom', footerHeight);

	// 		function getfootHeight(){
	// 			return $('footer').height();
	// 		};

	// 		$(window).on('resize', function(){

	// 			var newHeight = getfootHeight();
	// 			console.log(newHeight);
	// 			$('.footer-push').css('margin-bottom', newHeight + 'px');

	// 		});

	// 	}
	// }



});
