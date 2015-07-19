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
	// // Footer-push resize + sckrollr check
	// // ==========================================================================
	(function() {

		var myWindow = $(window),
			// $slide = $('.homeSlide'),
			// $slideTall = $('.homeSlideTall'),
			// $slideTall2 = $('.homeSlideTall2'),
			myBody = $('body'),
			myFooter = $('footer'),
			tablet = 991,
			resizedWidth;

		// Init skrollrCheck
		// ==========================================================================
		var skrollrCheck = function() {

			var winWidth = window.innerWidth;

			// console.log(winWidth);
			var winHeight = window.innerHeight;

			if (winWidth >= 600) {

				//check if body has skroller
				if (document.body.id !== 'skrollr-body') {
					document.body.id = 'skrollr-body';

					//Init Scrollr
					var s = skrollr.init({
						render: function(data) {
							//Debugging - Log the current scroll position.
							// console.log(data.curTop);
						},

						forceHeight: false, //disable setting height on body
						smoothScrolling: false,
					});

				}
				if (winWidth > winHeight) {
					// console.log('orientation is landscape');
					skrollr.get().refresh();
				} else if (winWidth < winHeight) {
					// console.log('orientation is portrait');
					skrollr.get().refresh();
				}
			} else if (winWidth < 600) {

				// Destroy skrollr for screens less than 600px
				if (document.body.id === 'skrollr-body') {
					skrollr.init().destroy();
					document.body.id = '';

					//Find skrollr elements and adjust background sizing
					findskrollr();
				}

			}
		};


		$(window).on('resize', function() {
			(!window.requestAnimationFrame) ? setTimeout(specialFooter, 300):
				window.requestAnimationFrame(specialFooter);
		});

		//onload check for loaded class
		if (myBody.hasClass('loaded')) {

			specialFooter();

		} else {

			//FadeIn all sections
			myBody.imagesLoaded(function() {
				setTimeout(function() {

					specialFooter();

					// Fade in sections
					myBody.removeClass('loading').addClass('loaded');
					myFooter.removeClass('loading').addClass('loaded');

				}, 800);
			});
		}


		function findskrollr() {
			var main = $('main');
			var sectionId;

			main.children('section').each(function() {
				sectionId = $(this).attr('id');

				if (sectionId !== undefined) {
					var match = sectionId.match(/skr/gi);
					if (match !== null) {
						$(this).find('div.skrollable').css('background-position', '50% 70%');
					}
				}
			});
		}

		function checkWindowWidth() {

			var windowSize = $(window).width() + 15;

			$(window).on('resize', function() {
				resizedWidth = $(window).width() + 15;
				// console.log(resizedWidth);
			});

			if (resizedWidth >= tablet || windowSize >= tablet) {
				return true;
			} else {
				return false;
			}
		}

		function specialFooter() {
			var desktop = checkWindowWidth();
			if (desktop) {

				skrollrCheck();
				$('body').removeClass('footer-mobile');

				if ($('main').find('.footer-push')) {
					var footerHeight = $('footer').height() + 'px';

					//set footerpush margin to same height as footer
					$('.footer-push').css('margin-bottom', footerHeight);

					$('body').css('height', '100%');
				}

			} else {
				skrollrCheck();
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


		//OLD SKROLLER + IMAGE LOAD
		// function adjustWindow() {
		//
		// 	// Init Skrollr
		// 	var s = skrollr.init({
		// 		render: function(data) {
		//
		// 			//Debugging - Log the current scroll position.
		// 			// console.log(data.curTop);
		// 		},
		// 		//disable for smmother effect
		// 		smoothScrolling: false
		// 	});
		//
		// 	// Get window size
		// 	winH = $window.height();
		//
		// 	// Keep minimum height 550
		// 	if (winH <= 550) {
		// 		winH = 550;
		// 	}
		//
		// 	// Resize our slides
		// 	// $slide.height(winH);
		// 	$slideTall.height(winH * 2);
		// 	$slideTall2.height(winH * 3);
		//
		// 	// Refresh Skrollr after resizing our sections
		// 	s.refresh($('.homeSlide'));
		//
		// }

	})();



});
