$(function() {

	//Open close 
	var $menu_trigger = $('.cd-dropdown-trigger'),
	    // $content_wrapper = $('.sv__main--content'),
	    $nav = $('.cd-dropdown'),
	    $footer = $('footer'),
	    $navigation = $('#header');


	    //open dropdown nav
	    $menu_trigger.on('click', function(event){
	    	event.preventDefault();

    	    //Open nav
    	    $nav.toggleClass('dropdown-is-active');
    	    $menu_trigger.toggleClass('dropdown-is-active');
	    });

	    //on mobile - open submenu
	    $('.has-children').children('a').on('click', function(event){

	    	//prevent default clicking on direct children of .has-children 
	    	event.preventDefault();
	    	var selected = $(this);
	    	selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
	    });

	//on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
	var submenuDirection = ( !$('.cd-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
	$('.cd-dropdown-content').menuAim({
        activate: function(row) {
        	$(row).children().addClass('is-active').removeClass('fade-out');
        	if( $('.cd-dropdown-content .fade-in').length == 0 ) $(row).children('ul').addClass('fade-in');
        },
        deactivate: function(row) {
        	$(row).children().removeClass('is-active');
        	if( $('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row)) ) {
        		$('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
        		$(row).children('ul').addClass('fade-out')
        	}
        },
        exitMenu: function() {
        	$('.cd-dropdown-content').find('.is-active').removeClass('is-active');
        	return true;
        },
        submenuDirection: submenuDirection,
    });

    //submenu items - go back link
	$('.go-back').on('click', function(){
		var selected = $(this),
			visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
		selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
	});

	//SUBMENU ITEM IMAGE HOVER
	$('.cd-service-bg').mouseover( function(){
		console.log('hover');
		$(this).children('img').last().css('opacity', 0);
	});
	$('.cd-service-bg').mouseout( function(){
		console.log('out');
		$(this).children('img').last().css('opacity', 1);
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