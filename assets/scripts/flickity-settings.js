
// $('.gallery').flickity({
//   cellAlign:'left',
//   contain: true,
//   wrapAround: true
// });

//GALLERY DETAILS PAGE
$('.gallery-main').flickity({
	setGallerySize: false
});

$('.gallery-nav').flickity({
  asNavFor: '.gallery-main',
  contain: true,
  pageDots: false
});