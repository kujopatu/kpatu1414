// ====================================
// THEME TOGGLE (Dark / Light Mode)
// ====================================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ====================================
// NAV SCROLL EFFECT
// ====================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ====================================
// MOBILE MENU
// ====================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = open ? 'none' : 'flex';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { mobileMenu.style.display = 'none'; });
});

// ====================================
// SCROLL ANIMATIONS
// ====================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

// ====================================
// ANIMATED COUNTERS
// ====================================
function animateCounter(el, target, decimals = 0, duration = 1800) {
  const start = performance.now();
  const from = 0;
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = from + (target - from) * eased;
    el.textContent = decimals > 0 ? value.toFixed(decimals) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = target % 1 !== 0 ? 2 : 0;
      animateCounter(el, target, decimals);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ====================================
// CONTACT FORM (Formspree)
// ====================================
async function handleSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg = document.getElementById('formError');

  btn.disabled = true;
  btnText.textContent = 'Sending…';
  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

  try {
    const res = await fetch('https://formspree.io/f/xdavkpnp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      successMsg.style.display = 'block';
      btnText.textContent = 'Message Sent!';
      document.getElementById('contactForm').reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    errorMsg.style.display = 'block';
    btn.disabled = false;
    btnText.textContent = 'Send Message';
  }
}

// ====================================
// ACTIVE NAV HIGHLIGHT
// ====================================
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50%' });

sections.forEach(s => sectionObserver.observe(s));

// ====================================
// GALLERY LIGHTBOX (simple)
// ====================================
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9999;
      background:rgba(0,0,0,0.92);
      display:flex;align-items:center;justify-content:center;cursor:zoom-out;
    `;
    const image = document.createElement('img');
    image.src = img.src;
    image.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 32px 80px rgba(0,0,0,0.5);';
    overlay.appendChild(image);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});
