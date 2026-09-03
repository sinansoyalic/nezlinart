const express = require('express');
const fs = require('fs');
const path = require('path');

// Helper: Load local .env variables safely if running locally (Zero Dependency dotenv parser)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    if (line.trim().startsWith('#') || !line.includes('=')) return;
    const parts = line.split('=');
    const key = parts[0].trim();
    let val = parts.slice(1).join('=').trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  });
}


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database File Paths
const CONFIG_FILE = path.join(__dirname, 'config.json');
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const USER_DATA_FILE = path.join(__dirname, 'user_data.json');
const CUSTOMERS_FILE = path.join(__dirname, 'customers.json');
const AUDIT_TRAIL_FILE = path.join(__dirname, 'audit_trail.jsonl');

// Real-Time Crawl Status State
let crawlStatus = {
  isCrawling: false,
  total: 0,
  current: 0,
  currentProduct: '',
  error: null,
  lastSync: null
};

// Helper: Read JSON safely
function readJsonFile(filePath, defaultData = {}) {
  try {
    if (!fs.existsSync(filePath)) {
      try {
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
      } catch (writeErr) {
        // Silently catch write errors in serverless read-only file systems (like Netlify / AWS Lambda)
        console.warn(`[Dosya Uyarısı] Salt-okunur ortam nedeniyle varsayılan dosya oluşturulamadı: ${filePath}`);
      }
      return defaultData;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content || JSON.stringify(defaultData));
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return defaultData;
  }
}

// Helper: Write JSON safely
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing file ${filePath}:`, err);
    return false;
  }
}

// Helper: Clean breadcrumb categories
function cleanCategory(categoryStr, title = '') {
  if (!categoryStr) return 'Genel';
  const parts = categoryStr.split(' > ')
    .map(p => p.trim())
    .filter(p => p && !p.includes('{{translate') && p.toLowerCase() !== 'anasayfa' && p.toLowerCase() !== title.toLowerCase());
  
  // Deduplicate keeping order
  const uniqueParts = [];
  for (const part of parts) {
    if (!uniqueParts.includes(part)) {
      uniqueParts.push(part);
    }
  }
  return uniqueParts.join(' > ') || 'Genel';
}

// Helper: Clean price string to float number
function parsePrice(priceStr) {
  if (!priceStr) return 0;
  // Clean all characters except digits, commas, and periods
  let cleanStr = priceStr.replace(/[^\d,\.]/g, '');
  // Ticimax format uses Turkish notation: e.g. 599.00 or 599,00 or 1.250,00
  if (cleanStr.includes(',') && cleanStr.includes('.')) {
    // If it has both, dots are thousand separators, commas are decimal: 1.250,00 -> 1250.00
    cleanStr = cleanStr.replace(/\./g, '').replace(',', '.');
  } else if (cleanStr.includes(',')) {
    // If only commas, it's decimal: 599,00 -> 599.00
    cleanStr = cleanStr.replace(',', '.');
  }
  const val = parseFloat(cleanStr);
  return isNaN(val) ? 0 : val;
}

// Helper: Slugify URL to create a fallback code
function slugToCode(url) {
  try {
    const parts = url.split('/');
    const slug = parts[parts.length - 1] || 'NC-FALLBACK';
    // NC101, TA02, etc. format or slug capitalized
    return slug.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10);
  } catch (e) {
    return 'NC-UNKNOWN';
  }
}

// ==========================================
// SUPABASE DATABASE CORE LAYER
// ==========================================
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// We only activate Supabase mode if credentials are set in environment variables
const isCloudMode = !!(supabaseUrl && supabaseKey);
const supabase = isCloudMode ? createClient(supabaseUrl, supabaseKey) : null;

if (isCloudMode) {
  console.log('[Sistem] Bulut Modu Aktif (Supabase Bağlantısı Kuruldu).');
} else {
  console.log('[Sistem] Yerel Mod Aktif (JSON Dosya Tabanlı Depolama Kullanılıyor).');
}

// 1. Read Config
async function getConfig() {
  if (isCloudMode) {
    try {
      const { data, error } = await supabase.from('nfs_config').select('*');
      if (error) throw error;
      if (data && data.length > 0) {
        const obj = {};
        data.forEach(row => {
          try {
            obj[row.key] = JSON.parse(row.value);
          } catch (e) {
            const numVal = parseFloat(row.value);
            obj[row.key] = isNaN(numVal) ? row.value : numVal;
          }
        });
        if (obj['paketleme'] === undefined) obj['paketleme'] = 70;
        if (obj['kargo'] === undefined) obj['kargo'] = 120;
        if (obj['sticker'] === undefined) obj['sticker'] = 20;
        if (obj['baski'] === undefined) obj['baski'] = 50;
        if (obj['kdvOrani'] === undefined) obj['kdvOrani'] = 20;
        if (obj['trendyolKomisyon'] === undefined) obj['trendyolKomisyon'] = 20.67;
        if (obj['hepsiburadaKomisyon'] === undefined) obj['hepsiburadaKomisyon'] = 15;
        if (obj['iyzicoOrani'] === undefined) obj['iyzicoOrani'] = 4.29;
        if (obj['digerVergiOrani'] === undefined) obj['digerVergiOrani'] = 5;
        return obj;
      }
    } catch (err) {
      console.error('[Supabase Error] Failed to read nfs_config:', err);
    }
  }
  
  return readJsonFile(CONFIG_FILE, {
    paketleme: 70, kargo: 120, tips: 50, base: 40, top: 40,
    kalici1: 100, kalici2: 120, kalici3: 150,
    nailart: 80, ombre: 100, french: 90, charm: 30, sticker: 20, baski: 50,
    karOrani: 40, kdvOrani: 20,
    trendyolKomisyon: 20.67, hepsiburadaKomisyon: 15,
    iyzicoOrani: 4.29, digerVergiOrani: 5,
    toleransLimit: 10, yuvarlamaTipi: 'no'
  });
}

// 2. Save Config
async function saveConfig(config) {
  writeJsonFile(CONFIG_FILE, config);
  if (isCloudMode) {
    try {
      const now = new Date().toISOString();
      const rows = Object.entries(config).map(([key, val]) => ({
        key,
        value: typeof val === 'object' ? JSON.stringify(val) : String(val),
        created_at: now
      }));
      
      const { error } = await supabase.from('nfs_config').upsert(rows);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('[Supabase Error] Failed to save nfs_config:', err);
      return false;
    }
  }
  return true;
}

// 3. Read Products
async function getProducts() {
  const localProducts = readJsonFile(PRODUCTS_FILE, []);
  const localMap = new Map(localProducts.map(p => [p.url, p]));

  if (isCloudMode) {
    try {
      const { data, error } = await supabase.from('nfs_products').select('*');
      if (error) throw error;
      if (data && data.length > 0) {
        return data.map(p => {
          const local = localMap.get(p.url) || {};
          return {
            ...p,
            stock: p.stock !== undefined ? p.stock : (local.stock !== undefined ? local.stock : 0),
            inStock: p.inStock !== undefined ? p.inStock : (local.inStock !== undefined ? local.inStock : true)
          };
        });
      }
    } catch (err) {
      console.error('[Supabase Error] Failed to read nfs_products:', err);
    }
  }
  return localProducts;
}

// 4. Save Products
async function saveProducts(products) {
  // Always keep local JSON file synchronized
  writeJsonFile(PRODUCTS_FILE, products);

  if (isCloudMode) {
    try {
      if (products.length === 0) return true;
      const cleanedProducts = products.map(p => {
        const { stock, inStock, ...rest } = p;
        return {
          ...rest,
          created_at: p.created_at || new Date().toISOString()
        };
      });
      const { error } = await supabase.from('nfs_products').upsert(cleanedProducts);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('[Supabase Error] Failed to save nfs_products:', err);
      return false;
    }
  }
  return true;
}

// 5. Read User Data
async function getUserData() {
  if (isCloudMode) {
    try {
      const { data, error } = await supabase.from('nfs_user_data').select('*');
      if (error) throw error;
      
      const obj = {};
      if (data) {
        data.forEach(row => {
          obj[row.code] = {
            checkedOptions: row.checkedOptions || {},
            customPrices: row.customPrices || {},
            notes: row.notes || ''
          };
        });
      }
      return obj;
    } catch (err) {
      console.error('[Supabase Error] Failed to read nfs_user_data:', err);
    }
  }
  return readJsonFile(USER_DATA_FILE, {});
}

// 6. Save Single User Product Selection
async function saveSingleProductData(code, pricingData) {
  const userData = readJsonFile(USER_DATA_FILE, {});
  userData[code] = pricingData;
  writeJsonFile(USER_DATA_FILE, userData);

  if (isCloudMode) {
    try {
      const row = {
        code,
        checkedOptions: pricingData.checkedOptions || {},
        customPrices: pricingData.customPrices || {},
        notes: pricingData.notes || '',
        created_at: new Date().toISOString()
      };
      const { error } = await supabase.from('nfs_user_data').upsert(row);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('[Supabase Error] Failed to save nfs_user_data row:', err);
      return false;
    }
  }
  return true;
}

// 7. Read Customers
async function getCustomers() {
  if (isCloudMode) {
    try {
      const { data, error } = await supabase.from('nfs_customers').select('*');
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('[Supabase Error] Failed to read nfs_customers:', err);
    }
  }
  return readJsonFile(CUSTOMERS_FILE, []);
}

// 8. Save Customer
async function saveCustomer(customer) {
  const customers = readJsonFile(CUSTOMERS_FILE, []);
  const idx = customers.findIndex(c => c.id === customer.id);
  if (idx !== -1) {
    customers[idx] = { ...customers[idx], ...customer };
  } else {
    customers.push(customer);
  }
  writeJsonFile(CUSTOMERS_FILE, customers);

  if (isCloudMode) {
    try {
      const row = {
        ...customer,
        created_at: customer.created_at || new Date().toISOString()
      };
      const { error } = await supabase.from('nfs_customers').upsert(row);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('[Supabase Error] Failed to save nfs_customers:', err);
      return false;
    }
  }
  return true;
}

// 9. Delete Customer
async function deleteCustomer(id) {
  const customers = readJsonFile(CUSTOMERS_FILE, []);
  const filtered = customers.filter(c => c.id !== id);
  writeJsonFile(CUSTOMERS_FILE, filtered);

  if (isCloudMode) {
    try {
      const { error } = await supabase.from('nfs_customers').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('[Supabase Error] Failed to delete nfs_customers:', err);
      return false;
    }
  }
  return true;
}

// ==========================================
// REST API ROUTES
// ==========================================

// Müşteri CRM & Harita API Rotaları (CRUD)
// 1. Tüm müşterileri getir
app.get('/api/customers', async (req, res) => {
  const customers = await getCustomers();
  res.json(customers);
});

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

// 2. Müşteri ekle veya güncelle
app.post('/api/customers', async (req, res) => {
  const customer = req.body;
  
  if (customer.name) {
    customer.name = maskName(customer.name);
  }
  
  if (!customer.id) {
    customer.id = 'c-' + Date.now();
    if (!customer.sizes) {
      customer.sizes = { thumb: 10, index: 10, middle: 10, ring: 10, pinky: 10 };
    }
  }

  const success = await saveCustomer(customer);
  if (success) {
    res.json({ success: true, customer });
  } else {
    res.status(500).json({ error: 'Müşteri bilgileri kaydedilemedi.' });
  }
});

// 3. Müşteri sil
app.delete('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  const success = await deleteCustomer(id);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Müşteri silinemedi.' });
  }
});

// 4. Get default prices (SoT)
app.get('/api/config', async (req, res) => {
  const config = await getConfig();
  res.json(config);
});

// 2. Save default prices (SoT)
app.post('/api/config', async (req, res) => {
  const newConfig = req.body;
  // Convert values to numbers except yuvarlamaTipi which is string, and costCalculatorData which is object
  for (const key in newConfig) {
    if (key === 'yuvarlamaTipi') {
      newConfig[key] = String(newConfig[key]);
    } else if (key === 'costCalculatorData') {
      // Keep object/array structure intact
      newConfig[key] = newConfig[key];
    } else {
      newConfig[key] = parseFloat(newConfig[key]) || 0;
    }
  }

  const oldConfig = await getConfig();
  
  // Compare to see if there is an actual difference
  let isChanged = false;
  for (const key in newConfig) {
    if (oldConfig[key] !== newConfig[key]) {
      isChanged = true;
      break;
    }
  }

  if (isChanged) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      code: "SOT_CONFIG",
      editor: "Yönetici",
      oldPricing: oldConfig,
      newPricing: newConfig
    };
    try {
      fs.appendFileSync(AUDIT_TRAIL_FILE, JSON.stringify(logEntry) + '\n', 'utf8');
    } catch (err) {
      console.error('[Audit Log] Failed to append config audit trail:', err);
    }
  }

  const success = await saveConfig(newConfig);
  if (success) {
    res.json({ success: true, config: newConfig });
  } else {
    res.status(500).json({ error: 'Fiyatlandırma ayarları kaydedilemedi.' });
  }
});

// 3. Get products merged with user pricing selections
app.get('/api/products', async (req, res) => {
  const products = await getProducts();
  const userData = await getUserData();

  const merged = products.map(product => {
    const userState = userData[product.code] || {
      checkedOptions: {},
      customPrices: {},
      notes: ''
    };
    return {
      ...product,
      userPricing: userState
    };
  });

  res.json({
    products: merged,
    lastSync: crawlStatus.lastSync || (products.length > 0 ? 'Mevcut veritabanı' : null)
  });
});

// 4. Save user pricing state for a specific product code
app.post('/api/products/:code', async (req, res) => {
  const { code } = req.params;
  const pricingData = req.body; // Expects { checkedOptions, customPrices, notes }
  
  // Read current userData state before saving
  const userData = await getUserData();
  const oldPricing = userData[code] || { checkedOptions: {}, customPrices: {}, notes: '' };
  
  // Compare choices
  const oldChecked = oldPricing.checkedOptions || {};
  const newChecked = pricingData.checkedOptions || {};
  const oldCustom = oldPricing.customPrices || {};
  const newCustom = pricingData.customPrices || {};
  
  const isChanged = JSON.stringify(oldChecked) !== JSON.stringify(newChecked) ||
                    JSON.stringify(oldCustom) !== JSON.stringify(newCustom) ||
                    (oldPricing.notes || '') !== (pricingData.notes || '');
                    
  if (isChanged) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      code,
      editor: pricingData.editor || "Yönetici",
      oldPricing: {
        checkedOptions: oldChecked,
        customPrices: oldCustom,
        notes: oldPricing.notes || ''
      },
      newPricing: {
        checkedOptions: newChecked,
        customPrices: newCustom,
        notes: pricingData.notes || ''
      }
    };
    try {
      fs.appendFileSync(AUDIT_TRAIL_FILE, JSON.stringify(logEntry) + '\n', 'utf8');
    } catch (err) {
      console.error('[Audit Log] Failed to append product pricing audit trail:', err);
    }
  }

  const success = await saveSingleProductData(code, pricingData);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Ürün değişiklikleri kaydedilemedi.' });
  }
});

// 4.05. Get Audit Trail logs
app.get('/api/audit-trail', (req, res) => {
  if (!fs.existsSync(AUDIT_TRAIL_FILE)) {
    return res.json([]);
  }
  try {
    const fileContent = fs.readFileSync(AUDIT_TRAIL_FILE, 'utf8');
    const lines = fileContent.split('\n').filter(line => line.trim().length > 0);
    const logs = lines.map(line => JSON.parse(line));
    res.json(logs.reverse()); // Newest first
  } catch (err) {
    console.error('Audit trail read failed:', err);
    res.status(500).json({ error: 'Değişiklik günlüğü okunamadı.' });
  }
});

// 4.1. Admin Password verification
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nezlinart123';
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'auth-token-' + ADMIN_PASSWORD.slice(0, 4) });
  } else {
    res.status(401).json({ success: false, error: 'Hatalı şifre. Lütfen tekrar deneyin.' });
  }
});

// Helper: Automated Git Commit & Push for Localhost
const { exec } = require('child_process');

function runGitPush(message = 'feat: sync products and system data to live') {
  return new Promise((resolve, reject) => {
    // Skip if running inside Netlify or Lambda
    if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      return resolve({ skipped: true, reason: 'Sunucusuz (serverless) ortam' });
    }
    const safeMsg = (message || 'feat: automated live sync').replace(/"/g, '\\"');
    const cmd = `git add -A && git commit -m "${safeMsg}" && git push origin main`;
    
    exec(cmd, { cwd: __dirname }, (err, stdout, stderr) => {
      if (err) {
        const fullOut = (stdout || '') + (stderr || '');
        if (fullOut.includes('nothing to commit') || fullOut.includes('working tree clean')) {
          console.log('[Git Push] Çalışma dizini zaten temiz, yeni değişiklik yok.');
          return resolve({ success: true, message: 'Değişiklik yok, depo zaten güncel.' });
        }
        console.error('[Git Push Hatası]:', stderr || err.message);
        return reject(new Error(stderr || err.message));
      }
      console.log('[Git Push Başarılı]:', stdout);
      resolve({ success: true, stdout });
    });
  });
}

// 4.2. Direct Git Push to GitHub / Netlify
app.post('/api/git-push', async (req, res) => {
  try {
    const result = await runGitPush(req.body.message || 'feat: manual sync push to live');
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Get scraper status
app.get('/api/fetch-status', (req, res) => {
  res.json(crawlStatus);
});

// 6. Trigger active scraper crawl
app.post('/api/fetch-data', (req, res) => {
  if (crawlStatus.isCrawling) {
    return res.status(400).json({ error: 'Veri çekme işlemi zaten devam ediyor.' });
  }

  // Start scraper asynchronously
  runScraper().catch(err => {
    console.error('Scraper fatal error:', err);
    crawlStatus.isCrawling = false;
    crawlStatus.error = err.message;
  });

  res.json({ success: true, message: 'Veri çekme işlemi arka planda başlatıldı.' });
});

// 7. Backup all system configurations, user selection states and CRM customers
app.get('/api/backup', async (req, res) => {
  try {
    const config = await getConfig();
    const userData = await getUserData();
    const customers = await getCustomers();
    const backupData = {
      config,
      userData,
      customers,
      timestamp: new Date().toISOString(),
      source: 'Nezlin Pricing System (NFS)'
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=nfs_backup_${Date.now()}.json`);
    res.json(backupData);
  } catch (err) {
    console.error('Backup generation failed:', err);
    res.status(500).json({ error: 'Yedekleme oluşturulamadı.' });
  }
});

// 8. Restore system backup dataset
app.post('/api/restore', async (req, res) => {
  try {
    const { config, userData, customers } = req.body;
    if (!config || !userData || !customers) {
      return res.status(400).json({ error: 'Geçersiz yedekleme dosyası formatı.' });
    }
    
    // Save Config
    await saveConfig(config);
    
    // Save User Data (selections, prices, notes)
    if (isCloudMode) {
      const rows = Object.entries(userData).map(([code, data]) => ({
        code,
        checkedOptions: data.checkedOptions || {},
        customPrices: data.customPrices || {},
        notes: data.notes || ''
      }));
      await supabase.from('nfs_user_data').upsert(rows);
    } else {
      writeJsonFile(USER_DATA_FILE, userData);
    }
    
    // Save Customers
    if (isCloudMode) {
      await supabase.from('nfs_customers').upsert(customers);
    } else {
      writeJsonFile(CUSTOMERS_FILE, customers);
    }
    
    res.json({ success: true, message: 'Yedekleme başarıyla geri yüklendi.' });
  } catch (err) {
    console.error('Error during restore operation:', err);
    res.status(500).json({ error: 'Yedekleme geri yüklenirken sistemsel hata oluştu.' });
  }
});

// ==========================================
// E-COMMERCE SCRAPER ENGINE
// ==========================================

async function runScraper() {
  crawlStatus.isCrawling = true;
  crawlStatus.current = 0;
  crawlStatus.total = 0;
  crawlStatus.currentProduct = 'Sitemap okunuyor...';
  crawlStatus.error = null;

  try {
    const sitemapUrl = 'https://nezlincollection.com/sitemap/products/0.xml';
    console.log(`[Scraper] Fetching sitemap: ${sitemapUrl}`);
    
    const response = await fetch(sitemapUrl);
    if (!response.ok) {
      throw new Error(`Sitemap alınamadı (HTTP ${response.status})`);
    }
    
    const xml = await response.text();
    
    // Parse sitemap product URLs and their lastmod dates
    const sitemapProducts = [];
    const urlBlockRegex = /<url>([\s\S]*?)<\/url>/gi;
    let uMatch;
    while ((uMatch = urlBlockRegex.exec(xml)) !== null) {
      const block = uMatch[1];
      const locM = block.match(/<loc>([^<]+)<\/loc>/i);
      const lastmodM = block.match(/<lastmod>([^<]+)<\/lastmod>/i);
      if (locM) {
        sitemapProducts.push({
          url: locM[1].trim(),
          lastmod: lastmodM ? lastmodM[1].trim() : ''
        });
      }
    }

    if (sitemapProducts.length === 0) {
      throw new Error('Sitemap içinde ürün linki bulunamadı.');
    }

    // Load existing local products database
    const existingProducts = await getProducts();
    const existingProductsMap = new Map(existingProducts.map(p => [p.url, p]));

    // Eşleştir & Karşılaştır: Compare lastmod dates to find only new or updated products
    const toCrawl = sitemapProducts.filter(sp => {
      const existing = existingProductsMap.get(sp.url);
      // Crawl if: 
      // 1. It is a brand new product 
      // 2. It has been updated on the site 
      // 3. Missing crucial crawl data (code, title)
      // 4. Missing price information (undiscountedPrice is 0 or undefined, meaning it failed in an earlier crawl)
      return !existing || 
             existing.lastmod !== sp.lastmod || 
             !existing.code || 
             !existing.title || 
             existing.undiscountedPrice === undefined || 
             existing.undiscountedPrice === null ||
             existing.undiscountedPrice === 0;
    });

    console.log(`[Scraper] Sitemap: ${sitemapProducts.length} ürün. Güncellenmesi gereken: ${toCrawl.length} ürün.`);

    // If everything is up-to-date, skip crawling!
    if (toCrawl.length === 0) {
      console.log('[Scraper] All products are already up-to-date! Skipping crawl.');
      crawlStatus.isCrawling = false;
      crawlStatus.current = sitemapProducts.length;
      crawlStatus.total = sitemapProducts.length;
      // Truncate to tell frontend everything is clean
      crawlStatus.currentProduct = '__UP_TO_DATE__';
      crawlStatus.lastSync = new Date().toLocaleString('tr-TR');
      return;
    }

    crawlStatus.total = toCrawl.length;
    
    const crawledProducts = [];
    const CONCURRENCY = 3; // Paced crawling batch size
    
    // Process URLs in batches to be gentle on the server
    for (let i = 0; i < toCrawl.length; i += CONCURRENCY) {
      const batch = toCrawl.slice(i, i + CONCURRENCY);
      
      const promises = batch.map(async (sp, index) => {
        const itemIndex = i + index + 1;
        const url = sp.url;
        const lastmod = sp.lastmod;
        
        try {
          console.log(`[Scraper] [${itemIndex}/${toCrawl.length}] Fetching: ${url}`);
          const res = await fetch(url);
          if (!res.ok) {
            console.warn(`[Scraper] Failed to fetch product ${url} (HTTP ${res.status})`);
            return null;
          }
          
          const html = await res.text();
          
          // 1. Title
          let title = '';
          const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
          if (titleMatch) {
            title = titleMatch[1].replace(' - Nezlin Collection', '').trim();
          }

          // 2. Stock Code (Stok Kodu)
          let code = '';
          const modelMatch = html.match(/var\s+productDetailModel\s*=\s*({[\s\S]*?});/i);
          let model = null;
          if (modelMatch) {
            try {
              model = JSON.parse(modelMatch[1]);
              if (model.stockCode) code = model.stockCode.trim();
              if (model.productName) title = model.productName.trim();
            } catch (e) {
              console.warn('[Scraper] JSON parsing productDetailModel failed, trying regex backups...');
              const stockMatch = modelMatch[1].match(/"stockCode"\s*:\s*"([^"]+)"/);
              if (stockMatch) code = stockMatch[1].trim();
              const nameMatch = modelMatch[1].match(/"productName"\s*:\s*"([^"]+)"/);
              if (nameMatch) title = nameMatch[1].trim();
            }
          }

          // Fallbacks for Stock Code
          if (!code) {
            const codeRegex = /class=["']productStokKoduSpan["'][^>]*>([^<]+)</i;
            const codeMatch = html.match(codeRegex);
            if (codeMatch) {
              code = codeMatch[1].trim();
            } else {
              // Try to find any NCxxx format inside title or HTML
              const ncMatch = html.match(/NC\d+/i) || html.match(/[A-Z]{2}\d+/i);
              if (ncMatch) {
                code = ncMatch[0];
              } else {
                // Generate a beautiful clean code from the slug
                code = slugToCode(url);
              }
            }
          }

          // 3. Category breadcrumbs
          let category = 'Genel';
          const breadcrumbRegex = /<span\s+itemprop=["']name["']>([^<]+)<\/span>/gi;
          const breadcrumbs = [];
          let bMatch;
          while ((bMatch = breadcrumbRegex.exec(html)) !== null) {
            breadcrumbs.push(bMatch[1].trim());
          }
          if (breadcrumbs.length > 0) {
            const rawCat = breadcrumbs.join(' > ');
            category = cleanCategory(rawCat, title);
          }

          // 4 & 5. Undiscounted & Discounted Prices (Extracted from nested product JSON or HTML)
          let undiscountedPrice = 0;
          let discountedPrice = 0;

          if (model && model.product) {
            const rawSatis = model.product.satisFiyatiStr || '';
            const rawIndirim = model.product.indirimliFiyatiStr || '';
            
            undiscountedPrice = parsePrice(rawSatis);
            discountedPrice = parsePrice(rawIndirim);
            
            // Fallback for undiscounted price if String parsing failed but number exists
            if (undiscountedPrice === 0 && model.product.satisFiyati) {
              const hasKdv = model.product.kdvDahil === true;
              const kdvRate = parseFloat(model.product.kdvOrani) || 0;
              undiscountedPrice = hasKdv ? model.product.satisFiyati : model.product.satisFiyati * (1 + kdvRate / 100);
            }
            
            if (discountedPrice === 0 || rawIndirim === '₺0,00' || rawIndirim === '0') {
              discountedPrice = undiscountedPrice;
            }
          }

          // HTML Regex Fallbacks (in case JS object is not present or failed)
          if (undiscountedPrice === 0) {
            const regPriceMatch = html.match(/<span\s+class=["']regularPriceSpan["'][^>]*>([^<]+)</i);
            if (regPriceMatch) {
              undiscountedPrice = parsePrice(regPriceMatch[1]);
            }
          }

          if (discountedPrice === 0) {
            const discPriceMatch = html.match(/<span\s+class=["']discountPriceSpan["'][^>]*>([^<]+)</i);
            if (discPriceMatch) {
              discountedPrice = parsePrice(discPriceMatch[1]);
            } else {
              discountedPrice = undiscountedPrice;
            }
          }

          // 6. First Image URL (using og:image)
          let imageUrl = '';
          const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+itemprop=["']image["']\s+content=["']([^"']+)["']/i) ||
                             html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
          if (imageMatch) {
            imageUrl = imageMatch[1];
          }

          // HTML Entity Decoding for Title and Category
          title = title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          category = category.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

          crawlStatus.current = itemIndex;
          crawlStatus.currentProduct = title;

          let stock = 0;
          let inStock = true;
          if (model) {
            stock = model.totalStockAmount !== undefined ? model.totalStockAmount : (model.product ? model.product.stokAdedi : 0);
            inStock = stock > 0;
          }

          return {
            title,
            code,
            category,
            undiscountedPrice,
            discountedPrice,
            imageUrl,
            url,
            stock,
            inStock,
            lastmod // Store sitemap modification date
          };
        } catch (err) {
          console.error(`[Scraper] Error scraping ${url}:`, err);
          return null;
        }
      });

      const batchResults = await Promise.all(promises);
      for (const res of batchResults) {
        if (res) crawledProducts.push(res);
      }

      // Add a tiny delay (100ms) to pace requests nicely
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Merge newly crawled products into existing ones
    crawledProducts.forEach(p => {
      existingProductsMap.set(p.url, p);
    });

    // Prune products that are no longer in the sitemap (i.e. deleted from live store)
    const sitemapUrls = new Set(sitemapProducts.map(sp => sp.url));
    const finalProductsList = Array.from(existingProductsMap.values())
      .filter(p => sitemapUrls.has(p.url));

    // Save final combined lists to database
    if (finalProductsList.length > 0) {
      const saveOk = await saveProducts(finalProductsList);
      if (!saveOk) {
        throw new Error('Ürünler veritabanına kaydedilemedi.');
      }
      crawlStatus.lastSync = new Date().toLocaleString('tr-TR');
      console.log(`[Scraper] Smart sync complete. Products: ${finalProductsList.length}`);

      // Suggestion: Otomatik olarak GitHub & Netlify'a pushla (Sadece localhost üzerinde çalışır)
      try {
        console.log('[Scraper] Canlıya (GitHub & Netlify) otomatik push başlatılıyor...');
        await runGitPush(`feat: sync ${finalProductsList.length} products from site`);
        console.log('[Scraper] Canlıya push işlemi başarıyla tamamlandı.');
      } catch (pushErr) {
        console.warn('[Scraper] Otomatik push atlandı veya hata verdi:', pushErr.message);
      }
    } else {
      throw new Error('Hiçbir ürün bilgisi çekilemedi.');
    }

    crawlStatus.isCrawling = false;
  } catch (err) {
    console.error('[Scraper] Error during crawl operation:', err);
    crawlStatus.isCrawling = false;
    crawlStatus.error = err.message;
  }
}

// Start Server conditionally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===========================================================`);
    console.log(`  Nezlin Fiyatlandırma Sistemi (NFS) - Sunucu Başlatıldı!`);
    console.log(`  Adres: http://localhost:${PORT}`);
    console.log(`===========================================================`);

    // Suggestion 38: Otomatik Senkronizasyon Zamanlayıcısı (Automated background sync every 30 mins)
    // Otomatik zamanlayıcı Netlify limitlerini ve kotaları korumak amacıyla tamamen devre dışı bırakılmıştır.
    // const AUTO_SYNC_INTERVAL = 30 * 60 * 1000;
    // setInterval(() => {
    //   console.log('[Zamanlayıcı] Otomatik arka plan senkronizasyonu kontrol ediliyor...');
    //   if (!crawlStatus.isCrawling) {
    //     console.log('[Zamanlayıcı] Sessiz otomatik senkronizasyon başlatılıyor...');
    //     runScraper().then(() => {
    //       console.log('[Zamanlayıcı] Otomatik arka plan senkronizasyonu tamamlandı.');
    //     }).catch(err => {
    //       console.error('[Zamanlayıcı Hata] Otomatik senkronizasyon başarısız:', err);
    //     });
    //   } else {
    //     console.log('[Zamanlayıcı] Aktif bir senkronizasyon zaten çalışıyor, atlandı.');
    //   }
    // }, AUTO_SYNC_INTERVAL);
  });
}

module.exports = app;
