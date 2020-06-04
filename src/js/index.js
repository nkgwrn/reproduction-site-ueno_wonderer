$(window).on("load", function () {
  var progress = 0;
  var imgCount = $("img").length;
  $("img").each(function () {
    var src = $(this).attr("src");
    $("<img>")
      .attr("src", src)
      .on("load", function () {
        progress++;
      });
  });
  setInterval(function () {
    $("#progress-bar").css({
      width: (progress / imgCount) * 100 + "%",
    });
  }, 1);
  $(".p-cover, #progress-box").fadeOut();

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
          on: {
            slideChange: function () {
              // $(".swiper-slide").data("swiper-autoplay", "6000");
              resetTimer();
              timer = setInterval("countdown()", resolutionMs);
            },
          },
        });
        // resetTimer();
        clearInterval(timer);
        limitMs = restMs = 6000;
        timer = setInterval("countdown()", resolutionMs);
      }, 0);
    }, 500);
  }, 500);
});

$(window).scroll(function () {
  $(".js-fadein").each(function () {
    var elemPos = $(this).offset().top,
      scroll = $(window).scrollTop(),
      windowHeight = $(window).height();
    if (scroll > elemPos - windowHeight + 100) {
      $(this).addClass("is-show");
    }
  });
});

$(function () {
  $(".cp_arrow").on("click", function () {
    $(this).toggleClass("is-active");
    $(".l-gnav").toggleClass("is-open");
  });
});

var timer,
  limitMs = 0,
  restMs = 0,
  resolutionMs = 50 /* NOTE: Too small value does not work on IE11. */,
  maxBar = 1000;

function countdown() {
  restMs -= resolutionMs;

  var restRate = (limitMs - restMs) / limitMs;
  var restBarLength = maxBar * restRate;
  var barNum = Math.floor((restBarLength / maxBar) * 10000);
  var barWidth = barNum / 100;

  $("#bar").css("width", barWidth + "%");

  if (restMs < 0) {
    resetTimer();
  }
}

function resetTimer() {
  clearInterval(timer);
  limitMs = restMs = 7000;
  $("#bar").css("width", 0);
}
