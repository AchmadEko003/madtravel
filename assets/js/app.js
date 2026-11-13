/* ==========================================================================
   MadTravel — Shared Global JavaScript & Mock Data Engine
   ========================================================================== */

const MadTravelState = {
  currency: localStorage.getItem('madtravel_currency') || 'IDR',
  rates: {
    IDR: { symbol: 'Rp', rate: 1, decimals: 0 },
    USD: { symbol: '$', rate: 0.000063, decimals: 2 },
    SGD: { symbol: 'S$', rate: 0.000084, decimals: 2 },
    MYR: { symbol: 'RM', rate: 0.00028, decimals: 2 }
  },
  savedAlerts: JSON.parse(localStorage.getItem('madtravel_alerts') || 'null') || [
    {
      id: 'al-1',
      type: 'flight',
      route: 'Jakarta (CGK) ➔ Bali (DPS)',
      dateRange: '18 Des – 23 Des 2026',
      targetPrice: 950000,
      currentLowest: 890000,
      bestOta: 'Tiket.com',
      airline: 'Citilink / AirAsia',
      trend: 'down',
      dropPercent: 18,
      channels: ['WhatsApp', 'Email'],
      history: [1250000, 1180000, 1210000, 1100000, 1020000, 960000, 890000]
    },
    {
      id: 'al-2',
      type: 'flight',
      route: 'Jakarta (CGK) ➔ Tokyo Narita (NRT)',
      dateRange: '10 Apr – 18 Apr 2027',
      targetPrice: 5500000,
      currentLowest: 5850000,
      bestOta: 'Trip.com',
      airline: 'ANA / Scoot',
      trend: 'wait',
      dropPercent: 6,
      channels: ['Telegram', 'Email'],
      history: [6800000, 6500000, 6200000, 6400000, 6100000, 5950000, 5850000]
    },
    {
      id: 'al-3',
      type: 'hotel',
      route: 'The Kayon Jungle Resort, Ubud',
      dateRange: '14 Feb – 17 Feb 2027 (3 Malam)',
      targetPrice: 3200000,
      currentLowest: 2980000,
      bestOta: 'Agoda',
      airline: 'Valley Pool Villa (Free Breakfast)',
      trend: 'down',
      dropPercent: 22,
      channels: ['WhatsApp'],
      history: [3900000, 3850000, 3600000, 3450000, 3300000, 3150000, 2980000]
    },
    {
      id: 'al-4',
      type: 'flight',
      route: 'Surabaya (SUB) ➔ Singapura (SIN)',
      dateRange: '05 Mei – 09 Mei 2027',
      targetPrice: 1200000,
      currentLowest: 1420000,
      bestOta: 'Traveloka',
      airline: 'Singapore Airlines / Jetstar',
      trend: 'up',
      dropPercent: -5,
      channels: ['Email'],
      history: [1300000, 1280000, 1320000, 1350000, 1390000, 1400000, 1420000]
    }
  ]
};

// Format Currency Utility
function formatMoney(amountInIdr, customCurrency) {
  const curr = customCurrency || MadTravelState.currency || 'IDR';
  const info = MadTravelState.rates[curr] || MadTravelState.rates.IDR;
  const converted = amountInIdr * info.rate;

  if (curr === 'IDR') {
    return 'Rp ' + Math.round(converted).toLocaleString('id-ID');
  }
  return info.symbol + ' ' + converted.toLocaleString('en-US', {
    minimumFractionDigits: info.decimals,
    maximumFractionDigits: info.decimals
  });
}

// Toast Notification Utility
function showToast(title, message, type = 'turquoise') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const iconMap = {
    turquoise: '🌴',
    coral: '🔥',
    sunny: '⚡',
    lime: '✅'
  };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div style="font-size: 1.5rem; flex-shrink:0;">${iconMap[type] || '✨'}</div>
    <div style="flex:1;">
      <div style="font-weight:800; font-size:0.9rem; color:var(--text-navy);">${title}</div>
      <div style="font-size:0.8rem; color:var(--text-slate);">${message}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="font-weight:800; color:var(--text-muted); padding:4px;">✕</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast && toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }
  }, 4200);
}

// Update all [data-idr] elements when currency changes
function updateAllCurrencyDisplays() {
  document.querySelectorAll('[data-idr]').forEach(el => {
    const raw = parseFloat(el.getAttribute('data-idr'));
    const suffix = el.getAttribute('data-suffix') || '';
    if (!isNaN(raw)) {
      el.textContent = formatMoney(raw) + suffix;
    }
  });
}

// Swap Origin & Destination Inputs
function initRouteSwappers() {
  document.querySelectorAll('.swap-route-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const grid = btn.closest('.search-Input-grid');
      if (!grid) return;
      const fromInput = grid.querySelector('[data-field="origin"]');
      const toInput = grid.querySelector('[data-field="destination"]');
      const fromSub = grid.querySelector('[data-sub="origin"]');
      const toSub = grid.querySelector('[data-sub="destination"]');

      if (fromInput && toInput) {
        const tempVal = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = tempVal;
      }
      if (fromSub && toSub) {
        const tempSub = fromSub.textContent;
        fromSub.textContent = toSub.textContent;
        toSub.textContent = tempSub;
      }
      showToast('Rute Ditukar!', 'Lokasi keberangkatan & tujuan berhasil dibalik.', 'sunny');
    });
  });
}

// Mobile Menu & Currency Switcher Init
document.addEventListener('DOMContentLoaded', () => {
  // Currency Selectors
  const currSelectors = document.querySelectorAll('.currency-selector');
  currSelectors.forEach(sel => {
    sel.value = MadTravelState.currency;
    sel.addEventListener('change', (e) => {
      MadTravelState.currency = e.target.value;
      localStorage.setItem('madtravel_currency', e.target.value);
      currSelectors.forEach(s => s.value = e.target.value);
      updateAllCurrencyDisplays();
      if (typeof window.onCurrencyChanged === 'function') {
        window.onCurrencyChanged(e.target.value);
      }
      showToast('Mata Uang Diubah', `Semua harga kini ditampilkan dalam ${e.target.value}.`, 'turquoise');
    });
  });

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // Search Tabs (Flight / Hotel / AI Trip / Train)
  document.querySelectorAll('.search-tab[data-tab-target]').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.metasearch-box');
      if (!group) return;
      group.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetType = tab.getAttribute('data-tab-target');
      const originLabel = group.querySelector('[data-label="origin"]');
      const destLabel = group.querySelector('[data-label="destination"]');
      const destInput = group.querySelector('[data-field="destination"]');
      const searchForm = group.querySelector('form');

      if (targetType === 'hotel') {
        if (originLabel) originLabel.innerHTML = '🏨 Kota / Nama Hotel';
        if (destLabel) destLabel.innerHTML = '🌴 Area Favorit';
        if (destInput) destInput.value = 'Uluwatu & Seminyak, Bali';
        if (searchForm) searchForm.setAttribute('action', 'hotels.html');
      } else if (targetType === 'ai') {
        if (originLabel) originLabel.innerHTML = '✨ Berangkat Dari';
        if (destLabel) destLabel.innerHTML = '🎯 Impian Liburanmu';
        if (destInput) destInput.value = 'Labuan Bajo & Pulau Padar 4H3M';
        if (searchForm) searchForm.setAttribute('action', 'ai-planner.html');
      } else {
        if (originLabel) originLabel.innerHTML = '🛫 Dari Mana';
        if (destLabel) destLabel.innerHTML = '🛬 Mau Ke Mana';
        if (destInput) destInput.value = 'Denpasar, Bali (DPS)';
        if (searchForm) searchForm.setAttribute('action', 'flights.html');
      }
    });
  });

  initRouteSwappers();
  updateAllCurrencyDisplays();
});

// Modal Helper
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('open');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('open');
}
