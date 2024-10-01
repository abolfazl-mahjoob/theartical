jQuery(document).ready(function ($) {
  function onActiveBody() {
    $("body").on("click", function (e) {
      const target = $(e.target);
      if (!(target.is("main") || target.parents("main").length > 0)) {
        $("body")
          .removeClass("active")
          .removeClass("see")
          .removeClass("read")
          .removeClass("buy");
        $("main ul").slideUp("slow");
      }
      $(".for-links").removeClass("active");
    });
  }
  $(".next-level a").on("click", function (e) {
    e.preventDefault();
    const target = $(this).data("id");
    $(".checkout-body > div").removeClass("show");
    $(`.checkout-body .level-${target}`).addClass("show");
  });
  $('a[href="#"]').on("click", function (e) {
    e.preventDefault();
  });
  $("main ul").slideUp();
  $(".for-links").on("click", function () {
    const $this = $(this);
    if (!$this.is(".active")) {
      $("main ul").slideUp();
      $(`main .${$this.data("id")}-wrap ul`).slideDown();
      $("body")
        .removeClass("active")
        .removeClass("see")
        .removeClass("read")
        .removeClass("buy");
      $("body").addClass("active").addClass($this.data("id"));
    }
    $this.addClass("active");
    onActiveBody();
  });
  $(".actions-slide > a").on("click", function () {
    $(this).parent(".actions-slide").addClass("show");
  });
  $(".close-actions-slide").on("click", function () {
    $(this).parents(".actions-slide").removeClass("show");
  });
  $("#header-icon-open-close").on("click", function () {
    $(this).addClass("active");
    $("#overlay_a, #index-menu-foot, #header-serach").addClass("show");
  });
  $("#btn-open-search").on("click", function () {
    $(this).addClass("active");
    $("#overlay_a, #header-serach").addClass("show");
  });
  $("#lists-cats-h").on("click", function () {
    $(this).addClass("active");
    $("#overlay_a, #lists-designers-body").addClass("show");
  });
  $("#lists-designers-h").on("click", function () {
    $(this).addClass("active");
    $("#overlay_a, #designers-filter-sec").addClass("show");
  });
  $("#overlay_a").on("click", function () {
    $(this).removeClass("show");
    $(
      "#header-icon-open-close, #btn-open-search, #lists-cats-h, #lists-designers-h"
    ).removeClass("active");
    $(
      "#index-menu-foot, #header-serach, #lists-designers-body, #designers-filter-sec"
    ).removeClass("show");
  });
  var indexNavCats = 1;
  $("#nav-cats a").on("click", function (e) {
    const child = $(this).data("child");
    if (child !== undefined && $(child).length > 0) {
      e.preventDefault();
      $(child).addClass("show");
      $(child).css("z-index", indexNavCats);
      indexNavCats += 1;
    }
    if (child === undefined) {
      $(this).parent("div").removeClass("show");
    }
  });
  $(".item-product").hover(
    function () {
      $(this).find(".hover-image").fadeIn();
    },
    function () {
      $(this).find(".hover-image").fadeOut();
    }
  );
  $(".mobile-item-product").hover(
    function () {
      $(this).find(".hover-image").fadeIn();
    },
    function () {
      $(this).find(".hover-image").fadeOut();
    }
  );
  $("#disigners-name").slick({
    rows: 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: !0,
    dots: !1,
    infinite: !1,
    rtl: !0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          rows: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $(".add-to-wishlist a").on("click", function (e) {
    e.preventDefault();
    var $productCard = $(this).closest(".item-product");
    var productId = $(this).data("id");
    $.ajax({
      url: mainHandler.ajaxUrl,
      type: "POST",
      data: {
        action: "add_to_wishlist",
        product_id: productId,
      },
      success: function (response) {
        $productCard.find(".add-to-wishlist").find("span").remove();
        if (response.success) {
          var messageHtml =
            '<span class="added-to-wishlist">' +
            response.data.message +
            ' <a href="https://theartical.com/dashboard">نمایش علاقه‌مندی‌ها</a></span>';
          $productCard.find(".add-to-wishlist").append(messageHtml);
        } else {
          var messageHtml =
            '<span class="login-required">' +
            response.data.message +
            ' <a href="https://theartical.com/auth">ورود/ثبت‌نام</a></span>';
          $productCard.find(".add-to-wishlist").append(messageHtml);
        }
      },
    });
  });
  if (window.innerWidth < 768) {
    $(".product-title-point").each(function () {
      var $link = $(this).find("a");
      var text = $link.text();
      if (text.length > 20) {
        var shortenedText = text.substring(0, 20) + "...";
        $link.text(shortenedText);
      }
    });
  }
  $(
    "form.woocommerce-EditAccountForm.edit-account input#account_display_name"
  ).attr("disabled", "disabled");
  $(".btn_menu_mobile").on("click", function () {
    $(".menu_mobile_close").addClass("show");
    $(".side-menu-mobile").addClass("show");
  });
  $(".menu_mobile_close").on("click", function () {
    $(".menu_mobile_close").removeClass("show");
    $(".side-menu-mobile").removeClass("show");
  });
});
