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
    const isChecked = userPricing.checkedOptions[opt.id] !== false;
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
      const isChecked = userPricing.checkedOptions[opt.id] !== false;
      let price = state.config[opt.id] || 0;
      if (opt.hasCustomInput && userPricing.customPrices[opt.id] !== undefined) {
        price = userPricing.customPrices[opt.id];
      }
      rightVal.textContent = isChecked ? `+ ${price.toFixed(2)} ₺` : '—';
    }
  });

  const pricing = calculateDetailedPricing(product);
  
  const costNode = document.getElementById(`cost-total-${code}`);
  const profitRow = document.getElementById(`profit-row-${code}`);
  const profitNode = document.getElementById(`profit-total-${code}`);
  const kdvNode = document.getElementById(`kdv-total-${code}`);
  const grandNode = document.getElementById(`grand-total-${code}`);
  
  if (costNode) costNode.textContent = `${pricing.cost.toFixed(2)} ₺`;
  if (profitRow) {
    profitRow.style.display = pricing.karOrani > 0 ? 'flex' : 'none';
  }
  if (profitNode) {
    profitNode.textContent = `+ ${pricing.profit.toFixed(2)} ₺`;
    // Update label text for karOrani
    const labelNode = profitRow.querySelector('span:first-child');
    if (labelNode) labelNode.textContent = `Net Kar (%${pricing.karOrani})`;
  }
  if (kdvNode) kdvNode.textContent = `${pricing.kdv.toFixed(2)} ₺`;
  if (grandNode) grandNode.textContent = `${pricing.roundedGrandTotal.toFixed(2)} ₺`;

  const sellingPrice = product.discountedPrice > 0 ? product.discountedPrice : product.undiscountedPrice;
  const tolerance = state.config.toleransLimit !== undefined ? parseFloat(state.config.toleransLimit) : 10.0;
  const isMismatch = Math.abs(pricing.roundedGrandTotal - sellingPrice) >= tolerance;
  const warningBanner = document.getElementById(`mismatch-warning-${code}`);
  if (warningBanner) {
    warningBanner.style.display = isMismatch ? 'flex' : 'none';
    if (isMismatch) {
      const pNode = warningBanner.querySelector('.mismatch-banner-content p');
      if (pNode) {
        pNode.innerHTML = `Eşleşmiyor! Sitedeki: <strong>${sellingPrice.toFixed(2)} ₺</strong> | Önerilen: <strong>${pricing.roundedGrandTotal.toFixed(2)} ₺</strong>`;
      }
      const copyBtn = warningBanner.querySelector('.btn-copy-price');
      if (copyBtn) {
        copyBtn.onclick = (e) => {
          e.stopPropagation();
          copyToClipboard(pricing.roundedGrandTotal.toFixed(2), product.code);
        };
      }
    }
  }
}

// Pricing Option Fields Mapping (Match Backend & UI Names)
const PRICING_OPTIONS = [
  { id: 'kargo', label: 'Kargo', hasCustomInput: false },
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
  { id: 'sticker', label: 'Sticker', hasCustomInput: true }
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

      // Special Tab Actions
      if (tabId === 'sot') {
        renderSoTSettingsForm();
      } else if (tabId === 'pricing') {
        renderProductGrid();
      } else if (tabId === 'map') {
        initTurkeyMap();
      } else if (tabId === 'customers') {
        renderCustomersTable();
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

// ==========================================
// 3. FRONTEND PRICING CALCULATOR ENGINE
// ==========================================
function calculateProductTotal(product) {
  let total = 0;
  const userPricing = product.userPricing || { checkedOptions: {}, customPrices: {} };

  PRICING_OPTIONS.forEach(opt => {
    const isChecked = userPricing.checkedOptions[opt.id] !== false;
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
  const cost = calculateProductTotal(product); // Seçilen modüllerin maliyeti
  const karOrani = state.config.karOrani !== undefined ? parseFloat(state.config.karOrani) : 40;
  const profit = cost * (karOrani / 100);
  const netPrice = cost + profit;
  const kdv = netPrice * 0.20;
  const rawGrandTotal = netPrice * 1.20;
  const yuvarlamaTipi = state.config.yuvarlamaTipi || 'no';
  const roundedGrandTotal = roundPrice(rawGrandTotal, yuvarlamaTipi);
  
  return {
    cost,
    profit,
    netPrice,
    kdv,
    rawGrandTotal,
    roundedGrandTotal,
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

    // 3. Calculated Grand Total and Selling Price Mismatch with a dynamic tolerance limit
    const grandTotal = calculateProductGrandTotal(product);
    const sellingPrice = product.discountedPrice > 0 ? product.discountedPrice : product.undiscountedPrice;
    const tolerance = state.config.toleransLimit !== undefined ? parseFloat(state.config.toleransLimit) : 10.0;
    const hasMismatch = Math.abs(grandTotal - sellingPrice) >= tolerance;
    
    const matchesMismatch = !state.filters.onlyMismatch || hasMismatch;

    return matchesSearch && matchesCategory && matchesMismatch;
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

  // Bulk selection checkbox (Top Right overlay)
  const bulkSelectWrapper = document.createElement('div');
  bulkSelectWrapper.className = 'bulk-select-wrapper';
  bulkSelectWrapper.style.position = 'absolute';
  bulkSelectWrapper.style.top = '15px';
  bulkSelectWrapper.style.right = '15px';
  bulkSelectWrapper.style.zIndex = '10';

  const bulkCheckbox = document.createElement('input');
  bulkCheckbox.type = 'checkbox';
  bulkCheckbox.className = 'bulk-select-checkbox';
  bulkCheckbox.setAttribute('data-bulk-code', product.code);
  bulkCheckbox.style.width = '18px';
  bulkCheckbox.style.height = '18px';
  bulkCheckbox.style.cursor = 'pointer';
  
  bulkCheckbox.addEventListener('change', () => {
    updateBulkActionsBarState();
  });

  bulkSelectWrapper.appendChild(bulkCheckbox);
  card.appendChild(bulkSelectWrapper);

  const pricing = calculateDetailedPricing(product);
  const sellingPrice = product.discountedPrice > 0 ? product.discountedPrice : product.undiscountedPrice;
  const tolerance = state.config.toleransLimit !== undefined ? parseFloat(state.config.toleransLimit) : 10.0;
  const isMismatch = Math.abs(pricing.roundedGrandTotal - sellingPrice) >= tolerance;
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
  codeBadge.textContent = `KOD: ${product.code}`;
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
    const isChecked = userPricing.checkedOptions[opt.id] !== false;
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

  // Calculate & add Total Pricing Display Row with breakdown (Seçenek Maliyeti, Kar Marjı, KDV and Önerilen Genel Toplam)
  const totalRow = document.createElement('div');
  totalRow.className = 'pricing-total-block';
  totalRow.style.flexDirection = 'column';
  totalRow.style.alignItems = 'stretch';
  totalRow.style.gap = '6px';
  
  const karOrani = pricing.karOrani || 0;
  const showProfitRow = karOrani > 0;
  
  totalRow.innerHTML = `
    <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
      <span>Seçenek Maliyeti</span>
      <span id="cost-total-${product.code}">${pricing.cost.toFixed(2)} ₺</span>
    </div>
    <div id="profit-row-${product.code}" style="display: ${showProfitRow ? 'flex' : 'none'}; justify-content: space-between; font-size: 12px; color: var(--text-muted);">
      <span>Net Kar (%${karOrani})</span>
      <span id="profit-total-${product.code}">+ ${pricing.profit.toFixed(2)} ₺</span>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); padding-bottom: 6px; border-bottom: 1px dashed rgba(255,255,255,0.05);">
      <span>+%20 KDV</span>
      <span id="kdv-total-${product.code}">${pricing.kdv.toFixed(2)} ₺</span>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
      <span class="label" style="font-size: 13px; font-weight: 700; color: var(--text-main);">ÖNERİLEN TOPLAM</span>
      <span class="value" id="grand-total-${product.code}" style="font-size: 20px; font-weight: 800; color: var(--color-accent-gold); text-shadow: 0 0 10px rgba(199,163,108,0.2);">${pricing.roundedGrandTotal.toFixed(2)} ₺</span>
    </div>
  `;
  optionsTable.appendChild(totalRow);
  pricingSection.appendChild(optionsTable);
  card.appendChild(pricingSection);

  // 3. Price Mismatch Warning alert box (with "Kopyala ve Git" Copy & Edit actions)
  const warningBanner = document.createElement('div');
  warningBanner.className = 'mismatch-alert-banner';
  warningBanner.id = `mismatch-warning-${product.code}`;
  warningBanner.style.display = isMismatch ? 'flex' : 'none';
  
  const bannerContent = document.createElement('div');
  bannerContent.className = 'mismatch-banner-content';
  bannerContent.innerHTML = `
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p>Eşleşmiyor! Sitedeki: <strong>${sellingPrice.toFixed(2)} ₺</strong> | Önerilen: <strong>${pricing.roundedGrandTotal.toFixed(2)} ₺</strong></p>
  `;
  warningBanner.appendChild(bannerContent);

  const bannerActions = document.createElement('div');
  bannerActions.className = 'mismatch-actions';
  
  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.className = 'btn-mismatch-action btn-copy-price';
  copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Kopyala';
  copyBtn.title = 'Yeni Fiyatı Panoya Kopyala';
  copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    copyToClipboard(pricing.roundedGrandTotal.toFixed(2), product.code);
  });
  bannerActions.appendChild(copyBtn);

  const editLink = document.createElement('a');
  editLink.href = `https://nezlincollection.com/admin/Urunler/UrunListele.aspx?kelime=${product.code}`;
  editLink.target = '_blank';
  editLink.className = 'btn-mismatch-action btn-edit-site';
  editLink.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Sitede Düzenle';
  editLink.title = 'Ticimax Panelinde Bu Ürünü Ara';
  editLink.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  bannerActions.appendChild(editLink);

  warningBanner.appendChild(bannerActions);
  card.appendChild(warningBanner);

  // 4. Notes Custom Text Area
  const notesSection = document.createElement('div');
  notesSection.className = 'notes-textarea-section';
  notesSection.innerHTML = `<label for="notes-${product.code}"><i class="fa-regular fa-comment-dots"></i> Fiyatlandırma Notları</label>`;
  
  const textarea = document.createElement('textarea');
  textarea.id = `notes-${product.code}`;
  textarea.placeholder = 'Ürünün bu özel fiyata sahip olmasıyla ilgili detayları girin...';
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
    kargo: 'Kargo Gönderimi',
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

  const smartSection = document.createElement('div');
  smartSection.className = 'sot-section-wrapper settings-section-divider';
  smartSection.innerHTML = '<h4 class="sot-section-title"><i class="fa-solid fa-brain"></i> Akıllı Fiyatlandırma Parametreleri (Zekâ Modülleri)</h4>';
  
  const smartGrid = document.createElement('div');
  smartGrid.className = 'sot-section-grid';
  smartSection.appendChild(smartGrid);

  Object.entries(state.config).forEach(([key, val]) => {
    const isSmart = ['karOrani', 'toleransLimit', 'yuvarlamaTipi'].includes(key);
    const targetGrid = isSmart ? smartGrid : compGrid;

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
      const input = document.createElement('input');
      input.type = 'number';
      input.id = `sot-input-${key}`;
      input.name = key;
      input.value = val;
      input.min = '0';
      input.step = key === 'toleransLimit' ? '1' : '1';
      input.required = true;

      const span = document.createElement('span');
      span.textContent = key === 'karOrani' ? '%' : '₺';

      inputWrapper.appendChild(input);
      inputWrapper.appendChild(span);
    }

    group.appendChild(inputWrapper);
    targetGrid.appendChild(group);
  });

  form.appendChild(compSection);
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
  
  headerSyncBtn.addEventListener('click', triggerCrawlerSync);
  bodySyncBtn.addEventListener('click', triggerCrawlerSync);
}

async function triggerCrawlerSync() {
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

// ==========================================================================
// MÜŞTERİ COĞRAFYASI & TÜRKİYE HARİTASI KONTROLÖRÜ
// ==========================================================================
const TURKEY_CITIES = {
  "01": "Adana", "02": "Adıyaman", "03": "Afyonkarahisar", "04": "Ağrı", "05": "Amasya",
  "06": "Ankara", "07": "Antalya", "08": "Artvin", "09": "Aydın", "10": "Balıkesir",
  "11": "Bilecik", "12": "Bingöl", "13": "Bitlis", "14": "Bolu", "15": "Burdur",
  "16": "Bursa", "17": "Çanakkale", "18": "Çankırı", "19": "Çorum", "20": "Denizli",
  "21": "Diyarbakır", "22": "Edirne", "23": "Elazığ", "24": "Erzincan", "25": "Erzurum",
  "26": "Eskişehir", "27": "Gaziantep", "28": "Giresun", "29": "Gümüşhane", "30": "Hakkari",
  "31": "Hatay", "32": "Isparta", "33": "Mersin", "34": "İstanbul", "35": "İzmir",
  "36": "Kars", "37": "Kastamonu", "38": "Kayseri", "39": "Kırklareli", "40": "Kırşehir",
  "41": "Kocaeli", "42": "Konya", "43": "Kütahya", "44": "Malatya", "45": "Manisa",
  "46": "Kahramanmaraş", "47": "Mardin", "48": "Muğla", "49": "Muş", "50": "Nevşehir",
  "51": "Niğde", "52": "Ordu", "53": "Rize", "54": "Sakarya", "55": "Samsun",
  "56": "Siirt", "57": "Sinop", "58": "Sivas", "59": "Tekirdağ", "60": "Tokat",
  "61": "Trabzon", "62": "Tunceli", "63": "Şanlıurfa", "64": "Uşak", "65": "Van",
  "66": "Yozgat", "67": "Zonguldak", "68": "Aksaray", "69": "Bayburt", "70": "Karaman",
  "71": "Kırıkkale", "72": "Batman", "73": "Şırnak", "74": "Bartın", "75": "Ardahan",
  "76": "Iğdır", "77": "Yalova", "78": "Karabük", "79": "Kilis", "80": "Osmaniye",
  "81": "Düzce"
};

// 1. Müşterileri REST API'den Çek
async function loadCustomers() {
  try {
    const res = await fetch('/api/customers');
    state.customers = await res.json();
    populateCityDropdown();
    initCrmController(); // Initialize CRM Modal Events
  } catch (err) {
    console.error('Error loading customers:', err);
    showNotification('Müşteri veritabanı yüklenemedi.', 'danger');
  }
}

// 2. Şehir Form Seçim Kutusunu Doldur
function populateCityDropdown() {
  const select = document.getElementById('c-city');
  if (!select) return;
  select.innerHTML = '<option value="" disabled selected>Şehir Seçin</option>';
  Object.entries(TURKEY_CITIES).forEach(([code, name]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = `(${code}) ${name}`;
    select.appendChild(opt);
  });
}

// 3. Harita Sekmesi ve Haritayı Başlatma
let isMapLoaded = false;
async function initTurkeyMap() {
  const container = document.getElementById('turkey-map-container');
  if (!container) return;

  state.activeCityCode = null;
  document.getElementById('selected-city-title').textContent = 'Tüm Türkiye';
  renderCityCustomersList();

  if (isMapLoaded) {
    updateMapHighlights();
    return;
  }

  try {
    container.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Türkiye Haritası yükleniyor...</p></div>`;
    const res = await fetch('/img/turkey.svg');
    if (!res.ok) throw new Error('Harita SVG dosyası yüklenemedi.');
    const svgText = await res.text();
    
    container.innerHTML = svgText;
    isMapLoaded = true;
    
    updateMapHighlights();
    setupMapInteractivity();
  } catch (err) {
    console.error('Error rendering Turkey Map:', err);
    container.innerHTML = `
      <div class="loading-state">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 32px; color: var(--color-danger)"></i>
        <p>Harita yüklenirken hata oluştu. Lütfen sunucuyu kontrol edin.</p>
        <button class="btn btn-primary" onclick="initTurkeyMap()"><i class="fa-solid fa-rotate"></i> Yeniden Dene</button>
      </div>
    `;
  }
}

// 4. Sipariş Alan Şehirlerin Haritada Boyanması
function updateMapHighlights() {
  if (!isMapLoaded) return;
  const svg = document.querySelector('#turkey-map-container svg');
  if (!svg) return;

  // Sipariş olan benzersiz plakaları topla
  const activeCities = new Set(state.customers.map(c => c.cityCode));

  const groups = svg.querySelectorAll('g[data-plate]');
  groups.forEach(g => {
    const plate = String(g.getAttribute('data-plate')).padStart(2, '0');
    g.classList.remove('city-has-orders', 'city-active');
    
    // Eğer müşterisi varsa bordo yap
    if (activeCities.has(plate)) {
      g.classList.add('city-has-orders');
    }
    // Eğer aktif tıklanmış şehir ise gold yap
    if (state.activeCityCode === plate) {
      g.classList.add('city-active');
    }
  });
}

// 5. Harita Şehir Tıklama Olayları ve Araç İpuçları (Tooltips)
function setupMapInteractivity() {
  const svg = document.querySelector('#turkey-map-container svg');
  if (!svg) return;

  const tooltip = document.getElementById('map-tooltip');

  const groups = svg.querySelectorAll('g[data-plate]');
  groups.forEach(g => {
    const plate = String(g.getAttribute('data-plate')).padStart(2, '0');
    const cityName = TURKEY_CITIES[plate] || 'Bilinmeyen İl';

    // Remove native browser tooltip overlay
    g.removeAttribute('title');

    // Hover Enter
    g.addEventListener('mouseenter', () => {
      const count = state.customers.filter(c => c.cityCode === plate).length;
      
      let tooltipContent = `<strong style="color: var(--color-accent-gold); font-size: 13px;">${cityName}</strong>`;
      tooltipContent += `<div style="font-size: 10px; color: var(--text-muted); margin-top:2px;">Plaka Kodu: ${plate}</div>`;
      if (count > 0) {
        tooltipContent += `<div style="margin-top: 5px; color: var(--color-accent); font-weight: 700;"><i class="fa-solid fa-circle-check"></i> ${count} Sipariş / Müşteri</div>`;
      } else {
        tooltipContent += `<div style="margin-top: 5px; color: var(--text-muted);"><i class="fa-solid fa-circle-minus"></i> Sipariş Yok</div>`;
      }

      if (tooltip) {
        tooltip.innerHTML = tooltipContent;
        tooltip.style.display = 'block';
        tooltip.style.opacity = '1';
      }
    });

    // Hover Move
    g.addEventListener('mousemove', (e) => {
      if (tooltip) {
        tooltip.style.left = `${e.clientX}px`;
        tooltip.style.top = `${e.clientY}px`;
      }
    });

    // Hover Leave
    g.addEventListener('mouseleave', () => {
      if (tooltip) {
        tooltip.style.display = 'none';
        tooltip.style.opacity = '0';
      }
    });

    g.addEventListener('click', () => {
      // Toggle active
      if (state.activeCityCode === plate) {
        state.activeCityCode = null;
        document.getElementById('selected-city-title').textContent = 'Tüm Türkiye';
      } else {
        state.activeCityCode = plate;
        document.getElementById('selected-city-title').textContent = cityName;
      }

      // Sadece seçilen şehre aktiflik sınıfını ata
      groups.forEach(group => {
        const p = String(group.getAttribute('data-plate')).padStart(2, '0');
        group.classList.remove('city-active');
        if (state.activeCityCode === p) {
          group.classList.add('city-active');
        }
      });

      // Update tooltip immediately to reflect active city state change
      g.dispatchEvent(new Event('mouseenter'));

      renderCityCustomersList();
    });
  });
}

// 6. Harita Altındaki Müşterileri Filtreleyerek Listeleme
function renderCityCustomersList() {
  const tbody = document.getElementById('city-customers-list-tbody');
  if (!tbody) return;

  const filtered = state.activeCityCode 
    ? state.customers.filter(c => c.cityCode === state.activeCityCode)
    : state.customers;

  const titleNode = document.getElementById('city-customers-title');
  if (titleNode) {
    const cityName = state.activeCityCode ? TURKEY_CITIES[state.activeCityCode] : 'Tüm Türkiye';
    titleNode.textContent = `${cityName} Sipariş Veren Müşteriler (${filtered.length})`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="table-empty">Bu ilde sipariş veren kayıtlı müşteri bulunamadı.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = '';
  filtered.forEach(c => {
    const tr = document.createElement('tr');
    
    // Beden ölçü kutuları (mm)
    const sizesHtml = `
      <div class="finger-sizes-grid">
        <div class="finger-badge" title="Baş Parmak"><span class="finger-name">BAŞ</span><span class="finger-val">${c.sizes?.thumb || 10}mm</span></div>
        <div class="finger-badge" title="İşaret Parmağı"><span class="finger-name">İŞAR</span><span class="finger-val">${c.sizes?.index || 10}mm</span></div>
        <div class="finger-badge" title="Orta Parmak"><span class="finger-name">ORTA</span><span class="finger-val">${c.sizes?.middle || 10}mm</span></div>
        <div class="finger-badge" title="Yüzük Parmağı"><span class="finger-name">YÜZ</span><span class="finger-val">${c.sizes?.ring || 10}mm</span></div>
        <div class="finger-badge" title="Serçe Parmağı"><span class="finger-name">SERÇ</span><span class="finger-val">${c.sizes?.pinky || 10}mm</span></div>
      </div>
    `;

    // Geçmiş sipariş çipleri
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
      <td style="color: var(--text-muted); font-size:12px;">${c.address || '<span class="text-muted">—</span>'}</td>
    `;
    tbody.appendChild(tr);
  });
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
        <td colspan="8" class="table-empty">Henüz hiç kayıtlı müşteri yok. Sağ üstten "Yeni Müşteri Ekle" butonuna basarak ekleyebilirsiniz.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = '';
  state.customers.forEach(c => {
    const tr = document.createElement('tr');
    const cityName = TURKEY_CITIES[c.cityCode] || `Plaka ${c.cityCode}`;

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
      <td><span class="badge" style="background: rgba(199, 163, 108, 0.15); color: var(--color-accent-gold); font-size:11px; font-weight:700;">${cityName}</span></td>
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
      const name = document.getElementById('c-name').value.trim();
      const cityCode = document.getElementById('c-city').value;
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
  document.getElementById('c-city').value = c.cityCode;
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

// B. Excel/CSV Formatında Dışa Aktarma
window.exportProductsToCSV = function() {
  const bom = "\uFEFF";
  let csvContent = bom + "Ürün Kodu;Ürün Adı;Kategori;Normal Fiyat (Site);Satış Fiyatı (Site);Seçenek Maliyeti;Net Kar;KDV;Önerilen Genel Toplam;Fiyat Farkı;Fiyatlandırma Notları\n";
  
  state.products.forEach(product => {
    const pricing = calculateDetailedPricing(product);
    const sellingPrice = product.discountedPrice > 0 ? product.discountedPrice : product.undiscountedPrice;
    const diff = pricing.roundedGrandTotal - sellingPrice;
    const userPricing = product.userPricing || { notes: '' };
    const notesClean = (userPricing.notes || '').replace(/[\n\r;]/g, ' ');
    
    csvContent += `"${product.code}";"${product.title.replace(/"/g, '""')}";"${(product.category || 'Genel').replace(/"/g, '""')}";${product.undiscountedPrice};${product.discountedPrice};${pricing.cost};${pricing.profit};${pricing.kdv};${pricing.roundedGrandTotal};${diff};"${notesClean}"\n`;
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
