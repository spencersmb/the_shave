$(function() {

	// // ==========================================================================
	// // Safari special footer settings
	// // ==========================================================================
	function WhichBrowser(){
		//IE
		if(navigator.appName == "Microsoft Internet Explorer"){
			return "msie";
		}

		//Chrome
		if((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (navigator.userAgent.toLowerCase().indexOf('safari') > -1) && (navigator.appName == "Netscape")){
			return "chrome";
		}
		//Firefox
		if((navigator.userAgent.toLowerCase().indexOf('firefox') > -1) && (navigator.appName == "Netscape")){
			return "firefox";
		}
		//Safari
		if((navigator.userAgent.toLowerCase().indexOf('safari') > -1) && !(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (navigator.appName == "Netscape")){

			$('body, footer').addClass('safari');

			$('section').last().removeClass('footer-push');

			return "safari";
		}

		//Opera
		if(navigator.appName == "Opera"){
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

		$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(specialFooter, 300) : window.requestAnimationFrame(specialFooter);
		});

		specialFooter();

		function checkWindowWidth(){

			var windowSize = $(window).width() + 15;

			$(window).on('resize', function(){
				resizedWidth = $(window).width() + 15;
				// console.log(resizedWidth);
			});

			if( resizedWidth >= tablet || windowSize >= tablet ){
				// console.log('true');
				return true;
			} else {
				// console.log('false');
				return false;
			}
		}

		function specialFooter(){
			var desktop = checkWindowWidth();
			if( desktop ){

				$('body').removeClass('footer-mobile');

				if($('main').find('.footer-push')){
					// console.log('true');
					var footerHeight = $('footer').height() + 'px';

					//set footerpush margin to same height as footer
					$('.footer-push').css('margin-bottom', footerHeight);

				}

			}else {
				
				$('main').find('.footer-push').css('margin-bottom', 0);
				$('body').addClass('footer-mobile');
			}
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