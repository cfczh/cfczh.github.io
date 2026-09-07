document.documentElement.classList.add('js');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const links = [...nav.querySelectorAll('a')];
const sectionLinks = links.filter(link => link.hash);
function closeNav() {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});
links.forEach(link => link.addEventListener('click', () => {
  closeNav();
  if (link.hash && window.matchMedia('(max-width: 700px)').matches) {
    const target = document.querySelector(link.hash);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  }
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeNav();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeNav();
});
window.matchMedia('(max-width: 700px)').addEventListener('change', closeNav);
document.querySelector('#year').textContent = new Date().getFullYear();
const sections = sectionLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
let scheduled = false;
function updateNavigation() {
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) current = section;
  }
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) current = sections.at(-1);
  sectionLinks.forEach(link => {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
function fallbackCopy(text) {
  const input = document.createElement('textarea');
  input.value = text;
  input.setAttribute('readonly', '');
  input.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.append(input);
  input.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch { /* Show manual copy instructions below. */ }
  input.remove();
  copyButton.focus({ preventScroll: true });
  return copied;
}
copyButton.addEventListener('click', async () => {
  const email = copyButton.dataset.email;
  let copied = false;
  try {
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(email); copied = true; }
    else copied = fallbackCopy(email);
  } catch { copied = fallbackCopy(email); }
  copyStatus.textContent = copied ? 'Email copied.' : 'Please select and copy the email address above.';
});
