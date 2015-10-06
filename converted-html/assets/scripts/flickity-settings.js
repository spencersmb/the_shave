
// $('.gallery').flickity({
//   cellAlign:'left',
//   contain: true,
//   wrapAround: true
// });

//GALLERY DETAILS PAGE
$('.gallery-main').flickity({
	setGallerySize: true,
	prevNextButtons: false,
	pageDots: false
});

$('.gallery-nav').flickity({
  asNavFor: '.gallery-main',
  contain: true,
  setGallerySize: false,
  prevNextButtons: false,
  pageDots: false
});