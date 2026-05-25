const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database File Paths
const CONFIG_FILE = path.join(__dirname, 'config.json');
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const USER_DATA_FILE = path.join(__dirname, 'user_data.json');
const CUSTOMERS_FILE = path.join(__dirname, 'customers.json');

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
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
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
// REST API ROUTES
// ==========================================

// Müşteri CRM & Harita API Rotaları (CRUD)
// 1. Tüm müşterileri getir
app.get('/api/customers', (req, res) => {
  const customers = readJsonFile(CUSTOMERS_FILE, []);
  res.json(customers);
});

// 2. Müşteri ekle veya güncelle
app.post('/api/customers', (req, res) => {
  const customer = req.body;
  const customers = readJsonFile(CUSTOMERS_FILE, []);

  if (!customer.id) {
    // Yeni müşteri oluştur
    customer.id = 'c-' + Date.now();
    // Parmak beden ölçüleri eksikse varsayılan 10 mm tanımla
    if (!customer.sizes) {
      customer.sizes = { thumb: 10, index: 10, middle: 10, ring: 10, pinky: 10 };
    }
    customers.push(customer);
  } else {
    // Mevcut müşteriyi güncelle
    const idx = customers.findIndex(c => c.id === customer.id);
    if (idx !== -1) {
      customers[idx] = {
        ...customers[idx],
        ...customer
      };
    } else {
      customers.push(customer);
    }
  }

  const success = writeJsonFile(CUSTOMERS_FILE, customers);
  if (success) {
    res.json({ success: true, customer });
  } else {
    res.status(500).json({ error: 'Müşteri bilgileri kaydedilemedi.' });
  }
});

// 3. Müşteri sil
app.delete('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  const customers = readJsonFile(CUSTOMERS_FILE, []);
  const filtered = customers.filter(c => c.id !== id);

  if (customers.length === filtered.length) {
    return res.status(404).json({ error: 'Müşteri bulunamadı.' });
  }

  const success = writeJsonFile(CUSTOMERS_FILE, filtered);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Müşteri silinemedi.' });
  }
});

// 4. Get default prices (SoT)
app.get('/api/config', (req, res) => {
  const config = readJsonFile(CONFIG_FILE, {
    kargo: 50, tips: 50, base: 40, top: 40,
    kalici1: 100, kalici2: 120, kalici3: 150,
    nailart: 80, ombre: 100, french: 90, charm: 30,
    karOrani: 40, toleransLimit: 10, yuvarlamaTipi: 'no'
  });
  
  // Ensure new fields exist even if file already existed with old schema
  let updated = false;
  if (config.karOrani === undefined) { config.karOrani = 40; updated = true; }
  if (config.toleransLimit === undefined) { config.toleransLimit = 10; updated = true; }
  if (config.yuvarlamaTipi === undefined) { config.yuvarlamaTipi = 'no'; updated = true; }
  if (updated) {
    writeJsonFile(CONFIG_FILE, config);
  }
  
  res.json(config);
});

// 2. Save default prices (SoT)
app.post('/api/config', (req, res) => {
  const newConfig = req.body;
  // Convert values to numbers except yuvarlamaTipi which is string
  for (const key in newConfig) {
    if (key === 'yuvarlamaTipi') {
      newConfig[key] = String(newConfig[key]);
    } else {
      newConfig[key] = parseFloat(newConfig[key]) || 0;
    }
  }
  const success = writeJsonFile(CONFIG_FILE, newConfig);
  if (success) {
    res.json({ success: true, config: newConfig });
  } else {
    res.status(500).json({ error: 'Fiyatlandırma ayarları kaydedilemedi.' });
  }
});

// 3. Get products merged with user pricing selections
app.get('/api/products', (req, res) => {
  const products = readJsonFile(PRODUCTS_FILE, []);
  const userData = readJsonFile(USER_DATA_FILE, {});

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
app.post('/api/products/:code', (req, res) => {
  const { code } = req.params;
  const pricingData = req.body; // Expects { checkedOptions, customPrices, notes }

  const userData = readJsonFile(USER_DATA_FILE, {});
  userData[code] = {
    checkedOptions: pricingData.checkedOptions || {},
    customPrices: pricingData.customPrices || {},
    notes: pricingData.notes || ''
  };

  const success = writeJsonFile(USER_DATA_FILE, userData);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Ürün değişiklikleri kaydedilemedi.' });
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
    const existingProducts = readJsonFile(PRODUCTS_FILE, []);
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

          return {
            title,
            code,
            category,
            undiscountedPrice,
            discountedPrice,
            imageUrl,
            url,
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
      writeJsonFile(PRODUCTS_FILE, finalProductsList);
      crawlStatus.lastSync = new Date().toLocaleString('tr-TR');
      console.log(`[Scraper] Smart sync complete. Local products: ${finalProductsList.length}`);
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

// Start Server
app.listen(PORT, () => {
  console.log(`===========================================================`);
  console.log(`  Nezlin Fiyatlandırma Sistemi (NFS) - Sunucu Başlatıldı!`);
  console.log(`  Adres: http://localhost:${PORT}`);
  console.log(`===========================================================`);
});
