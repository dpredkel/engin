<script>
/**
 * Вставляет partials (header/footer) + активирует моб.меню + подсвечивает активный пункт.
 * Работает с относительными путями: data-include="partials/header.html"
 */

(async function insertPartials() {
  const containers = document.querySelectorAll('[data-include]');
  if (!containers.length) return;

  await Promise.all([...containers].map(async el => {
    const url = el.getAttribute('data-include');
    if (!url) return;
    try {
      const res = await fetch(url, { cache: 'no-store' });
      const html = await res.text();
      el.innerHTML = html;
    } catch (e) {
      console.error('Не удалось загрузить partial:', url, e);
    }
  }));

  setupActiveLinks();
  setupMobileMenu();
})();

function currentFile() {
  // Имя файла без пути, по умолчанию index.html
  let file = location.pathname.split('/').pop() || '';
  if (!file) file = 'index.html';
  return file.toLowerCase();
}

function setupActiveLinks() {
  const current = currentFile();
  document.querySelectorAll('[data-nav]').forEach(nav => {
    nav.querySelectorAll('[data-navlink]').forEach(a => {
      const target = (a.getAttribute('data-navlink') || '').toLowerCase();
      const isActive =
        (current === 'index.html' && target === 'index.html') ||
        (current !== 'index.html' && current === target);

      a.classList.toggle('text-primary', isActive);
      a.classList.toggle('font-bold', isActive);
      if (isActive) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  });
}

function setupMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    const hidden = mobileNav.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!hidden));
  });
}
</script>
