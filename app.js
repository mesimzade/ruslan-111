/* ============================================================
   RUSLAN HUSEYNOV – Executive Chef Portfolio
   app.js – Interactions & Animations
   ============================================================ */

/* ── Section Open / Close ── */
let currentSection = null;

function openSection(id) {
  // Close any open section first
  if (currentSection) {
    document.getElementById('section-' + currentSection).classList.remove('open');
  }

  currentSection = id;
  const overlay = document.getElementById('overlay');
  const section = document.getElementById('section-' + id);

  overlay.classList.add('active');
  section.classList.add('open');

  // Prevent hero scroll
  document.body.style.overflow = 'hidden';

  // Animate skill/prog bars when skills section opens
  if (id === 'skills' || id === 'languages') {
    setTimeout(() => animateBars(), 200);
  }

  // Animate skill bars whenever section opens (general)
  setTimeout(() => {
    animateBars();
  }, 300);
}

function closeSection() {
  if (!currentSection) return;

  const overlay = document.getElementById('overlay');
  const section = document.getElementById('section-' + currentSection);

  overlay.classList.remove('active');
  section.classList.remove('open');

  currentSection = null;
  document.body.style.overflow = '';
}

/* ── Close on Escape ── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeSection();
  }
});

/* ── Animate progress bars ── */
function animateBars() {
  // Skill bars
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const target = bar.getAttribute('data-width');
    if (target) {
      bar.style.width = target + '%';
    }
  });

  // Program bars
  document.querySelectorAll('.prog-bar').forEach(bar => {
    const target = bar.getAttribute('data-width');
    if (target) {
      bar.style.width = target + '%';
    }
  });
}

/* ── Lightbox ── */
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  if (!currentSection) {
    document.body.style.overflow = '';
  }
}

/* ── Touch swipe to close inner sections ── */
let touchStartX = 0;
let touchEndX = 0;

document.querySelectorAll('.inner-section').forEach(section => {
  section.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  section.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    // Swipe right to close
    if (touchEndX - touchStartX > 80) {
      closeSection();
    }
  }, { passive: true });
});

/* ── Entrance animation for hero content ── */
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  const navCards = document.querySelectorAll('.nav-card');

  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }

  navCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s ease, box-shadow 0.35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 400 + i * 80);
  });
});

/* ── Prevent overlay click from bubbling into section ── */
document.querySelectorAll('.inner-section').forEach(section => {
  section.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});
