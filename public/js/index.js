$(window).on("load", function () {
  $(".p-cover").fadeOut();

  setTimeout(function () {
    $(".p-mv-right__title, .p-mv-right__copy").fadeIn().addClass("is-open");
    setTimeout(function () {
      $(".p-slide__image").addClass("is-open");
      setTimeout(function () {
        var mySwiper = new Swiper(".swiper-container", {
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 6000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      }, 0);
    }, 500);
  }, 500);
});

$(function () {
  $(".cp_arrow").on("click", function () {
    $(this).toggleClass("is-active");
    $(".l-gnav").toggleClass("is-open");
  });
});
