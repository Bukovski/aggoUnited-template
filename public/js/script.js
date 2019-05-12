window.onload = (function () {
  /*********************** mobile menu ***********************/
  //hamburger toggle click
  var $body = $('body'),
    $hamburger = $("#js-hamburger");
  
  $hamburger.on("click", function () {
    $(this).addClass("is-active")
  });
  
  function closeHamburger () {
    return $hamburger.removeClass("is-active");
  }
  
  $(".site-overlay").on("click", function () {
    closeHamburger();
  });
  
  $(".main-menu__list").clone().appendTo("#mobile-menu"); //клонируем меню с шапки в мобильное меню
  $("#mobile-menu").find("*").attr("style", ""); //очищаем от встроеных стилей
  
  //open close mobile menu if you click a link
  $(".main-menu__item").on('click touchstart', function() {
    if ($('.pushy').hasClass('pushy-left')) {
      $body.removeClass('pushy-open-left');
    }
  
    closeHamburger();
  });
  
  
  /*********************** slider ***********************/
  var $owl = $('.owl-carousel');
  
  $owl.owlCarousel({
    loop: true, //замыкание. После последней посказать первую
    // nav: true, //стрелки прокрутки влево вправо
    dots: true, //показать-скрыть круглые кнопки внизу
    nav: false, //стрелки прокрутки влево вправо
    items: 1, //сколько показывать за раз слайдов
    margin: 0, //отступы между изображениями слайдера
    center: true, //позиция картинок по центру
    
    //автоматическая прокрутка
    autoplay: true,
    autoplayTimeout: 3000,
  
    //анимация прокрутки
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
  
    //адаптивность картинок
    autoHeight: true,
    responsiveClass: true,
  });

  
  //прокрутка слайдера колесиком мышки ограничено
  /*let counter = 0;
  
  $owl.on('mousewheel', '.owl-stage', function (e) {
    e.preventDefault();
  
    const interval = setTimeout(function () {
      if (e.deltaY > 0) {
        $owl.trigger('next.owl');
      } else {
        $owl.trigger('prev.owl');
      }
      
      counter = 0;
    }, 150);
  
    counter++;
    
    if (counter > 1) {
      clearInterval(interval);
      return;
    }
  });*/
  
  /****** адаптивные картинки внутри слайдера ******/
  function responsiveImage(block, options) {
    const settings = Object.assign({
      sml: 400,
      med: 800,
      lrg: 1000,
      resize: false
    }, options);
    
    function changePathImage(element) {
      var screen = window.innerWidth;
      
      function pathTemplate(size) {
        var pathToImage = element.getAttribute("src");
        var pathTemplate = pathToImage.split(/(\w){4}\./);
        
        return pathTemplate[0] + settings[size] + "." + pathTemplate[2];
      }
      
      if (screen > settings.med) {
        return pathTemplate('lrg');
      }
      if (screen <= settings.med && screen > settings.sml) {
        return pathTemplate('med');
      }
      
      return pathTemplate('sml');
    }
    
    function breakpoints() {
      for (let element of block) {
        const src = changePathImage(element);
        
        if (src !== undefined) {
          if (element.tagName === "IMG") {
            element.src = src;
          } else {
            element.style['background-image'] = 'url(' + src + ')';
          }
        }
      }
    }
    
    breakpoints();
    
    if (settings.resize) {
      window.onresize = breakpoints;
    }
  }
  
  responsiveImage(document.getElementsByClassName('slider__image'), {
    sml: 480,
    med: 640,
    lrg: 1280
  });
  
  /*********************** кнопка прокрутки вверх ***********************/
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#goTop').fadeIn();
    } else {
      $('#goTop').fadeOut();
    }
  });
  $('#goTop').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
  
})();
