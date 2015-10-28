$(function() {

		//Global Variables
		var myWindow = $(window),
		myBody = $('body'),
		myFooter = $('footer'),
		desktop = 993,
		tablet = 784,
		windowSize = myWindow.width(),
		browserID = WhichBrowser(),
		resizedWidth;
	
		//console.log(browserID);
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

		//add footer class no matter what browser
		function addFooterPush(){
			$('section').last().addClass('footer-push');
		}

		function WhichBrowser() {

			//IE
			if (navigator.appName == "Microsoft Internet Explorer") {
				addFooterPush();
				return "msie";
			}

			//Chrome
			if ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (
				navigator.userAgent.toLowerCase().indexOf('safari') > -1) && (navigator.appName ==
				"Netscape")) {
				addFooterPush();
				return "chrome";
			}
			//Firefox
			if ((navigator.userAgent.toLowerCase().indexOf('firefox') > -1) && (
				navigator.appName == "Netscape")) {
				addFooterPush();
				return "firefox";
			}
			//Safari
			if ((navigator.userAgent.toLowerCase().indexOf('safari') > -1) && !(
				navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (navigator.appName ==
				"Netscape")) {

				if(navigator.userAgent.match(/iPad/i) != null){
					$('body, footer').addClass('ipad');

					$('section').last().removeClass('footer-push');
					return "ipad";

				}else{

					//$('body, footer').addClass('safari').addClass('safari-modal');

					$('section').last().removeClass('footer-push');

					return "safari";
				}


			}

			//Opera
			if (navigator.appName == "Opera") {
				addFooterPush();
				return "opera";
			}
		}

		//IE9 fixs
		function browserJs( browserID ){

			var cascadeFeature = $('#cascadeFeature');

				if(browserID == 'msie' && document.documentMode == 9){
						
						//IE9 fix for cascading animation
						cascadeFeature.find('.svfm1__card').each(function(index){
								$(this).css('opacity', 1);
						});

						//ie9 fix for cards
						ie9ProductsEvent();

				}else{
						//Run if any other browser
						if(cascadeFeature){
							setTimeout(function() {
								ScrollCascade(windowSize, cascadeFeature);
							}, 900);

						}

						modernProductsEvent();
				}

		}

		// ==========================================================================
		// Activate Product details modern browser
		// ==========================================================================
		function modernProductsEvent(){
			var wrapper = $('.card__slider');

			wrapper.on('click', function(event){
				event.preventDefault();
				$(this).find('.content__wrapper').toggleClass('active');
			});
		}

		// ==========================================================================
		// Rearrange copy for IE9
		// ==========================================================================
		function ie9ProductsEvent(){
			var productsContainer = $('.products');

			//click event
			var wrapper = $('.card__slider');

			wrapper.on('click', function(event){
				event.preventDefault();
				$(this).toggleClass('active');
			});

			//move elements

			if(productsContainer){
				productsContainer.find('.card__slider').each(function(i, v){

					var $this = $(this);
					var bio = $this.find(".bio"),
						title = $this.find('.title'),
						contentWrapper = $this.find('.content__wrapper');

					bio.detach();
					bio.insertBefore(contentWrapper);

					var newBio = $this.find('.bio').children('h6');
					title.clone().insertBefore(newBio);
				});
			}
		}

		// ==========================================================================
		// Scroll Magic Cascading fade in
		// ==========================================================================
		function ScrollCascade(windowWidthX, object){
			
			var cascadeFeature = object;

			var duration = cascadeFeature.height();
			
			var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: duration}});

			function cascadeClasses(){
				cascadeFeature.find('.svfm1__card').each(function(index){
					$(this).addClass('active' + index);
				});
			}

			if(windowWidthX >= 600){
				// build scenes
				new ScrollMagic.Scene({triggerElement: "#cascadeFeature"})
					.offset(-200)
					.on("enter", cascadeClasses)
			    //.addIndicators() // add indicators (requires plugin)
					.addTo(controller);
			}else {
				cascadeClasses();
			}
		}

		// ==========================================================================
		// Skrollr checks + image preloader
		// ==========================================================================
		function skrollrCheck() {

			//check if skrollr is enabled or not

			var winWidth = window.innerWidth;

			var winHeight = window.innerHeight;

			//if its not an ipad and window is larger than 769 enable skrollr
			if (winWidth >= 992 && browserID != 'ipad') {

				//check if body has skroller
				if (document.body.id !== 'skrollr-body') {
					document.body.id = 'skrollr-body';

					//Init Scrollr
					var s = skrollr.init({
						render: function(data) {
							//Debugging - Log the current scroll position.
							//console.log(data.curTop);
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
			} else if (winWidth < 991) {

				// Destroy skrollr for screens less than 600px for mobile
				if (document.body.id === 'skrollr-body') {
					skrollr.init().destroy();
					document.body.id = '';

					//Find skrollr elements and adjust background sizing
					findskrollr();
				}

			}
		}

		//preload images
		function preLoadElement(element, func){
			$(element).Prefetch({

				onImageLoaded:function(source, instance){
					console.log('Image source');
					console.log(source);
					console.log(instance);
				},

				onAllLoaded:function(instance) {
					console.log('prefetch loaded element');
					console.log(instance);

					if(func){
						func();
					}
				}
			});
		}

		///main init for display
		function initLayout(){

			setTimeout(function() {
				console.log('done loading images');
				specialFooter();

				// Fade in sections
				myBody.removeClass('loading').addClass('loaded');
				myFooter.removeClass('loading').addClass('loaded');


			}, 800);
		}

		function shavePreloader(){
			//onload check for loaded class
			if (myBody.hasClass('loaded')) {

				specialFooter();

			} else {

				//FadeIn all sections
				myBody.imagesLoaded(function(){
					var modal = $('.modal-bookNow');

					//run while preloading
					preLoadElement(modal);


				}).done(function (instance) {
					var isoGalleryItem = $('.gallery-item').find('span').get(),
							heroItem = $('.hero-background'),
							postThumb = $('.post-thumb-img').get();

							//background image preloader
							if(heroItem.length > 0 ){
								preLoadElement(heroItem, initLayout);

							}else if(postThumb.length > 0 ) {
								preLoadElement(postThumb, initLayout);
							}
							else if(isoGalleryItem.length > 0){
								preLoadElement(isoGalleryItem, initLayout);

							}else{
								initLayout();
							}

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

			//var width = $(window).width(),
				var footerHeight,
						body = $('body');

			//Overwrite windowsize on resize
			windowSize = $(window).width();

			//Resize angle
			setAngleWidth(windowSize);

			if (windowSize + 15 >= desktop) {

				skrollrCheck();
				myFooter.width(windowSize);

				body.removeClass('footer-mobile');

				if ($('main').find('.footer-push')) {
					footerHeight = $('footer').height() + 'px';

					//set footerpush margin to same height as footer
					$('.footer-push').css('margin-bottom', footerHeight);
				}

			} else if( windowSize - 15 <= desktop){

				skrollrCheck();
				myFooter.width(windowSize);
				footerHeight = $('footer').height() + 'px';
				$('.footer-push').css('margin-bottom', footerHeight);
			}

		}

		function setModalHeight(object){

			//set div heights the same for laptop/desktop
			var row = object.find('.row');
			var rowHeight = row.height();

			row.children('modal-bookNow').height(rowHeight);
		}

		function resetModalHeight(object){

			//set div heights the same for laptop/desktop
			var row = object.find('.row');

			row.children('modal-bookNow').css('height', "");
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

			var screenSize = windowSize + 15;

			$(window).on('resize', function() {
				resizedWidth = $(window).width() + 15;
				//console.log(resizedWidth);
			});

			if (resizedWidth >= tablet || screenSize >= tablet) {
				return true;
			} else {
				return false;
			}
		}

		function checkLaptopWidth() {

			var windowSize = $(window).width();

			$(window).on('resize', function() {
				resizedWidth = $(window).width();
				console.log(resizedWidth);
			});

			if (resizedWidth >= desktop || windowSize >= desktop) {
				return true;
			} else {
				return false;
			}
		}

		///Encapselated States
		(function() {

			var header = $('#header');
			// ==========================================================================
			// Sub-menu item hover
			// ==========================================================================
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


			// ==========================================================================
			// Modal click functions
			// ==========================================================================
			$('.modal-form').find('li').click(function (e) {
				e.preventDefault();
				var link = $(this).children('a').attr('href');
				window.location = link;
			});


			// ==========================================================================
			// Form focus for comments
			// ==========================================================================
			$( ".comment__form" ).delegate( "*", "focus blur", function() {
				var elem = $( this );
				setTimeout(function() {
					elem.prev().toggleClass('focused');
					elem.toggleClass( "focused", elem.is( ":focus" ) );
				}, 0 );
			});


			// ==========================================================================
			// FAQ
			// ==========================================================================
			var faqTrigger = $('.shave__faq--trigger');

			faqTrigger.on('click', function(event){
				event.preventDefault();
				$(this).next('.shave__faq--content').slideToggle(200).end().parent('li').toggleClass('active');
			});

			// ==========================================================================
			// Twitter Carousel
			// ==========================================================================
			$('#twitter-carousel').carousel({
				interval: 0
			});

			// ==========================================================================
			// Scroll to functions
			// ==========================================================================
			$('.box-sm-hours').find('a').click(function (e) {
				e.preventDefault();

				$('html, body').animate({
					scrollTop: $( $.attr(this, 'href') ).offset().top - 80
				}, 900);
				return false;

			});

			//$('#hours').click(function(e){
			//	e.preventDefault();
			//	$('.sv-toast').addClass('in');
			//});
      //
			//$('.sv-hours').children('button').click(function(e){
			//	e.preventDefault();
			//	$('.sv-toast').addClass('out');
			//	setTimeout(function() {
			//		$('.sv-toast').removeClass('in out');
			//	}, 800 );
			//});



		})();

		// ==========================================================================
		// Feature Module 2
		// ==========================================================================
		//TODO: organize JS
		var myTab = $('#svfm2Tab');

		if(myTab){

			var myTabContent = myTab.next(),
				svfm2Wrapper = $('.svfm2__wrapper'),
				svfm2ImageContainer = $('.svfm2__wrapper--images'),
				svfm2Image = '.svfm2__image',
				tabTitle = myTab.find('li.active').data('title'),
				headline = svfm2Wrapper.find('.headline-container').children('h3');

			svfm2Wrapper.children(svfm2ImageContainer).children(svfm2Image).each(function(index){
				if(index == 0){

				}else{
					//				$(this).fadeOut();
				}
			});

			//Change tab content
			myTab.on('click', 'li', function(){
				//console.log('click');
				//check width before starting
				//width = $(window).width();

				var tab = $(this);

				//get panel ID that was clicked and remove the hash
				var panelId = tab.find('a').attr('href').substr(1);

				//get the data-attrb for the current clicked tab
				tabTitle = tab.data('title');

				$('#myTabContent > div').each( function() {

					//first chck if the tab has active that was clicked
					if(!$(this).hasClass('active')){

						$(this).removeClass('active').removeClass('in');

						if(panelId === this.id){

							var element = $(this),
								currentImage = svfm2Wrapper.children(svfm2ImageContainer).children('.active');

							//get heigh of clicked content
							var panelHeight = element.height(),
								imageTitle = svfm2Wrapper.children(svfm2ImageContainer).children(svfm2Image).get();

							//loop through the images and match the title to the tab title
							for( var i=0; i < imageTitle.length; i++){

								if($(imageTitle[i]).data('title') === panelId){

									$(imageTitle[i]).addClass('active');
								}
							}

							//add hight to adj the for new content
							if(windowSize <= 600){
								//slide content out and then add the content back in
								setTimeout(function(){
									myTabContent.height(panelHeight);
								}, 400);

							}

							currentImage.removeClass('active');

							//change title
							headline.fadeTo( "slow", 0, function(){
								headline.text(tabTitle).fadeTo('fast', 1);
							});


							setTimeout(function(){
								element.addClass('in');
							}, 400);

						}
					}

				});

			});


			//change title on page load
			headline.text(tabTitle);

			//sett height for phones on load
			if(windowSize <= 600){

				var mobilePanelHeight = $('#myTabContent').find('.active').height();

				$('#myTabContent').height(mobilePanelHeight);

			}
		} //end SVFM2 TAB functions


		// ==========================================================================
		// Price Tab sizing function
		// ==========================================================================

		//Change size of body depending on content in tabs
		$('#priceTabs').on('click', 'li', function(){
			var galleryPageHeight = $(window).height();
			var tabContentHeight = $('.sv__container--sm').height();
			var updatedHeight = galleryPageHeight - tabContentHeight;
			var panelId = $(this).find('a').attr('href').substr(1);
			$('body').css('height', updatedHeight + 'px');

			$('#myTabContent > div').each( function() {

				//first chck if the tab has active that was clicked
				if(!$(this).hasClass('active')){

					$(this).removeClass('active').removeClass('in');

					if(panelId === this.id){

						var element = $(this);
						//console.log(this);

						setTimeout(function(){
							element.addClass('in');
						}, 200);

					}
				}

			});

		});

		// ==========================================================================
		// Run on First Load
		// ==========================================================================

		//browser check
		browserJs(browserID);

		//Image Preloader check
		shavePreloader();


		//angled boarders
		//setAngleWidth(windowSize);

});
