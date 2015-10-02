$(function() {

		//Global Variables
		var myWindow = $(window),
		myBody = $('body'),
		myFooter = $('footer'),
		desktop = 993,
		tablet = 768,
		windowSize = myWindow.width() + 15,
		resizedWidth;

		// ==========================================================================
		// Master Resize
		// ==========================================================================
		$(window).on('resize', function() {
			(!window.requestAnimationFrame) ? setTimeout(specialFooter, 300):
				window.requestAnimationFrame(specialFooter);
		});

		// ==========================================================================
		// Browser Check
		// ==========================================================================
		function WhichBrowser() {
			//IE
			if (navigator.appName == "Microsoft Internet Explorer") {
				return "msie";
			}

			//Chrome
			if ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (
				navigator.userAgent.toLowerCase().indexOf('safari') > -1) && (navigator.appName ==
				"Netscape")) {
				return "chrome";
			}
			//Firefox
			if ((navigator.userAgent.toLowerCase().indexOf('firefox') > -1) && (
				navigator.appName == "Netscape")) {
				return "firefox";
			}
			//Safari
			if ((navigator.userAgent.toLowerCase().indexOf('safari') > -1) && !(
				navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (navigator.appName ==
				"Netscape")) {

				$('body, footer').addClass('safari');

				$('section').last().removeClass('footer-push');

				return "safari";
			}

			//Opera
			if (navigator.appName == "Opera") {
				return "opera";
			}
		}

		function browserJs( browserID ){

			//IE9 fix for cascading animation
			if(browserID == 'msie' && document.documentMode == 9){

				//ADD CSS style opactiy 1
				var cascadeFeature = $('#cascadeFeature');
				cascadeFeature.find('.feature__box').each(function(index){
					$(this).css('opacity', 1);

				});

			}else{
				//Run if any other browser
				ScrollCascade();
			}

		}

		// ==========================================================================
		// Scroll Magic Cascading fade in
		// ==========================================================================
		function ScrollCascade(){
			var cascadeFeature = $('#cascadeFeature');
			var duration = cascadeFeature.height();

			var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: duration}});

			function cascadeClasses(){
				cascadeFeature.find('.feature__box').each(function(index){
					$(this).addClass('active' + index);
				});
			}

			if(checkWindowWidth() === true){
				// build scenes
				new ScrollMagic.Scene({triggerElement: "#cascadeFeature"})
					.offset(150)
					.on("enter", cascadeClasses)
			    //.addIndicators() // add indicators (requires plugin)
					.addTo(controller);
			}else{
				cascadeClasses();
			}

		}

		// ==========================================================================
		// Skrollr checks + preloader
		// ==========================================================================
		function skrollrCheck() {

			//check if skrollr is enabled or not

			var winWidth = window.innerWidth;

			var winHeight = window.innerHeight;

			if (winWidth >= 600) {

				//check if body has skroller
				if (document.body.id !== 'skrollr-body') {
					document.body.id = 'skrollr-body';

					//Init Scrollr
					var s = skrollr.init({
						render: function(data) {
							//Debugging - Log the current scroll position.
							// console.log(data.curTop);
						},

						forceHeight: false, //disable setting height on body
						smoothScrolling: false
					});

				}

				if (winWidth > winHeight) {
					// console.log('orientation is landscape');
					skrollr.get().refresh();
				} else if (winWidth < winHeight) {
					// console.log('orientation is portrait');
					skrollr.get().refresh();
				}
			} else if (winWidth < 600) {

				// Destroy skrollr for screens less than 600px for mobile
				if (document.body.id === 'skrollr-body') {
					skrollr.init().destroy();
					document.body.id = '';

					//Find skrollr elements and adjust background sizing
					findskrollr();
				}

			}
		}

		function shavePreloader(){
			//onload check for loaded class
			if (myBody.hasClass('loaded')) {

				specialFooter();

			} else {

				//FadeIn all sections
				myBody.imagesLoaded(function() {
					setTimeout(function() {

						specialFooter();

						// Fade in sections
						myBody.removeClass('loading').addClass('loaded');
						myFooter.removeClass('loading').addClass('loaded');

					}, 800);
				});
			}
		}

		function findskrollr() {
			var main = $('main');
			var sectionId;

			//For each section adjust background sizing for mobile devices
			main.children('section').each(function() {
				sectionId = $(this).attr('id');

				if (sectionId !== undefined) {

					//see if the section has skr in it
					var match = sectionId.match(/skr/gi);
					if (match !== null) {
						$(this).find('div.skrollable').css('background-position', '50% 70%');
					}
				}
			});
		}

		// ==========================================================================
		// Footer adjustment
		// ==========================================================================
		function specialFooter() {

			//Footer-push resize + sckrollr check

			var width = $(window).width();

			//Resize angle
			setAngleWidth(width);

			if (width >= desktop) {

				skrollrCheck();
				myFooter.width(width);

				$('body').removeClass('footer-mobile');

				if ($('main').find('.footer-push')) {
					var footerHeight = $('footer').height() + 'px';

					//set footerpush margin to same height as footer
					$('.footer-push').css('margin-bottom', footerHeight);
				}

			} else if( width <= desktop){
				skrollrCheck();
				myFooter.width(width);
				$('main').find('.footer-push').css('margin-bottom', 0);
				$('body').addClass('footer-mobile');
			}
		}

		// ==========================================================================
		// Modal config
		// ==========================================================================
		(function() {

			var modal = $('.modal');

			modal.on('show.bs.modal', centerModal);
			modal.on('hide.bs.modal', modalOut);

			$( ".contact__form--container" ).delegate( "*", "focus blur", function() {
				var elem = $( this );
				setTimeout(function() {
					elem.prev().toggleClass('focused');
					elem.toggleClass( "focused", elem.is( ":focus" ) );
				}, 0 );
			});

		})();

		function centerModal(){

			//add display block to get height of the modal-dialog
			$(this).css('display', 'block');
			var dialog = $(this).children('.modal-dialog'),

				//center the object
					offset = ( $(window).height() - dialog.height() ) / 2,

					// get current bottom margin - set base 10
					bottomMargin = parseInt(dialog.css('marginBottom'), 10);

			//makes sure you dont have negative margin
			if(offset < bottomMargin){

				offset = bottomMargin;
			}

			dialog.css('margin-top', offset);

			if(checkWindowWidth() === true){
				//set div heights the same
				var row = dialog.find('.row');
				var rowHeight = row.height();

				row.children('div').height(rowHeight);

				angleModal();

			}

			//full width
			var modalImage = $('.modal-content').find('.row').width();
			$('.angle-top-modal').css('border-right-width', modalImage);

			modalIn();
		}

		function angleModal(){
				var modalImage = $('.modal-content').find('.row').width();
				$('.angle-top-modal').css('border-right-width', modalImage / 2);
		}

		function modalIn(){
			$('.modal-content').find('.row').children('div').eq(1).addClass('animate-in');
		}

		function modalOut(){
			$('.modal-content').find('.row').children('div').eq(1).removeClass('animate-in');
		}

		// ==========================================================================
		// Angle borders
		// ==========================================================================
		function setAngleWidth(width){

			var angleBottomNav = $('.angle-bottom-nav'),
					priceTable = $('.price__table'),
					cardSlider = $('.card__slider'),
					barberBox = $('.barber__box'),
					priceSheet = $('.price__sheet');

			$('.angle-top').css('border-right-width', width);
			$('.angle-bottom').css('border-left-width', width);
			$('.angle-top-bottom').css('border-right-width', width);
			$('.angle-bottom-top').css('border-left-width', width);

			//Check for angle on homepage nav
			if(angleBottomNav){
				angleBottomNav.css('border-left-width', width);
			}

			//Check for price angles
			if(priceTable){
				var priceBox = $('.price__container').width();

				//set box width to remove decimals
				priceTable.css('width', priceBox);

				$('.angle-bottom-price').css('border-left-width', priceBox);
				$('.angle-top-price').css('border-right-width', priceBox);
			}

			//Check for product angles
			if(cardSlider){
				//get width
				var cardWidth = cardSlider.width();

				//set width
				$('.angle-bottom-card').css('border-left-width', cardWidth);
			}

			//Check for bio angles
			if(barberBox){

				//get width
				var boxWidth = barberBox.parent('div').width();

				//set box width to remove decimals
				barberBox.css('width', boxWidth);

				//set width
				$('.angle-top-bottom-barber').css('border-right-width', boxWidth);
			}

			//Check price sheet
			if(priceSheet){

				//get width
				var sheetWidth = $('#myTabContent').find('.active').find('img').width();

				//set width
				$('.angle-top-price').css('border-right-width', sheetWidth);
			}

		}

		// ==========================================================================
		// Helper functions
		// ==========================================================================
		function checkWindowWidth() {

			var windowSize = $(window).width() + 15;

			$(window).on('resize', function() {
				resizedWidth = $(window).width() + 15;
				// console.log(resizedWidth);
			});

			if (resizedWidth >= tablet || windowSize >= tablet) {
				return true;
			} else {
				return false;
			}
		}

		// ==========================================================================
		// Sub-menu item hover
		// ==========================================================================
		(function() {

			var serviceBg = $('.cd-service-bg');

			serviceBg.mouseover( function(){
				if(checkWindowWidth() === true){
					$(this).children('img').last().css('opacity', 0);
				}
			});

			serviceBg.mouseout( function(){
				if(checkWindowWidth() === true){
					$(this).children('img').last().css('opacity', 1);
				}
			});

		})();

		// ==========================================================================
		// Run on First Load
		// ==========================================================================

		//browser check
		browserJs(WhichBrowser());

		//Image Preloader check
		shavePreloader();

		//angled boarders
		setAngleWidth(windowSize);

});
