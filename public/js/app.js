/* ==========================================================================
   NEZLIN PRICING SYSTEM (NFS) - FRONTEND APPLICATION
   ========================================================================== */

// Global Application State
const state = {
  products: [],
  config: {},
  categories: [],
  customers: [],
  activeCityCode: null,
  activeTab: 'pricing',
  filters: {
    search: '',
    category: 'all',
    onlyMismatch: false,
    hideOutOfStock: false,
    sort: 'default'
  },
  saveDebouncers: {}
};

// ==========================================
// UNDO / REDO HISTORY MANAGER
// ==========================================
const historyManager = {
  undoStack: [],
  redoStack: [],
  maxStates: 50,

  pushState(productCode, oldPricing, newPricing) {
    this.redoStack = []; // Clear redo stack on new action
    this.undoStack.push({
      productCode,
      oldPricing: JSON.parse(JSON.stringify(oldPricing)),
      newPricing: JSON.parse(JSON.stringify(newPricing))
    });
    if (this.undoStack.length > this.maxStates) {
      this.undoStack.shift();
    }
    this.updateButtons();
  },

  undo() {
    if (this.undoStack.length === 0) return;
    const item = this.undoStack.pop();
    const product = state.products.find(p => p.code === item.productCode);
    if (product) {
      this.redoStack.push(item);
      product.userPricing = JSON.parse(JSON.stringify(item.oldPricing));
      updateProductCardUI(product);
      triggerProductAutoSave(product, false);
      showNotification(`${product.code} için son işlem geri alındı.`, 'success');
    }
    this.updateButtons();
  },

  redo() {
    if (this.redoStack.length === 0) return;
    const item = this.redoStack.pop();
    const product = state.products.find(p => p.code === item.productCode);
    if (product) {
      this.undoStack.push(item);
      product.userPricing = JSON.parse(JSON.stringify(item.newPricing));
      updateProductCardUI(product);
      triggerProductAutoSave(product, false);
      showNotification(`${product.code} için işlem yinelendi.`, 'success');
    }
    this.updateButtons();
  },

  updateButtons() {
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    if (undoBtn) undoBtn.disabled = this.undoStack.length === 0;
    if (redoBtn) redoBtn.disabled = this.redoStack.length === 0;
  }
};

function updateProductCardUI(product) {
  const card = document.querySelector(`.product-card[data-code="${product.code}"]`);
  if (!card) return;

  const userPricing = product.userPricing || { checkedOptions: {}, customPrices: {}, notes: '' };

  PRICING_OPTIONS.forEach(opt => {
    let isChecked;
    if (opt.id === 'paketleme' && userPricing.checkedOptions['paketleme'] === undefined && userPricing.checkedOptions['kargo'] !== undefined) {
      isChecked = userPricing.checkedOptions['kargo'] !== false;
    } else if (userPricing.checkedOptions[opt.id] !== undefined) {
      isChecked = !!userPricing.checkedOptions[opt.id];
    } else {
      isChecked = opt.defaultOff ? false : true;
    }
    const checkbox = card.querySelector(`input[type="checkbox"][data-option-id="${opt.id}"]`);
    if (checkbox) {
      checkbox.checked = isChecked;
      const row = checkbox.closest('.option-row');
      if (row) row.classList.toggle('checked', isChecked);
    }

    if (opt.hasCustomInput) {
      const customInput = card.querySelector(`input[type="number"][data-option-id="${opt.id}"]`);
      if (customInput) {
        customInput.value = userPricing.customPrices[opt.id] || '';
      }
    }
  });

  const textarea = card.querySelector(`textarea[id="notes-${product.code}"]`);
  if (textarea) {
    textarea.value = userPricing.notes || '';
  }

  // Recalculate displays (this will update totals and warning banners, but don't save again!)
  recalculateCardTotalAndSaveDisplay(product, card);
}

// Recalculate display without triggering save (useful for Undo/Redo restoration)
function recalculateCardTotalAndSaveDisplay(product, cardNode) {
  const code = product.code;
  const userPricing = product.userPricing;

  PRICING_OPTIONS.forEach(opt => {
    const rightVal = document.getElementById(`price-val-${code}-${opt.id}`);
    if (rightVal) {
      let isChecked;
      if (opt.id === 'paketleme' && userPricing.checkedOptions['paketleme'] === undefined && userPricing.checkedOptions['kargo'] !== undefined) {
        isChecked = userPricing.checkedOptions['kargo'] !== false;
      } else if (userPricing.checkedOptions[opt.id] !== undefined) {
        isChecked = !!userPricing.checkedOptions[opt.id];
      } else {
        isChecked = opt.defaultOff ? false : true;
      }
      let price = state.config[opt.id] || 0;
      if (opt.hasCustomInput && userPricing.customPrices[opt.id] !== undefined) {
        price = userPricing.customPrices[opt.id];
      }
      rightVal.textContent = isChecked ? `+ ${price.toFixed(2)} ₺` : '—';
    }
  });

  const pricing = calculateDetailedPricing(product);
  
  const costNode = document.getElementById(`cost-total-${code}`);
  const kargoNode = document.getElementById(`kargo-total-${code}`);
  const profitRow = document.getElementById(`profit-row-${code}`);
  const profitNode = document.getElementById(`profit-total-${code}`);
  const digerVergiRow = document.getElementById(`diger-vergi-row-${code}`);
  const digerVergiNode = document.getElementById(`diger-vergi-total-${code}`);
  const kdvLabel = document.getElementById(`kdv-label-${code}`);
  const kdvNode = document.getElementById(`kdv-total-${code}`);

  // 1. Web Sitesi
  const iyzicoRow = document.getElementById(`iyzico-row-${code}`);
  const iyzicoNode = document.getElementById(`iyzico-total-${code}`);
  const grandNode = document.getElementById(`grand-total-${code}`);

  // 2. Trendyol
  const trendyolRateLabel = document.getElementById(`trendyol-rate-label-${code}`);
  const trendyolFee = document.getElementById(`trendyol-fee-${code}`);
  const trendyolNode = document.getElementById(`trendyol-total-${code}`);

  // 3. Hepsiburada
  const hepsiburadaRateLabel = document.getElementById(`hepsiburada-rate-label-${code}`);
  const hepsiburadaFee = document.getElementById(`hepsiburada-fee-${code}`);
  const hepsiburadaNode = document.getElementById(`hepsiburada-total-${code}`);
  
  if (costNode) costNode.textContent = `${pricing.cost.toFixed(2)} ₺`;
  if (kargoNode) kargoNode.textContent = `+ ${pricing.kargo.toFixed(2)} ₺`;
  if (profitRow) {
    profitRow.style.display = pricing.karOrani > 0 ? 'flex' : 'none';
  }
  if (profitNode) {
    profitNode.textContent = `+ ${pricing.profit.toFixed(2)} ₺`;
    const labelNode = profitRow.querySelector('span:first-child');
    if (labelNode) labelNode.textContent = `Net Kar (%${pricing.karOrani})`;
  }
  if (digerVergiRow) digerVergiRow.style.display = pricing.digerVergiOrani > 0 ? 'flex' : 'none';
  if (digerVergiNode) digerVergiNode.textContent = `+ ${pricing.digerVergi.toFixed(2)} ₺`;
  if (kdvLabel) kdvLabel.textContent = `+ %${pricing.kdvOrani} KDV`;
  if (kdvNode) kdvNode.textContent = `+ ${pricing.kdv.toFixed(2)} ₺`;

  // Update Web Sitesi elements
  if (iyzicoRow) iyzicoRow.style.display = pricing.iyzicoOrani > 0 ? 'flex' : 'none';
  if (iyzicoNode) iyzicoNode.textContent = `+ ${pricing.iyzico.toFixed(2)} ₺`;
  if (grandNode) grandNode.textContent = `${pricing.roundedGrandTotal.toFixed(2)} ₺`;

  // Update Trendyol elements
  if (trendyolRateLabel) trendyolRateLabel.textContent = `Trendyol Komisyonu (%${pricing.trendyolKomisyon})`;
  if (trendyolFee) trendyolFee.textContent = `+ ${pricing.trendyolKomisyonAmount.toFixed(2)} ₺`;
  if (trendyolNode) trendyolNode.textContent = `${pricing.trendyolPrice.toFixed(2)} ₺`;

  // Update Hepsiburada elements
  if (hepsiburadaRateLabel) hepsiburadaRateLabel.textContent = `Hepsiburada Komisyonu (%${pricing.hepsiburadaKomisyon})`;
  if (hepsiburadaFee) hepsiburadaFee.textContent = `+ ${pricing.hepsiburadaKomisyonAmount.toFixed(2)} ₺`;
  if (hepsiburadaNode) hepsiburadaNode.textContent = `${pricing.hepsiburadaPrice.toFixed(2)} ₺`;

  const normalPrice = product.undiscountedPrice;
  const tolerance = state.config.toleransLimit !== undefined ? parseFloat(state.config.toleransLimit) : 10.0;
  const isMismatch = Math.abs(pricing.roundedGrandTotal - normalPrice) >= tolerance;
  
  // Update warning exclamation button visibility
  const mismatchBtn = document.getElementById(`mismatch-btn-${code}`);
  if (mismatchBtn) {
    mismatchBtn.style.display = isMismatch ? 'inline-flex' : 'none';
  }

  // Update copy button handler with new price
  const copyBtn = document.getElementById(`copy-btn-${code}`);
  if (copyBtn) {
    copyBtn.onclick = (e) => {
      e.stopPropagation();
      copyToClipboard(pricing.roundedGrandTotal.toFixed(2), `${code} (Web)`);
    };
  }

  // Update copy button handler for Trendyol
  const copyTrendyolBtn = document.getElementById(`copy-trendyol-btn-${code}`);
  if (copyTrendyolBtn) {
    copyTrendyolBtn.onclick = (e) => {
      e.stopPropagation();
      copyToClipboard(pricing.trendyolPrice.toFixed(2), `${code} (Trendyol)`);
    };
  }

  // Update copy button handler for Hepsiburada
  const copyHepsiburadaBtn = document.getElementById(`copy-hepsiburada-btn-${code}`);
  if (copyHepsiburadaBtn) {
    copyHepsiburadaBtn.onclick = (e) => {
      e.stopPropagation();
      copyToClipboard(pricing.hepsiburadaPrice.toFixed(2), `${code} (Hepsiburada)`);
    };
  }
}

// Pricing Option Fields Mapping (Match Backend & UI Names)
const PRICING_OPTIONS = [
  { id: 'paketleme', label: 'Paketleme', hasCustomInput: false },
  { id: 'tips', label: 'Tips Şekillendirme', hasCustomInput: false },
  { id: 'base', label: 'Base', hasCustomInput: false },
  { id: 'top', label: 'Top', hasCustomInput: false },
  { id: 'kalici1', label: 'Kalıcı 1', hasCustomInput: false },
  { id: 'kalici2', label: 'Kalıcı 2', hasCustomInput: false },
  { id: 'kalici3', label: 'Kalıcı 3', hasCustomInput: false },
  { id: 'nailart', label: 'Nail Art', hasCustomInput: true },
  { id: 'ombre', label: 'Ombre', hasCustomInput: true },
  { id: 'french', label: 'French', hasCustomInput: true },
  { id: 'charm', label: 'Charm', hasCustomInput: true },
  { id: 'sticker', label: 'Sticker', hasCustomInput: true },
  { id: 'baski', label: 'Baskı', hasCustomInput: true, defaultOff: true }
];

// ==========================================
// 0. SECURE ADMIN PASSWORD PROTECTION
// ==========================================
function togglePasswordVisibility() {
  const input = document.getElementById('admin-password-input');
  const icon = document.getElementById('password-eye-icon');
  if (input) {
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'fa-regular fa-eye-slash';
    } else {
      input.type = 'password';
      icon.className = 'fa-regular fa-eye';
    }
  }
}

async function handleAdminLogin() {
  const input = document.getElementById('admin-password-input');
  const errorMsg = document.getElementById('login-error-msg');
  const submitBtn = document.getElementById('btn-login-submit');
  
  if (!input) return;
  const password = input.value;
  
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Giriş Yapılıyor...</span>';
  }
  if (errorMsg) errorMsg.style.display = 'none';
  
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    
    if (res.ok) {
      const data = await res.json();
      sessionStorage.setItem('nfs_auth_token', data.token);
      
      const overlay = document.getElementById('admin-login-overlay');
      if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 500);
      }
      
      // Load application
      await initializeApp();
    } else {
      throw new Error('Hatalı şifre.');
    }
  } catch (err) {
    console.error(err);
    if (errorMsg) errorMsg.style.display = 'flex';
    if (input) {
      input.value = '';
      input.focus();
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Sisteme Giriş Yap</span>';
    }
  }
}

async function initializeApp() {
  initNavigation();
  initFilters();
  await loadConfig();
  await loadProducts();
  await loadCustomers();
  try {
    await loadAuditTrail();
  } catch (e) {
    console.error('Audit trail load failed during init:', e);
  }
  initSyncController();
  initHistoryController();
}

// Document Ready
document.addEventListener('DOMContentLoaded', async () => {
  const authToken = sessionStorage.getItem('nfs_auth_token');
  if (authToken) {
    const overlay = document.getElementById('admin-login-overlay');
    if (overlay) overlay.style.display = 'none';
    await initializeApp();
  } else {
    const input = document.getElementById('admin-password-input');
    if (input) input.focus();
  }
});

// ==========================================
// 1. NAVIGATION TABS CONTROLLER
// ==========================================
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const viewPanels = document.querySelectorAll('.view-panel');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const tabId = item.getAttribute('data-tab');
      if (tabId === state.activeTab) return;

      // Update Active Navigation Item
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Show/Hide View Panels
      viewPanels.forEach(panel => panel.classList.remove('active'));
      const activePanel = document.getElementById(`view-${tabId}`);
      if (activePanel) activePanel.classList.add('active');

      state.activeTab = tabId;

      // Close mobile sidebar on navigation click
      if (typeof window.toggleMobileSidebar === 'function') {
        window.toggleMobileSidebar(false);
      }

      // Special Tab Actions
      if (tabId === 'sot') {
        renderSoTSettingsForm();
        loadAuditTrail(); // Refresh logs when SOT tab is visited
      } else if (tabId === 'pricing') {
        renderProductGrid();
      } else if (tabId === 'customers') {
        renderCustomersTable();
      } else if (tabId === 'cost') {
        renderCostCalculator();
      }
    });
  });
}

// ==========================================
// 1.1. HISTORY CONTROLLER & KEYBOARD SHORTCUTS
// ==========================================
function initHistoryController() {
  const undoBtn = document.getElementById('undo-btn');
  const redoBtn = document.getElementById('redo-btn');

  if (undoBtn) undoBtn.addEventListener('click', () => historyManager.undo());
  if (redoBtn) redoBtn.addEventListener('click', () => historyManager.redo());

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Check if Ctrl key is pressed
    if (e.ctrlKey) {
      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        historyManager.undo();
      } else if (e.key === 'y' || e.key === 'Y') {
        e.preventDefault();
        historyManager.redo();
      }
    }
  });
}

// ==========================================
// 2. DATA SERVICE: LOAD CONFIG & PRODUCTS
// ==========================================
async function loadConfig() {
  try {
    const res = await fetch('/api/config');
    state.config = await res.json();
    initCostState(); // Gider hesaplayıcı varsayılanlarını yükle
  } catch (err) {
    console.error('Error loading config:', err);
    showNotification('Varsayılan fiyat listesi yüklenemedi.', 'danger');
  }
}

async function loadProducts() {
  const container = document.getElementById('product-list-container');
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    state.products = data.products;

    // Last Sync update
    const syncTimeText = data.lastSync ? `Son Eşitleme: ${data.lastSync}` : 'Veri çekilmedi';
    document.getElementById('last-sync-time').textContent = syncTimeText;
    document.getElementById('sync-last-time').textContent = data.lastSync || 'Veri çekilmedi';

    // Counts
    document.getElementById('total-count').textContent = state.products.length;
    document.getElementById('sync-total-count').textContent = `${state.products.length} Ürün`;

    // Process Categories
    extractCategories();
    
    // Render Prefix Counters under Subtitle
    renderPrefixCounters();
    
    // Render
    renderProductGrid();
  } catch (err) {
    console.error('Error loading products:', err);
    container.innerHTML = `
      <div class="loading-state">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 40px; color: var(--color-danger)"></i>
        <p>Ürün verileri yüklenirken bir hata oluştu.</p>
        <button class="btn btn-primary" onclick="loadProducts()"><i class="fa-solid fa-rotate"></i> Yeniden Dene</button>
      </div>
    `;
  }
}

function extractCategories() {
  const categoriesSet = new Set();
  state.products.forEach(p => {
    if (p.category) {
      // Clean string split by '>' and take the primary or secondary category
      const rootCat = p.category.split(' > ')[0] || 'Genel';
      categoriesSet.add(p.category);
    }
  });
  state.categories = Array.from(categoriesSet).sort();

  // Populate Filter Dropdown
  const filterSelect = document.getElementById('category-filter');
  
  // Clear previous options except "all"
  filterSelect.innerHTML = '<option value="all">Tüm Kategoriler</option>';
  
  state.categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    filterSelect.appendChild(opt);
  });
}

function renderPrefixCounters() {
  const container = document.getElementById('prefix-counters-container');
  if (!container) return;

  const counts = {};
  state.products.forEach(product => {
    if (product.code) {
      const match = product.code.match(/^[A-Za-z]+/);
      if (match) {
        const prefix = match[0].toUpperCase();
        counts[prefix] = (counts[prefix] || 0) + 1;
      } else {
        counts['DİĞER'] = (counts['DİĞER'] || 0) + 1;
      }
    }
  });

  const sortedPrefixes = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  container.innerHTML = '';
  sortedPrefixes.forEach(prefix => {
    const badge = document.createElement('span');
    badge.className = 'prefix-badge';
    badge.innerHTML = `${prefix}: <strong>${counts[prefix]}</strong>`;
    container.appendChild(badge);
  });
}

// ==========================================
// 3. FRONTEND PRICING CALCULATOR ENGINE
// ==========================================
function calculateProductTotal(product) {
  let total = 0;
  const userPricing = product.userPricing || { checkedOptions: {}, customPrices: {} };

  PRICING_OPTIONS.forEach(opt => {
    let isChecked;
    // Backward compatibility: if paketleme is undefined, use existing kargo flag
    if (opt.id === 'paketleme' && userPricing.checkedOptions['paketleme'] === undefined && userPricing.checkedOptions['kargo'] !== undefined) {
      isChecked = userPricing.checkedOptions['kargo'] !== false;
    } else if (userPricing.checkedOptions[opt.id] !== undefined) {
      isChecked = !!userPricing.checkedOptions[opt.id];
    } else {
      isChecked = opt.defaultOff ? false : true;
    }
    if (isChecked) {
      let price = state.config[opt.id] || 0;
      // Check if custom price override is specified
      if (opt.hasCustomInput) {
        const customVal = parseFloat(userPricing.customPrices[opt.id]);
        if (!isNaN(customVal) && customVal > 0) {
          price = customVal;
        }
      }
      total += price;
    }
  });

  return total;
}

function calculateProductGrandTotal(product) {
  const detailed = calculateDetailedPricing(product);
  return detailed.roundedGrandTotal;
}

// ==========================================
// 3.1. AKILLI YUVARLAMA VE DETAYLI FİYATLANDIRMA MOTORU
// ==========================================
function roundPrice(price, type) {
  if (!type || type === 'no') return price;
  
  if (type === 'nearest-1') {
    return Math.round(price);
  }
  
  if (type === 'nearest-5') {
    return Math.round(price / 5) * 5;
  }
  
  if (type === 'nearest-10') {
    return Math.round(price / 10) * 10;
  }
  
  if (type === 'ending-9') {
    const val = Math.round(price);
    return Math.round((val - 9) / 10) * 10 + 9;
  }
  
  if (type === 'ending-90') {
    return Math.round(price - 0.90) + 0.90;
  }
  
  if (type === 'ending-99') {
    return Math.round(price - 0.99) + 0.99;
  }
  
  return price;
}

function calculateDetailedPricing(product) {
  const cost = calculateProductTotal(product); // Seçilen modüllerin maliyeti (Üretim Maliyeti - Paketleme dahil)
  const kargo = state.config.kargo !== undefined ? parseFloat(state.config.kargo) : 120; // Kargo Bedeli (120 TL Default)
  
  const karOrani = state.config.karOrani !== undefined ? parseFloat(state.config.karOrani) : 40;
  const profit = cost * (karOrani / 100);
  const netPrice = cost + profit;

  // Ortak oranlar (Her kanalda yer alacak: KDV, Diğer Vergiler)
  const kdvOrani = state.config.kdvOrani !== undefined ? parseFloat(state.config.kdvOrani) : 20;
  const digerVergiOrani = state.config.digerVergiOrani !== undefined ? parseFloat(state.config.digerVergiOrani) : 5;

  // Ortak maliyet bazı: Üretim Maliyeti + Kargo + Net Kar
  const subtotalWithKargo = netPrice + kargo;

  const digerVergi = subtotalWithKargo * (digerVergiOrani / 100);
  const kdv = subtotalWithKargo * (kdvOrani / 100);

  // Ortak Baz Satış Fiyatı (Üretim Maliyeti + Kargo + Net Kar + Diğer Vergiler + KDV)
  const commonBasePrice = subtotalWithKargo + digerVergi + kdv;
  const yuvarlamaTipi = state.config.yuvarlamaTipi || 'no';

  // 1. WEB SİTESİ KANALI: İyzico sadece Web Sitesi satışlarında hesaplanır
  const iyzicoOrani = state.config.iyzicoOrani !== undefined ? parseFloat(state.config.iyzicoOrani) : 4.29;
  const iyzico = subtotalWithKargo * (iyzicoOrani / 100);
  const websiteRawTotal = commonBasePrice + iyzico;
  const roundedGrandTotal = roundPrice(websiteRawTotal, yuvarlamaTipi);

  // 2. TRENDYOL KANALI: İyzico yok, sadece Trendyol komisyonu yer alır
  const trendyolKomisyon = state.config.trendyolKomisyon !== undefined ? parseFloat(state.config.trendyolKomisyon) : 20.67;
  const trendyolKomisyonAmount = commonBasePrice * (trendyolKomisyon / 100);
  const trendyolRawTotal = commonBasePrice + trendyolKomisyonAmount;
  const trendyolPrice = roundPrice(trendyolRawTotal, yuvarlamaTipi);

  // 3. HEPSİBURADA KANALI: İyzico yok, sadece Hepsiburada komisyonu yer alır
  const hepsiburadaKomisyon = state.config.hepsiburadaKomisyon !== undefined ? parseFloat(state.config.hepsiburadaKomisyon) : 15;
  const hepsiburadaKomisyonAmount = commonBasePrice * (hepsiburadaKomisyon / 100);
  const hepsiburadaRawTotal = commonBasePrice + hepsiburadaKomisyonAmount;
  const hepsiburadaPrice = roundPrice(hepsiburadaRawTotal, yuvarlamaTipi);

  return {
    cost,
    kargo,
    profit,
    netPrice,
    subtotalWithKargo,
    commonBasePrice,
    kdv,
    kdvOrani,
    digerVergi,
    digerVergiOrani,
    // Web Sitesi
    iyzico,
    iyzicoOrani,
    websiteRawTotal,
    roundedGrandTotal,
    // Trendyol
    trendyolKomisyon,
    trendyolKomisyonAmount,
    trendyolPrice,
    // Hepsiburada
    hepsiburadaKomisyon,
    hepsiburadaKomisyonAmount,
    hepsiburadaPrice,
    karOrani
  };
}

// ==========================================
// 4. RENDERING PRODUCT GRID & CARDS
// ==========================================
function initFilters() {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const mismatchFilter = document.getElementById('mismatch-filter');

  searchInput.addEventListener('input', () => {
    state.filters.search = searchInput.value.toLowerCase().trim();
    renderProductGrid();
  });

  categoryFilter.addEventListener('change', () => {
    state.filters.category = categoryFilter.value;
    renderProductGrid();
  });

  mismatchFilter.addEventListener('change', () => {
    state.filters.onlyMismatch = mismatchFilter.checked;
    renderProductGrid();
  });

  const hideOutOfStockFilter = document.getElementById('hide-out-of-stock-filter');
  if (hideOutOfStockFilter) {
    hideOutOfStockFilter.addEventListener('change', () => {
      state.filters.hideOutOfStock = hideOutOfStockFilter.checked;
      renderProductGrid();
    });
  }

  const sortSelect = document.getElementById('sort-order');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.filters.sort = sortSelect.value;
      renderProductGrid();
    });
  }
}

function renderProductGrid() {
  const container = document.getElementById('product-list-container');
  if (state.products.length === 0) {
    container.innerHTML = `
      <div class="loading-state">
        <i class="fa-solid fa-cloud-arrow-down" style="font-size: 50px; color: var(--color-accent-gold)"></i>
        <p>Veritabanında henüz hiç ürün yok.</p>
        <p style="font-size:12px; color: var(--text-muted)">nezlincollection.com sitemden verileri çekmek için Veri Eşitleme sekmesini kullanın.</p>
      </div>
    `;
    return;
  }

  // Filter products
  const filtered = state.products.filter(product => {
    // 1. Search Query Match
    const matchesSearch = !state.filters.search || 
      product.title.toLowerCase().includes(state.filters.search) || 
      product.code.toLowerCase().includes(state.filters.search);

    // 2. Category Match
    const matchesCategory = state.filters.category === 'all' || product.category === state.filters.category;

    // 3. Calculated Grand Total and Normal Price Mismatch with a dynamic tolerance limit
    const grandTotal = calculateProductGrandTotal(product);
    const normalPrice = product.undiscountedPrice;
    const tolerance = state.config.toleransLimit !== undefined ? parseFloat(state.config.toleransLimit) : 10.0;
    const hasMismatch = Math.abs(grandTotal - normalPrice) >= tolerance;
    
    const matchesMismatch = !state.filters.onlyMismatch || hasMismatch;

    // 4. Stock Filter (Stokta Olmayanları Gizle)
    const isOutOfStock = product.inStock === false || (product.stock !== undefined && product.stock <= 0);
    const matchesStock = !state.filters.hideOutOfStock || !isOutOfStock;

    return matchesSearch && matchesCategory && matchesMismatch && matchesStock;
  });

  // Sort products
  filtered.sort((a, b) => {
    const sortVal = state.filters.sort || 'default';
    
    if (sortVal === 'default') {
      const pA = getCodeSortPriority(a.code);
      const pB = getCodeSortPriority(b.code);
      if (pA !== pB) return pA - pB;
      // Natural sorting alphanumerically (NC102 before NC129, NC2 before NC10)
      return a.code.localeCompare(b.code, undefined, { numeric: true, sensitivity: 'base' });
    }
    
    if (sortVal === 'name-asc') {
      return a.title.localeCompare(b.title, 'tr', { sensitivity: 'base' });
    }
    
    if (sortVal === 'name-desc') {
      return b.title.localeCompare(a.title, 'tr', { sensitivity: 'base' });
    }
    
    if (sortVal === 'price-asc') {
      const priceA = a.discountedPrice > 0 ? a.discountedPrice : a.undiscountedPrice;
      const priceB = b.discountedPrice > 0 ? b.discountedPrice : b.undiscountedPrice;
      return priceA - priceB;
    }
    
    if (sortVal === 'price-desc') {
      const priceA = a.discountedPrice > 0 ? a.discountedPrice : a.undiscountedPrice;
      const priceB = b.discountedPrice > 0 ? b.discountedPrice : b.undiscountedPrice;
      return priceB - priceA;
    }
    
    return 0;
  });

  // Display filter count
  document.getElementById('filtered-count').textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="loading-state">
        <i class="fa-solid fa-magnifying-glass-minus" style="font-size: 40px; color: var(--text-muted)"></i>
        <p>Filtrelere uygun ürün bulunamadı.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  filtered.forEach(product => {
    container.appendChild(createProductCard(product));
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('data-code', product.code);

  const pricing = calculateDetailedPricing(product);
  const normalPrice = product.undiscountedPrice;
  const tolerance = state.config.toleransLimit !== undefined ? parseFloat(state.config.toleransLimit) : 10.0;
  const isMismatch = Math.abs(pricing.roundedGrandTotal - normalPrice) >= tolerance;
  const userPricing = product.userPricing || { checkedOptions: {}, customPrices: {}, notes: '' };

  // 1. Build Top Section (2 Columns)
  const topRow = document.createElement('div');
  topRow.className = 'product-top-row';

  // Left Image Wrapper
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'product-image-wrapper';
  const img = document.createElement('img');
  img.src = product.imageUrl || 'https://via.placeholder.com/1500x1800?text=Foto%C4%9Fraf+Yok';
  img.alt = product.title;
  img.loading = 'lazy';
  imgWrapper.appendChild(img);
  topRow.appendChild(imgWrapper);

  // Right Details Wrapper
  const detailsWrapper = document.createElement('div');
  detailsWrapper.className = 'product-details-wrapper';

  const codeBadge = document.createElement('div');
  codeBadge.className = 'product-code';
  const isOutOfStock = product.inStock === false || (product.stock !== undefined && product.stock <= 0);
  codeBadge.innerHTML = `<span>KOD: ${product.code}</span>${isOutOfStock ? ' <span class="badge-out-of-stock" style="background: rgba(231,76,60,0.15); color: #e74c3c; border: 1px solid rgba(231,76,60,0.3); font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px; margin-left: 6px;"><i class="fa-solid fa-box-archive"></i> TÜKENDİ</span>' : ''}`;
  detailsWrapper.appendChild(codeBadge);

  const titleNode = document.createElement('h4');
  titleNode.className = 'product-name-title';
  titleNode.textContent = product.title;
  detailsWrapper.appendChild(titleNode);

  const catNode = document.createElement('div');
  catNode.className = 'product-category-text';
  catNode.innerHTML = `<i class="fa-solid fa-folder-open"></i> <span>${product.category || 'Genel'}</span>`;
  detailsWrapper.appendChild(catNode);

  // Prices info block
  const pricesBlock = document.createElement('div');
  pricesBlock.className = 'product-prices-block';

  // Undiscounted original price
  const originalPriceBox = document.createElement('div');
  originalPriceBox.className = 'price-item regular';
  originalPriceBox.innerHTML = `
    <span class="label">Normal Fiyat</span>
    <span class="value">${product.undiscountedPrice.toFixed(2)} ₺</span>
  `;
  pricesBlock.appendChild(originalPriceBox);

  // Discounted selling price
  const discountPriceBox = document.createElement('div');
  discountPriceBox.className = 'price-item discount';
  discountPriceBox.innerHTML = `
    <span class="label">Satış Fiyatı</span>
    <span class="value">${product.discountedPrice.toFixed(2)} ₺</span>
  `;
  pricesBlock.appendChild(discountPriceBox);

  detailsWrapper.appendChild(pricesBlock);
  topRow.appendChild(detailsWrapper);
  card.appendChild(topRow);

  // Auto-Save Notification Badge inside Card
  const saveIndicator = document.createElement('div');
  saveIndicator.className = 'save-indicator-badge';
  saveIndicator.id = `save-indicator-${product.code}`;
  saveIndicator.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i><span>Kaydediliyor...</span>';
  card.appendChild(saveIndicator);

  // 2. Build Pricing Options checklist form
  const pricingSection = document.createElement('div');
  pricingSection.className = 'product-pricing-section';
  
  const secTitle = document.createElement('h5');
  secTitle.className = 'section-title';
  secTitle.textContent = 'Fiyatlandırma Seçenekleri';
  pricingSection.appendChild(secTitle);

  const optionsTable = document.createElement('div');
  optionsTable.className = 'pricing-options-table';

  PRICING_OPTIONS.forEach(opt => {
    const row = document.createElement('div');
    let isChecked;
    if (opt.id === 'paketleme' && userPricing.checkedOptions['paketleme'] === undefined && userPricing.checkedOptions['kargo'] !== undefined) {
      isChecked = userPricing.checkedOptions['kargo'] !== false;
    } else if (userPricing.checkedOptions[opt.id] !== undefined) {
      isChecked = !!userPricing.checkedOptions[opt.id];
    } else {
      isChecked = opt.defaultOff ? false : true;
    }
    row.className = `option-row ${isChecked ? 'checked' : ''}`;

    const left = document.createElement('div');
    left.className = 'option-left-side';

    // Checkbox Label
    const label = document.createElement('label');
    label.className = 'checkbox-container';
    label.textContent = opt.label;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;
    checkbox.setAttribute('data-option-id', opt.id);
    
    // Checkbox event listener
    checkbox.addEventListener('change', () => {
      const oldPricing = JSON.parse(JSON.stringify(product.userPricing));
      userPricing.checkedOptions[opt.id] = checkbox.checked;
      row.classList.toggle('checked', checkbox.checked);
      
      const newPricing = JSON.parse(JSON.stringify(product.userPricing));
      historyManager.pushState(product.code, oldPricing, newPricing);
      
      recalculateCardTotalAndSave(product, card);
    });

    const checkmark = document.createElement('span');
    checkmark.className = 'checkmark';
    
    label.appendChild(checkbox);
    label.appendChild(checkmark);
    left.appendChild(label);

    // Custom price numeric input if option requires it
    if (opt.hasCustomInput) {
      const customInput = document.createElement('input');
      customInput.type = 'number';
      customInput.className = 'custom-price-input';
      customInput.placeholder = `${state.config[opt.id]} ₺`;
      customInput.value = userPricing.customPrices[opt.id] || '';
      customInput.setAttribute('data-option-id', opt.id);
      
      let oldPricing = null;
      customInput.addEventListener('focus', () => {
        oldPricing = JSON.parse(JSON.stringify(product.userPricing));
      });
      
      // Input event listener
      customInput.addEventListener('input', () => {
        const val = parseFloat(customInput.value);
        if (!isNaN(val) && val >= 0) {
          userPricing.customPrices[opt.id] = val;
        } else {
          delete userPricing.customPrices[opt.id];
        }
        recalculateCardTotalAndSave(product, card, true); // Debounced save
      });

      customInput.addEventListener('blur', () => {
        const currentVal = customInput.value;
        if (oldPricing) {
          const oldVal = oldPricing.customPrices[opt.id] !== undefined ? String(oldPricing.customPrices[opt.id]) : '';
          if (currentVal !== oldVal) {
            const newPricing = JSON.parse(JSON.stringify(product.userPricing));
            historyManager.pushState(product.code, oldPricing, newPricing);
          }
        }
      });

      left.appendChild(customInput);
    }

    row.appendChild(left);

    // Right Price value display
    const right = document.createElement('div');
    right.className = 'option-price-right';
    let optPrice = state.config[opt.id] || 0;
    if (opt.hasCustomInput && userPricing.customPrices[opt.id] !== undefined) {
      optPrice = userPricing.customPrices[opt.id];
    }
    right.textContent = isChecked ? `+ ${optPrice.toFixed(2)} ₺` : '—';
    right.id = `price-val-${product.code}-${opt.id}`;
    
    row.appendChild(right);
    optionsTable.appendChild(row);
  });

  // Calculate & add Total Pricing Display Row with breakdown (Üretim Maliyeti, Kar Marjı, KDV and Web Sitesi Fiyatı)
  const totalRow = document.createElement('div');
  totalRow.className = 'pricing-total-block';
  totalRow.style.flexDirection = 'column';
  totalRow.style.alignItems = 'stretch';
  totalRow.style.gap = '6px';
  
  const karOrani = pricing.karOrani || 0;
  const showProfitRow = karOrani > 0;
  
  totalRow.innerHTML = `
    <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
      <span>Üretim Maliyeti</span>
      <span id="cost-total-${product.code}">${pricing.cost.toFixed(2)} ₺</span>
    </div>
    <div id="kargo-row-${product.code}" style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
      <span>Kargo Bedeli</span>
      <span id="kargo-total-${product.code}">+ ${pricing.kargo.toFixed(2)} ₺</span>
    </div>
    <div id="profit-row-${product.code}" style="display: ${showProfitRow ? 'flex' : 'none'}; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
      <span>Net Kar (%${karOrani})</span>
      <span id="profit-total-${product.code}">+ ${pricing.profit.toFixed(2)} ₺</span>
    </div>
    <div id="diger-vergi-row-${product.code}" style="display: ${pricing.digerVergiOrani > 0 ? 'flex' : 'none'}; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
      <span>Diğer Vergi Kesintileri (%${pricing.digerVergiOrani})</span>
      <span id="diger-vergi-total-${product.code}">+ ${pricing.digerVergi.toFixed(2)} ₺</span>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); padding-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.05);">
      <span id="kdv-label-${product.code}">+ %${pricing.kdvOrani} KDV</span>
      <span id="kdv-total-${product.code}">+ ${pricing.kdv.toFixed(2)} ₺</span>
    </div>

    <!-- KANAL 1: WEB SİTESİ SATIŞI (Özel İyzico Oranıyla Beraber Kendi Div'inde) -->
    <div id="market-channel-website-${product.code}" style="margin-top: 6px; padding: 6px 8px; border-radius: var(--radius-small); background: rgba(199,163,108,0.04); border: 1px solid rgba(199,163,108,0.12);">
      <div id="iyzico-row-${product.code}" style="display: ${pricing.iyzicoOrani > 0 ? 'flex' : 'none'}; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">
        <span>iyzico Komisyonu (%${pricing.iyzicoOrani})</span>
        <span id="iyzico-total-${product.code}">+ ${pricing.iyzico.toFixed(2)} ₺</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="label" style="font-size: 12px; font-weight: 700; color: var(--color-accent-gold); margin-right: 4px;">WEB SİTESİ FİYATI</span>
          <div style="display: flex; align-items: center; gap: 6px;">
            <button type="button" id="mismatch-btn-${product.code}" class="card-action-btn btn-warning-price" title="Fiyat Uyuşmuyor! Analiz İçin Tıklayın" style="display: ${isMismatch ? 'inline-flex' : 'none'};" onclick="openMismatchPopover('${product.code}')">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </button>
            <button type="button" id="copy-btn-${product.code}" class="card-action-btn" title="Web Sitesi Fiyatını Panoya Kopyala" onclick="copyToClipboard('${pricing.roundedGrandTotal.toFixed(2)}', '${product.code} (Web)')">
              <i class="fa-regular fa-copy"></i>
            </button>
            <a href="https://nezlincollection.com/Admin/UrunYonetimi.aspx?lang=tr&adminlang=tr" target="_blank" class="card-action-btn" title="Ticimax Hızlı Fiyat Düzenleme Sayfasını Aç" onclick="event.stopPropagation();">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
        <span class="value" id="grand-total-${product.code}" style="font-size: 18px; font-weight: 800; color: var(--color-accent-gold); text-shadow: 0 0 10px rgba(199,163,108,0.2);">${pricing.roundedGrandTotal.toFixed(2)} ₺</span>
      </div>
    </div>

    <!-- KANAL 2: TRENDYOL SATIŞI (Kendi Komisyon Oranıyla Beraber Kendi Div'inde) -->
    <div id="market-channel-trendyol-${product.code}" style="margin-top: 6px; padding: 6px 8px; border-radius: var(--radius-small); background: rgba(255,90,0,0.04); border: 1px solid rgba(255,90,0,0.15);">
      <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">
        <span id="trendyol-rate-label-${product.code}">Trendyol Komisyonu (%${pricing.trendyolKomisyon})</span>
        <span id="trendyol-fee-${product.code}">+ ${pricing.trendyolKomisyonAmount.toFixed(2)} ₺</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="label" id="trendyol-label-${product.code}" style="font-size: 12px; font-weight: 700; color: #ff5a00; margin-right: 4px;">TRENDYOL FİYATI</span>
          <div style="display: flex; align-items: center; gap: 6px;">
            <button type="button" id="copy-trendyol-btn-${product.code}" class="card-action-btn" title="Trendyol Fiyatını Panoya Kopyala" onclick="copyToClipboard('${pricing.trendyolPrice.toFixed(2)}', '${product.code} (Trendyol)')">
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>
        </div>
        <span class="value" id="trendyol-total-${product.code}" style="font-size: 18px; font-weight: 800; color: #ff5a00; text-shadow: 0 0 10px rgba(255,90,0,0.2);">${pricing.trendyolPrice.toFixed(2)} ₺</span>
      </div>
    </div>

    <!-- KANAL 3: HEPSİBURADA SATIŞI (Kendi Komisyon Oranıyla Beraber Kendi Div'inde) -->
    <div id="market-channel-hepsiburada-${product.code}" style="margin-top: 6px; padding: 6px 8px; border-radius: var(--radius-small); background: rgba(255,102,0,0.04); border: 1px solid rgba(255,102,0,0.15);">
      <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">
        <span id="hepsiburada-rate-label-${product.code}">Hepsiburada Komisyonu (%${pricing.hepsiburadaKomisyon})</span>
        <span id="hepsiburada-fee-${product.code}">+ ${pricing.hepsiburadaKomisyonAmount.toFixed(2)} ₺</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="label" id="hepsiburada-label-${product.code}" style="font-size: 12px; font-weight: 700; color: #ff6600; margin-right: 4px;">HEPSİBURADA FİYATI</span>
          <div style="display: flex; align-items: center; gap: 6px;">
            <button type="button" id="copy-hepsiburada-btn-${product.code}" class="card-action-btn" title="Hepsiburada Fiyatını Panoya Kopyala" onclick="copyToClipboard('${pricing.hepsiburadaPrice.toFixed(2)}', '${product.code} (Hepsiburada)')">
              <i class="fa-regular fa-copy"></i>
            </button>
          </div>
        </div>
        <span class="value" id="hepsiburada-total-${product.code}" style="font-size: 18px; font-weight: 800; color: #ff6600; text-shadow: 0 0 10px rgba(255,102,0,0.2);">${pricing.hepsiburadaPrice.toFixed(2)} ₺</span>
      </div>
    </div>
  `;
  optionsTable.appendChild(totalRow);
  pricingSection.appendChild(optionsTable);
  card.appendChild(pricingSection);

  // 3. Create Price Mismatch Analysis Popover Overlay (Hidden by default)
  const popover = document.createElement('div');
  popover.className = 'mismatch-popover';
  popover.id = `mismatch-popover-${product.code}`;
  popover.style.display = 'none';
  card.appendChild(popover);

  // 4. Notes Custom Text Area
  const notesSection = document.createElement('div');
  notesSection.className = 'notes-textarea-section';
  notesSection.innerHTML = `<label for="notes-${product.code}"><i class="fa-regular fa-comment-dots"></i> Yapım Aşamaları</label>`;
  
  const textarea = document.createElement('textarea');
  textarea.id = `notes-${product.code}`;
  textarea.placeholder = 'Ürünün yapım aşamalarını ve detaylarını girin...';
  textarea.value = userPricing.notes || '';
  
  let oldPricingNotes = null;
  textarea.addEventListener('focus', () => {
    oldPricingNotes = JSON.parse(JSON.stringify(product.userPricing));
  });
  
  // Textarea event listener
  textarea.addEventListener('input', () => {
    userPricing.notes = textarea.value;
    recalculateCardTotalAndSave(product, card, true); // Debounced save
  });

  textarea.addEventListener('blur', () => {
    const currentVal = textarea.value;
    if (oldPricingNotes) {
      const oldVal = oldPricingNotes.notes || '';
      if (currentVal !== oldVal) {
        const newPricing = JSON.parse(JSON.stringify(product.userPricing));
        historyManager.pushState(product.code, oldPricingNotes, newPricing);
      }
    }
  });

  notesSection.appendChild(textarea);
  card.appendChild(notesSection);

  return card;
}

// ==========================================
// 5. REACTIVE WORKSPACE UTILITIES
// ==========================================
function recalculateCardTotalAndSave(product, cardNode, debounced = false) {
  recalculateCardTotalAndSaveDisplay(product, cardNode);
  triggerProductAutoSave(product, debounced);
}

function triggerProductAutoSave(product, debounced) {
  const code = product.code;
  const badge = document.getElementById(`save-indicator-${code}`);

  // Show "Saving..." indicator
  if (badge) {
    badge.className = 'save-indicator-badge saving';
    badge.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i><span>Kaydediliyor...</span>';
  }

  const saveAction = async () => {
    try {
      const res = await fetch(`/api/products/${code}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product.userPricing)
      });
      if (res.ok) {
        // Success save animation state
        if (badge) {
          badge.className = 'save-indicator-badge saved';
          badge.innerHTML = '<i class="fa-solid fa-circle-check"></i><span>Kaydedildi ✔️</span>';
          setTimeout(() => {
            if (badge.className.includes('saved')) badge.style.opacity = '0';
          }, 2000);
        }
        
        // Refresh audit logs
        loadAuditTrail().catch(e => console.error(e));
      } else {
        throw new Error('Save API returned error status.');
      }
    } catch (err) {
      console.error(`Failed to auto-save product ${code}:`, err);
      if (badge) {
        badge.className = 'save-indicator-badge';
        badge.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color: var(--color-danger)"></i><span style="color: var(--color-danger)">Hata</span>';
      }
    }
  };

  // Debouncing for input triggers (custom value, description note) to prevent keypress overload
  if (debounced) {
    if (state.saveDebouncers[code]) clearTimeout(state.saveDebouncers[code]);
    state.saveDebouncers[code] = setTimeout(saveAction, 600);
  } else {
    // Immediate save (checkbox click)
    saveAction();
  }
}

// ==========================================
// 6. DEFAULT SOT PRICE SETTINGS PANEL
// ==========================================
function renderSoTSettingsForm() {
  const form = document.getElementById('sot-form');
  form.innerHTML = '';

  const labelMapping = {
    paketleme: 'Paketleme Malzemeleri (Default)',
    kargo: 'Kargo Gönderim Bedeli (Default)',
    tips: 'Tips Şekillendirme',
    base: 'Base Coat',
    top: 'Top Coat',
    kalici1: 'Kalıcı Oje Seviye 1',
    kalici2: 'Kalıcı Oje Seviye 2',
    kalici3: 'Kalıcı Oje Seviye 3',
    nailart: 'Nail Art (Default)',
    ombre: 'Ombre',
    french: 'French Çizimi',
    charm: 'Charm Takısı (Default)',
    sticker: 'Sticker (Default)',
    baski: 'Baskı (Default)',
    trendyolKomisyon: 'Trendyol Komisyon Oranı',
    hepsiburadaKomisyon: 'Hepsiburada Komisyon Oranı',
    kdvOrani: 'KDV Oranı',
    iyzicoOrani: 'iyzico Komisyon Oranı (Sadece Web)',
    digerVergiOrani: 'Diğer Vergi Kesintileri',
    karOrani: 'Hedeflenen Net Kar Oranı',
    toleransLimit: 'Uyuşmazlık Tolerans Limiti',
    yuvarlamaTipi: 'Küsurat Yuvarlama Seçeneği'
  };

  // Create Sub-Sections
  const compSection = document.createElement('div');
  compSection.className = 'sot-section-wrapper';
  compSection.innerHTML = '<h4 class="sot-section-title"><i class="fa-solid fa-layer-group"></i> Bileşen Taban Fiyatları</h4>';
  
  const compGrid = document.createElement('div');
  compGrid.className = 'sot-section-grid';
  compSection.appendChild(compGrid);

  const taxSection = document.createElement('div');
  taxSection.className = 'sot-section-wrapper settings-section-divider';
  taxSection.innerHTML = '<h4 class="sot-section-title"><i class="fa-solid fa-percent"></i> Komisyon & Vergi Kesintileri</h4>';
  
  const taxGrid = document.createElement('div');
  taxGrid.className = 'sot-section-grid';
  taxSection.appendChild(taxGrid);

  const smartSection = document.createElement('div');
  smartSection.className = 'sot-section-wrapper settings-section-divider';
  smartSection.innerHTML = '<h4 class="sot-section-title"><i class="fa-solid fa-brain"></i> Akıllı Fiyatlandırma Parametreleri (Zekâ Modülleri)</h4>';
  
  const smartGrid = document.createElement('div');
  smartGrid.className = 'sot-section-grid';
  smartSection.appendChild(smartGrid);

  const taxKeys = ['trendyolKomisyon', 'hepsiburadaKomisyon', 'kdvOrani', 'iyzicoOrani', 'digerVergiOrani'];
  const smartKeys = ['karOrani', 'toleransLimit', 'yuvarlamaTipi'];

  Object.entries(state.config).forEach(([key, val]) => {
    let targetGrid = compGrid;
    if (taxKeys.includes(key)) targetGrid = taxGrid;
    else if (smartKeys.includes(key)) targetGrid = smartGrid;

    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = `sot-input-${key}`;
    label.textContent = labelMapping[key] || key.toUpperCase();
    group.appendChild(label);

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'form-input-wrapper';

    if (key === 'yuvarlamaTipi') {
      const input = document.createElement('select');
      input.id = `sot-input-${key}`;
      input.name = key;
      input.className = 'sot-select-control';
      
      const roundingModes = [
        { val: 'no', txt: 'Yuvarlama Yok (Kuruşlar Kalır)' },
        { val: 'nearest-1', txt: 'En Yakın 1 ₺ (Örn: 493.20 ➔ 493.00)' },
        { val: 'nearest-5', txt: 'En Yakın 5 ₺ (Örn: 493.20 ➔ 495.00)' },
        { val: 'nearest-10', txt: 'En Yakın 10 ₺ (Örn: 493.20 ➔ 490.00)' },
        { val: 'ending-9', txt: 'En Yakın 9 ile Biten (Örn: 493.20 ➔ 489.00)' },
        { val: 'ending-90', txt: 'En Yakın .90 ile Biten (Örn: 493.20 ➔ 492.90)' },
        { val: 'ending-99', txt: 'En Yakın .99 ile Biten (Örn: 493.20 ➔ 492.99)' }
      ];

      roundingModes.forEach(mode => {
        const option = document.createElement('option');
        option.value = mode.val;
        option.textContent = mode.txt;
        if (val === mode.val) option.selected = true;
        input.appendChild(option);
      });

      inputWrapper.appendChild(input);
    } else {
      const isPercent = ['karOrani', 'kdvOrani', 'trendyolKomisyon', 'hepsiburadaKomisyon', 'iyzicoOrani', 'digerVergiOrani'].includes(key);
      const input = document.createElement('input');
      input.type = 'number';
      input.id = `sot-input-${key}`;
      input.name = key;
      input.value = val;
      input.min = '0';
      input.step = isPercent ? '0.01' : (key === 'toleransLimit' ? '1' : '1');
      input.required = true;

      const span = document.createElement('span');
      span.textContent = isPercent ? '%' : '₺';

      inputWrapper.appendChild(input);
      inputWrapper.appendChild(span);
    }

    group.appendChild(inputWrapper);
    targetGrid.appendChild(group);
  });

  form.appendChild(compSection);
  form.appendChild(taxSection);
  form.appendChild(smartSection);

  // Attach Save Action
  const saveBtn = document.getElementById('save-sot-btn');
  saveBtn.onclick = async () => {
    const formData = {};
    Object.keys(state.config).forEach(key => {
      const input = document.getElementById(`sot-input-${key}`);
      if (input) {
        if (key === 'yuvarlamaTipi') {
          formData[key] = input.value;
        } else {
          formData[key] = parseFloat(input.value) || 0;
        }
      }
    });

    const statusNode = document.getElementById('sot-save-status');
    statusNode.textContent = 'Güncelleniyor...';
    statusNode.style.color = 'var(--color-accent-gold)';

    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const result = await res.json();
        state.config = result.config;
        statusNode.textContent = 'Varsayılan fiyat listesi başarıyla güncellendi! ✔️';
        statusNode.style.color = 'var(--color-success)';
        setTimeout(() => statusNode.textContent = '', 3000);
        
        // Reload in-memory product details calculations
        await loadProducts();
        
        // Refresh audit logs
        loadAuditTrail().catch(e => console.error(e));
      } else {
        throw new Error('Save settings endpoint failed.');
      }
    } catch (e) {
      console.error(e);
      statusNode.textContent = 'Ayarlar kaydedilirken hata oluştu.';
      statusNode.style.color = 'var(--color-danger)';
    }
  };
}

// ==========================================
// 7. CRAWLER STATUS & SYNC LOGS CONTROLLER
// ==========================================
function initSyncController() {
  const headerSyncBtn = document.getElementById('quick-sync-btn');
  const bodySyncBtn = document.getElementById('trigger-sync-btn');
  const gitPushBtn = document.getElementById('direct-git-push-btn');
  
  if (headerSyncBtn) headerSyncBtn.addEventListener('click', triggerCrawlerSync);
  if (bodySyncBtn) bodySyncBtn.addEventListener('click', triggerCrawlerSync);
  if (gitPushBtn) gitPushBtn.addEventListener('click', triggerDirectGitPush);
}

async function triggerDirectGitPush() {
  const btn = document.getElementById('direct-git-push-btn');
  const logsNode = document.getElementById('sync-logs');
  if (!btn) return;

  const originalContent = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Canlıya Aktarılıyor...';
  if (logsNode) {
    logsNode.innerHTML += `\n[${new Date().toLocaleTimeString()}] Canlıya push işlemi başlatıldı (GitHub & Netlify)...\n`;
    logsNode.scrollTop = logsNode.scrollHeight;
  }

  try {
    const res = await fetch('/api/git-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `manual sync: panel update at ${new Date().toLocaleString('tr-TR')}` })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Push işlemi başarısız');
    }

    if (logsNode) {
      logsNode.innerHTML += `[${new Date().toLocaleTimeString()}] [Başarılı] Canlı siteye aktarıldı! Netlify otomatik yayına alıyor.\n`;
      logsNode.scrollTop = logsNode.scrollHeight;
    }
    showNotification('Değişiklikler canlıya (GitHub & Netlify) aktarıldı!', 'success');
  } catch (err) {
    console.error(err);
    if (logsNode) {
      logsNode.innerHTML += `[Hata] Canlıya aktarım başarısız: ${err.message}\n`;
      logsNode.scrollTop = logsNode.scrollHeight;
    }
    showNotification(`Hata: ${err.message}`, 'danger');
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalContent;
  }
}

async function triggerCrawlerSync() {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (!isLocal) {
    const modal = document.getElementById('netlify-warning-modal');
    if (modal) {
      modal.style.display = 'flex';
      return;
    }
  }
  executeCrawlerSync();
}

async function executeCrawlerSync() {
  const logsNode = document.getElementById('sync-logs');
  const btn = document.getElementById('trigger-sync-btn');
  const quickBtn = document.getElementById('quick-sync-btn');
  
  logsNode.innerHTML = `[${new Date().toLocaleTimeString()}] Sitenizden sitemap ve ürün bilgileri indiriliyor...\n`;
  btn.disabled = true;
  quickBtn.disabled = true;

  try {
    const res = await fetch('/api/fetch-data', { method: 'POST' });
    if (!res.ok) throw new Error('Crawl operation could not be started.');
    
    document.getElementById('sync-progress-container').style.display = 'block';
    
    // Start active polling
    pollCrawlerStatus();
  } catch (err) {
    console.error(err);
    logsNode.innerHTML += `[Hata] Veri çekme işlemi başlatılamadı: ${err.message}\n`;
    btn.disabled = false;
    quickBtn.disabled = false;
  }
}

// Netlify Scraper Warning Modal Actions
window.closeNetlifyWarningModal = function() {
  const modal = document.getElementById('netlify-warning-modal');
  if (modal) modal.style.display = 'none';
  showNotification('Eşitleme iptal edildi. Localhost üzerinden kotaları harcamadan eşitleyebilirsiniz.', 'success');
};

window.proceedWithNetlifyCrawl = function() {
  const modal = document.getElementById('netlify-warning-modal');
  if (modal) modal.style.display = 'none';
  executeCrawlerSync();
};

function pollCrawlerStatus() {
  const btn = document.getElementById('trigger-sync-btn');
  const quickBtn = document.getElementById('quick-sync-btn');
  const logsNode = document.getElementById('sync-logs');
  const progressText = document.getElementById('sync-progress-text');
  const progressPercent = document.getElementById('sync-progress-percentage');
  const progressFill = document.getElementById('sync-progress-fill');
  const progressSub = document.getElementById('sync-progress-subtext');

  const pollInterval = setInterval(async () => {
    try {
      const res = await fetch('/api/fetch-status');
      const status = await res.json();

      if (status.isCrawling) {
        const percentVal = status.total > 0 ? Math.round((status.current / status.total) * 100) : 0;
        
        progressText.textContent = `${status.current} / ${status.total} Ürün İndirildi`;
        progressPercent.textContent = `${percentVal}%`;
        progressFill.style.width = `${percentVal}%`;
        progressSub.textContent = `İşleniyor: ${status.currentProduct || 'Hazırlanıyor...'}`;
        
        if (status.currentProduct) {
          logsNode.innerHTML += `[Scraper] [${status.current}/${status.total}] İndirildi: ${status.currentProduct}\n`;
          logsNode.scrollTop = logsNode.scrollHeight;
        }
      } else {
        clearInterval(pollInterval);
        btn.disabled = false;
        quickBtn.disabled = false;

        if (status.error) {
          logsNode.innerHTML += `\n[Fatal Hata] İşlem yarıda kesildi: ${status.error}\n`;
          progressText.textContent = 'Eşitleme Başarısız';
          progressSub.textContent = `Hata: ${status.error}`;
          progressFill.style.background = 'var(--color-danger)';
          showNotification('Veri çekme işlemi başarısız oldu.', 'danger');
        } else if (status.currentProduct === '__UP_TO_DATE__') {
          logsNode.innerHTML += `\n[Eşleştir] Tüm ürünlerin lastmod tarihleri local veritabanı ile tam olarak uyuşuyor.\n`;
          logsNode.innerHTML += `[Başarılı] Sitede yeni veya güncellenmiş bir ürün bulunamadı! İndirme işlemi atlandı.\n`;
          logsNode.scrollTop = logsNode.scrollHeight;
          
          progressText.textContent = 'Tüm Ürünler Güncel!';
          progressPercent.textContent = '100%';
          progressFill.style.width = '100%';
          progressSub.textContent = 'Local veritabanınız siteniz ile tam uyumlu.';
          
          showNotification('Tüm veriler zaten güncel! Yeni indirme yapılmadı.', 'success');
          
          setTimeout(() => {
            document.getElementById('sync-progress-container').style.display = 'none';
          }, 3500);
        } else {
          logsNode.innerHTML += `\n[Başarılı] nezlincollection.com sitesinden tüm veriler başarıyla indirildi!\n`;
          logsNode.innerHTML += `[Sistem] Toplam ${status.total} ürün veritabanına aktarıldı. Yenileniyor...\n`;
          logsNode.scrollTop = logsNode.scrollHeight;
          
          progressText.textContent = 'Tamamlandı!';
          progressPercent.textContent = '100%';
          progressFill.style.width = '100%';
          progressSub.textContent = 'Tüm ürünler başarıyla eşitlendi.';
          
          showNotification('Sitenizden tüm ürünler başarıyla indirildi.', 'success');
          
          // Reload products in active UI session
          await loadProducts();
          
          setTimeout(() => {
            document.getElementById('sync-progress-container').style.display = 'none';
          }, 3000);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, 600);
}

// ==========================================
// 8. GLOBAL UTILITY: NOTIFICATIONS SYSTEM
// ==========================================
function showNotification(message, type = 'success') {
  const notif = document.createElement('div');
  notif.style.position = 'fixed';
  notif.style.bottom = '30px';
  notif.style.right = '30px';
  notif.style.zIndex = '1000';
  notif.style.padding = '15px 30px';
  notif.style.borderRadius = 'var(--radius-large)';
  notif.style.fontFamily = 'var(--font-primary)';
  notif.style.fontWeight = '600';
  notif.style.fontSize = '14px';
  notif.style.boxShadow = 'var(--shadow-premium)';
  notif.style.animation = 'fadeIn 0.3s ease-in-out forwards';
  notif.style.border = '1px solid';
  
  if (type === 'success') {
    notif.style.backgroundColor = 'rgba(78, 159, 61, 0.95)';
    notif.style.color = '#fff';
    notif.style.borderColor = 'rgba(255, 255, 255, 0.2)';
  } else {
    notif.style.backgroundColor = 'rgba(217, 83, 79, 0.95)';
    notif.style.color = '#fff';
    notif.style.borderColor = 'rgba(255, 255, 255, 0.2)';
  }

  document.body.appendChild(notif);
  notif.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}" style="margin-right:10px"></i> ${message}`;

  setTimeout(() => {
    notif.style.animation = 'fadeOut 0.3s ease-in-out forwards';
    setTimeout(() => notif.remove(), 300);
  }, 4000);
}

// Helper: Calculate stock code sorting prefix priority
function getCodeSortPriority(code) {
  if (!code) return 99;
  const upper = code.toUpperCase().trim();
  if (upper.startsWith('NC')) return 1;
  if (upper.startsWith('GS')) return 2;
  if (upper.startsWith('TA')) return 3;
  return 4; // Other codes
}

// 1. Müşterileri REST API'den Çek
async function loadCustomers() {
  try {
    const res = await fetch('/api/customers');
    state.customers = await res.json();
    initCrmController(); // Initialize CRM Modal Events
  } catch (err) {
    console.error('Error loading customers:', err);
    showNotification('Müşteri veritabanı yüklenemedi.', 'danger');
  }
}
// ==========================================================================
// MÜŞTERİ DETAYLARI (CRM) TABLOSU VE MODAL CRUD İŞLEMLERİ
// ==========================================================================
function renderCustomersTable() {
  const tbody = document.getElementById('main-customers-list-tbody');
  if (!tbody) return;

  if (state.customers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="table-empty">Henüz hiç kayıtlı müşteri yok. Sağ üstten "Yeni Müşteri Ekle" butonuna basarak ekleyebilirsiniz.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = '';
  state.customers.forEach(c => {
    const tr = document.createElement('tr');

    const sizesHtml = `
      <div class="finger-sizes-grid">
        <div class="finger-badge" title="Baş Parmak"><span class="finger-name">BAŞ</span><span class="finger-val">${c.sizes?.thumb || 10}</span></div>
        <div class="finger-badge" title="İşaret Parmağı"><span class="finger-name">İŞAR</span><span class="finger-val">${c.sizes?.index || 10}</span></div>
        <div class="finger-badge" title="Orta Parmak"><span class="finger-name">ORTA</span><span class="finger-val">${c.sizes?.middle || 10}</span></div>
        <div class="finger-badge" title="Yüzük Parmağı"><span class="finger-name">YÜZ</span><span class="finger-val">${c.sizes?.ring || 10}</span></div>
        <div class="finger-badge" title="Serçe Parmağı"><span class="finger-name">SERÇ</span><span class="finger-val">${c.sizes?.pinky || 10}</span></div>
      </div>
    `;

    const ordersHtml = c.previousOrders && c.previousOrders.length > 0
      ? `<div class="order-chips-wrapper">${c.previousOrders.map(code => `<span class="order-chip">${code}</span>`).join('')}</div>`
      : '<span class="text-muted">—</span>';

    tr.innerHTML = `
      <td style="font-weight: 700; color: var(--text-main);">${c.name}</td>
      <td>
        ${c.instagram ? `
          <a href="https://instagram.com/${c.instagram}" target="_blank" class="insta-link">
            <i class="fa-brands fa-instagram"></i> @${c.instagram}
          </a>
        ` : '<span class="text-muted">—</span>'}
      </td>
      <td>${c.phone ? `<span class="phone-badge">${c.phone}</span>` : '<span class="text-muted">—</span>'}</td>
      <td>${sizesHtml}</td>
      <td>${ordersHtml}</td>
      <td style="color: var(--text-muted); font-size: 12px; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${c.address || ''}">${c.address || '<span class="text-muted">—</span>'}</td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary" style="padding: 6px 12px; font-size: 11px; border-color:var(--border-gold);" onclick="openEditCustomerModal('${c.id}')">
            <i class="fa-solid fa-pen-to-square"></i> Düzenle
          </button>
          <button class="btn" style="padding: 6px 12px; font-size: 11px; background: rgba(217, 83, 79, 0.8); border:1px solid rgba(255,255,255,0.05); color: white;" onclick="deleteCustomerRecord('${c.id}')">
            <i class="fa-solid fa-trash-can"></i> Sil
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Helper: Anonymize customer name (Privacy Masking)
function maskName(fullName) {
  if (!fullName) return '';
  return fullName.split(/\s+/).map(word => {
    if (word.length > 2) {
      return word.slice(0, 2) + '*'.repeat(word.length - 2);
    } else if (word.length > 0) {
      return word.slice(0, 1) + '*'.repeat(word.length - 1);
    }
    return '';
  }).join(' ');
}

// 7. CRM Olayları ve Modal Tetikleyicileri
function initCrmController() {
  const addBtn = document.getElementById('add-customer-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const cancelBtn = document.getElementById('cancel-modal-btn');
  const modal = document.getElementById('customer-modal');
  const form = document.getElementById('customer-form');

  if (addBtn) {
    addBtn.onclick = () => {
      document.getElementById('modal-title').textContent = 'Yeni Müşteri Ekle';
      document.getElementById('customer-id-input').value = '';
      form.reset();
      // Set sizes default to 10 mm
      document.getElementById('size-thumb').value = 10;
      document.getElementById('size-index').value = 10;
      document.getElementById('size-middle').value = 10;
      document.getElementById('size-ring').value = 10;
      document.getElementById('size-pinky').value = 10;
      modal.style.display = 'flex';
    };
  }

  const closeModal = () => { modal.style.display = 'none'; };
  if (closeBtn) closeBtn.onclick = closeModal;
  if (cancelBtn) cancelBtn.onclick = closeModal;

  // Submit Modal Form (Ekle / Güncelle)
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();

      const id = document.getElementById('customer-id-input').value;
      const rawName = document.getElementById('c-name').value.trim();
      const name = maskName(rawName);
      const cityCode = ''; // No city requested
      const instagram = document.getElementById('c-instagram').value.replace('@', '').trim();
      const phone = document.getElementById('c-phone').value.trim();
      const ordersRaw = document.getElementById('c-orders').value;
      const address = document.getElementById('c-address').value.trim();

      const previousOrders = ordersRaw
        ? ordersRaw.split(',').map(o => o.trim().toUpperCase()).filter(o => o.length > 0)
        : [];

      const sizes = {
        thumb: parseInt(document.getElementById('size-thumb').value) || 10,
        index: parseInt(document.getElementById('size-index').value) || 10,
        middle: parseInt(document.getElementById('size-middle').value) || 10,
        ring: parseInt(document.getElementById('size-ring').value) || 10,
        pinky: parseInt(document.getElementById('size-pinky').value) || 10
      };

      const customerData = {
        name,
        cityCode,
        instagram,
        phone,
        previousOrders,
        address,
        sizes
      };

      if (id) {
        customerData.id = id;
      }

      try {
        const res = await fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customerData)
        });
        if (res.ok) {
          showNotification(id ? 'Müşteri başarıyla güncellendi!' : 'Müşteri başarıyla eklendi!', 'success');
          modal.style.display = 'none';
          await loadCustomers();
          renderCustomersTable();
        } else {
          throw new Error('Save customer API failed.');
        }
      } catch (err) {
        console.error(err);
        showNotification('Müşteri kaydedilirken bir hata oluştu.', 'danger');
      }
    };
  }
}

// 8. Global Editör Penceresi Açıcı (onclick için)
window.openEditCustomerModal = function(id) {
  const c = state.customers.find(item => item.id === id);
  if (!c) return;

  document.getElementById('modal-title').textContent = 'Müşteri Düzenle';
  document.getElementById('customer-id-input').value = c.id;
  
  document.getElementById('c-name').value = c.name;
  document.getElementById('c-instagram').value = c.instagram || '';
  document.getElementById('c-phone').value = c.phone || '';
  document.getElementById('c-orders').value = c.previousOrders ? c.previousOrders.join(', ') : '';
  document.getElementById('c-address').value = c.address || '';

  // Finger sizes load
  document.getElementById('size-thumb').value = c.sizes?.thumb || 10;
  document.getElementById('size-index').value = c.sizes?.index || 10;
  document.getElementById('size-middle').value = c.sizes?.middle || 10;
  document.getElementById('size-ring').value = c.sizes?.ring || 10;
  document.getElementById('size-pinky').value = c.sizes?.pinky || 10;

  document.getElementById('customer-modal').style.display = 'flex';
};

// 9. Global Müşteri Silici (onclick için)
window.deleteCustomerRecord = async function(id) {
  const c = state.customers.find(item => item.id === id);
  if (!c) return;

  if (!confirm(`${c.name} isimli müşteriyi silmek istediğinize emin misiniz?`)) return;

  try {
    const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showNotification('Müşteri başarıyla silindi.', 'success');
      await loadCustomers();
      renderCustomersTable();
    } else {
      throw new Error('Delete API failed');
    }
  } catch (err) {
    console.error(err);
    showNotification('Müşteri silinirken hata oluştu.', 'danger');
  }
};

// ==========================================
// 10. PRESET NEW MODULE INTEGRATIONS (ADDITIONS)
// ==========================================

// A. Copy prices to clipboard safely
window.copyToClipboard = function(text, code) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification(`${code} için yeni fiyat (${text} ₺) panoya kopyalandı!`, 'success');
  }).catch(err => {
    console.error('Failed to copy: ', err);
    showNotification('Kopyalama başarısız oldu.', 'danger');
  });
};

// A.1 Open pricing mismatch analysis popover
window.openMismatchPopover = function(code) {
  const product = state.products.find(p => p.code === code);
  if (!product) return;
  const pricing = calculateDetailedPricing(product);
  const normalPrice = product.undiscountedPrice;
  const diff = pricing.roundedGrandTotal - normalPrice;
  const diffPercent = normalPrice > 0 ? (diff / normalPrice) * 100 : 0;
  
  const popover = document.getElementById(`mismatch-popover-${code}`);
  if (popover) {
    popover.innerHTML = `
      <div class="mismatch-popover-content">
        <h5>Fiyat Uyuşmazlık Analizi</h5>
        <div class="popover-row">
          <span>Sitedeki Normal Fiyat:</span>
          <strong>${normalPrice.toFixed(2)} ₺</strong>
        </div>
        <div class="popover-row">
          <span>Web Sitesi Fiyatı:</span>
          <strong>${pricing.roundedGrandTotal.toFixed(2)} ₺</strong>
        </div>
        <div class="popover-divider"></div>
        <div class="popover-row difference">
          <span>Fiyat Farkı:</span>
          <strong class="${diff >= 0 ? 'positive' : 'negative'}">
            ${diff >= 0 ? '+' : ''}${diff.toFixed(2)} ₺ (${diff >= 0 ? '+' : ''}${diffPercent.toFixed(1)}%)
          </strong>
        </div>
        <button type="button" class="btn-close-popover" onclick="document.getElementById('mismatch-popover-${code}').style.display = 'none';">
          <i class="fa-solid fa-xmark"></i> Kapat
        </button>
      </div>
    `;
    popover.style.display = 'flex';
  }
};

// B. Excel/CSV Formatında Dışa Aktarma
window.exportProductsToCSV = function() {
  const bom = "\uFEFF";
  let csvContent = bom + "Ürün Kodu;Ürün Adı;Kategori;Normal Fiyat (Site);Satış Fiyatı (Site);Üretim Maliyeti;Kargo;Net Kar;iyzico;Diğer Vergiler;KDV;Web Sitesi Fiyatı;Trendyol Fiyatı;Hepsiburada Fiyatı;Fiyat Farkı;Yapım Aşamaları\n";
  
  state.products.forEach(product => {
    const pricing = calculateDetailedPricing(product);
    const normalPrice = product.undiscountedPrice;
    const diff = pricing.roundedGrandTotal - normalPrice;
    const userPricing = product.userPricing || { notes: '' };
    const notesClean = (userPricing.notes || '').replace(/[\n\r;]/g, ' ');
    
    csvContent += `"${product.code}";"${product.title.replace(/"/g, '""')}";"${(product.category || 'Genel').replace(/"/g, '""')}";${product.undiscountedPrice};${product.discountedPrice};${pricing.cost};${pricing.kargo};${pricing.profit};${pricing.iyzico.toFixed(2)};${pricing.digerVergi.toFixed(2)};${pricing.kdv};${pricing.roundedGrandTotal};${pricing.trendyolPrice.toFixed(2)};${pricing.hepsiburadaPrice.toFixed(2)};${diff};"${notesClean}"\n`;
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `nfs_urun_raporu_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showNotification('CSV Raporu başarıyla indirildi!', 'success');
};

// C. Yedekten Geri Yükleme (JSON Restore)
window.handleRestoreBackup = async function(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const statusNode = document.getElementById('restore-status');
  statusNode.textContent = 'Yükleniyor...';
  statusNode.style.color = 'var(--color-accent-gold)';
  
  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const backupData = JSON.parse(e.target.result);
        const res = await fetch('/api/restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backupData)
        });
        
        if (res.ok) {
          statusNode.textContent = 'Yedekleme başarıyla yüklendi! ✔️';
          statusNode.style.color = 'var(--color-success)';
          showNotification('Yedekleme başarıyla geri yüklendi.', 'success');
          
          // Reload settings and products
          await initializeApp();
          setTimeout(() => statusNode.textContent = '', 3000);
        } else {
          const errData = await res.json();
          throw new Error(errData.error || 'Restore API returned error.');
        }
      } catch (err) {
        console.error('Failed to restore backup:', err);
        statusNode.textContent = 'Hata: Dosya formatı geçersiz.';
        statusNode.style.color = 'var(--color-danger)';
        showNotification('Geri yükleme başarısız oldu.', 'danger');
      }
    };
    reader.readAsText(file);
  } catch (err) {
    console.error('File read error:', err);
    statusNode.textContent = 'Dosya okuma hatası.';
    statusNode.style.color = 'var(--color-danger)';
  } finally {
    event.target.value = '';
  }
};

// D. Tümünü Seç / Tümünü Bırak (Toggle Visible checkboxes)
window.toggleSelectAllVisible = function() {
  const container = document.getElementById('product-list-container');
  const visibleCheckboxes = container.querySelectorAll('.bulk-select-checkbox');
  
  if (visibleCheckboxes.length === 0) return;
  
  const allChecked = Array.from(visibleCheckboxes).every(cb => cb.checked);
  
  visibleCheckboxes.forEach(cb => {
    cb.checked = !allChecked;
  });
  
  window.updateBulkActionsBarState();
};

// E. Update Bulk Actions bottom sticky bar status
window.updateBulkActionsBarState = function() {
  const bar = document.getElementById('bulk-actions-bar');
  const countSpan = document.getElementById('bulk-selected-count');
  
  const checkedCheckboxes = document.querySelectorAll('.bulk-select-checkbox:checked');
  const count = checkedCheckboxes.length;
  
  if (countSpan) countSpan.textContent = count;
  if (bar) {
    bar.style.display = count > 0 ? 'flex' : 'none';
  }
};

// F. Clear current active bulk selections
window.clearBulkSelection = function() {
  document.querySelectorAll('.bulk-select-checkbox').forEach(cb => cb.checked = false);
  window.updateBulkActionsBarState();
};

// G. Handle Bulk Action select list updates
window.handleBulkOptionChange = function() {
  const optionId = document.getElementById('bulk-option-id').value;
  const customValInput = document.getElementById('bulk-action-custom-value');
  
  const optionsWithCustom = ['nailart', 'ombre', 'french', 'charm', 'sticker'];
  if (customValInput) {
    customValInput.style.display = optionsWithCustom.includes(optionId) ? 'block' : 'none';
  }
};

// H. Apply Bulk Pricing values to checked products
window.applyBulkPricingActions = async function() {
  const optionId = document.getElementById('bulk-option-id').value;
  const actionType = document.getElementById('bulk-action-toggle').value;
  const customValInput = document.getElementById('bulk-action-custom-value');
  
  if (!optionId) {
    showNotification('Lütfen toplu işlem için bir seçenek seçin.', 'danger');
    return;
  }
  
  const checkedCheckboxes = document.querySelectorAll('.bulk-select-checkbox:checked');
  const selectedCodes = Array.from(checkedCheckboxes).map(cb => cb.getAttribute('data-bulk-code'));
  
  if (selectedCodes.length === 0) {
    showNotification('Lütfen işlem uygulanacak ürünleri seçin.', 'danger');
    return;
  }
  
  let customPrice = undefined;
  const optionsWithCustom = ['nailart', 'ombre', 'french', 'charm', 'sticker'];
  if (optionsWithCustom.includes(optionId) && actionType === 'enable') {
    const val = parseFloat(customValInput.value);
    if (isNaN(val) || val < 0) {
      showNotification('Lütfen geçerli bir özel fiyat girin.', 'danger');
      return;
    }
    customPrice = val;
  }
  
  let updatedCount = 0;
  for (const code of selectedCodes) {
    const product = state.products.find(p => p.code === code);
    if (!product) continue;
    
    const oldPricing = JSON.parse(JSON.stringify(product.userPricing || { checkedOptions: {}, customPrices: {}, notes: '' }));
    
    if (!product.userPricing) {
      product.userPricing = { checkedOptions: {}, customPrices: {}, notes: '' };
    }
    
    if (actionType === 'enable') {
      product.userPricing.checkedOptions[optionId] = true;
      if (customPrice !== undefined) {
        product.userPricing.customPrices[optionId] = customPrice;
      }
    } else {
      product.userPricing.checkedOptions[optionId] = false;
      if (optionsWithCustom.includes(optionId)) {
        delete product.userPricing.customPrices[optionId];
      }
    }
    
    const newPricing = JSON.parse(JSON.stringify(product.userPricing));
    historyManager.pushState(product.code, oldPricing, newPricing);
    
    const card = document.querySelector(`.product-card[data-code="${code}"]`);
    if (card) {
      updateProductCardUI(product);
    }
    
    triggerProductAutoSave(product, false);
    updatedCount++;
  }
  
  showNotification(`${updatedCount} adet ürüne toplu fiyatlandırma uygulandı!`, 'success');
  
  // Clean inputs and reset bar
  window.clearBulkSelection();
  document.getElementById('bulk-option-id').value = '';
  document.getElementById('bulk-action-custom-value').value = '';
  window.handleBulkOptionChange();
};

// ==========================================================================
// 11. AUDIT TRAIL LOG VIEWER CONTROLLER (SUGGESTION 29)
// ==========================================================================
window.loadAuditTrail = async function() {
  const tbody = document.getElementById('audit-logs-tbody');
  const countSpan = document.getElementById('audit-log-count');
  if (!tbody) return;
  
  try {
    const res = await fetch('/api/audit-trail');
    if (!res.ok) throw new Error('Audit trail API fetch failed.');
    const logs = await res.json();
    
    if (countSpan) countSpan.textContent = logs.length;
    
    if (logs.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="table-empty">Henüz kaydedilmiş bir fiyat değişikliği bulunmuyor.</td>
        </tr>
      `;
      return;
    }
    
    const keyMap = {
      paketleme: 'Paketleme Malzemeleri',
      kargo: 'Kargo Gönderim Bedeli',
      tips: 'Tips Şekillendirme',
      base: 'Base Coat',
      top: 'Top Coat',
      kalici1: 'Kalıcı Oje Seviye 1',
      kalici2: 'Kalıcı Oje Seviye 2',
      kalici3: 'Kalıcı Oje Seviye 3',
      nailart: 'Nail Art',
      ombre: 'Ombre',
      french: 'French Çizimi',
      charm: 'Charm',
      sticker: 'Sticker',
      baski: 'Baskı',
      karOrani: 'Net Kar Oranı',
      kdvOrani: 'KDV Oranı',
      trendyolKomisyon: 'Trendyol Komisyonu',
      hepsiburadaKomisyon: 'Hepsiburada Komisyonu',
      iyzicoOrani: 'iyzico Komisyonu',
      digerVergiOrani: 'Diğer Vergi Kesintileri',
      toleransLimit: 'Uyuşmazlık Toleransı',
      yuvarlamaTipi: 'Yuvarlama Seçeneği'
    };

    const roundingNames = {
      'no': 'Yuvarlama Yok',
      'nearest-1': 'En Yakın 1 ₺',
      'nearest-5': 'En Yakın 5 ₺',
      'nearest-10': 'En Yakın 10 ₺',
      'ending-9': 'En Yakın 9 ile Biten',
      'ending-90': 'En Yakın .90 ile Biten',
      'ending-99': 'En Yakın .99 ile Biten'
    };
    
    tbody.innerHTML = '';
    logs.forEach(log => {
      const tr = document.createElement('tr');
      
      const date = new Date(log.timestamp);
      const dateStr = date.toLocaleString('tr-TR');
      
      let targetHtml = '';
      if (log.code === 'SOT_CONFIG') {
        targetHtml = `<span class="badge" style="background: rgba(199, 163, 108, 0.15); color: var(--color-accent-gold); font-weight:700; border: 1px solid rgba(199, 163, 108, 0.25);">SoT Ayarları</span>`;
      } else {
        targetHtml = `<span class="badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-main); font-weight:700; border: 1px solid var(--border-glass);">${log.code}</span>`;
      }
      
      let detailsHtml = '<div style="display: flex; flex-direction: column; gap: 6px; padding: 2px 0;">';
      let changedAny = false;
      
      if (log.code === 'SOT_CONFIG') {
        const keys = new Set([...Object.keys(log.oldPricing || {}), ...Object.keys(log.newPricing || {})]);
        keys.forEach(k => {
          const oldVal = log.oldPricing?.[k];
          const newVal = log.newPricing?.[k];
          if (oldVal !== newVal) {
            changedAny = true;
            const label = keyMap[k] || k.toUpperCase();
            
            let oldDisp = oldVal;
            let newDisp = newVal;
            if (k === 'yuvarlamaTipi') {
              oldDisp = roundingNames[oldVal] || oldVal;
              newDisp = roundingNames[newVal] || newVal;
            } else if (['karOrani', 'kdvOrani', 'trendyolKomisyon', 'hepsiburadaKomisyon', 'iyzicoOrani', 'digerVergiOrani'].includes(k)) {
              oldDisp = `%${oldVal}`;
              newDisp = `%${newVal}`;
            } else {
              oldDisp = `${oldVal} ₺`;
              newDisp = `${newVal} ₺`;
            }
            
            detailsHtml += `
              <div style="font-size: 11px; line-height: 1.4;">
                <span style="color: var(--text-muted); font-weight: 500;">${label}:</span>
                <span style="color: #d9534f; text-decoration: line-through; margin-left: 4px;">${oldDisp}</span>
                <i class="fa-solid fa-arrow-right" style="font-size: 10px; margin: 0 6px; color: var(--text-muted);"></i>
                <span style="color: #4e9f3d; font-weight: 700;">${newDisp}</span>
              </div>
            `;
          }
        });
      } else {
        // Options checkboxes comparison
        const oldChecked = log.oldPricing?.checkedOptions || {};
        const newChecked = log.newPricing?.checkedOptions || {};
        const allOpts = new Set([...Object.keys(oldChecked), ...Object.keys(newChecked)]);
        
        allOpts.forEach(optId => {
          const wasChecked = oldChecked[optId] !== false;
          const isNowChecked = newChecked[optId] !== false;
          
          if (wasChecked !== isNowChecked) {
            changedAny = true;
            const label = keyMap[optId] || optId;
            detailsHtml += `
              <div style="font-size: 11px; line-height: 1.4;">
                <span style="color: var(--text-muted); font-weight: 500;">${label} Modülü:</span>
                <span class="badge" style="background: ${wasChecked ? 'rgba(78, 159, 61, 0.1)' : 'rgba(217, 83, 79, 0.1)'}; color: ${wasChecked ? '#4e9f3d' : '#d9534f'}; font-size: 10px; padding: 2px 6px; border: 1px solid ${wasChecked ? 'rgba(78, 159, 61, 0.2)' : 'rgba(217, 83, 79, 0.2)'};">${wasChecked ? 'Aktif' : 'Pasif'}</span>
                <i class="fa-solid fa-arrow-right" style="font-size: 9px; margin: 0 6px; color: var(--text-muted);"></i>
                <span class="badge" style="background: ${isNowChecked ? 'rgba(78, 159, 61, 0.15)' : 'rgba(217, 83, 79, 0.15)'}; color: ${isNowChecked ? '#4e9f3d' : '#d9534f'}; font-size: 10px; padding: 2px 6px; border: 1px solid ${isNowChecked ? 'rgba(78, 159, 61, 0.3)' : 'rgba(217, 83, 79, 0.3)'}; font-weight: 700;">${isNowChecked ? 'Aktif' : 'Pasif'}</span>
              </div>
            `;
          }
        });
        
        // Custom option prices comparison
        const oldPrices = log.oldPricing?.customPrices || {};
        const newPrices = log.newPricing?.customPrices || {};
        const allCustomKeys = new Set([...Object.keys(oldPrices), ...Object.keys(newPrices)]);
        
        allCustomKeys.forEach(optId => {
          const oldPr = oldPrices[optId];
          const newPr = newPrices[optId];
          if (oldPr !== newPr) {
            changedAny = true;
            const label = keyMap[optId] || optId;
            const oldDisp = oldPr !== undefined ? `${oldPr} ₺` : 'Varsayılan';
            const newDisp = newPr !== undefined ? `${newPr} ₺` : 'Varsayılan';
            
            detailsHtml += `
              <div style="font-size: 11px; line-height: 1.4;">
                <span style="color: var(--text-muted); font-weight: 500;">Özel ${label} Fiyatı:</span>
                <span style="color: #d9534f; text-decoration: line-through; margin-left: 4px;">${oldDisp}</span>
                <i class="fa-solid fa-arrow-right" style="font-size: 10px; margin: 0 6px; color: var(--text-muted);"></i>
                <span style="color: #4e9f3d; font-weight: 700;">${newDisp}</span>
              </div>
            `;
          }
        });
        
        // Notes comparison
        const oldNotes = log.oldPricing?.notes || '';
        const newNotes = log.newPricing?.notes || '';
        if (oldNotes !== newNotes) {
          changedAny = true;
          const oldShort = oldNotes.length > 25 ? oldNotes.substring(0, 25) + '...' : oldNotes || 'Boş';
          const newShort = newNotes.length > 25 ? newNotes.substring(0, 25) + '...' : newNotes || 'Boş';
          
          detailsHtml += `
            <div style="font-size: 11px; line-height: 1.4;" title="Eski: ${oldNotes}\nYeni: ${newNotes}">
              <span style="color: var(--text-muted); font-weight: 500;">Fiyatlandırma Notu:</span>
              <span style="color: #d9534f; font-style: italic; margin-left: 4px;">"${oldShort}"</span>
              <i class="fa-solid fa-arrow-right" style="font-size: 10px; margin: 0 6px; color: var(--text-muted);"></i>
              <span style="color: #4e9f3d; font-weight: 700; font-style: italic;">"${newShort}"</span>
            </div>
          `;
        }
      }
      
      if (!changedAny) {
        detailsHtml += `<div style="font-size: 11px; color: var(--text-muted); font-style: italic;">Seçenek değerleri değiştirilmedi.</div>`;
      }
      
      detailsHtml += '</div>';
      
      tr.innerHTML = `
        <td style="padding: 12px 10px; color: var(--text-muted); font-family: monospace; font-size: 11px; vertical-align: top;">${dateStr}</td>
        <td style="padding: 12px 10px; vertical-align: top;">${targetHtml}</td>
        <td style="padding: 12px 10px; font-weight: 600; color: var(--text-main); vertical-align: top; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-user-gear" style="font-size:11px; color: var(--color-accent-gold);"></i> ${log.editor || 'Yönetici'}</td>
        <td style="padding: 12px 10px; vertical-align: top;">${detailsHtml}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('Audit trail load failed:', err);
  }
};

// Helper: Initialize default Cost data under state.config
function initCostState() {
  if (!state.config) state.config = {};
  
  if (!state.config.costCalculatorData) {
    state.config.costCalculatorData = {
      sarf: [
        { id: "s1", name: "Sıvı Yapıştırıcı", price: 0 },
        { id: "s2", name: "1 Adet Mini Buffer", price: 0 },
        { id: "s3", name: "1 Adet Mini Törpü", price: 0 },
        { id: "s4", name: "2 Adet Tüysüz Mendil", price: 0 },
        { id: "s5", name: "2 Adet Alkollü Mendil", price: 0 },
        { id: "s6", name: "2 Adet Mini Rulo Zımpara", price: 0 },
        { id: "s7", name: "Portakal Çubuğu", price: 0 },
        { id: "s8", name: "Sticker Yapıştırıcı", price: 0 }
      ],
      atolye: [
        { id: "a1", name: "Örnek Atölye Ekipmanı", price: 0, amount: 1, lifespan: 12 }
      ],
      sets: []
    };
  } else {
    // Ensure all required fields exist
    if (!state.config.costCalculatorData.sarf) state.config.costCalculatorData.sarf = [];
    if (!state.config.costCalculatorData.atolye) state.config.costCalculatorData.atolye = [];
    if (!state.config.costCalculatorData.sets) state.config.costCalculatorData.sets = [];
  }
}

// Main: Render the Cost Calculator Panel
window.renderCostCalculator = function() {
  initCostState();
  
  const sarfTbody = document.getElementById('sarf-items-tbody');
  const atolyeTbody = document.getElementById('atolye-items-tbody');
  
  if (!sarfTbody || !atolyeTbody) return;
  
  const data = state.config.costCalculatorData;
  
  // 1. Render Consumables (Sarf) - ONLY Name, Price and Delete
  sarfTbody.innerHTML = '';
  let sarfTotal = 0;
  data.sarf.forEach((item, index) => {
    sarfTotal += (item.price || 0);
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="padding: 10px 5px;"><input type="text" value="${item.name}" onchange="updateCostItem('sarf', ${index}, 'name', this.value)" style="width: 100%; font-weight: 500;"></td>
      <td style="padding: 10px 5px;"><input type="number" min="0" step="0.01" value="${item.price.toFixed(2)}" onchange="updateCostItem('sarf', ${index}, 'price', parseFloat(this.value) || 0)" style="width: 100%; text-align: right; font-family: monospace;"></td>
      <td style="padding: 10px 5px; text-align: center;"><button type="button" class="btn-delete-set" onclick="deleteCostItem('sarf', '${item.id}')" style="background: none; border: none; color: #d9534f; cursor: pointer; padding: 4px; font-size: 14px;"><i class="fa-solid fa-trash-can"></i></button></td>
    `;
    sarfTbody.appendChild(tr);
  });
  document.getElementById('sarf-grand-total').textContent = `${sarfTotal.toFixed(2)} ₺`;
  
  // 2. Render Workshop (Atölye)
  atolyeTbody.innerHTML = '';
  let atolyeTotal = 0;
  let atolyeAnnualTotal = 0;
  data.atolye.forEach((item, index) => {
    const total = (item.price || 0) * (item.amount || 1);
    const lifespan = item.lifespan || 12;
    const annualCost = (total * 12) / lifespan;
    
    atolyeTotal += total;
    atolyeAnnualTotal += annualCost;
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="padding: 10px 5px;"><input type="text" value="${item.name}" onchange="updateCostItem('atolye', ${index}, 'name', this.value)" style="width: 100%; font-weight: 500;"></td>
      <td style="padding: 10px 5px;"><input type="number" min="0" step="0.01" value="${item.price.toFixed(2)}" onchange="updateCostItem('atolye', ${index}, 'price', parseFloat(this.value) || 0)" style="width: 100%; text-align: right; font-family: monospace;"></td>
      <td style="padding: 10px 5px;"><input type="number" min="1" step="1" value="${item.amount}" onchange="updateCostItem('atolye', ${index}, 'amount', parseInt(this.value) || 1)" style="width: 100%; text-align: center;"></td>
      <td style="padding: 10px 5px; text-align: right; font-weight: 600; font-family: monospace; color: var(--text-main); font-size: 13px;">${total.toFixed(2)} ₺</td>
      <td style="padding: 10px 5px;"><input type="number" min="1" step="1" value="${lifespan}" onchange="updateCostItem('atolye', ${index}, 'lifespan', parseInt(this.value) || 1)" style="width: 100%; text-align: center;"></td>
      <td style="padding: 10px 5px; text-align: right; font-weight: 600; font-family: monospace; color: var(--color-accent-gold); font-size: 13px;">${annualCost.toFixed(2)} ₺</td>
      <td style="padding: 10px 5px; text-align: center;"><button type="button" class="btn-delete-set" onclick="deleteCostItem('atolye', '${item.id}')" style="background: none; border: none; color: #d9534f; cursor: pointer; padding: 4px; font-size: 14px;"><i class="fa-solid fa-trash-can"></i></button></td>
    `;
    atolyeTbody.appendChild(tr);
  });
  document.getElementById('atolye-grand-total').textContent = `${atolyeTotal.toFixed(2)} ₺`;
  const atolyeAnnualEl = document.getElementById('atolye-annual-grand-total');
  if (atolyeAnnualEl) atolyeAnnualEl.textContent = `${atolyeAnnualTotal.toFixed(2)} ₺`;
  
  // 3. Render Custom Sets
  renderCustomSetsCards();
};

// Render custom sets cards grid
function renderCustomSetsCards() {
  const grid = document.getElementById('cost-sets-grid');
  if (!grid) return;
  
  const data = state.config.costCalculatorData;
  
  if (!data.sets || data.sets.length === 0) {
    grid.innerHTML = `
      <div class="empty-sets-state" style="grid-column: 1 / -1; text-align: center; padding: 30px; background: rgba(255,255,255,0.02); border: 1px dashed var(--border-glass); border-radius: var(--radius-large); color: var(--text-muted); font-size: 13px;">
        <i class="fa-solid fa-cubes" style="font-size: 24px; color: var(--color-accent-gold); margin-bottom: 10px; display: block;"></i>
        Henüz oluşturulmuş bir özel set bulunmuyor. Yukarıdaki "Özel Set Oluştur" butonuna basarak sarf malzemelerinden özel paketler oluşturabilirsiniz.
      </div>
    `;
    return;
  }
  
  grid.innerHTML = '';
  data.sets.forEach(set => {
    const setList = [];
    let setTotal = 0;
    
    // Support new selectedItems with custom quantities and old selectedIds fallback
    const itemsList = set.selectedItems || (set.selectedIds || []).map(id => ({ id, amount: 1 }));
    
    itemsList.forEach(item => {
      const originalItem = data.sarf.find(sarfItem => sarfItem.id === item.id);
      if (originalItem) {
        const itemTotal = (originalItem.price || 0) * (item.amount || 1);
        setTotal += itemTotal;
        setList.push({ name: originalItem.name, amount: item.amount, total: itemTotal });
      }
    });
    
    const card = document.createElement('div');
    card.className = 'cost-set-card';
    
    let itemsHtml = '';
    setList.forEach(item => {
      itemsHtml += `
        <div class="set-item-row">
          <span>${item.name} <span style="color: var(--text-muted); font-size: 10px;">(${item.amount} Adet)</span></span>
          <strong style="font-family: monospace;">${item.total.toFixed(2)} ₺</strong>
        </div>
      `;
    });
    
    card.innerHTML = `
      <div class="set-header">
        <div>
          <h5 class="set-title">${set.name}</h5>
          <span style="font-size: 11px; color: var(--text-muted);"><i class="fa-solid fa-list-check"></i> ${setList.length} Kalem</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button type="button" class="btn-delete-set" onclick="openEditCustomSetModal('${set.id}')" title="Seti Düzenle" style="background: none; border: none; color: var(--color-accent-gold); cursor: pointer; padding: 4px; font-size: 14px;"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" class="btn-delete-set" onclick="deleteCustomSet('${set.id}')" title="Seti Sil" style="background: none; border: none; color: #d9534f; cursor: pointer; padding: 4px; font-size: 14px;"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      <div class="set-items-list">
        ${itemsHtml || '<div style="font-style: italic; color: var(--color-danger);">Hiçbir malzeme seçilmedi</div>'}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px; margin-top: auto;">
        <span style="font-size: 11px; font-weight: 700; color: var(--color-accent-gold);">SET MALİYETİ</span>
        <h4 class="set-price">${setTotal.toFixed(2)} ₺</h4>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Inline input value updates
window.updateCostItem = function(type, index, field, value) {
  const data = state.config.costCalculatorData;
  if (!data || !data[type] || !data[type][index]) return;
  
  data[type][index][field] = value;
  
  // Live recalculate sums
  const sarfTbody = document.getElementById('sarf-items-tbody');
  const atolyeTbody = document.getElementById('atolye-items-tbody');
  
  if (sarfTbody && atolyeTbody) {
    // 1. Consumables grand total
    let sarfTotal = 0;
    data.sarf.forEach((item) => {
      sarfTotal += (item.price || 0);
    });
    document.getElementById('sarf-grand-total').textContent = `${sarfTotal.toFixed(2)} ₺`;
    
    // 2. Workshop total
    let atolyeTotal = 0;
    let atolyeAnnualTotal = 0;
    data.atolye.forEach((item, idx) => {
      const total = (item.price || 0) * (item.amount || 1);
      const lifespan = item.lifespan || 12;
      const annualCost = (total * 12) / lifespan;
      atolyeTotal += total;
      atolyeAnnualTotal += annualCost;
      
      const tr = atolyeTbody.children[idx];
      if (tr) {
        const totalTd = tr.children[3];
        if (totalTd) totalTd.textContent = `${total.toFixed(2)} ₺`;
        
        const annualTd = tr.children[5];
        if (annualTd) annualTd.textContent = `${annualCost.toFixed(2)} ₺`;
      }
    });
    document.getElementById('atolye-grand-total').textContent = `${atolyeTotal.toFixed(2)} ₺`;
    const atolyeAnnualEl = document.getElementById('atolye-annual-grand-total');
    if (atolyeAnnualEl) atolyeAnnualEl.textContent = `${atolyeAnnualTotal.toFixed(2)} ₺`;
  }
  
  // Refresh Sets cards live as well
  renderCustomSetsCards();
  
  // Autosave
  triggerCostAutosave();
};

// Add Branch modal actions
window.openAddBranchModal = function(type) {
  const modal = document.getElementById('cost-item-modal');
  const typeInput = document.getElementById('cost-item-type');
  const nameInput = document.getElementById('cost-item-name');
  const priceInput = document.getElementById('cost-item-price');
  const amountInput = document.getElementById('cost-item-amount');
  const lifespanInput = document.getElementById('cost-item-lifespan');
  const titleNode = document.getElementById('cost-modal-title');
  const amountGroup = document.getElementById('cost-item-amount-group');
  const lifespanGroup = document.getElementById('cost-item-lifespan-group');
  
  if (!modal) return;
  
  typeInput.value = type;
  nameInput.value = '';
  priceInput.value = '0.00';
  amountInput.value = '1';
  if (lifespanInput) lifespanInput.value = '12';
  
  if (type === 'sarf') {
    if (amountGroup) amountGroup.style.display = 'none';
    if (lifespanGroup) lifespanGroup.style.display = 'none';
    titleNode.textContent = 'Yeni Malzeme Ekle';
  } else {
    if (amountGroup) amountGroup.style.display = 'flex';
    if (lifespanGroup) lifespanGroup.style.display = 'flex';
    titleNode.textContent = 'Yeni Ekipman / Gider Ekle';
  }
  
  modal.style.display = 'flex';
};

window.closeCostItemModal = function() {
  const modal = document.getElementById('cost-item-modal');
  if (modal) modal.style.display = 'none';
};

window.handleAddCostItemSubmit = function() {
  const type = document.getElementById('cost-item-type').value;
  const name = document.getElementById('cost-item-name').value.trim();
  const price = parseFloat(document.getElementById('cost-item-price').value) || 0;
  const amount = type === 'sarf' ? 1 : (parseInt(document.getElementById('cost-item-amount').value) || 1);
  const lifespan = type === 'sarf' ? 12 : (parseInt(document.getElementById('cost-item-lifespan').value) || 12);
  
  if (!name) return;
  
  const data = state.config.costCalculatorData;
  const newId = (type === 'sarf' ? 's-' : 'a-') + Date.now();
  
  const newItem = { id: newId, name, price };
  if (type !== 'sarf') {
    newItem.amount = amount;
    newItem.lifespan = lifespan;
  }
  
  data[type].push(newItem);
  
  closeCostItemModal();
  renderCostCalculator();
  triggerCostAutosave();
  showNotification('Yeni kalem başarıyla eklendi.', 'success');
};

// Delete cost items
window.deleteCostItem = function(type, id) {
  const data = state.config.costCalculatorData;
  if (!data || !data[type]) return;
  
  if (!confirm('Bu kalemi silmek istediğinize emin misiniz?')) return;
  
  data[type] = data[type].filter(item => item.id !== id);
  
  // If a consumable is deleted, remove it from any Custom Sets
  if (type === 'sarf') {
    data.sets.forEach(set => {
      if (set.selectedItems) {
        set.selectedItems = set.selectedItems.filter(item => item.id !== id);
      }
      if (set.selectedIds) {
        set.selectedIds = set.selectedIds.filter(selectedId => selectedId !== id);
      }
    });
  }
  
  renderCostCalculator();
  triggerCostAutosave();
  showNotification('Kalem başarıyla silindi.', 'success');
};

// Editing set tracking
let editingSetId = null;

// Create custom set builders modals with amount selector
window.openCreateCustomSetModal = function() {
  editingSetId = null; // Reset edit state
  const modal = document.getElementById('custom-set-modal');
  const selectionDiv = document.getElementById('custom-set-items-selection');
  const nameInput = document.getElementById('custom-set-name');
  const submitBtn = document.querySelector('#custom-set-form button[type="submit"]');
  const modalTitle = document.querySelector('#custom-set-modal h3');
  
  if (!modal || !selectionDiv) return;
  
  nameInput.value = '';
  if (submitBtn) submitBtn.textContent = 'Seti Oluştur';
  if (modalTitle) modalTitle.textContent = 'Özel Paket / Set Oluştur';
  
  const data = state.config.costCalculatorData;
  
  if (!data.sarf || data.sarf.length === 0) {
    selectionDiv.innerHTML = '<div style="font-style: italic; color: var(--color-danger); font-size: 12px; text-align: center;">Önce sarf malzemeleri eklemelisiniz!</div>';
  } else {
    selectionDiv.innerHTML = '';
    data.sarf.forEach(item => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.justifyContent = 'space-between';
      row.style.gap = '6px';
      row.style.color = '#fff';
      row.style.fontSize = '12px';
      row.style.padding = '4px 3px';
      row.style.borderBottom = '1px solid rgba(255,255,255,0.02)';
      
      row.innerHTML = `
        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          <input type="checkbox" class="set-select-checkbox" value="${item.id}" style="accent-color: var(--color-accent-gold);" onchange="document.getElementById('set-amount-${item.id}').disabled = !this.checked;">
          <span>${item.name}</span>
        </label>
        <div style="display: flex; align-items: center; gap: 12px; margin-left: auto; flex-shrink: 0;">
          <span style="color: var(--color-accent-gold); font-family: monospace; font-size: 12px;">${item.price.toFixed(2)} ₺</span>
          <div style="display: flex; align-items: center; gap: 3px;">
            <span style="font-size: 10px; color: var(--text-muted);">Miktar:</span>
            <input type="number" id="set-amount-${item.id}" min="1" step="1" value="1" disabled style="width: 55px; padding: 4px 6px; background: var(--bg-input); border: 1px solid var(--border-glass); border-radius: var(--radius-small); color: #fff; text-align: center; font-size: 11px; outline: none;">
          </div>
        </div>
      `;
      selectionDiv.appendChild(row);
    });
  }
  
  modal.style.display = 'flex';
};

// Open Edit Custom Set Modal
window.openEditCustomSetModal = function(setId) {
  const modal = document.getElementById('custom-set-modal');
  const selectionDiv = document.getElementById('custom-set-items-selection');
  const nameInput = document.getElementById('custom-set-name');
  const submitBtn = document.querySelector('#custom-set-form button[type="submit"]');
  const modalTitle = document.querySelector('#custom-set-modal h3');
  
  if (!modal || !selectionDiv) return;
  
  const data = state.config.costCalculatorData;
  const set = data.sets.find(s => s.id === setId);
  if (!set) return;
  
  editingSetId = setId; // Set editing state
  
  nameInput.value = set.name;
  if (submitBtn) submitBtn.textContent = 'Değişiklikleri Kaydet';
  if (modalTitle) modalTitle.textContent = 'Özel Seti Düzenle';
  
  // Populate items checkbox selection
  selectionDiv.innerHTML = '';
  const selectedList = set.selectedItems || (set.selectedIds || []).map(id => ({ id, amount: 1 }));
  
  data.sarf.forEach(item => {
    const selectedItem = selectedList.find(si => si.id === item.id);
    const isChecked = !!selectedItem;
    const amountVal = selectedItem ? (selectedItem.amount || 1) : 1;
    
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.gap = '6px';
    row.style.color = '#fff';
    row.style.fontSize = '12px';
    row.style.padding = '4px 3px';
    row.style.borderBottom = '1px solid rgba(255,255,255,0.02)';
    
    row.innerHTML = `
      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        <input type="checkbox" class="set-select-checkbox" value="${item.id}" ${isChecked ? 'checked' : ''} style="accent-color: var(--color-accent-gold);" onchange="document.getElementById('set-amount-${item.id}').disabled = !this.checked;">
        <span>${item.name}</span>
      </label>
      <div style="display: flex; align-items: center; gap: 12px; margin-left: auto; flex-shrink: 0;">
        <span style="color: var(--color-accent-gold); font-family: monospace; font-size: 12px;">${item.price.toFixed(2)} ₺</span>
        <div style="display: flex; align-items: center; gap: 3px;">
          <span style="font-size: 10px; color: var(--text-muted);">Miktar:</span>
          <input type="number" id="set-amount-${item.id}" min="1" step="1" value="${amountVal}" ${isChecked ? '' : 'disabled'} style="width: 55px; padding: 4px 6px; background: var(--bg-input); border: 1px solid var(--border-glass); border-radius: var(--radius-small); color: #fff; text-align: center; font-size: 11px; outline: none;">
        </div>
      </div>
    `;
    selectionDiv.appendChild(row);
  });
  
  modal.style.display = 'flex';
};

window.closeCustomSetModal = function() {
  const modal = document.getElementById('custom-set-modal');
  if (modal) modal.style.display = 'none';
  editingSetId = null; // Reset state
};

window.handleCreateCustomSetSubmit = function() {
  const name = document.getElementById('custom-set-name').value.trim();
  const checkboxes = document.querySelectorAll('.set-select-checkbox:checked');
  
  if (!name) return;
  
  const selectedItems = Array.from(checkboxes).map(cb => {
    const itemId = cb.value;
    const amountInput = document.getElementById(`set-amount-${itemId}`);
    const amount = parseInt(amountInput.value) || 1;
    return { id: itemId, amount };
  });
  
  if (selectedItems.length === 0) {
    showNotification('Lütfen sete dahil etmek için en az bir malzeme seçin.', 'danger');
    return;
  }
  
  const data = state.config.costCalculatorData;
  
  if (editingSetId) {
    // We are editing an existing set
    const setIndex = data.sets.findIndex(s => s.id === editingSetId);
    if (setIndex !== -1) {
      data.sets[setIndex].name = name;
      data.sets[setIndex].selectedItems = selectedItems;
      showNotification('Özel set başarıyla güncellendi!', 'success');
    }
    editingSetId = null; // Clear state
  } else {
    // Creating a new set
    const newSetId = 'set-' + Date.now();
    data.sets.push({
      id: newSetId,
      name,
      selectedItems
    });
    showNotification('Özel set başarıyla oluşturuldu!', 'success');
  }
  
  closeCustomSetModal();
  renderCostCalculator();
  triggerCostAutosave();
};

// Delete Custom Sets
window.deleteCustomSet = function(setId) {
  const data = state.config.costCalculatorData;
  if (!data || !data.sets) return;
  
  if (!confirm('Bu özel seti silmek istediğinize emin misiniz?')) return;
  
  data.sets = data.sets.filter(set => set.id !== setId);
  
  renderCostCalculator();
  triggerCostAutosave();
  showNotification('Özel set silindi.', 'success');
};

// Debounced Autosave for Cost Calculator
let costAutosaveTimer = null;
function triggerCostAutosave() {
  if (costAutosaveTimer) clearTimeout(costAutosaveTimer);
  
  costAutosaveTimer = setTimeout(async () => {
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.config)
      });
      if (res.ok) {
        console.log('[Autosave] Cost calculator settings successfully saved to Supabase.');
      } else {
        throw new Error('Save configuration returned error status.');
      }
    } catch (e) {
      console.error('[Autosave Hata] Gider verileri kaydedilemedi:', e);
      showNotification('Değişiklikler sunucuya kaydedilemedi.', 'danger');
    }
  }, 1000);
}

// ==========================================
// MOBILE SIDEBAR TOGGLE & SWIPE GESTURES
// ==========================================
window.toggleMobileSidebar = function(isOpen) {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar || !backdrop) return;
  
  if (isOpen) {
    sidebar.classList.add('active');
    backdrop.classList.add('active');
  } else {
    sidebar.classList.remove('active');
    backdrop.classList.remove('active');
  }
};

// Swiping gestures implementation
(function initMobileSwipe() {
  let touchStartX = 0;
  let touchStartY = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    // Check if horizontal swipe was significantly larger than vertical drag
    if (Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      const sidebar = document.querySelector('.sidebar');
      const isSidebarOpen = sidebar && sidebar.classList.contains('active');
      
      if (diffX > 75) {
        // Swipe Right: Open menu if swipe started near left edge (startX < 80px)
        if (!isSidebarOpen && touchStartX < 80) {
          window.toggleMobileSidebar(true);
        }
      } else if (diffX < -75) {
        // Swipe Left: Close menu if swipe started anywhere and menu is open
        if (isSidebarOpen) {
          window.toggleMobileSidebar(false);
        }
      }
    }
  }, { passive: true });
})();
