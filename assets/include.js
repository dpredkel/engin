<script>
/**
 * Инклюдер частичных HTML (header/footer) + навигация + mobile menu + активный пункт.
 * Работает на GitHub Pages (same-origin fetch).
 */

(async function insertPartials() {
  const containers = document.querySelectorAll('[data-include]');
  // Ничего не делаем, если контейнеров нет
  if (!containers.length) return;

  // Подгружаем все partials параллельно
  await Promise.all(Array.from(containers).map(async el => {
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

  // После вставки — активируем навигацию / меню
  setupActiveLinks();
  setupMobileMenu();
})();

function normalizePageName(pathname) {
  // Берём только имя файла (после слеша)
  let file = pathname.split('/').pop() || '';
  if (!file || file === '') file = 'index.html';
  return file.toLowerCase();
}

function setupActiveLinks() {
  const current = normalizePageName(location.pathname);

  // Ищем все навигации с data-nav (в шапке и футере)
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
