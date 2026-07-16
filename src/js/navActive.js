document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav__index a');

  const linkMap = new Map();
  navLinks.forEach(link => {
    const targetId = link.getAttribute('href').replace('#', '');
    if (targetId) linkMap.set(targetId, link);
  });

  const sections = [...linkMap.keys()]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const activeLink = linkMap.get(entry.target.id);
      if (!activeLink) return;

      navLinks.forEach(link => link.classList.remove('active'));
      activeLink.classList.add('active');
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
});