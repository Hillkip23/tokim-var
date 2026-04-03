/* ============================================================
   TOKIM ANALYTICS — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- THEME TOGGLE ---- */
  const html = document.documentElement;
  const themeToggleBtn = document.querySelector('[data-theme-toggle]');

  // Initialize theme from system preference (dark is already set in HTML as default)
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggleBtn.innerHTML = theme === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  // Set initial theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = prefersDark ? 'dark' : 'light';
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---- STICKY HEADER ---- */
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  /* ---- MOBILE MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  function toggleMenu(open) {
    menuOpen = open;
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', !open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => toggleMenu(!menuOpen));

    // Close on mobile link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (menuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  /* ---- ACTIVE NAV ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ---- SCROLL REVEAL ---- */
  const revealElements = document.querySelectorAll(
    '.service-card, .market-card, .process-step, .finding, .stack-item, .entity-card, .value-prop, .team-card, .about-left, .about-right, .research-text, .research-stack, .contact-text, .contact-form-wrap, .paper-card, .closing-quote'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children within grids
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Stagger items that appear in grids
  document.querySelectorAll('.services-grid, .market-cards, .findings-grid, .process-steps, .dual-entity, .stack-list, .value-props').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((child, i) => {
      child.dataset.delay = i * 60;
    });
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- HERO STAT COUNTER ANIMATION ---- */
  const statNumbers = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(el => {
      const raw = el.textContent.trim();
      const numMatch = raw.match(/[\d.]+/);
      if (!numMatch) return;
      const target = parseFloat(numMatch[0]);
      const suffix = raw.replace(numMatch[0], '');
      const isDecimal = raw.includes('.');
      const duration = 1200;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = isDecimal
          ? (eased * target).toFixed(2)
          : Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) animateStats();
    }, { threshold: 0.5 });
    statsObserver.observe(heroSection);
    // Also trigger if already visible on load
    setTimeout(animateStats, 300);
  }

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Basic validation
      const email = contactForm.querySelector('#email').value.trim();
      const name = contactForm.querySelector('#name').value.trim();
      if (!name || !email) {
        btn.textContent = 'Please fill in required fields';
        btn.style.background = 'var(--color-error, #c44736)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 2500);
        return;
      }

      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate submission (replace with real endpoint when ready)
      setTimeout(() => {
        btn.textContent = 'Message Sent — We\'ll Be in Touch';
        btn.style.background = 'var(--color-success, #437a22)';
        contactForm.querySelectorAll('input, select, textarea').forEach(el => {
          el.value = '';
        });
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }, 1200);
    });
  }

  /* ---- SMOOTH ANCHOR SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---- CHART SVG animation ---- */
  // Animate the chart line being drawn on load
  const returnsLine = document.querySelector('.var-chart polyline');
  if (returnsLine) {
    const length = returnsLine.getTotalLength ? returnsLine.getTotalLength() : 600;
    returnsLine.style.strokeDasharray = length;
    returnsLine.style.strokeDashoffset = length;
    returnsLine.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s';

    requestAnimationFrame(() => {
      setTimeout(() => {
        returnsLine.style.strokeDashoffset = '0';
      }, 200);
    });
  }

})();
