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

// Contact form — submits directly to inbox via Formspree
async function handleSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const successMsg = document.getElementById('formSuccess');

  btn.disabled = true;
  btnText.textContent = 'Sending...';

  const data = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

  try {
    const res = await fetch('https://formspree.io/f/xdavkpnp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      successMsg.textContent = "✓ Message sent! I'll get back to you soon.";
      successMsg.style.display = 'block';
      btnText.textContent = 'Message Sent!';
      document.getElementById('contactForm').reset();
    } else {
      throw new Error('Server error');
    }
  } catch {
    successMsg.textContent = '✗ Something went wrong. Please email me directly at kujopatu@yahoo.co.uk';
    successMsg.style.color = '#ff6b6b';
    successMsg.style.display = 'block';
    btn.disabled = false;
    btnText.textContent = 'Send Message';
  }
}

// Active nav link highlighting
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id ? 'var(--dark)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50%' });

sections.forEach(s => sectionObserver.observe(s));
