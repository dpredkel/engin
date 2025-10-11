/**
 * assets/include.js
 * Inserts partials (header/footer), highlights active nav, and sets up mobile menu.
 * Caches partials aggressively and avoids layout thrash.
 */
(async function insertPartials() {
  const containers = document.querySelectorAll('[data-include]');
  if (!containers.length) return;

  // Pre-fetch all unique partial URLs and reuse responses
  const urls = [...new Set(Array.from(containers, el => el.getAttribute('data-include')).filter(Boolean))];
  const cache = new Map();

  async function get(url) {
    if (cache.has(url)) return cache.get(url);
    // Let the browser & Netlify headers cache partials. Use ETag revalidation.
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`Failed to load partial (${res.status}): ${url}`);
    const html = await res.text();
    cache.set(url, html);
    return html;
  }

  // Build a document fragment to minimize reflows
  await Promise.all(Array.from(containers).map(async el => {
    const url = el.getAttribute('data-include');
    try {
      const html = await get(url);
      const tpl = document.createElement('template');
      tpl.innerHTML = html;
      el.replaceChildren(tpl.content.cloneNode(true));
    } catch (e) {
      console.error(e);
    }
  }));

  setupActiveNav();
  setupMobileMenu();
})();

function setupActiveNav() {
  const current = location.pathname.replace(/\/index\.html?$/, '/');
  document.querySelectorAll('a[data-nav]').forEach(a => {
    try {
      const href = new URL(a.getAttribute('href'), location.origin).pathname.replace(/\/index\.html?$/, '/');
      if (href === current) a.classList.add('active');
    } catch {}
  });
}

function setupMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (!menuBtn || !mobileNav) return;

  // Reflect initial state for a11y
  menuBtn.setAttribute('aria-expanded', 'false');

  menuBtn.addEventListener('click', () => {
    const hidden = mobileNav.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!hidden));
    if (!hidden) mobileNav.querySelector('a, button')?.focus();
  });
}
