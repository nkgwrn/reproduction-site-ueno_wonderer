var mySwiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

$(function () {
  console.log("こんにちは！");
  $(".cp_arrow").on("click", function () {
    $(".l-gnav").toggleClass("is-open");
    // if ($(".l-gnav").hasClass("is-open")) {
    //   $(".l-header__lang").css("display", "none");
    // } else {
    //   $(".l-header__lang").css("display", "flex");
    // }
    console.log("こんにちは！");
  });
});
