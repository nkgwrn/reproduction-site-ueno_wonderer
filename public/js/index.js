var mySwiper = new Swiper(".swiper-container", {
  loop: true,
  speed: 1000,
  // autoplay: {
  //   delay: 6000,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(function () {
  console.log("こんにちは！");
  $(".cp_arrow").on("click", function () {
    $(this).toggleClass("is-active");
    $(".l-gnav").toggleClass("is-open");
    console.log("こんにちは！");
  });
});
