/**
 * script.js — Kshitiz Singh Portfolio
 * Features: loader, dark-mode toggle, typing effect, scroll-reveal,
 *           active nav, card tilt, ripple buttons, animated headings,
 *           smooth scroll.
 */

function initPortfolio() {

  /* ------------------------------------------------------------------ */
  /* LOADER                                                               */
  /* ------------------------------------------------------------------ */
  const loader = document.getElementById('loader');
  function hideLoader() {
    if (!loader) return;
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.visibility = 'hidden'; }, 650);
  }
  if (document.readyState === 'complete') setTimeout(hideLoader, 550);
  else {
    window.addEventListener('load', () => setTimeout(hideLoader, 550));
    setTimeout(hideLoader, 2800);
  }

  /* ------------------------------------------------------------------ */
  /* DARK / LIGHT MODE TOGGLE                                            */
  /* ------------------------------------------------------------------ */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  // Persist preference
  const savedTheme = localStorage.getItem('ks-theme') || 'light';
  root.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next    = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('ks-theme', next);
    });
  }

  /* ------------------------------------------------------------------ */
  /* MOBILE NAV                                                           */
  /* ------------------------------------------------------------------ */
  const mobileToggle   = document.getElementById('mobileToggle');
  const navLinksEl     = document.querySelector('.nav-links');
  const navLinks       = document.querySelectorAll('.nav-link');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinksEl.classList.toggle('active');
    });
  }
  navLinks.forEach(l => l.addEventListener('click', () => {
    mobileToggle && mobileToggle.classList.remove('active');
    navLinksEl   && navLinksEl.classList.remove('active');
  }));

  /* ------------------------------------------------------------------ */
  /* NAVBAR SCROLL SHRINK                                                 */
  /* ------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar && navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ------------------------------------------------------------------ */
  /* ACTIVE NAV LINK (IntersectionObserver)                              */
  /* ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === '#' + e.target.id) l.classList.add('active');
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });
  sections.forEach(s => sectionObs.observe(s));

  /* ------------------------------------------------------------------ */
  /* SCROLL REVEAL                                                        */
  /* ------------------------------------------------------------------ */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.scroll-reveal').forEach(el => revealObs.observe(el));

  /* ------------------------------------------------------------------ */
  /* ANIMATED HEADING UNDERLINE                                           */
  /* ------------------------------------------------------------------ */
  const headingObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('underline-drawn');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.animated-heading').forEach(h => headingObs.observe(h));

  /* ------------------------------------------------------------------ */
  /* TYPING EFFECT (hero subtitle)                                        */
  /* ------------------------------------------------------------------ */
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const phrases = [
      'Designer · Marketer · AI Automation Builder',
      'Creative Graphic Designer',
      'Digital Marketing Specialist',
      'AI & Automation Expert'
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false;

    function typeStep() {
      const phrase = phrases[phraseIdx];
      if (!deleting) {
        typingEl.textContent = phrase.slice(0, ++charIdx);
        if (charIdx === phrase.length) {
          deleting = true;
          setTimeout(typeStep, 1800);
          return;
        }
        setTimeout(typeStep, 55);
      } else {
        typingEl.textContent = phrase.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(typeStep, 400);
          return;
        }
        setTimeout(typeStep, 30);
      }
    }
    setTimeout(typeStep, 800);
  }

  /* ------------------------------------------------------------------ */
  /* RIPPLE EFFECT on buttons                                             */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;
      const circle = document.createElement('span');
      circle.className = 'ripple-circle';
      circle.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      this.appendChild(circle);
      circle.addEventListener('animationend', () => circle.remove());
    });
  });

  /* ------------------------------------------------------------------ */
  /* CARD TILT (contact detail cards)                                    */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const mx = e.clientX - r.left  - r.width  / 2;
      const my = e.clientY - r.top   - r.height / 2;
      card.style.transform = `perspective(900px) rotateX(${-(my/(r.height/2))*8}deg) rotateY(${(mx/(r.width/2))*8}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
  });

  /* ------------------------------------------------------------------ */
  /* SMOOTH ANCHOR SCROLL                                                 */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPortfolio);
else initPortfolio();