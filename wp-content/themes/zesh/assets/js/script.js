// Javascript here

// Header scroll
/* When the user scrolls down 50px from the top of the document, resize the header's font size */
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("navigation").style.padding = "0px 0px";
    document.getElementById("navigation").style.backgroundColor = "#010004";
    document.getElementById("navigation").style.borderRadius = "0px";
    document.getElementById("logo").style.width = "100px";
    document.getElementById("nav-icon").style.top = "15px";
  } else {
    document.getElementById("navigation").style.padding = "15px 30px";
    document.getElementById("logo").style.width = "125px";
    document.getElementById("nav-icon").style.top = "30px";
    document.getElementById("navigation").style.backgroundColor = "transparent";
    document.getElementById("navigation").style.borderRadius = "0px";
  }
}

(function ($) {
  // Hamburger Menu
  $(".nav-icon, .mobile-nav-item").click(function () {
    $(".nav").toggleClass("open");

    if ($(".nav").hasClass("open")) {
      $(".nav-icon").addClass("open");
    } else {
      $(".nav-icon").removeClass("open");
    }

    $("body").toggleClass("fixed");
  });

  // Go to TOP button
  var loaded = false;
  var scrollToTopBtn = document.querySelector(".scroll-top");
  var rootElement = document.documentElement;

  function handleScroll() {
    /* Do something on scroll */
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.8) {
      /* Show button */
      scrollToTopBtn.classList.add("showBtn");
    } else {
      // Hide button
      scrollToTopBtn.classList.remove("showBtn");
    }
  }

  function scrollToTop() {
    /* Scroll to top logic */
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  scrollToTopBtn.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", handleScroll);

  $(".scroll--arrow").on("click", function (e) {
    e.preventDefault();
    const targetId = $(this).attr("href").substring(1);
    $("html, body").animate(
      { scrollTop: $("#" + targetId).offset().top },
      1000
    );
  });

  // Active animations

  $(window).load(function () {
    $(window).scroll(function () {
      activateSections();
    });
  });

  function activateSections() {
    var $sections = $("main section:not(.active)");

    var windowScrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    $sections.each((index, section) => {
      var sectionTop = section.offsetTop;
      if (loaded && sectionTop - windowScrollTop < windowHeight / 2) {
        $(section).addClass("active");
      }
    });
  }

  // Loading
  (function () {
    const minLoadingTime = 1500; //milliseconds
    const readyTime = new Date();

    $(window).load(function () {
      const loadingInterval = setInterval(() => {
        const now = new Date();
        if (now - readyTime > minLoadingTime) {
          loaded = true;
          hideLoading();
          activateSections();
          clearInterval(loadingInterval);
        }
      }, 100);
    });
  })();

  function hideLoading() {
    $(".loading").animate({ opacity: 0 }, 400, function () {
      $(".loading").hide();
    });
    loadOnePage();
  }

  function loadOnePage() {
    //scroll to section on mobile
    $(".nav a").on("click", function (e) {
      const $this = $(this);
      const link = $this.attr("href");

      if (link.indexOf("#") === 0) {
        e.preventDefault();

        const id = link.substr(1);
        const $target = $(".main #" + id);

        $("html, body").animate({ scrollTop: $target.offset().top }, 1000);
      }
    });
  }

  // Slick Slider

  $(document).ready(function () {
    $(".usps").slick({
      infinite: true,
      speed: 600,
      autoplay: false,
      arrows: true,
      slidesToShow: 1,
      initialSlide: 3,
      dots: true,
      customPaging: function (slider, i) {
        var thumb = $(slider.$slides[i]).data();
        return "<a>" + (i + 1) + "</a>";
      },
      responsive: [
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "300px",
            cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
            touchThreshold: 100,
          },
        },
        {
          breakpoint: 1360,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "150px",
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "50px",
          },
        },
      ],
    });
  });

  $(".advisors").slick({
    infinite: true,
    speed: 300,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  });

  $(document).ready(function () {
    $(".team-slider").slick({
      infinite: true,
      speed: 300,
      arrows: true,
      centerMode: true,
      centerPadding: "500px",
      slidesToShow: 1,
      dots: true,
      responsive: [
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "300px",
          },
        },
        {
          breakpoint: 1360,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "150px",
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "50px",
          },
        },
      ],
    });
  });

  // Accordion

  const accordionBtns = document.querySelectorAll(".accordion");

  accordionBtns.forEach((accordion) => {
    accordion.onclick = function () {
      this.classList.toggle("is-open");

      let content = this.nextElementSibling;
      // console.log(content);

      if (content.style.maxHeight) {
        //this is if the accordion is open
        content.style.maxHeight = null;
        // content.style.padding = "0px 30px";
      } else {
        //if the accordion is currently closed
        content.style.maxHeight = content.scrollHeight + 60 + "px";
        // console.log(content.style.maxHeight);
        // content.style.padding = "30px";
      }
    };
  });

  $(".btn-modal").on("click", function (e) {
    e.preventDefault();
    $(this).siblings(".modal-container").css("display", "flex");
  });

  $(".modal-close, .modal-overlay").on("click", function (e) {
    e.preventDefault();
    $(this).parents(".modal-container").hide();
  });

  // Tabs
  $(function () {
    var activeIndex = $(".active-tab").index(),
      $contentlis = $(".tabs-content li"),
      $tabslis = $(".tabs li");

    // Show content of active tab on loads
    $contentlis.eq(activeIndex).show();

    $(".tabs").on("click", "li", function (e) {
      var $current = $(e.currentTarget),
        index = $current.index();

      $tabslis.removeClass("active-tab");
      $current.addClass("active-tab");
      $contentlis.hide().eq(index).show();
    });
  });

  //   Vimeo player button
  var player = document.getElementById("vimeovid");

  function play_video() {
    var data = { method: "play" };
    player.contentWindow.postMessage(JSON.stringify(data), "*");
  }

  const div = document.getElementById("hide");
  if (div) {
    div.addEventListener("click", function () {
      div.style.opacity = 0; // Set opacity to 0 to initiate the fade effect
      setTimeout(function () {
        div.hidden = true;
      }, 500); // Adjust the timeout to match the transition duration (in milliseconds)
      play_video();
    });
  }
})(jQuery);

document.querySelectorAll(".toggle-button").forEach((button) => {
  button.addEventListener("click", function () {
    const featureContent = this.previousElementSibling; // Select the sibling `.feature-content`

    if (
      featureContent.style.maxHeight === "580px" ||
      featureContent.style.maxHeight === ""
    ) {
      featureContent.style.maxHeight = "none";
      this.textContent = "Show Less";
    } else {
      featureContent.style.maxHeight = "580px";
      this.textContent = "Show More";
    }
  });
});
