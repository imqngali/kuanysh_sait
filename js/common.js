var Cart = function () {

  this.add = function (id, q, attrs) {

    var size = 0;
    var openings = 0;

    if (attrs != undefined) {
      if (attrs.size != undefined && attrs.size != '') {
        size = attrs.size;
      }
      if (attrs.opensys != undefined && attrs.opensys != '') {
        openings = attrs.opensys;
      }
    }


    $.ajax({
      url: '/cart/addtocart',
      method: 'get',
      data: {
        id: id,
        q: q,
        size: size,
        openings: openings
      },
      success: function (r) {
        // console.log(r);
        // return;

        if (r != 'error') {
          var data = JSON.parse(r);
          $('.text-danger').remove();
          $('#wrapper').before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + data['model'] + ' <b>добавлено</b> в корзину покупок! <button type="button" class="fa fa-close close" data-dismiss="alert"></button></div>');

          $('.total-shopping-cart ').html(`<span class="cart-count">${data['totalCount']}</span> <span style="margin-left: 10px;text-transform: lowercase">${data['totalPrice']} р.</span>`);
          // $('#cart > ul').load('index.php?route=common/cart/info ul li');

          $('.dropdown-menu.pull-right.shoppingcart-box').html(data['cartRender']);
          timer = setTimeout(function () {
            $('.alert').addClass('fadeOut');
          }, 4000);
          // $('.so-groups-sticky .popup-mycart .popup-content').load('index.php?route=extension/module/so_tools/info .popup-content .cart-header');
        }
      },
      complete: function () {
        var button = $('#button-cart');
        if (button.length > 0) {
          button.button('reset');
        }
      }
    })
  }
  this.remove = function (id) {
    $.ajax({
      url: '/cart/removefromcart',
      method: 'get',
      data: {
        ident: id,
      },
      success: function (r) {
        // console.log(r);
        // return;
        if (r != 'error') {
          var data = JSON.parse(r);
          $('.total-shopping-cart ').html(`<span class="cart-count">${data['totalCount']}</span> <span style="margin-left: 10px;text-transform: lowercase">${data['totalPrice']} р.</span>`);
          $('.dropdown-menu.pull-right.shoppingcart-box').html(data['cartRender']);
        }
      },
      complete: function () {
        var c = $('#cartPartForm');
        if (c.length > 0) {
          c.submit();
        }
      }
    })
  }
  this.recount = function (id, q) {
    $.ajax({
      url: '/cart/countcart',
      method: 'get',
      data: {
        ident: id,
        q: q,
      },

      success: function (r) {
        // console.log(r);
        // return;
        if (r != 'error') {
          var data = JSON.parse(r);
          $('.total-shopping-cart ').html(`<span class="cart-count">${data['totalCount']}</span> <span style="margin-left: 10px;text-transform: lowercase">${data['totalPrice']} р.</span>`);

          $('.dropdown-menu.pull-right.shoppingcart-box').html(data['cartRender']);
        }
      },
      complete: function () {
        var c = $('#cartPartForm');
        if (c.length > 0) {
          c.submit();
        }
      }
    })
  }
};
var cart = new Cart();

/* Tabs Block */
jQuery(document).ready(function ($) {
  let navTabs = document.querySelector('.nav-tabs');
  var tabs = $('ul.nav-tabs');
  if (navTabs) {
    $(".tab-content .clearfix").each(function () {
      if ($(this).index() != 0) {
        $(this).css({ visibility: 'hidden', display: 'block' })
      }
    });
    tabs.each(function (i) {
      var tab = $(this).find('> li > a');
      var litab = $(this).find('li');
      var ua = navigator.userAgent,
        event = (ua.match(/iPad/i)) ? "touchstart" : "click";
      tab.bind(event, function (e) {
        var contentLocation = $(this).attr('href');
        if (contentLocation.charAt(0) == "#") {
          e.preventDefault();
          tab.removeClass('active');
          litab.removeClass('active');
          $(this).addClass('active');
          $(contentLocation).css({ visibility: 'visible' }).addClass('active').siblings().css({ visibility: 'hidden' }).removeClass('active');
        }
      });
      litab.bind(event, function (e) {
        litab.removeClass('active');
        $(this).addClass('active');
      });
    });
  }

  /* Toggle Block */

  let ytToggleBox = document.querySelector('.yt-toggle-box');
  if (ytToggleBox) {
    $("ul.yt-toggle-box li").each(function () {
      var ua = navigator.userAgent,
        event = (ua.match(/iPad/i)) ? "touchstart" : "click";
      $(this).children(".toggle-box-content").not(".active").css('display', 'none');
      $(this).children(".toggle-box-head").bind(event, function () {
        $(this).addClass(function () {
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            return "";
          }
          return "active";
        });
        $(this).siblings(".toggle-box-content").slideToggle();
      });
    });
  }


  // custom to show footer center
  let buttonToggle = document.querySelector('.button-toggle');
  if (buttonToggle) {
    $(".button-toggle").click(function () {
      if ($(this).children('.showmore').hasClass('active')) $(this).children().removeClass('active');
      else $(this).children().addClass('active');

      if ($(this).prev().hasClass('showdown')) $(this).prev().removeClass('showdown').addClass('showup');
      else $(this).prev().removeClass('showup').addClass('showdown');
    });
  }

  console.log('цели включены.');
  $('#submitManager').click(function () {
    ym(450763, 'reachGoal', 'uznat_cenu');
    console.log('uznat_cenu ушла');
  })

  $('#form-formcreator189').submit(function () {
    ym(450763, 'reachGoal', 'cena')
    console.log('cena ушла');
  })


  $('#btnOrderInClick').click(function () {
    ym(450763, 'reachGoal', '1_klik')
    console.log('1_klik ушла');
  })

  $('#submitFastOrder').click(function () {
    ym(450763, 'reachGoal', 'zakaz_1klik')
    console.log('zakaz_1klik ушла');
  })

  let sliderAbout = document.querySelector('.slider-about');
  if (sliderAbout) {
    $(".slider-about").owlCarousel2({
      autoplay: false,
      rtl: false,
      loop: false,
      //nav : false, // Show next and prev buttons
      dots: false,
      autoplaySpeed: 500,
      navSpeed: 500,
      dotsSpeed: 500,
      autoplayHoverPause: true,
      navText: ["", ""],
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        478: {
          items: 2,
          nav: true
        },
        768: {
          items: 3,
          nav: true
        },
        1000: {
          items: 5,
          nav: false,
          loop: false
        }
      }
    });
  }


  let productLayoutCard = document.querySelector('.product-layout--card');
  if (productLayoutCard) {
    $('.product-layout--card').click(function (e) {
      $('.product-price-quote').removeClass('product-price-quote--action');
      $('.priceDecInner__hidden').each(function () {
        $('.priceDecInner__hidden').addClass('priceDecInner__hidden');
      });
    });
  }


  let classContainer = document.querySelector('.container');
  if (classContainer) {
    $('.container').click(function (e) {
      $('.product-price-quote').removeClass('product-price-quote--action');
      $('.priceDecInner__hidden').each(function () {
        $('.priceDecInner__hidden').addClass('priceDecInner__hidden');
      });
    });
  }


  let priceDesc = document.querySelector('.priceDesc');
  if (priceDesc) {
    $('.priceDesc').click(function (e) {
      $(this).addClass('product-price-quote--action');
      $('.priceDecInner__hidden').removeClass('priceDecInner__hidden');
    });
  }


  let priceDecInnerClose = document.querySelector('.priceDecInner__close');
  if (priceDecInnerClose) {
    $('.priceDecInner__close').click(function (e) {
      $(this).parent().addClass('priceDecInner__hidden');
      $('.product-price-quote--action').removeClass('product-price-quote--action');
    });
  }

  $('input[type="tel"]').click(function () {
    $(this).setCursorPosition(4);
  }).mask("+7 (999) 999-99-99");
  // $('.form-control[type="tel"]').mask("+7 (999) 999-99-99");

  /* 
  let  = document.querySelector('');
  if (condition) {
    
  }
  */

});


document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('form')) {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault()
        if (e.target.checkValidity() === true) {
          let fn = e.target
          // let formData = new FormData( fn )
          // let json = {}
          // for ( let [ key, val ] of formData ) {
          //     json[key] = val
          // }
          // if ( fn.previousElementSibling && fn.previousElementSibling.id == 'orderOneClickImage' ) {
          //     let prod = document.querySelector( '#orderOneClickMessage' ).innerText
          //     json.message = `Купить в 1 клик | ${prod}`
          // }
          // Comagic.addOfflineRequest( json )

          ym(450763, 'reachGoal', 'send_form');
          roistat.event.send('send_form');
          gtag('event', 'send_form', { 'event_category': 'form' });

          if (fn.id === 'form-formcreator189') {
            Swal.fire(
              'Отправлено!',
              'Заявка отправлена! Наш менеджер свяжется с вами в самое ближайшее время.',
              'success'
            );
            return;
          }
          setTimeout(() => {
            this.submit();
          }, 1000)
        }
      })
    });
  }

  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  let plusoneBtn = document.querySelectorAll('.plusone');

  if (plusoneBtn != null) {
    $('.plusone').click(function (e) {
      let inputGroup = e.target.parentNode
      let cartQuantity = inputGroup.querySelector('.cartQuantity')
      let cartQuantityValue = Number(cartQuantity.getAttribute('value'))
      cartQuantity.setAttribute('value', ++cartQuantityValue)

      // let parentTr = inputGroup.closest('tr')
      // parentTr.querySelector.('.text-right--price').textContent = 
      // console.log(parentTr)

    });

  }

  function addMetrikaSubmit(el, metrikaId, counterId = 450763) {
    // let form = document.querySelector(el);

    let searchEl = el
    if (searchEl) {
      $(el).on('submit', () => {
        ym(counterId, 'reachGoal', metrikaId)
        console.log(metrikaId + ' ушла');
      })
    }

  }

  function addMetrikaClick(el, metrikaId, counterId = 450763) {
    let searchEl = el
    if (searchEl) {
      $(el).click(function () {
        ym(counterId, 'reachGoal', metrikaId)
        console.log(metrikaId + ' клик');
      })
    }

  }

  addMetrikaSubmit('#unimail', 'podpiska')
  addMetrikaSubmit('#signup8257059941548181467', 'send_form')
  addMetrikaSubmit('.form-horizontal-reviews', 'send-otzyv')
  // addMetrikaSubmit('#container .form', 'for-designers')

  addMetrikaClick('.addToCart, #button-cart', 'in-cart')
  addMetrikaClick('.btn_otz', 'klik-otzyv')

  // $('#submitButtonAbout').click(function () {
  //   var form = $('#formAbout');
  //   var message = $('#formMessage');

  //   var btn = $(this);
  //   btn.button('loading');

  //   message.html('');
  //   $.ajax({
  //     url: '/ajax/designers',
  //     method: 'post',
  //     data: form.serialize(),
  //     success: function (r) {
  //       if (r == 'ok') {
  //         //  Comagic.addOfflineRequest( {
  //         //     name: $('#input-name').val(),
  //         //     phone: $('#input-phone').val(),
  //         //     message: $('#input-enquiry').val()
  //         // } )
  //         form.find('input').val('');
  //         form.find('textarea').html('').val('');

  //         message.html('Спасибо за ваше обращение!');

  //         ym(450763, 'hit', '/order/lead');
  //         ym(450763, 'reachGoal', 'konsultaciya')
  //         console.log('lead');
  //       }
  //       if (r == 'error') {
  //         message.html('Заполните все поля')
  //       }
  //     },
  //     complete: function () {
  //       btn.button('reset');
  //     }
  //   });
  // });


})

// $(function () {
//   $.mask.definitions['9'] = '';
//   $.mask.definitions['d'] = '[0-9]';
//   $('.form-control[type="tel"]').mask("+7(ddd) ddd-dd-dd");
// });
// $.fn.setCursorPosition = function (pos) {
//   if ($(this).get(0).setSelectionRange) {
//     $(this).get(0).setSelectionRange(pos, pos);
//   } else if ($(this).get(0).createTextRange) {
//     var range = $(this).get(0).createTextRange();
//     range.collapse(true);
//     range.moveEnd('character', pos);
//     range.moveStart('character', pos);
//     range.select();
//   }
// };
// $('.form-control[type="tel"]').click(function () {
//   $(this).setCursorPosition(3);  // set position number
// });





