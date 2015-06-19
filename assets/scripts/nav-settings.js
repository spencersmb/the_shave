$(function() {

	//Open close 
	var $menu_trigger = $('.sv-dropdown-trigger'),
	    // $content_wrapper = $('.sv__main--content'),
	    $nav = $('.cd-dropdown'),
	    $footer = $('footer'),
	    $navigation = $('#header');


	    //dropdown nav
	    $menu_trigger.on('click', function(event){
	    	event.preventDefault();

    	    //Open nav
    	    $nav.toggleClass('dropdown-is-active');
    	    $menu_trigger.toggleClass('active');
	    });

	    //Open Close navA
	    // $menu_trigger.on('click', function(event){

	    //     event.preventDefault();

	    //     //Add class to transform hamburger to X
	    //     $menu_trigger.toggleClass('is-clicked');

	    //     //Slide nav and header over at same time
	    //     $navigation.toggleClass('nav-is-open');
	    //     $footer.toggleClass('nav-is-open');
	    //     $content_wrapper.toggleClass('nav-is-open');

	    //     //show nav
	    //     $('#sv__navigation').toggleClass('nav-is-open');

	    // });



		//SETTINGS FOR NAVB

		// function toggleNavB(boolean){
		// 	$('body').toggleClass('navB__pause', boolean);
		// 	$('.sv__navB--container, .sv__overlay--navB').toggleClass('is-visible', boolean);
		// 	$('main').toggleClass('scale-down', boolean);
		// }

		// //Open Nav
		// $menu_trigger.on('click', function(evt){
		// 	evt.preventDefault();
		// 	toggleNavB(true);
		// });

		// //Close Nav
		// $('.sv__NavB--close, .sv__overlay--navB').on('click', function(evt){
		// 	evt.preventDefault();
		// 	toggleNavB(false);
		// });

    //ON SCROLL Add shadow

    //Get current position of Nav element
    var currentPosition = $(window).scrollTop();

	if(currentPosition > 50){
		$navigation.addClass('shadow-on');
	}else{
		if($navigation.hasClass('shadow-on')){
			$navigation.removeClass('shadow-on');
		}
	}

    function addShadow(){

    	currentPosition = $(window).scrollTop();

    	if(currentPosition > 50){
    		$navigation.addClass('shadow-on');
    	}else{
    		if($navigation.hasClass('shadow-on')){
    			$navigation.removeClass('shadow-on');
    		}
    	}


    }

    $(window).on('scroll', function(){
    	(!window.requestAnimationFrame) ? addShadow() : window.requestAnimationFrame(addShadow);
    });


    
});