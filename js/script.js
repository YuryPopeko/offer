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


let scrolled;


document.addEventListener('click', e => {

	const target = e.target;

	if (target.closest('.video__play')) playIframe(target.closest('.video__play'))

});


const programPath = document.querySelector('.program__item:last-of-type').getBoundingClientRect().bottom - document.querySelector('.program__item').getBoundingClientRect().top;


document.addEventListener('scroll', () => {

	scrolled = window.pageYOffset || document.documentElement.scrollTop;

	if (onScreen(document.querySelector('.seven__items'))) {
		document.querySelectorAll('.seven__text-line').forEach(item => item.classList.add('seven__text-line_move'))
	}

	const programItemStartPath = document.querySelector('.program__item').getBoundingClientRect().top + scrolled - document.querySelector('.header').clientHeight,
		programItemEndPath = document.querySelector('.program__item:last-of-type').getBoundingClientRect().bottom + scrolled - document.querySelector('.header').clientHeight;

	if (scrolled >= programItemStartPath && scrolled <= programItemEndPath) clock(scrolled - programItemStartPath, programPath)

	if (onScreen(document.querySelector('.terms__signature'))) document.querySelector('.terms').classList.add('show-terms')

})


function onScreen(elem) {
	return scrolled >= elem.getBoundingClientRect().top + scrolled - document.documentElement.clientHeight
}


function clock(progress, path) {

	let hOffset = progress / path * 240 - 65,
		mOffset = progress / path * 2880 - 5;

	document.querySelector(".clock__h").style.transform = "rotate(" + hOffset + "deg)";
	document.querySelector(".clock__m").style.transform = "rotate(" + mOffset + "deg)";

}


class Clock {

	constructor(clock) {
		this.clock = clock
	}

	ticks() {}

}


function playIframe(btn) {

	if (btn.closest('.invitation-video')) document.querySelector('.invitation-video__wrist').classList.add('away');
	if (btn.closest('.report__video')) document.querySelector('.report__hand').classList.add('away');

	const video = btn.parentElement;
	const iframe = video.querySelector('iframe');

	iframe.src = iframe.dataset.play;
	video.querySelector('.video__img').hidden = true;
	btn.hidden = true;
	document.querySelector('.invitation-video__text-line').style.display = 'none'

}


class Map {

	constructor() {
		ymaps.ready(this.init)
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
			this.overlay.classList.add('overlay-open')
		}

		this.closePopup = function() {
			this.popup.classList.remove('popup-open');
			this.overlay.classList.remove('overlay-open')
		}

		document.addEventListener('click', e => {
			const target = e.target;
			if(target === this.btn) this.openPopup(this.btn);
			if (target === this.overlay || target.closest('.popup__close-btn')) this.closePopup()
		})

	}

}

document.querySelectorAll('[data-popup]').forEach(item => {
	new Popup(item)
});


$('.owl-carousel').owlCarousel({
	items: 1,
	nav: true,
	navText: ['<svg class="icon"><use xlink:href="#icon-left-arrow"></use></svg>', '<svg class="icon"><use xlink:href="#icon-right-arrow"></use></svg>']
})