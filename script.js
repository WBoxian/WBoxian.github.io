const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const zh = document.body.dataset.lang === 'zh';
let manualTheme = false;
try { manualTheme = ['light', 'dark'].includes(localStorage.getItem('theme')); } catch { /* Theme remains usable without storage. */ }

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', zh ? `切换至${dark ? '浅色' : '深色'}主题` : `Switch to ${dark ? 'light' : 'dark'} theme`);
}

setTheme(root.dataset.theme);
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  manualTheme = true;
  setTheme(next);
  try { localStorage.setItem('theme', next); } catch { /* Ignore unavailable storage. */ }
});
systemTheme.addEventListener('change', ({ matches }) => {
  if (!manualTheme) setTheme(matches ? 'dark' : 'light');
});
window.addEventListener('storage', ({ key, newValue }) => {
  if (key !== 'theme' && key !== null) return;
  manualTheme = ['light', 'dark'].includes(newValue);
  setTheme(manualTheme ? newValue : systemTheme.matches ? 'dark' : 'light');
});

const tabs = [...document.querySelectorAll('[data-tab]')];
const panels = [...document.querySelectorAll('.panel')];

function activate(id, focus = false) {
  if (!tabs.some(tab => tab.dataset.tab === id)) id = 'about';
  tabs.forEach(tab => {
    const selected = tab.dataset.tab === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  panels.forEach(panel => {
    panel.hidden = panel.id !== id;
    panel.classList.toggle('is-active', panel.id === id);
  });
}

function openSection(id, focus = false) {
  activate(id, focus);
  const nextHash = `#${id}`;
  if (location.hash !== nextHash) history.pushState(null, '', nextHash);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => openSection(tab.dataset.tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    openSection(tabs[next].dataset.tab, true);
  });
});
document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    openSection(button.dataset.open, true);
    document.getElementById('main').scrollIntoView({ block: 'start' });
  });
});
window.addEventListener('hashchange', () => activate(location.hash.slice(1)));
window.addEventListener('popstate', () => activate(location.hash.slice(1)));
activate(location.hash.slice(1));
document.querySelector('.language-switch').addEventListener('click', event => {
  event.currentTarget.hash = location.hash;
});
document.getElementById('year').textContent = new Date().getFullYear();
