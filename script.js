document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

const closeMenu = () => {
	menuToggle.setAttribute('aria-expanded', 'false');
	menuToggle.setAttribute('aria-label', 'Abrir menu');
	siteNav.classList.remove('is-open');
};

menuToggle.addEventListener('click', () => {
	const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
	if (isOpen) {
		closeMenu();
		return;
	}

	menuToggle.setAttribute('aria-expanded', 'true');
	menuToggle.setAttribute('aria-label', 'Fechar menu');
	siteNav.classList.add('is-open');
});

siteNav.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', closeMenu);
});

document.addEventListener('pointerdown', (event) => {
	if (event.target instanceof Node && !siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
		closeMenu();
	}
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
		closeMenu();
		menuToggle.focus();
	}
});

const revealItems = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.14 });

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
