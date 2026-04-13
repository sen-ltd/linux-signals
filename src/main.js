import { SIGNALS, searchSignals, filterByAction } from './signals.js';
import { getStrings, toggleLang } from './i18n.js';

// ──────────────────────────────────────────
// State
// ──────────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'ja';
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentFilter = 'all';
let currentQuery = '';

// ──────────────────────────────────────────
// DOM helpers
// ──────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

// ──────────────────────────────────────────
// Action badge colours
// ──────────────────────────────────────────
const ACTION_CLASSES = {
  Term: 'badge-term',
  Core: 'badge-core',
  Ign: 'badge-ign',
  Stop: 'badge-stop',
  Cont: 'badge-cont',
};

// ──────────────────────────────────────────
// Render
// ──────────────────────────────────────────
function getDisplayAction(action, strings) {
  const map = {
    Term: strings.filterTerm,
    Core: strings.filterCore,
    Ign: strings.filterIgn,
    Stop: strings.filterStop,
    Cont: strings.filterCont,
  };
  return map[action] || action;
}

function renderCard(signal, strings) {
  const { number, name, defaultAction, canCatch, canIgnore, canBlock, origin, description, example } = signal;
  const badgeClass = ACTION_CLASSES[defaultAction] || '';
  const uncatchable = !canCatch && !canIgnore && !canBlock;

  return `
    <article class="signal-card ${uncatchable ? 'signal-card--special' : ''}" data-number="${number}" role="button" tabindex="0" aria-label="${name}">
      <header class="signal-card__header">
        <span class="signal-number">${number}</span>
        <span class="signal-name">${name}</span>
        <span class="badge ${badgeClass}">${getDisplayAction(defaultAction, strings)}</span>
        <span class="origin-badge">${origin}</span>
      </header>
      <p class="signal-desc">${description[currentLang]}</p>
      ${example ? `<code class="signal-example">${escapeHtml(example)}</code>` : ''}
      ${uncatchable ? `<p class="signal-note">⚠ Cannot be caught, ignored, or blocked</p>` : ''}
    </article>
  `.trim();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getFilteredSignals() {
  let results = currentQuery ? searchSignals(currentQuery) : SIGNALS;
  if (currentFilter !== 'all') {
    results = results.filter(s => s.defaultAction === currentFilter);
  }
  return results;
}

function renderGrid() {
  const strings = getStrings(currentLang);
  const signals = getFilteredSignals();
  const grid = $('signal-grid');

  if (signals.length === 0) {
    grid.innerHTML = `<p class="no-results">${strings.noResults}</p>`;
  } else {
    grid.innerHTML = signals.map(s => renderCard(s, strings)).join('');
    // Attach card click listeners
    grid.querySelectorAll('.signal-card').forEach(card => {
      const num = parseInt(card.dataset.number, 10);
      card.addEventListener('click', () => openModal(num));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(num);
        }
      });
    });
  }

  const countEl = $('signal-count');
  if (countEl) {
    countEl.textContent = `${signals.length} ${strings.signalCount}`;
  }
}

// ──────────────────────────────────────────
// Modal
// ──────────────────────────────────────────
function openModal(number) {
  const signal = SIGNALS.find(s => s.number === number);
  if (!signal) return;

  const strings = getStrings(currentLang);
  const { name, defaultAction, canCatch, canIgnore, canBlock, origin, description, useCases, example } = signal;
  const badgeClass = ACTION_CLASSES[defaultAction] || '';

  const boolCell = (val) => `<td class="${val ? 'bool-yes' : 'bool-no'}">${val ? strings.yes : strings.no}</td>`;

  const useCaseList = useCases[currentLang]
    .map(u => `<li>${escapeHtml(u)}</li>`)
    .join('');

  $('modal-body').innerHTML = `
    <div class="modal-signal-header">
      <span class="signal-number signal-number--lg">${signal.number}</span>
      <span class="signal-name signal-name--lg">${name}</span>
      <span class="badge ${badgeClass}">${getDisplayAction(defaultAction, strings)}</span>
      <span class="origin-badge">${origin}</span>
    </div>

    <p class="modal-description">${description[currentLang]}</p>

    <table class="prop-table">
      <tbody>
        <tr><th>${strings.labelCanCatch}</th>${boolCell(canCatch)}</tr>
        <tr><th>${strings.labelCanIgnore}</th>${boolCell(canIgnore)}</tr>
        <tr><th>${strings.labelCanBlock}</th>${boolCell(canBlock)}</tr>
      </tbody>
    </table>

    <h3>${strings.labelUseCases}</h3>
    <ul class="use-case-list">${useCaseList}</ul>

    ${example ? `<h3>${strings.labelExample}</h3><pre class="code-block"><code>${escapeHtml(example)}</code></pre>` : ''}
  `;

  const modal = $('signal-modal');
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  modal.querySelector('.modal-close').focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = $('signal-modal');
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ──────────────────────────────────────────
// UI string update (without full re-render)
// ──────────────────────────────────────────
function applyStrings() {
  const strings = getStrings(currentLang);
  document.title = strings.title;
  const titleEl = $('page-title');
  if (titleEl) titleEl.textContent = strings.title;
  const subtitleEl = $('page-subtitle');
  if (subtitleEl) subtitleEl.textContent = strings.subtitle;
  const searchEl = $('search-input');
  if (searchEl) searchEl.placeholder = strings.searchPlaceholder;
  const langBtn = $('lang-toggle');
  if (langBtn) langBtn.textContent = strings.langToggle;

  // Filter chip labels
  const chips = $$('.filter-chip');
  chips.forEach(chip => {
    const action = chip.dataset.action;
    if (action === 'all') chip.textContent = strings.filterAll;
    else if (action === 'Term') chip.textContent = strings.filterTerm;
    else if (action === 'Core') chip.textContent = strings.filterCore;
    else if (action === 'Ign') chip.textContent = strings.filterIgn;
    else if (action === 'Stop') chip.textContent = strings.filterStop;
    else if (action === 'Cont') chip.textContent = strings.filterCont;
  });

  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) closeBtn.setAttribute('aria-label', strings.closeModal);
}

// ──────────────────────────────────────────
// Theme
// ──────────────────────────────────────────
function applyTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  const themeBtn = $('theme-toggle');
  if (themeBtn) themeBtn.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

// ──────────────────────────────────────────
// Event wiring
// ──────────────────────────────────────────
function init() {
  applyTheme();
  applyStrings();
  renderGrid();

  // Search
  $('search-input').addEventListener('input', e => {
    currentQuery = e.target.value;
    renderGrid();
  });

  // Filter chips
  $$('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.action;
      renderGrid();
    });
  });

  // Language toggle
  $('lang-toggle').addEventListener('click', () => {
    currentLang = toggleLang(currentLang);
    localStorage.setItem('lang', currentLang);
    applyStrings();
    renderGrid();
  });

  // Theme toggle
  $('theme-toggle').addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
  });

  // Modal close
  $('modal-close-btn').addEventListener('click', closeModal);
  $('signal-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

document.addEventListener('DOMContentLoaded', init);
