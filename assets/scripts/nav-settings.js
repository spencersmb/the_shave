$(function() {

	var $menu_trigger = $('#sv__nav--trigger'),
	    $content_wrapper = $('.sv__main--content'),
	    $navigation = $('header');

	    //Open Close Menu
	    $menu_trigger.on('click', function(event){

	        event.preventDefault();

	        //Add class to transform hamburger to X
	        $menu_trigger.toggleClass('is-clicked');

	        //Slide nav and header over at same time
	        $navigation.toggleClass('nav-is-open');
	        $content_wrapper.toggleClass('nav-is-open');

	        //show nav
	        $('#sv__navigation').toggleClass('nav-is-open');

	    });
    
});