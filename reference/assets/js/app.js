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
  initCustomDropdowns();
  initCustomDatepickers();
  updateAllCurrencyDisplays();
});

// Neo-Brutalist Custom Floating Dropdown Initializer (Supports Searchable Select)
function initCustomDropdowns() {
  document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.custom-dropdown-btn');
    const label = dropdown.querySelector('.custom-dropdown-label');
    const menu = dropdown.querySelector('.custom-dropdown-menu');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');
    const searchInput = dropdown.querySelector('.dropdown-search-input');
    const emptyState = dropdown.querySelector('.dropdown-empty-state');
    const items = dropdown.querySelectorAll('.custom-dropdown-item');

    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      // Close other open dropdowns
      document.querySelectorAll('.custom-dropdown.open, .custom-datepicker.open').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.toggle('open', !isOpen);

      if (!isOpen && searchInput) {
        searchInput.value = '';
        items.forEach(it => it.style.display = 'flex');
        if (emptyState) emptyState.style.display = 'none';
        setTimeout(() => searchInput.focus(), 60);
      }
    });

    if (searchInput) {
      // Prevent clicking the search input from closing dropdown
      searchInput.addEventListener('click', (e) => e.stopPropagation());

      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          const match = text.includes(query);
          item.style.display = match ? 'flex' : 'none';
          if (match) visibleCount++;
        });

        if (emptyState) {
          emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      });
    }

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');

        const val = item.getAttribute('data-value') || item.textContent.trim();
        const textEl = item.querySelector('.item-text');
        const text = textEl ? textEl.textContent.trim() : item.textContent.replace('✔', '').trim();

        if (label) label.textContent = text;
        if (hiddenInput) {
          hiddenInput.value = val;
          hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        dropdown.classList.remove('open');
      });
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown')) {
      document.querySelectorAll('.custom-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });
}

// Neo-Brutalist Custom Floating Datepicker & Range Picker Initializer
function initCustomDatepickers() {
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  document.querySelectorAll('.custom-datepicker').forEach(picker => {
    const isRange = picker.getAttribute('data-mode') === 'range';
    const trigger = picker.querySelector('.datepicker-trigger-btn');
    const label = picker.querySelector('.datepicker-label');
    const pop = picker.querySelector('.datepicker-pop');
    const titleEl = picker.querySelector('.datepicker-title');
    const prevBtn = picker.querySelector('.datepicker-prev');
    const nextBtn = picker.querySelector('.datepicker-next');
    const grid = picker.querySelector('.datepicker-days-grid');
    const hiddenStart = picker.querySelector('input[data-role="start-date"]');
    const hiddenEnd = picker.querySelector('input[data-role="end-date"]');

    if (!trigger || !pop || !grid) return;

    let currentYear = parseInt(picker.getAttribute('data-year') || '2026', 10);
    let currentMonth = parseInt(picker.getAttribute('data-month') || '11', 10); // 0-indexed (11 = Dec)

    let selectedStart = picker.getAttribute('data-start') ? new Date(picker.getAttribute('data-start')) : new Date(2026, 11, 18);
    let selectedEnd = isRange ? (picker.getAttribute('data-end') ? new Date(picker.getAttribute('data-end')) : new Date(2026, 11, 23)) : null;
    let hoverDate = null;

    // Prevent clicks inside popup from bubbling to document (prevents accidental close)
    pop.addEventListener('click', (e) => e.stopPropagation());

    function updateHighlightClasses() {
      const cells = grid.querySelectorAll('.date-cell:not(.empty)');
      const startTime = selectedStart ? new Date(selectedStart.getFullYear(), selectedStart.getMonth(), selectedStart.getDate()).getTime() : null;
      const endTime = selectedEnd ? new Date(selectedEnd.getFullYear(), selectedEnd.getMonth(), selectedEnd.getDate()).getTime() : null;
      const hoverTime = hoverDate ? new Date(hoverDate.getFullYear(), hoverDate.getMonth(), hoverDate.getDate()).getTime() : null;

      cells.forEach(c => {
        const t = parseInt(c.dataset.time, 10);
        c.classList.remove('selected', 'range-start', 'range-end', 'range-between');

        if (!isRange) {
          if (startTime && t === startTime) {
            c.classList.add('selected');
          }
        } else {
          if (startTime && t === startTime) {
            c.classList.add('range-start');
          } else if (endTime && t === endTime) {
            c.classList.add('range-end');
          } else if (startTime && endTime && t > startTime && t < endTime) {
            c.classList.add('range-between');
          } else if (startTime && !endTime && hoverTime) {
            const min = Math.min(startTime, hoverTime);
            const max = Math.max(startTime, hoverTime);
            if (t > min && t < max) {
              c.classList.add('range-between');
            } else if (hoverTime > startTime && t === hoverTime) {
              c.classList.add('range-end');
            }
          }
        }
      });
    }

    function renderCalendar() {
      if (titleEl) {
        titleEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
      }

      grid.innerHTML = '';

      const firstDayRaw = new Date(currentYear, currentMonth, 1).getDay();
      const firstDay = (firstDayRaw === 0) ? 6 : firstDayRaw - 1; // 0 = Mon
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      // Empty leading cells
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'date-cell empty';
        grid.appendChild(emptyCell);
      }

      // Day cells
      for (let day = 1; day <= daysInMonth; day++) {
        const thisDate = new Date(currentYear, currentMonth, day);
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'date-cell';
        cell.textContent = day;
        cell.dataset.time = thisDate.getTime();

        cell.addEventListener('click', (e) => {
          e.stopPropagation();

          if (!isRange) {
            selectedStart = thisDate;
            const formatted = `${day} ${monthShort[currentMonth]} ${currentYear}`;
            if (label) label.textContent = `📅 ${formatted}`;
            if (hiddenStart) {
              const iso = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              hiddenStart.value = iso;
              hiddenStart.dispatchEvent(new Event('change', { bubbles: true }));
            }
            picker.classList.remove('open');
            updateHighlightClasses();
          } else {
            // Range logic
            if (!selectedStart || (selectedStart && selectedEnd)) {
              // 1st click: set start date only, keep picker open!
              selectedStart = thisDate;
              selectedEnd = null;
              hoverDate = null;
              if (label) label.textContent = `📅 ${day} ${monthShort[currentMonth]} – Pilih Pulang`;
              updateHighlightClasses();
            } else {
              // 2nd click: set end date, close picker!
              if (thisDate < selectedStart) {
                selectedEnd = selectedStart;
                selectedStart = thisDate;
              } else {
                selectedEnd = thisDate;
              }
              hoverDate = null;

              const sDay = selectedStart.getDate();
              const sMon = monthShort[selectedStart.getMonth()];
              const eDay = selectedEnd.getDate();
              const eMon = monthShort[selectedEnd.getMonth()];
              const eYr = selectedEnd.getFullYear();

              const rangeText = (selectedStart.getMonth() === selectedEnd.getMonth())
                ? `📅 ${sDay} – ${eDay} ${eMon} ${eYr}`
                : `📅 ${sDay} ${sMon} – ${eDay} ${eMon} ${eYr}`;

              if (label) label.textContent = rangeText;

              if (hiddenStart) {
                hiddenStart.value = `${selectedStart.getFullYear()}-${String(selectedStart.getMonth() + 1).padStart(2, '0')}-${String(selectedStart.getDate()).padStart(2, '0')}`;
              }
              if (hiddenEnd) {
                hiddenEnd.value = `${selectedEnd.getFullYear()}-${String(selectedEnd.getMonth() + 1).padStart(2, '0')}-${String(selectedEnd.getDate()).padStart(2, '0')}`;
                hiddenEnd.dispatchEvent(new Event('change', { bubbles: true }));
              }

              picker.classList.remove('open');
              updateHighlightClasses();
            }
          }
        });

        if (isRange) {
          cell.addEventListener('mouseenter', () => {
            if (selectedStart && !selectedEnd) {
              hoverDate = thisDate;
              updateHighlightClasses();
            }
          });
        }

        grid.appendChild(cell);
      }

      updateHighlightClasses();
    }

    renderCalendar();

    // Toggle open
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = picker.classList.contains('open');
      document.querySelectorAll('.custom-datepicker.open, .custom-dropdown.open').forEach(el => {
        if (el !== picker) el.classList.remove('open');
      });
      picker.classList.toggle('open', !isOpen);
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        renderCalendar();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        renderCalendar();
      });
    }

    // Quick presets
    picker.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const daysAdd = parseInt(chip.getAttribute('data-days') || '3', 10);
        selectedStart = new Date(currentYear, currentMonth, 18);
        selectedEnd = new Date(currentYear, currentMonth, 18 + daysAdd);

        const sDay = selectedStart.getDate();
        const eDay = selectedEnd.getDate();
        const eMon = monthShort[selectedEnd.getMonth()];
        const eYr = selectedEnd.getFullYear();

        if (label) label.textContent = `📅 ${sDay} – ${eDay} ${eMon} ${eYr}`;
        if (hiddenStart) {
          hiddenStart.value = `${selectedStart.getFullYear()}-${String(selectedStart.getMonth() + 1).padStart(2, '0')}-${String(selectedStart.getDate()).padStart(2, '0')}`;
        }
        if (hiddenEnd) {
          hiddenEnd.value = `${selectedEnd.getFullYear()}-${String(selectedEnd.getMonth() + 1).padStart(2, '0')}-${String(selectedEnd.getDate()).padStart(2, '0')}`;
          hiddenEnd.dispatchEvent(new Event('change', { bubbles: true }));
        }
        picker.classList.remove('open');
        renderCalendar();
      });
    });
  });

  // Close datepickers on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-datepicker')) {
      document.querySelectorAll('.custom-datepicker.open').forEach(el => el.classList.remove('open'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-datepicker.open').forEach(el => el.classList.remove('open'));
    }
  });
}

// Modal Helper
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('open');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('open');
}
