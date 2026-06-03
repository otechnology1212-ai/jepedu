  // ============== Year ==============
  document.getElementById('year').textContent = new Date().getFullYear();

  // ============== Mobile Menu ==============
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.querySelector('i').className = 'fas fa-bars';
    });
  });

  // ============== Sticky Header ==============
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // ============== Active Link on Scroll ==============
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  });

  // ============== Reveal on Scroll ==============
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ============== WhatsApp Form Submission ==============
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const service = document.getElementById('service').value;

    if (!name || !service) {
      // Simple shake animation on invalid submit
      contactForm.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(0)' }
      ], { duration: 400 });
      return;
    }
if (service == "Other") {
  const message = "Hello JES, my name is ${name}. I would like to purchase a/an "
}
    const message = `Hello JES, my name is ${name}. I would like to purchase a ${service}.`;
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappURL = `https://wa.me/2349068992442?text=${encodedMessage}`;

    // Visual feedback
    const btn = contactForm.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Redirecting to WhatsApp...';
    btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      contactForm.reset();
    }, 700);
  });