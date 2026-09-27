document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    const themeCheckbox = document.getElementById('theme-toggle-checkbox');
    const root = document.documentElement;
    if (themeCheckbox) {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        root.setAttribute('data-theme', currentTheme);
        themeCheckbox.checked = currentTheme === 'dark';
        themeCheckbox.addEventListener('change', (e) => {
            let newTheme = e.target.checked ? 'dark' : 'light';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme); 
        });
    }
    const btnTop = document.getElementById('btn-top');

    if (btnTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnTop.style.display = 'block';
            } else {
                btnTop.style.display = 'none';
            }
        });

        btnTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
    const track = document.getElementById('ds-track');
    const btnPrev = document.getElementById('ds-prev');
    const btnNext = document.getElementById('ds-next');
    if (track && btnPrev && btnNext) {
        let isTransitioning = false; 
        btnNext.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            const slideWidth = track.children[0].getBoundingClientRect().width;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
            const moveAmount = slideWidth + gap;
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = `translateX(-${moveAmount}px)`;
            track.addEventListener('transitionend', function handler() {
                track.removeEventListener('transitionend', handler);
                track.style.transition = 'none'; 
                track.appendChild(track.firstElementChild); 
                track.style.transform = 'translateX(0)';  
                setTimeout(() => isTransitioning = false, 10);
            });
        });
        btnPrev.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            const slideWidth = track.children[0].getBoundingClientRect().width;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
            const moveAmount = slideWidth + gap;
            track.style.transition = 'none';
            track.prepend(track.lastElementChild);
            track.style.transform = `translateX(-${moveAmount}px)`; 
            void track.offsetWidth; 
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = 'translateX(0)';

            track.addEventListener('transitionend', function handler() {
                track.removeEventListener('transitionend', handler);
                setTimeout(() => isTransitioning = false, 10);
            });
        });
    }
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filterValue = button.getAttribute('data-filter');
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block'; 
                        card.style.animation = 'none';
                        void card.offsetWidth; 
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }