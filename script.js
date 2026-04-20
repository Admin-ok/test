// ============================================================
//  AdventureYatra – Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── CURRENT MONTH TAG ────────────────────────────────────
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now = new Date();
  const monthTag = document.getElementById('currentMonth');
  if (monthTag) {
    monthTag.textContent = `${months[now.getMonth()]} '${String(now.getFullYear()).slice(-2)}`;
  }

  // ── STICKY HEADER ────────────────────────────────────────
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 300);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── HAMBURGER MENU ───────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Mobile dropdown toggles
  document.querySelectorAll('.nav-item.has-dropdown .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });

  // ── HERO SLIDER ──────────────────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('sliderDots');
  let currentSlide = 0;
  let sliderTimer = null;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.slider-dot')[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.slider-dot')[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startTimer() {
    sliderTimer = setInterval(nextSlide, 5000);
  }

  startTimer();

  // Pause on hover
  const heroSection = document.getElementById('hero');
  heroSection.addEventListener('mouseenter', () => clearInterval(sliderTimer));
  heroSection.addEventListener('mouseleave', startTimer);

  // ── CAROUSEL LOGIC ───────────────────────────────────────
  function setupCarousel(carouselId, prevId, nextId) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!carousel || !prevBtn || !nextBtn) return;

    const cards = carousel.querySelectorAll('.tour-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardsVisible = getCardsVisible();

    function getCardsVisible() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function updateCarousel() {
      cardsVisible = getCardsVisible();
      cards.forEach((card, i) => {
        card.style.display = (i >= currentIndex && i < currentIndex + cardsVisible) ? 'block' : 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
      });
      // Animate visible cards
      setTimeout(() => {
        for (let i = currentIndex; i < Math.min(currentIndex + cardsVisible, totalCards); i++) {
          cards[i].style.transition = 'all 0.4s ease';
          cards[i].style.opacity = '1';
          cards[i].style.transform = 'translateY(0)';
        }
      }, 50);
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex + cardsVisible >= totalCards;
      prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
      nextBtn.style.opacity = currentIndex + cardsVisible >= totalCards ? '0.4' : '1';
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex = Math.max(0, currentIndex - cardsVisible);
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex + cardsVisible < totalCards) {
        currentIndex = Math.min(totalCards - cardsVisible, currentIndex + cardsVisible);
        updateCarousel();
      }
    });

    updateCarousel();
    window.addEventListener('resize', updateCarousel, { passive: true });
  }

  setupCarousel('upcomingCarousel', 'upcomingPrev', 'upcomingNext');
  setupCarousel('spitiCarousel', 'spitiPrev', 'spitiNext');
  setupCarousel('intlCarousel', 'intlPrev', 'intlNext');

  // ── POPUP ─────────────────────────────────────────────────
  const popup = document.getElementById('leadPopup');
  const popupClose = document.getElementById('popupClose');

  // Show popup after 5 seconds
  setTimeout(() => {
    popup.style.display = 'flex';
  }, 5000);

  popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.style.display = 'none';
  });

  // Form submit
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      popup.style.display = 'none';
      showToast('🎉 Thank you! Our expert will contact you shortly.');
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✅ Subscribed! Get ready for amazing travel deals.');
      newsletterForm.reset();
    });
  }

  // ── TOAST NOTIFICATION ────────────────────────────────────
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px; right: 28px;
      background: var(--blue);
      color: white;
      padding: 14px 22px;
      border-radius: 12px;
      font-family: Poppins, sans-serif;
      font-size: 0.88rem;
      font-weight: 500;
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      z-index: 9999;
      animation: slideInRight 0.4s ease;
      max-width: 300px;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.4s ease forwards';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // Toast animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(100px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutRight {
      from { opacity: 1; transform: translateX(0); }
      to { opacity: 0; transform: translateX(100px); }
    }
  `;
  document.head.appendChild(style);

  // ── SMOOTH SCROLL FOR NAV LINKS ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        navMenu.classList.remove('open');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── INTERSECTION OBSERVER (scroll animations) ─────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.tour-card, .testimonial-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ── HERO SEARCH ───────────────────────────────────────────
  const heroSearch = document.getElementById('heroSearch');
  if (heroSearch) {
    heroSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        document.getElementById('leadPopup').style.display = 'flex';
      }
    });
  }

});
