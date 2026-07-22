/**
 * Lógica del Quiz Interactivo
 */
function check(btn, isCorrect, text) {
    const optionsContainer = btn.parentElement;
    const feedback = optionsContainer.nextElementSibling;
    const quizContainer = optionsContainer.closest('.quiz-container');
    
    optionsContainer.querySelectorAll('.quiz-btn').forEach(b => {
        b.classList.remove('correct', 'incorrect');
    });

    if(isCorrect) {
        btn.classList.add('correct');
    } else {
        btn.classList.add('incorrect');
    }

    feedback.innerHTML = text;
    feedback.style.display = 'block';
    feedback.style.color = isCorrect ? '#25d366' : 'var(--accent-color)';

    // Si la respuesta es correcta, verificamos si completó todo el quiz
    if (isCorrect) {
        const totalQuestions = quizContainer.querySelectorAll('.quiz-question').length;
        const correctAnswers = quizContainer.querySelectorAll('.quiz-btn.correct').length;

        if (totalQuestions === correctAnswers) {
            triggerConfetti();
        }
    }
}

/**
 * Lanza el efecto de confeti con los colores de la marca
 */
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00d9ff', '#ff006e', '#ffffff']
        });
    }
}

/**
 * Efectos de Interactividad
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal (Aparición suave de elementos)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .gallery-item').forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // 2. Botón Volver Arriba
    const bttBtn = document.getElementById('back-to-top');
    if (bttBtn) {
        window.addEventListener('scroll', () => {
            window.scrollY > 500 ? bttBtn.classList.add('show') : bttBtn.classList.remove('show');
        });
        bttBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. Foco Multimedia (Efecto Cine)
    const mediaElements = document.querySelectorAll('video, audio');
    mediaElements.forEach(media => {
        media.addEventListener('play', () => {
            document.querySelectorAll('.card').forEach(card => {
                if (!card.contains(media)) {
                    card.style.opacity = "0.3";
                    card.style.filter = "blur(2px) grayscale(0.6)";
                }
            });
        });
        media.addEventListener('pause', () => {
            document.querySelectorAll('.card').forEach(card => {
                card.style.opacity = "1";
                card.style.filter = "none";
            });
        });
    });
});