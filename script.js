/* =============================================================
   KIM.DEV — Portfolio JavaScript
   Handles: theme toggle, mobile nav, scroll effects,
            scroll reveal, video hover, contact form
   ============================================================= */

'use strict';

// ─── EmailJS Init ─────────────────────────────────────────────
(function () {
  emailjs.init("X3oTtsYz2vBL0J58L");
})();

// ─── Theme ────────────────────────────────────────────────────
(function initTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('themeToggle');

  // Persist preference
  const saved = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initial);

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
})();

// ─── Header scroll effect ─────────────────────────────────────
(function initHeader() {
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ─── Mobile nav drawer ────────────────────────────────────────
(function initMobileNav() {
  const btn    = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const links  = drawer.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    btn.classList.add('open');
    drawer.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    btn.classList.remove('open');
    drawer.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }

  btn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a link is tapped
  links.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !drawer.contains(e.target)) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ─── Scroll Reveal ────────────────────────────────────────────
(function initReveal() {
  // Add .reveal class to all sections and cards
  const targets = document.querySelectorAll(
    '.section-header, .about-text, .about-card-grid, ' +
    '.info-card, .skill-card, .project-card, ' +
    '.contact-info, .contact-form, .contact-channel'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.04}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

// ─── Active nav link on scroll ────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActive() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.style.color = '';
      link.style.background = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--foreground)';
        link.style.background = 'var(--muted)';
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

// ─── Project card video hover ─────────────────────────────────
(function initProjectVideos() {
  // Preload
  document.querySelectorAll('.project-video').forEach(v => v.load());

  document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('.project-video');
    if (!video) return;

    let playPromise;

    card.addEventListener('mouseenter', () => {
      playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => console.warn('Video play error:', err));
      }
    });

    card.addEventListener('mouseleave', () => {
      if (playPromise !== undefined) {
        playPromise.then(() => {
          video.pause();
          video.currentTime = 0;
        }).catch(() => {});
      }
    });
  });
})();

// ─── Contact form ─────────────────────────────────────────────
(function initContactForm() {
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btnText = submitBtn.querySelector('.btn-text');
    const icon    = submitBtn.querySelector('.btn-icon');

    // Loading state
    btnText.textContent = 'Sending…';
    icon.className = 'fas fa-spinner fa-spin btn-icon';
    submitBtn.disabled = true;

    const params = {
      from_name:  this.name.value,
      from_email: this.email.value,
      message:    this.message.value,
    };

    emailjs.send('service_uezhrln', 'template_qr6fin7', params)
      .then(() => {
        setStatus('success', '✓ Message sent! I\'ll get back to you soon.');
        form.reset();
      })
      .catch(() => {
        setStatus('error', '✗ Something went wrong. Please try again or reach out via WhatsApp.');
      })
      .finally(() => {
        btnText.textContent = 'Send Message';
        icon.className = 'fas fa-paper-plane btn-icon';
        submitBtn.disabled = false;
      });
  });

  function setStatus(type, msg) {
    const cls = type === 'success' ? 'success-message' : 'error-message';
    formStatus.innerHTML = `<p class="${cls}">${msg}</p>`;
    setTimeout(() => {
      const el = formStatus.querySelector(`.${cls}`);
      if (el) el.classList.add('fade-out');
      setTimeout(() => { formStatus.innerHTML = ''; }, 500);
    }, 4000);
  }
})();