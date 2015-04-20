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


    
});