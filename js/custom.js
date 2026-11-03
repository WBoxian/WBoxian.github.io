const menu = document.querySelector('.menu');
const toggle = document.querySelector('.hamburgermenu');
const chinese = document.documentElement.lang === 'zh-CN';
const menuLabel = chinese ? '目录' : 'Menu';
const closeLabel = chinese ? '关闭' : 'Close';
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('tampil');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? closeLabel : menuLabel;
});
menu.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menu.classList.remove('tampil');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = menuLabel;
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('tampil')) {
    menu.classList.remove('tampil');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = menuLabel;
    toggle.focus();
  }
});
const themeButton = document.getElementById('theme');
function paintTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const label = theme === 'dark' ? (chinese ? '切换日间主题' : 'Switch to day theme') : (chinese ? '切换夜间主题' : 'Switch to night theme');
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
}
paintTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  paintTheme(theme);
  try { localStorage.setItem('stardew-theme', theme); } catch {}
});

// Language links intentionally target #top, including when switching from a section.
if (location.hash === '#top') {
  history.scrollRestoration = 'manual';
  window.addEventListener('load', () => window.scrollTo({ top: 0, behavior: 'instant' }), { once: true });
}

// Pan across the landscape in proportion to the page's scrollable distance.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let backgroundFrame = 0;
function updateBackground() {
  backgroundFrame = 0;
  const distance = document.documentElement.scrollHeight - innerHeight;
  const progress = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
  document.documentElement.style.setProperty('--background-progress', reducedMotion.matches ? '50%' : `${progress * 100}%`);
}
function scheduleBackground() {
  if (!backgroundFrame) backgroundFrame = requestAnimationFrame(updateBackground);
}
window.addEventListener('scroll', scheduleBackground, { passive: true });
window.addEventListener('resize', scheduleBackground);
window.addEventListener('pageshow', scheduleBackground);
reducedMotion.addEventListener('change', scheduleBackground);
new ResizeObserver(scheduleBackground).observe(document.body);
scheduleBackground();
