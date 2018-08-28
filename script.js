// closest polyfill
(() => {
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
// matches polyfill
(() => {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector
	}
})();

document.addEventListener('click', e => {

	const target = e.target;

	if (target.closest('.video__play')) playIframe(target.closest('.video__play'))

});


document.addEventListener('scroll', () => {

	let scrolled = window.pageYOffset || document.documentElement.scrollTop;

	if (scrolled >= document.querySelector('.seven__items').getBoundingClientRect().top + scrolled - document.documentElement.clientHeight) {
		console.log(1)
	}

})


function playIframe(btn) {

	if (btn.closest('.invitation-video')) document.querySelector('.invitation-video__wrist').classList.add('invitation-video__touch');

	const video = btn.parentElement;
	const iframe =video.querySelector('iframe');

	iframe.src = iframe.dataset.play;
	video.querySelector('.video__img').hidden = true;
	btn.hidden = true;
	document.querySelector('.invitation-video__text-line').style.display= 'none'

}


function isVisible(elem) {
	return
}


// console.log