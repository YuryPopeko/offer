"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // closest polyfill
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})();

(function () {
  // matches polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})();

(function () {
  // foreach polyfill
  if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;

      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
})();

var Map =
/*#__PURE__*/
function () {
  function Map() {
    _classCallCheck(this, Map);

    if (typeof ymaps !== 'undefined') ymaps.ready(this.init);
  }

  _createClass(Map, [{
    key: "init",
    value: function init() {
      var map = new ymaps.Map("map", {
        center: [52.092879, 23.698087],
        zoom: 15
      });
      var marker = new ymaps.Placemark([52.092879, 23.698087], {
        hintContent: 'ВАЙДВЭБ ООО'
      });
      map.geoObjects.add(marker);
    }
  }]);

  return Map;
}();

var map = new Map();

var Popup = function Popup(btn) {
  var _this = this;

  _classCallCheck(this, Popup);

  this.btn = btn;
  this.popup = document.querySelector(".".concat(this.btn.dataset.popup));
  this.popupInsert = this.popup.querySelector('.popup__insert');
  this.overlay = document.querySelector('.overlay');

  this.openPopup = function (btn) {
    if (btn.hasAttribute('title') && this.popupInsert) this.popupInsert.textContent = btn.title;
    this.popup.classList.add('popup-open');
    this.overlay.classList.add('overlay-open');

    try {
      this.popup.querySelector('input:first-of-type').focus();
    } catch (e) {}
  };

  this.closePopup = function () {
    this.popup.classList.remove('popup-open');
    this.overlay.classList.remove('overlay-open');
  };

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target === _this.btn) _this.openPopup(_this.btn);
    if (target === _this.overlay || target.closest('.popup__close-btn')) _this.closePopup();
  });
};

document.querySelectorAll('[data-popup]').forEach(function (item) {
  return new Popup(item);
});

function scrolled() {
  scrolled.px = window.pageYOffset || document.documentElement.scrollTop;
}

document.addEventListener('scroll', scrolled);

function onScreen(elem) {
  return 0 >= elem.getBoundingClientRect().top - document.documentElement.clientHeight;
}

(function () {
  // lines moving
  var lines = document.getElementById('move-lines');
  if (!lines) return;
  document.addEventListener('scroll', function () {
    if (onScreen(lines)) {
      document.querySelectorAll('.text-line').forEach(function (item) {
        try {
          item.classList.add('text-line_move');
        } catch (e) {}
      });
    }
  });
})();

(function () {
  // clock
  if (!document.querySelector('.clock')) return;
  var programPath = document.querySelector('.program__item:last-of-type').getBoundingClientRect().bottom - document.querySelector('.program__item').getBoundingClientRect().top;
  document.addEventListener('scroll', function () {
    var programItemStartPath = document.querySelector('.program__item').getBoundingClientRect().top + scrolled.px - document.querySelector('.header').clientHeight,
        programItemEndPath = document.querySelector('.program__item:last-of-type').getBoundingClientRect().bottom + scrolled.px - document.querySelector('.header').clientHeight;
    if (scrolled.px >= programItemStartPath && scrolled.px <= programItemEndPath) clock(scrolled.px - programItemStartPath, programPath);
    if (onScreen(document.querySelector('.terms__sign'))) document.querySelector('.terms').classList.add('show-terms');
  });

  function clock(progress, path) {
    var hOffset = progress / path * 240 - 65,
        mOffset = progress / path * 2880 - 5;
    document.querySelector(".clock__h").style.transform = "rotate(".concat(hOffset, "deg)");
    document.querySelector(".clock__m").style.transform = "rotate(".concat(mOffset, "deg)");
  }
})();

(function () {
  // VIDEO IFRAME
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.closest('.video__play')) playIframe(target.closest('.video__play').parentElement);
  });

  var playIframe = function playIframe(video) {
    var btn = video.querySelector('.video__play'),
        iframe = video.querySelector('iframe'),
        img = video.querySelector('.video__img'),
        hand = video.parentElement.parentElement.querySelector('.invite-video__wrist') || video.parentElement.parentElement.querySelector('.report__hand'),
        txtLine = video.parentElement.parentElement.querySelector('.invite-video__txt-line'),
        txt = video.querySelector('.video__txt');
    if (hand) hand.classList.add('away');
    if (txtLine) txtLine.style.display = 'none';
    if (txt) txt.hidden = true;
    iframe.src = iframe.dataset.play;
    img.hidden = true;
    btn.hidden = true;
  };
})();

(function () {
  // accordion
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.closest('.accordion__btn')) toggleAccordion(target.closest('.accordion__btn'));
  });

  function toggleAccordion(accordionBtn) {
    var accordion = accordionBtn.parentElement;
    var accordionContent = accordion.querySelector('.accordion__content');
    accordion.classList.toggle('accordion_active');

    if (accordionContent.style.maxHeight) {
      accordionContent.style.maxHeight = null;
    } else {
      accordionContent.style.maxHeight = "".concat(accordionContent.scrollHeight, "px");
    }
  }

  var accordionActive = document.querySelectorAll('.accordion_active');
  if (!accordionActive.length) return;
  accordionActive.forEach(function (item) {
    var accordionContent = item.querySelector('.accordion__content');
    accordionContent.style.maxHeight = "".concat(accordionContent.scrollHeight, "px");
  });
})();

if (document.querySelector('.offer-footer .owl-carousel')) {
  $('.offer-footer .owl-carousel').owlCarousel({
    items: 1,
    nav: true,
    navText: ['<svg class="icon"><use xlink:href="#left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#right-arrow"></use></svg>']
  });
}

if (document.querySelector('.ex-students .owl-carousel')) {
  $('.ex-students .owl-carousel').owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    navText: ['<svg class="icon"><use xlink:href="#left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#right-arrow"></use></svg>']
  });
}

if (document.querySelector('.trust .owl-carousel')) {
  $('.trust .owl-carousel').owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    navText: ['<svg class="icon"><use xlink:href="#left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#right-arrow"></use></svg>']
  });
}

(function () {
  // input validation
  $('input[type=tel]').mask('+375 (99) 999-99-99');
  document.addEventListener('keypress', function (e) {
    var target = e.target;
    if (target.closest('input[type=text][name=name]')) charValidation(e, /[a-zа-яё ]/ig);
  });

  function charValidation(e, reg) {
    if (!getChar(e).match(reg)) e.preventDefault();
  }

  function getChar(event) {
    if (event.which == null) {
      // IE
      if (event.keyCode < 32) return null; // спец. символ

      return String.fromCharCode(event.keyCode);
    }

    if (event.which != 0 && event.charCode != 0) {
      // все кроме IE
      if (event.which < 32) return null; // спец. символ

      return String.fromCharCode(event.which); // остальные
    }

    return null; // спец. символ
  }
})();

(function () {
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.closest('button[data-tab]')) toggleTab(target.closest('button[data-tab]'));
  });

  function toggleTab(btn) {
    var dataTab = btn.dataset.tab.split(':');
    var open = dataTab.pop(),
        //вкладка
    group = dataTab[0];

    if (btn.classList.contains('open')) {
      btn.classList.remove('open');
      document.querySelector("[data-tab^=".concat(group, "].open")).classList.remove('open');
    } else {
      document.querySelectorAll("[data-tab^=".concat(group, "].open")).forEach(function (item) {
        return item.classList.remove('open');
      });
      document.querySelector("[data-tab*=".concat(open, "]:not(button)")).classList.toggle('open');
      btn.classList.toggle('open');
    }
  }
})();