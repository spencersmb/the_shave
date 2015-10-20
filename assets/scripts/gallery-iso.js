// ==========================================================================
// Gallery Isotope Settings
// ==========================================================================
$(window).load(function(){

  var reIso;
  var $fullGrid = $('.gallery-5-grid');
  var $grid = $fullGrid.isotope({
    itemSelector: '.gallery-item',
    isInitLayout: false,
    masonry: { "columnWidth": ".grid-sizer" }
  });

  function pxConvert(string){
    return parseInt(string.slice(0, -2));
  }

  function reFilter(item){
    $fullGrid.isotope({
      filter: item
    });
  }

  function reSized(){
    $fullGrid.isotope('layout');
    setMinHeight();
  }

  function galleryIsotopeWrapper () {

    if ( $(window).innerWidth() > 1600 ) {
      $gallery_grid = 5;
    } else if ( $(window).innerWidth() <= 600 ) {
      $gallery_grid = 1;
    } else if ( $(window).innerWidth() <= 991 ) {
      $gallery_grid = 2;
    } else if ( $(window).innerWidth() <= 1199 ) {
      $gallery_grid = 3;
    } else {
      $gallery_grid = 4;
    }

    if ( $('.gallery-3-grid').length > 0 && $(window).innerWidth() > 1248 )
    {
      $gallery_grid = 3;
    }

    if ( $('.gallery-4-grid').length > 0 && $(window).innerWidth() > 1584 )
    {
      $gallery_grid = 4;
    }

    $gallery_wrapper_width = $('.gallery-container').width();

    if ( $gallery_wrapper_width % $gallery_grid > 0 ) {
      $gallery_wrapper_width = $gallery_wrapper_width + ( $gallery_grid - $gallery_wrapper_width%$gallery_grid);
    }

    $('.gallery-isotope').css('width',$gallery_wrapper_width);

    return $gallery_grid;
  } // end galleryIsotopeWrapper

  function setMinHeight(){
    var currentHeight = $('.gallery-item.square').css('padding-bottom');
    currentHeight = pxConvert(currentHeight);

    if(currentHeight != 0){
      $('.gallery-isotope').css('min-height', currentHeight);
    } else{
      currentHeight = $('.gallery-item.square').height();
      $('.gallery-isotope').css('min-height', currentHeight);
    }

  }

  galleryIsotopeWrapper();
  $fullGrid.isotope('layout');
  setMinHeight();

  window.onresize = function(){

    clearTimeout(reIso);

    //gallery isotope
    if ( $('.gallery-container').size() ) {
      galleryIsotopeWrapper();

      //on resize complete, readjust grid
      reIso = setTimeout(reSized, 500);
    }

  };

  //Filter on click
  $('.filter-group').on( 'click', 'li', function() {

    $this = $(this);

    $this.parent().children('li').each(function(){
      $(this).removeClass('selected');
    });

    $this.addClass('selected');

    var filterValue = $this.attr('data-filter');

    reFilter(filterValue);

  });

  //Filter URL
  var val = window.location.hash;
  var hash;

  if(val != ''){
    hash = val.substr(8);

    // console.log(hash)
    reFilter(hash);

    $('.filter-group > li').each(function(){
      var data = $(this).data('filter');
      if( data === hash){
        $(this).addClass('selected');
      }
      return;
    });
  }

});