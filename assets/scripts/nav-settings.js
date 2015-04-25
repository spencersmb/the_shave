$(function() {

	//Open close nav
	var $menu_trigger = $('#sv__nav--trigger'),
	    $content_wrapper = $('.sv__main--content'),
	    $footer = $('footer'),
	    $navigation = $('header');

	    //Open Close Menu
	    $menu_trigger.on('click', function(event){

	        event.preventDefault();

	        //Add class to transform hamburger to X
	        $menu_trigger.toggleClass('is-clicked');

	        //Slide nav and header over at same time
	        $navigation.toggleClass('nav-is-open');
	        $footer.toggleClass('nav-is-open');
	        $content_wrapper.toggleClass('nav-is-open');

	        //show nav
	        $('#sv__navigation').toggleClass('nav-is-open');

	    });

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