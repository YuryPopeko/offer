(() => { // closest polyfill
	if (!Element.prototype.closest) {
		Element.prototype.closest = function(css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(() => { // matches polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector
	}
})();
(() => { // foreach polyfill
	if ('NodeList' in window && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function(callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}
})();


class Map {

	constructor() {
		if (typeof ymaps !== 'undefined') ymaps.ready(this.init)
	}

	init() {

		const map = new ymaps.Map("map", {
			center: [52.092879, 23.698087],
			zoom: 15
		});

		const marker = new ymaps.Placemark([52.092879, 23.698087], {
			hintContent: 'ВАЙДВЭБ ООО'
		});

		map.geoObjects.add(marker)
	}
}
const map = new Map();


class Popup {

	constructor(btn) {

		this.btn = btn;
		this.popup = document.querySelector(`.${this.btn.dataset.popup}`);
		this.popupInsert = this.popup.querySelector('.popup__insert');
		this.overlay = document.querySelector('.overlay');

		this.openPopup = function(btn) {
			if (btn.hasAttribute('title') && this.popupInsert) this.popupInsert.textContent = btn.title;

			this.popup.classList.add('popup-open');
			this.overlay.classList.add('overlay-open');
			try {
				this.popup.querySelector('input:first-of-type').focus()
			} catch (e) {}
		}

		this.closePopup = function() {
			this.popup.classList.remove('popup-open');
			this.overlay.classList.remove('overlay-open')
		}

		document.addEventListener('click', e => {
			const target = e.target;
			if (target === this.btn) this.openPopup(this.btn);
			if (target === this.overlay || target.closest('.popup__close-btn')) this.closePopup();
		})

	}
}
document.querySelectorAll('[data-popup]').forEach(item => new Popup(item));



function scrolled() {
	scrolled.px = window.pageYOffset || document.documentElement.scrollTop
}

document.addEventListener('scroll', scrolled)

function onScreen(elem) {
	return 0 >= elem.getBoundingClientRect().top - document.documentElement.clientHeight
}


(() => { // lines moving

	const lines = document.getElementById('move-lines');
	if (!lines) return;

	document.addEventListener('scroll', () => {
		if (onScreen(lines)) {
			document.querySelectorAll('.text-line').forEach(item => {
				try {
					item.classList.add('text-line_move')
				} catch (e) {}
			})
		}
	})
})();


(() => { // clock

	if (!document.querySelector('.clock')) return;

	const programPath = document.querySelector('.program__item:last-of-type').getBoundingClientRect().bottom -
		document.querySelector('.program__item').getBoundingClientRect().top;

	document.addEventListener('scroll', () => {

		const programItemStartPath = document.querySelector('.program__item').getBoundingClientRect().top + scrolled.px - document.querySelector('.header').clientHeight,
			programItemEndPath = document.querySelector('.program__item:last-of-type').getBoundingClientRect().bottom + scrolled.px - document.querySelector('.header').clientHeight;

		if (scrolled.px >= programItemStartPath && scrolled.px <= programItemEndPath) clock(scrolled.px - programItemStartPath, programPath)

		if (onScreen(document.querySelector('.terms__sign'))) document.querySelector('.terms').classList.add('show-terms')

	});

	function clock(progress, path) {

		let hOffset = progress / path * 240 - 65,
			mOffset = progress / path * 2880 - 5;

		document.querySelector(".clock__h").style.transform = `rotate(${hOffset}deg)`;
		document.querySelector(".clock__m").style.transform = `rotate(${mOffset}deg)`;

	}
})();


(() => { // VIDEO IFRAME
	document.addEventListener('click', e => {
		const target = e.target;
		if (target.closest('.video__play')) playIframe(target.closest('.video__play').parentElement)
	});

	const playIframe = function(video) {

		const btn = video.querySelector('.video__play'),
			iframe = video.querySelector('iframe'),
			img = video.querySelector('.video__img'),
			hand = video.parentElement.parentElement.querySelector('.invite-video__wrist') ||
			video.parentElement.parentElement.querySelector('.report__hand'),
			txtLine = video.parentElement.parentElement.querySelector('.invite-video__txt-line'),
			txt = video.querySelector('.video__txt');

		if (hand) hand.classList.add('away');
		if (txtLine) txtLine.style.display = 'none';
		if (txt) txt.hidden = true;

		iframe.src = iframe.dataset.play;
		img.hidden = true;
		btn.hidden = true

	}
})();


(() => { // accordion

	document.addEventListener('click', (e) => {
		const target = e.target;
		if (target.closest('.accordion__btn')) toggleAccordion(target.closest('.accordion__btn'))
	});

	function toggleAccordion(accordionBtn) {

		const accordion = accordionBtn.parentElement;
		const accordionContent = accordion.querySelector('.accordion__content');

		accordion.classList.toggle('accordion_active');
		if (accordionContent.style.maxHeight) {
			accordionContent.style.maxHeight = null;
		} else {
			accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
		}

	}

	const accordionActive = document.querySelectorAll('.accordion_active');
	if (!accordionActive.length) return;

	accordionActive.forEach(item => {
		const accordionContent = item.querySelector('.accordion__content');
		accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`
	})
})();


if (document.querySelector('.offer-footer .owl-carousel')) {
	$('.offer-footer .owl-carousel').owlCarousel({
		items: 1,
		nav: true,
		navText: ['<svg class="icon"><use xlink:href="#left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#right-arrow"></use></svg>']
	})
}
if (document.querySelector('.ex-students .owl-carousel')) {
	$('.ex-students .owl-carousel').owlCarousel({
		items: 1,
		loop: true,
		dots: false,
		nav: true,
		navText: ['<svg class="icon"><use xlink:href="#left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#right-arrow"></use></svg>']
	})
}
if (document.querySelector('.trust .owl-carousel')) {
	$('.trust .owl-carousel').owlCarousel({
		items: 1,
		dots: false,
		nav: true,
		navText: ['<svg class="icon"><use xlink:href="#left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#right-arrow"></use></svg>']
	})
}
if (document.querySelector('.events__container.owl-carousel')) {
	$('.events__container.owl-carousel').owlCarousel({
		items: 1,
		dots: false,
		nav: true,
		navText: ['<svg class="icon"><use xlink:href="#left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#right-arrow"></use></svg>']
	})
}


(() => { // input validation
	
	if(document.querySelector('input[type=tel]')) $('input[type=tel]').mask('+375 (99) 999-99-99');

	document.addEventListener('keypress', e => {
		const target = e.target;
		if (target.closest('input[type=text][name=name]')) charValidation(e, /[a-zа-яё ]/ig)
	});

	function charValidation(e, reg) {
		if (!getChar(e).match(reg)) e.preventDefault()
	}

	function getChar(event) {
		if (event.which == null) { // IE
			if (event.keyCode < 32) return null; // спец. символ
			return String.fromCharCode(event.keyCode)
		}
		if (event.which != 0 && event.charCode != 0) { // все кроме IE
			if (event.which < 32) return null; // спец. символ
			return String.fromCharCode(event.which); // остальные
		}
		return null; // спец. символ
	}

})();


(() => { // tabs

	document.addEventListener('click', e => {
		const target = e.target;
		if (target.closest('button[data-tab]')) toggleTab(target.closest('button[data-tab]'))
	})

	function toggleTab(btn) {

		const dataTab = btn.dataset.tab.split(':');
		const open = dataTab.pop(), //вкладка
			group = dataTab[0];

		if (btn.classList.contains('open')) {
			btn.classList.remove('open');
			document.querySelector(`[data-tab^=${group}].open`).classList.remove('open')
		} else {
			document.querySelectorAll(`[data-tab^=${group}].open`).forEach((item) => item.classList.remove('open'))
			document.querySelector(`[data-tab*=${open}]:not(button)`).classList.toggle('open');
			btn.classList.toggle('open')
		}

	}
})();


(() => { // hamburger + menu
	const hamburger = document.querySelector('.hamburger'),
				menu = document.querySelector('.menu');
	if (!hamburger) return;
	
	hamburger.addEventListener('click', function() {
		this.classList.toggle('hamburger_open');
		if (menu.style.maxHeight) {
			menu.style.maxHeight = null;
		} else {
			menu.style.maxHeight = `${menu.scrollHeight}px`;
		}
	});
})();


(() => { // search
	const searchBtn = document.querySelector('.search-btn');
	if(!searchBtn) return;
	searchBtn.addEventListener('click', () => searchBtn.parentElement.querySelector('.search-field').classList.toggle('search-field_open'))
})();