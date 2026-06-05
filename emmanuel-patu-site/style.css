// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = open ? 'none' : 'flex';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { mobileMenu.style.display = 'none'; });
});

// Intersection observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

// Contact form — opens mailto as fallback (works without a backend)
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const mailtoSubject = encodeURIComponent(`[Website] ${subject}`);
  const mailtoBody = encodeURIComponent(
    `From: ${name} <${email}>\n\n${message}`
  );
  const mailto = `mailto:kujopatu@yahoo.co.uk?subject=${mailtoSubject}&body=${mailtoBody}`;

  window.location.href = mailto;

  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('btnText').textContent = 'Message Sent!';
}

// Active nav link highlighting
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--dark)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50%' });

sections.forEach(s => sectionObserver.observe(s));
