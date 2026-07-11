async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const header = document.getElementById('header');
        if (header) {
            header.innerHTML = html;
            initMenuToggle();
        }
    } catch (error) {
        console.error('Impossible de charger le header :', error);
    }
}

function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (!menuToggle || !menu) {
        return;
    }

    menuToggle.addEventListener('click', () => {
        const menuIsOpen = menu.classList.toggle('show');
        menuToggle.setAttribute('aria-expanded', menuIsOpen);
        menuToggle.textContent = menuIsOpen ? '×' : '☰';
    });
}

function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) {
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.photo img');

    if (!lightbox || !lightboxImage) {
        return;
    }

    galleryImages.forEach((image) => {
        image.addEventListener('click', () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add('show');
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            lightbox.classList.remove('show');
        });
    }

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    initScrollTop();
    initLightbox();
});
