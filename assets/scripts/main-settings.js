$(function() {

	//Disable pricing table Tabs all being closed at once.
	$('.panel-heading a').on('click',function(e){
	    if($(this).parents('.panel').children('.panel-collapse').hasClass('in')){
	        e.stopPropagation();
	    }
	});
    
});