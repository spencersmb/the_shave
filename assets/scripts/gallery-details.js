// ==========================================================================
// Flickity Gallery
// ==========================================================================
(function(){

    var currHeight,
      currThumbHeight;

    //get height of image on window resize
    function getImgHeightMaster(){
      var myImg = document.querySelector("#myImg");
      currHeight = myImg.clientHeight;

      return currHeight;
    }

    //get height of thumbnail on window resize
    function getThumbnailHeight(){
      var myImg = document.querySelector("#myThumb");
      currThumbHeight = myImg.clientHeight;

      return currThumbHeight;
    }

    function resizeFlickity(){
      var gallery = $(".gallery-main");

      gallery.find('.flickity-viewport').height(getImgHeightMaster());
      $('.gallery-nav').height(getThumbnailHeight());
      gallery.css('padding-bottom', getImgHeightMaster());
    }

    $('.gallery-nav').height(getThumbnailHeight());

    //Set Gallery Main padding-bottom to align subnav
    $('.gallery-main').css('padding-bottom', getImgHeightMaster());

    //apply
    $(window).on('resize', function(){
      resizeFlickity();
    });

    $(window).on('load', function(){
      resizeFlickity();
    });
})();