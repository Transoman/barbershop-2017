var nav = document.querySelector('.main-nav');
var navBtn = document.querySelector('.main-nav__toggle');

nav.classList.remove('main-nav--nojs');

navBtn.addEventListener('click', function(e) {
	if(nav.classList.contains('main-nav--closed')) {
		nav.classList.remove('main-nav--closed');
		nav.classList.add('main-nav--opened');
	}
	else {
		nav.classList.add('main-nav--closed');
		nav.classList.remove('main-nav--opened');
	}
});

// Slider

var btnPrev = document.querySelector('.reviews__prev');
var btnNext = document.querySelector('.reviews__next');
var toggles = document.querySelectorAll('.reviews__wrapper .slider__input');

btnPrev.addEventListener('click', function() {
	for(i=0; i < toggles.length; i++) {
		if(toggles[i].checked) {
			if(i == 0) {
				toggles[i].checked == false;
				toggles[toggles.length - 1].checked = true;
				break;
			}
			else {
				toggles[i].checked == false;
				toggles[i - 1].checked = true;
				break;
			}
		}
	}
});

btnNext.addEventListener('click', function(e) {
	for(i=0; i < toggles.length; i++) {
		if(toggles[i].checked) {
			if(i == toggles.length - 1){
				toggles[i].checked = false;
				toggles[0].checked = true;
				break;
			}
			else {
				toggles[i].checked = false;
				toggles[i + 1].checked = true;
				break;
			}
		}
	}
});

// Modal login
var loginBtn = document.querySelector('.main-nav__user-login');
var modal = document.querySelector('.modal-login');
var modalClose = document.querySelector('.btn__close');
var loginInput = document.querySelector('.modal-login-form__input');

loginBtn.addEventListener('click', function(e) {
	e.preventDefault();
	modal.classList.add('modal-login--open');
	loginInput.focus();
	document.onkeydown = function(evt) {
		evt = evt || window.event;
			if (evt.keyCode == 27) {
				modal.classList.remove("modal-login--open");
			}
		};
});

modalClose.addEventListener('click', function() {
	modal.classList.remove('modal-login--open');
});
