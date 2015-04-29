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

});