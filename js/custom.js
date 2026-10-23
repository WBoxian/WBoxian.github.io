const menu = document.querySelector('.menu');
const toggle = document.querySelector('.hamburgermenu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('tampil');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? '×' : '☰';
});
menu.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menu.classList.remove('tampil');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('tampil')) {
    menu.classList.remove('tampil');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
    toggle.focus();
  }
});
const themeButton = document.getElementById('theme');
const system = matchMedia('(prefers-color-scheme:dark)');
let manual = false;
try { manual = ['light', 'dark'].includes(localStorage.getItem('stardew-theme')); } catch {}
function paintTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? '☀' : '☾';
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
}
paintTheme(document.documentElement.dataset.theme || (system.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  manual = true;
  paintTheme(theme);
  try { localStorage.setItem('stardew-theme', theme); } catch {}
});
system.addEventListener('change', event => {
  if (!manual) paintTheme(event.matches ? 'dark' : 'light');
});

document.querySelector('.language-switch').addEventListener('click', event => {
  event.currentTarget.hash = location.hash;
});
