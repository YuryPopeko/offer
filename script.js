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

var scrolled;
document.addEventListener('click', function (e) {
  var target = e.target;
  if (target.closest('.video__play')) playIframe(target.closest('.video__play'));
});
var programPath = document.querySelector('.program__item:last-of-type').getBoundingClientRect().bottom - document.querySelector('.program__item').getBoundingClientRect().top;
document.addEventListener('scroll', function () {
  scrolled = window.pageYOffset || document.documentElement.scrollTop;

  if (onScreen(document.querySelector('.seven__items'))) {
    document.querySelectorAll('.seven__text-line').forEach(function (item) {
      try {
        item.classList.add('seven__text-line_move');
      } catch (e) {}
    });
  }

  var programItemStartPath = document.querySelector('.program__item').getBoundingClientRect().top + scrolled - document.querySelector('.header').clientHeight,
      programItemEndPath = document.querySelector('.program__item:last-of-type').getBoundingClientRect().bottom + scrolled - document.querySelector('.header').clientHeight;
  if (scrolled >= programItemStartPath && scrolled <= programItemEndPath) clock(scrolled - programItemStartPath, programPath);
  if (onScreen(document.querySelector('.terms__signature'))) document.querySelector('.terms').classList.add('show-terms');
});

function onScreen(elem) {
  return scrolled >= elem.getBoundingClientRect().top + scrolled - document.documentElement.clientHeight;
}

function clock(progress, path) {
  var hOffset = progress / path * 240 - 65,
      mOffset = progress / path * 2880 - 5;
  document.querySelector(".clock__h").style.transform = "rotate(".concat(hOffset, "deg)");
  document.querySelector(".clock__m").style.transform = "rotate(".concat(mOffset, "deg)");
}

var Clock =
/*#__PURE__*/
function () {
  function Clock(clock) {
    _classCallCheck(this, Clock);

    this.clock = clock;
  }

  _createClass(Clock, [{
    key: "ticks",
    value: function ticks() {}
  }]);

  return Clock;
}();

function playIframe(btn) {
  if (btn.closest('.invitation-video')) document.querySelector('.invitation-video__wrist').classList.add('away');
  if (btn.closest('.report__video')) document.querySelector('.report__hand').classList.add('away');
  var video = btn.parentElement;
  var iframe = video.querySelector('iframe');
  iframe.src = iframe.dataset.play;
  video.querySelector('.video__img').hidden = true;
  btn.hidden = true;
  document.querySelector('.invitation-video__text-line').style.display = 'none';
}

var Map =
/*#__PURE__*/
function () {
  function Map() {
    _classCallCheck(this, Map);

    ymaps.ready(this.init);
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
  new Popup(item);
});
$('.owl-carousel').owlCarousel({
  items: 1,
  nav: true,
  navText: ['<svg class="icon"><use xlink:href="#icon-left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#icon-right-arrow"></use></svg>']
});