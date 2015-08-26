function initialize() {

  var latitude = 33.9195276,
    longitude = -84.3493754;

  var loc1 = new google.maps.LatLng(latitude,longitude);

  //google map custom marker icon - .png fallback for IE11
  var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
  var marker_url = ( is_internetExplorer11 ) ? 'assets/images/icons/cd-icon-location.png' : 'assets/images/icons/cd-icon-location.svg';

  //define the basic color of your map, plus a value for saturation and brightness
  var main_color = '#453600',
    saturation_value= -20,
    brightness_value= 5;

  //we define here the style of the map
  var styles= [
    {
      //set saturation for the labels on the map
      elementType: "labels",
      stylers: [
        {saturation: saturation_value}
      ]
    },
    {   //poi stands for point of interest - don't show these lables on the map
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      //don't show highways lables on the map
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      //don't show local road lables on the map
      featureType: "road.local",
      elementType: "labels.icon",
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      //don't show arterial road lables on the map
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      //don't show road lables on the map
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {visibility: "off"}
      ]
    },
    //style different elements on the map
    {
      featureType: "transit",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "poi.government",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "poi.sport_complex",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "poi.attraction",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "poi.business",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "transit",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "landscape",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]

    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { hue: main_color },
        { visibility: "on" },
        { lightness: brightness_value },
        { saturation: saturation_value }
      ]
    }
  ];


  var mapOptions = {
    center: loc1,
    zoom: 15,
    draggable: true,
    scrollwheel: false,
    panControl: false,
    streetViewControl: true,
    zoomControl: false,
    minZoom: 10,
    styles: styles
  };

  var map = new google.maps.Map(document.getElementById('sv-google-map'),
    mapOptions);


  // Atlanta Office
  var marker1 = new google.maps.Marker({
    position: loc1,
    map: map,
    animation: google.maps.Animation.DROP,
    visible: true,
    //icon: marker_url
    //'optimized': true
    icon: 'assets/images/icons/cd-icon-location.png'
  });

  function toggleBounce() {
    if (marker1.getAnimation() !== null) {
      marker1.setAnimation(null);
    } else {
      marker1.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  //Set active on load
  function activeLoad(){

    setTimeout(function(){
      //toggleBounce();
      atlanta.open(map,marker1);
      map.panTo(loc1);
    }, 1800);

  }


  function buildLat( location ){
    var myLocation = location.G;
    myLocation += "," + location.K;

    var myLink = "https://maps.google.com?saddr=Current+Location&daddr=" + myLocation;

    return myLink;
  }

  function ZoomControl(controlDiv, map) {

    // Creating divs & styles for custom zoom control
    controlDiv.style.padding = '5px';

    // Set CSS for the control wrapper
    var controlWrapper = document.createElement('div');
    controlWrapper.style.backgroundColor = 'transparent';
    controlWrapper.style.borderStyle = 'solid';
    controlWrapper.style.borderColor = 'gray';
    controlWrapper.style.borderWidth = '0px';
    controlWrapper.style.cursor = 'pointer';
    controlWrapper.style.textAlign = 'center';
    controlWrapper.style.width = '32px';
    controlWrapper.style.height = '64px';
    controlDiv.appendChild(controlWrapper);

    // Set CSS for the zoomIn
    var zoomInButton = document.createElement('div');
    zoomInButton.style.width = '32px';
    zoomInButton.style.height = '32px';
    /* Change this to be the .png image you want to use */
    zoomInButton.style.backgroundImage = 'url("assets/images/icons/plus.jpg")';
    controlWrapper.appendChild(zoomInButton);

    // Set CSS for the zoomOut
    var zoomOutButton = document.createElement('div');
    zoomOutButton.style.width = '32px';
    zoomOutButton.style.height = '32px';
    zoomOutButton.style.marginTop = '2px';
    /* Change this to be the .png image you want to use */
    zoomOutButton.style.backgroundImage = 'url("assets/images/icons/minus.jpg")';
    controlWrapper.appendChild(zoomOutButton);

    // Setup the click event listener - zoomIn
    google.maps.event.addDomListener(zoomInButton, 'click', function() {
      map.setZoom(map.getZoom() + 1);
    });

    // Setup the click event listener - zoomOut
    google.maps.event.addDomListener(zoomOutButton, 'click', function() {
      map.setZoom(map.getZoom() - 1);
    });

  }

  // Create the DIV to hold the control and call the ZoomControl() constructor
  // passing in this DIV.
  var zoomControlDiv = document.createElement('div');
  var zoomControl = new ZoomControl(zoomControlDiv, map);

  zoomControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(zoomControlDiv);

  // INFO WINDOWS - POPUP MODAL
  // Atlanta Office Details
  var atlantaDetails = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">The Shave</h1>'+
    '<div id="bodyContent">'+
    '<p>1150E Hammond Drive' +
    '<br>Atlanta, GA 30328'+
    '<br>Suites 400, 600 & 650</p>'+
    '<a class="tel" href="tel:333-333-3333">333-333-3333</a>'+
    '<a class="btn book-now-btn get-directions" href="' + buildLat(loc1) + '" target="_blank">Get Directions</a>'+
    '</div>'+
    '</div>';


  var atlanta = new google.maps.InfoWindow({
    content: atlantaDetails
  });

  google.maps.event.addListener(marker1, 'click', function() {
    toggleBounce();
    atlanta.open(map,marker1);

  });

  //atlanta.open(map,marker1);
  activeLoad();

}

google.maps.event.addDomListener(window, 'load', initialize);
