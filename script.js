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
$('.owl-carousel').owlCarousel({
  items: 1,
  nav: true,
  navText: ['<svg class="icon"><use xlink:href="#icon-left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#icon-right-arrow"></use></svg>']
});
var scrolled;
document.addEventListener('scroll', function () {
  return scrolled = window.pageYOffset || document.documentElement.scrollTop;
});

function onScreen(elem) {
  return scrolled >= elem.getBoundingClientRect().top + scrolled - document.documentElement.clientHeight;
}

(function () {
  // seven lines
  var firstSevenItem = document.querySelector('.seven__items');
  if (!firstSevenItem) return;
  document.addEventListener('scroll', function () {
    if (onScreen(firstSevenItem)) {
      document.querySelectorAll('.seven__text-line').forEach(function (item) {
        try {
          item.classList.add('seven__text-line_move');
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
    var programItemStartPath = document.querySelector('.program__item').getBoundingClientRect().top + scrolled - document.querySelector('.header').clientHeight,
        programItemEndPath = document.querySelector('.program__item:last-of-type').getBoundingClientRect().bottom + scrolled - document.querySelector('.header').clientHeight;
    if (scrolled >= programItemStartPath && scrolled <= programItemEndPath) clock(scrolled - programItemStartPath, programPath);
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
        hand = video.parentElement.parentElement.querySelector('.invitation-video__wrist') || video.parentElement.parentElement.querySelector('.report__hand'),
        txtLine = video.parentElement.parentElement.querySelector('.invitation-video__txt-line'),
        txt = video.querySelector('.video__txt');
    if (hand) hand.classList.add('away');
    if (txtLine) txtLine.style.display = 'none';
    if (txt) txt.hidden = true;
    iframe.src = iframe.dataset.play;
    img.hidden = true;
    btn.hidden = true;
  };
})();