(function(){
// ==========================================================================
// Flickity Gallery
// ==========================================================================

    var currHeight,
        currThumbHeight;

    //get height of image on window resize
    function getImgHeightMaster(){
      var myImg = document.querySelector(".flickity-slider").children[0].children[0];
      currHeight = myImg.clientHeight;

      return currHeight;
    }

    //get height of thumbnail on window resize
    function getThumbnailHeight(){
      var myImg = document.querySelector("#myThumb");
      currThumbHeight = myImg.clientHeight;

      return currThumbHeight;
    }

    //resize function
    function resizeFlickity(){
      var gallery = $(".gallery-main"),
          reSize = getImgHeightMaster();

      gallery.find('.flickity-viewport').height(reSize);
      $('.gallery-nav').height(getThumbnailHeight());
    }

    //apply
    $(window).on('resize', function(){
      resizeFlickity();
    });

    //on load
    $(window).on('load', function(){
      resizeFlickity();
    });

})();