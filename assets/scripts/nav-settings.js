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

			//close meganavigation
			$('.cd-dropdown .cd-close').on('click', function(event){
				event.preventDefault();
				toggleNav();
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

	function toggleNav(){
		var navIsVisible = ( !$('.cd-dropdown').hasClass('dropdown-is-active') ) ? true : false;
		$('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
		$('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
		if( !navIsVisible ) {
			$('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('.has-children ul').addClass('is-hidden');
				$('.move-out').removeClass('move-out');
				$('.is-active').removeClass('is-active');
			});
		}
	}

	var main = $('main'),
			isHero = true,
			firstSection = main.children('section').first();
    //Get current position of Nav element
    var currentPosition = $(window).scrollTop();

		if(!firstSection.hasClass('hero-container') && !firstSection.hasClass('hero')){
			isHero = false;
		}


		//if is Hero
		if(currentPosition > 50 && isHero){
			$navigation.addClass('shadow-on');
		}else{
			$navigation.removeClass('shadow-on');
		}

		if(currentPosition > 50 && !isHero){
			$navigation.addClass('shadow-on');
			$navigation.removeClass('no-hero');
		}else if(currentPosition < 50 && !isHero){
			$navigation.removeClass('shadow-on');
			$navigation.addClass('no-hero');
		}


    function addShadow(){

    	currentPosition = $(window).scrollTop();

			if(currentPosition > 50 && isHero){
				$navigation.addClass('shadow-on');
			}else{
				$navigation.removeClass('shadow-on');
			}

			if(currentPosition > 50 && !isHero){
				$navigation.addClass('shadow-on');
				$navigation.removeClass('no-hero');
			}else if(currentPosition < 50 && !isHero){
				$navigation.removeClass('shadow-on');
				$navigation.addClass('no-hero');
			}

    }

    $(window).on('scroll', function(){
    	(!window.requestAnimationFrame) ? addShadow() : window.requestAnimationFrame(addShadow);
    });


    
});