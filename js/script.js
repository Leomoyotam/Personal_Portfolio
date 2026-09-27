document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Menú Responsive
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

 // 2. Persistencia de preferencias: Modo Claro / Oscuro con Checkbox
    const themeCheckbox = document.getElementById('theme-toggle-checkbox');
    const root = document.documentElement;

    if (themeCheckbox) {
        // Revisamos LocalStorage, por defecto usamos oscuro
        const currentTheme = localStorage.getItem('theme') || 'dark';
        root.setAttribute('data-theme', currentTheme);
        
        // Sincronizamos la posición del interruptor según el tema guardado
        // Si el tema es oscuro, el checkbox debe estar marcado (checked = true)
        themeCheckbox.checked = currentTheme === 'dark';

        // Escuchamos los cambios en el interruptor animado
        themeCheckbox.addEventListener('change', (e) => {
            // Si está activado (checked) es oscuro, de lo contrario claro
            let newTheme = e.target.checked ? 'dark' : 'light';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme); // Guardamos la preferencia
        });
    }
    // 3. Botón para volver al inicio (Aparece al hacer scroll)
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

// 4. Design System Carousel (Carrusel Infinito)
    const track = document.getElementById('ds-track');
    const btnPrev = document.getElementById('ds-prev');
    const btnNext = document.getElementById('ds-next');

    if (track && btnPrev && btnNext) {
        let isTransitioning = false; // Evita clics rápidos que rompan la animación

        btnNext.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            
            // Calculamos cuánto mover dinámicamente
            const slideWidth = track.children[0].getBoundingClientRect().width;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
            const moveAmount = slideWidth + gap;

            // Animamos hacia la izquierda
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = `translateX(-${moveAmount}px)`;

            // Cuando termina la animación...
            track.addEventListener('transitionend', function handler() {
                track.removeEventListener('transitionend', handler);
                track.style.transition = 'none'; // Desactivamos animación
                track.appendChild(track.firstElementChild); // Movemos la primera tarjeta al final
                track.style.transform = 'translateX(0)'; // Reseteamos la posición
                setTimeout(() => isTransitioning = false, 10);
            });
        });

        btnPrev.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;

            const slideWidth = track.children[0].getBoundingClientRect().width;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
            const moveAmount = slideWidth + gap;

            // Movemos silenciosamente la última tarjeta al principio
            track.style.transition = 'none';
            track.prepend(track.lastElementChild);
            track.style.transform = `translateX(-${moveAmount}px)`; // Ocultamos el salto

            // Forzamos al navegador a procesar el cambio sin animarlo
            void track.offsetWidth; 

            // Ahora animamos de vuelta a la posición natural (0)
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = 'translateX(0)';

            track.addEventListener('transitionend', function handler() {
                track.removeEventListener('transitionend', handler);
                setTimeout(() => isTransitioning = false, 10);
            });
        });
    }

// 5. Filtro de Proyectos
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. Actualizar estado visual de los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // 2. Mostrar u ocultar tarjetas
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block'; 
                        
                        // 3. Forzar el reinicio de la animación para que reaparezcan suavemente
                        card.style.animation = 'none';
                        void card.offsetWidth; // Dispara un "reflow" en el navegador
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }