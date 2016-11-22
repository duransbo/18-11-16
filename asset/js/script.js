/* GENERIC FUNCTIONS */
var $ = function () {

	var mtdGet = function (prmId) {
		return document.querySelector(prmId);
	};



	var mtdEvent = function (prmId, prmEvent, prmFunc) {
		var elements = document.querySelectorAll(prmId);
		var i;

		for (i = 0; i < elements.length; i++) {
			elements[i].addEventListener(prmEvent, prmFunc);
		}

	};



	return {
		get : mtdGet,
		event : mtdEvent
	}
};
$ = new $();
/* !GENERIC FUNCTIONS */



/* CLASSES */
var ClassScroll = function () {

	var mtdY = function () {
		return window.scrollY;
	};



	var mtdGo = function (e) {

		var id = this.href;
		var url = location.href;
		var seg = .5;
		var jumpProp = 25;
		var sub = 0;
		var prmIniY = window.scrollY;
		var prmEndY;
		var jumpNumber;
		var jumpSize;
		var jumpRest;
		var interval;
		var i;

		var scrolling = function () {
			if (i == 0) {
				window.scrollBy(0, jumpSizeRest);
				clearInterval(interval);
			} else {
				window.scrollBy(0, jumpSize);
				i--;
			}
		}

		e.preventDefault();
		location.href = '#' + id.replace(url.replace(/#(\w*\/?)*/, ''), '');
		prmEndY = window.scrollY - sub;
		jumpNumber = parseInt(Math.sqrt(Math.pow(prmEndY - prmIniY, 2)) / jumpProp);
		if (jumpNumber >= 1) {
			window.scrollTo(0, prmIniY);
			jumpSize =  parseInt(Math.sqrt(Math.pow(prmEndY - prmIniY, 2)) / jumpNumber);
			jumpSizeRest = Math.sqrt(Math.pow(prmEndY - prmIniY, 2)) - (jumpSize * jumpNumber);
			if (prmIniY > prmEndY) {
				jumpSize *= -1;
				jumpSizeRest *= -1;
			}
			i = jumpNumber;
			interval = setInterval(scrolling, (seg * 1000) / jumpNumber);
		}

	};



	var mtdParallax = function (prmId, prmType, prmIniParallax, prmEndParallax, prmIniX, prmIniY, prmEndX, prmEndY, prmUni, prmUniY = prmUni) {

		var scroll = window.scrollY;
		var move;
		var moveX;
		var moveY;

		if (
			scroll >= prmIniParallax
			&& scroll <= prmEndParallax
		) {
			move = ((scroll - prmIniParallax) * 100) / (prmEndParallax - prmIniParallax);
			moveX = (prmIniX - (((prmIniX - prmEndX) * move) / 100)) + prmUni;
			moveY = (prmIniY - (((prmIniY - prmEndY) * move) / 100)) + prmUniY;
		} else if (scroll < prmIniParallax) {
			moveX = prmIniX + prmUni;
			moveY = prmIniY + prmUniY;
		} else {
			moveX = prmEndX + prmUni;
			moveY = prmEndY + prmUniY;
		}

		switch (prmType) {
			case 'bg':
				prmId.style.backgroundPosition = moveX + ' ' + moveY;
				break;

			case 'tl':
				prmId.style.top = moveY;
				prmId.style.left = moveX;
				break;

		   default:
				alert('Type parallax|' + prmId + '| not valid');
				break;
		}
	};



	return {
		y : mtdY,
		go : mtdGo,
		parallax : mtdParallax
	};
};



var ClassMenu = function () {

	var mtdParallax = function () {

		var objScroll = new ClassScroll();

		objScroll.parallax(
			$.get('.menu'),
			'tl',
			($.get('.home').clientHeight / 2) - (($.get('.home h1').clientHeight / 2) + 100 + $.get('.menu').clientHeight),
			$.get('.home').clientHeight,
			0,
			($.get('.home').clientHeight / 2) + (($.get('.home h1').clientHeight / 2) + 100),
			0,
			0,
			'px'
		);

	};



	var mtdControl = function () {

		var menu = $.get('.menu');
		var scroll = window.scrollY;

		if (menu.clientWidth > 0) {
			if (
				menu.classList.contains('scroll')
				&& scroll < ($.get('.home').clientHeight / 2) - (($.get('.home h1').clientHeight / 2) + 100 + menu.clientHeight)
			) {
				menu.classList.remove('scroll');
			} else if (
				!menu.classList.contains('scroll')
				&& scroll >= ($.get('.home').clientHeight / 2) - (($.get('.home h1').clientHeight / 2) + 100 + menu.clientHeight)
			) {
				menu.classList.add('scroll');
			}

			mtdParallax();
		}

		$.get('.y').width = $.get('.video').clientWidth * .8;
		$.get('.y').height = $.get('.y').width * .5625;

	};



	return {
		parallax : mtdParallax,
		control : mtdControl
	};
};
/* !CLASSES */



/* CODE */
var objScroll = new ClassScroll();
var objMenu = new ClassMenu();
/* !CODE */



/* EVENTS ADDED */
$.event('.link-scroll', 'click', objScroll.go);
/* !EVENTS ADDED */



/* WINDOW EVENTS */
window.onload = function () {

	objMenu.control();

};



window.onresize = function () {

	objMenu.control();

};



window.onscroll = function () {

	objMenu.control();

};
/* !WINDOW EVENTS */