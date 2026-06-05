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

// Contact form — Formspree
async function handleSubmit() {
  const btn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const successMsg = document.getElementById('formSuccess');

  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !subject || !message) {
    successMsg.textContent = 'Please fill in all fields.';
    successMsg.style.color = '#ff6b6b';
    successMsg.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btnText.textContent = 'Sending...';
  successMsg.style.display = 'none';

  try {
    const res = await fetch('https://formspree.io/f/xdavkpnp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (res.ok) {
      successMsg.textContent = "✓ Message sent! I'll get back to you soon.";
      successMsg.style.color = '';
      successMsg.style.display = 'block';
      btnText.textContent = 'Message Sent!';
      document.getElementById('fname').value = '';
      document.getElementById('femail').value = '';
      document.getElementById('fsubject').value = '';
      document.getElementById('fmessage').value = '';
    } else {
      throw new Error('failed');
    }
  } catch {
    successMsg.textContent = '✗ Something went wrong. Please email kujopatu@yahoo.co.uk directly.';
    successMsg.style.color = '#ff6b6b';
    successMsg.style.display = 'block';
    btn.disabled = false;
    btnText.textContent = 'Send Message';
  }
}
