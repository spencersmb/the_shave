$(function() {

	//Accordian Left side
	//Disable pricing table Tabs all being closed at once.
	$('.panel-left a').on('click',function(e){
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

	// ==========================================================================
	// Services
	// ==========================================================================

	var faqTrigger = $('.shave__faq--trigger');

		faqTrigger.on('click', function(event){
			event.preventDefault();
			$(this).next('.shave__faq--content').slideToggle(200).end().parent('li').toggleClass('active');
		});

    // ==========================================================================
    // Team page
    // ==========================================================================

    var teamTrigger = $('.open');


    teamTrigger.on('click', function(event){
    	event.preventDefault();
    	$(this).toggleClass('active');
    	// $(this).prev('div').toggleClass('active');
    	$(this).parent('div').toggleClass('active');
    });

    // ==========================================================================
    // Gallery page
    // ==========================================================================

    $(window).load(function(){
    var $container = $('.portfolioContainer');
    $container.isotope({
        itemSelector: ".gallery-item",
					 //layoutMode: 'fitRows',
					 percentPosition: true,
		masonry: { "columnWidth": ".grid-sizer" }
    });
 
    // $('.portfolioFilter a').click(function(){
    //     $('.portfolioFilter .current').removeClass('current');
    //     $(this).addClass('current');
 
    //     var selector = $(this).attr('data-filter');
    //     $container.isotope({
    //         filter: selector,
    //         animationOptions: {
    //             duration: 750,
    //             easing: 'linear',
    //             queue: false
    //         }
    //      });
    //      return false;
    // }); 
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

						// navigationType:"bullet",
						navigationArrows:"solo",
						navigationStyle:"preview4",

						touchenabled:"on",
						onHoverStop:"on",

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
						navigationVOffset:20,

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

						hideSliderAtLimit:0,
						hideCaptionAtLimit:0,
						hideAllCaptionAtLilmit:0,
						startWithSlide:0,
						// videoJsPath:"rs-plugin/videojs/",
						fullScreenOffsetContainer: ""     // round, square, navbar, round-old, square-old, navbar-old 
		});

});