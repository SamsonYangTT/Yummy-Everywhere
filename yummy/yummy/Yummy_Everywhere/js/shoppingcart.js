var check = false;

function changeVal(el) {
  var qt = parseFloat(
    el
      .parent()
      .children(".qt")
      .html()
  );
  var price = parseFloat(
    el
      .parent()
      .children(".price")
      .html()
  );
  var eq = Math.round(price * qt * 100) / 100;

  el.parent()
    .children(".full-price")
    .html(eq + " HKD");

  changeTotal();
}

function changeTotal() {
  var price = 0;

  $(".full-price").each(function(index) {
    price += parseFloat(
      $(".full-price")
        .eq(index)
        .html()
    );
  });

  price = Math.round(price * 100) / 100;

  var tax = Math.round(price * 0.05 * 100) / 100;
  var shipping = parseFloat($(".shipping span").html());
  var fullPrice = Math.round((price + tax + shipping) * 100) / 100;

  if (price == 0) {
    fullPrice = 0;
  }
  //fullPrice = Math.round((price + tax + shipping) * 100) / 100;
  $(".subtotal span").html(price);
  $(".tax span").html(tax);
  $(".total span").html(fullPrice);
}

$(document).ready(function() {
  $("#backlocal").hide();

  // $("#add").click(function() {
  //   $(this).hide();
  // });

  $(".remove").click(function() {
    var el = $(this);
    el.parent()
      .parent()
      .addClass("removed");
    window.setTimeout(function() {
      el.parent()
        .parent()
        .slideUp("fast", function() {
          el.parent()
            .parent()
            .remove();
          if ($(".product").length == 0) {
            if (check) {
              $("#cart").html("<h1>Thank you for shopping!</h1>");
              $();
            } else {
              $("#cart").html("<h1>No products!</h1>");
            }
          }
          //changeTotal();
        });
    }, 200);
  });

  $(".qt-plus").click(function() {
    $(this)
      .parent()
      .children(".qt")
      .html(
        parseInt(
          $(this)
            .parent()
            .children(".qt")
            .html()
        ) + 1
      );

    $(this)
      .parent()
      .children(".full-price")
      .addClass("added");

    var el = $(this);
    window.setTimeout(function() {
      el.parent()
        .children(".full-price")
        .removeClass("added");
      changeVal(el);
    }, 150);
  });

  $(".qt-minus").click(function() {
    child = $(this)
      .parent()
      .children(".qt");

    if (parseInt(child.html()) > 1) {
      child.html(parseInt(child.html()) - 1);
    }

    $(this)
      .parent()
      .children(".full-price")
      .addClass("minused");

    var el = $(this);
    window.setTimeout(function() {
      el.parent()
        .children(".full-price")
        .removeClass("minused");
      changeVal(el);
    }, 150);
  });

  window.setTimeout(function() {
    $(".is-open").removeClass("is-open");
  }, 1200);

  $(".btn").click(function() {
    check = true;

    $(".remove").click();
    $(this).addClass("test");
    $("#backlocal").show();
  });

  $("#backlocal").click(function() {
    location.reload();
  });

  function openPopup(that) {
    var popupId = "#" + $(that).attr("id");
    $(popupId + ".popupBoxArea").addClass("popupShow");
    $(".popupBoxArea .inner").scrollTop(0);
  }
});
