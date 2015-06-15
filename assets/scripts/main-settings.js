$(function() {

	// //Accordian Left side
	//Disable pricing table Tabs all being closed at once.
	$('.panel-left a').on('click',function(e){

		getFh = $('.has-height').height();
		console.log(getFh);
		

	    if($(this).parents('.panel').children('.panel-collapse').hasClass('in')){
	        e.stopPropagation();
	    }
	    if( $(this).parents('.panel').hasClass('active')){
	    	//do nothing cus its active
	    }
	    //add border bottom to panel if not active
	    if(!$(this).parents('.panel').hasClass('active')){
	    	$("#accordion1 > div").each(function(){
	    		$(this).removeClass("active");
	    	});

	    	$(this).parents('.panel').addClass('active');
	    }
	});

	//Accordian Right side
	//Disable pricing table Tabs all being closed at once.
	$('.panel-right a').on('click',function(e){

	    if($(this).parents('.panel').children('.panel-collapse').hasClass('in')){
	        e.stopPropagation();
	    }
	    if( $(this).parents('.panel').hasClass('active')){
	    	//do nothing cus its active
	    }
	    //add border bottom to panel if not active
	    if(!$(this).parents('.panel').hasClass('active')){
	    	$("#accordion > div").each(function(){
	    		$(this).removeClass("active");
	    	});

	    	$(this).parents('.panel').addClass('active');
	    }
	});

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

			$('body').addClass('safari');

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


	// // ==========================================================================
	// // Services
	// // ==========================================================================


		var faqTrigger = $('.shave__faq--trigger');

		faqTrigger.on('click', function(event){
			event.preventDefault();
			$(this).next('.shave__faq--content').slideToggle(200).end().parent('li').toggleClass('active');
		});

		//HOW IT WORKS BOXS
		var arrHeight =[];
		var arrClean =[];

		$(".shave__card").each(function(item){
			// console.log($(this).height());
			arrHeight.push($(this).height());
			arrClean.push($(this).height());
		});

		//reorder largest to smallest and get the largest item
    	var largest = arrHeight.sort().reverse()[0];

    	//find the index of the largest box, then add a tallest class to it
    	var indexOf = $.inArray( largest, arrClean);

    	$('.shave__card').eq(indexOf).addClass('tallest');

    	//Set heights of the content boxs and then image boxs next
    	$(".shave__card").each(function(item){
			
			//Set new height of container
			$(this).children('.content').css('height', largest + 'px');
		});

		$(".shave__card--img").each(function(item){
			
			//Set new height of container
			$(this).css('height', largest + 'px');
		});


		function getHeight(){
			//on-resize set height to auto and target the tallest item only for height
			$('.shave__card').children('.content').height('auto');
			return $('.shave__card.tallest').height();
		};

		$(window).on('resize', function(){

			//use tallest height for everything
			var newHeight = getHeight();
			$(".shave__card--img").css('height', newHeight + 'px');
			$('.shave__card').children('.content').css('height', newHeight + 'px');

		});


 //    // ==========================================================================
 //    // Team page
 //    // ==========================================================================

    var teamTrigger = $('.open');


    teamTrigger.on('click', function(event){
    	event.preventDefault();
    	$(this).toggleClass('active');
    	// $(this).prev('div').toggleClass('active');
    	$(this).parent('div').toggleClass('active');
    });

 //    // ==========================================================================
 //    // Gallery Index page
 //    // ==========================================================================

    $(window).load(function(){
	    var $container = $('.portfolioContainer');
	    $container.isotope({
	        itemSelector: ".gallery-item",
						 //layoutMode: 'fitRows',
						 percentPosition: true,
			masonry: { "columnWidth": ".grid-sizer" }
	    });
	});

	// ==========================================================================
	// Revolution Slider Settings
	// ==========================================================================

   $('.tp-banner').revolution(
		{
						dottedOverlay:"none",
						delay:16000,
						startwidth:1170,
						startheight:700,
						hideThumbs:200,

						thumbWidth:100,
						thumbHeight:50,
						thumbAmount:5,

						navigationType:"none",
						navigationArrows:"solo",
						navigationStyle:"preview4",

						touchenabled:"on",
						onHoverStop:"off",

						swipe_velocity: 0.7,
						swipe_min_touches: 1,
						swipe_max_touches: 1,
						drag_block_vertical: false,

						parallax:"mouse",
						parallaxBgFreeze:"on",
						parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

						keyboardNavigation:"off",

						navigationHAlign:"center",
						navigationVAlign:"bottom",
						navigationHOffset:0,
						navigationVOffset:0,

						soloArrowLeftHalign:"left",
						soloArrowLeftValign:"center",
						soloArrowLeftHOffset:20,
						soloArrowLeftVOffset:0,

						soloArrowRightHalign:"right",
						soloArrowRightValign:"center",
						soloArrowRightHOffset:20,
						soloArrowRightVOffset:0,

						shadow:0,
						fullWidth:"on",
						fullScreen:"on",

						spinner:"spinner4",

						stopLoop:"off",
						stopAfterLoops:-1,
						stopAtSlide:-1,

						shuffle:"off",

						autoHeight:"off",
						forceFullWidth:"off",

						hideThumbsOnMobile:"off",
						hideNavDelayOnMobile:1500,
						hideBulletsOnMobile:"off",
						hideArrowsOnMobile:"off",
						hideThumbsUnderResolution:0,
						hideTimerBar:"on",

						hideSliderAtLimit:0,
						hideCaptionAtLimit:0,
						hideAllCaptionAtLilmit:0,
						startWithSlide:0,
						// videoJsPath:"rs-plugin/videojs/",
						fullScreenOffsetContainer: ""     // round, square, navbar, round-old, square-old, navbar-old 
		});

});