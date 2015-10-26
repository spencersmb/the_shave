//GALLERY DETAILS PAGE
$('.gallery-main').flickity({
	setGallerySize: true,
	prevNextButtons: true,
	pageDots: false
});

$('.gallery-nav').flickity({
  asNavFor: '.gallery-main',
  contain: true,
  setGallerySize: false,
  prevNextButtons: false,
  pageDots: false
});