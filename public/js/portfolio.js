/* ==========================================================================
   NEZLIN ART PORTFOLIO - CORE ENGINE & ART GALLERY INTERACTION
   ========================================================================== */

// Curated Masterpiece Dataset (Real Premium Hand Shots Scraped from nezlincollection.com)
const PORTFOLIO_PRODUCTS = [
  {
    code: "NC123",
    title: "Bat Blood",
    category: "GOTHIC ROMANCE",
    mainImage: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bat-blood-5-41cd.jpg",
    secondaryImages: [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bat-blood-5-41cd.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bat-blood-2051-4.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bat-blood-09c-45.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bat-blood-f4e822.jpg"
    ],
    details: [
      "Individually hand-detailed dark gothic Bat Blood themed artwork.",
      "Delicate gold foil and liquid-blood crimson drip elements.",
      "Protected with a premium dual-coat high gloss UV gel."
    ],
    medium: "Bespoke Salon Gel Lacquer & Gold Foil",
    canvas: "Stiletto Shape Structured Nail Extensions",
    year: "2026",
    url: "https://nezlincollection.com/bat-blood-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-halloween-nc123"
  },
  {
    code: "NC126",
    title: "Ancestor Blood",
    category: "ORIENTAL MYSTIQUE",
    mainImage: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancestor-blood-7-8486.jpg",
    secondaryImages: [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancestor-blood-7-8486.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancestor-blood-4-4c5d.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancestor-blood-ad3641.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancestor-blood-4f-490.jpg"
    ],
    details: [
      "Bespoke Japanese-inspired Koi Fish & Imperial Dragon accents.",
      "Intricately layered hand-painting with metallic gold outlines.",
      "Reinforced tips with structured builder base coat overlays."
    ],
    medium: "Hand-Painted Fine Gels & Chromatic Ink",
    canvas: "Long Coffin Structured Nail Extensions",
    year: "2026",
    url: "https://nezlincollection.com/ancestor-blood-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-koi-fish-dragon-nc126"
  },
  {
    code: "NC132",
    title: "Ruby Present",
    category: "GOTHIC ROMANCE",
    mainImage: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ruby-present-2-41d6.jpg",
    secondaryImages: [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ruby-present-2-41d6.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ruby-present-d-d697.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ruby-present-e76f-4.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ruby-present-483ef0.jpg"
    ],
    details: [
      "Deep royal ruby red base coat with velvet magnetic patterns.",
      "Silver starburst accents and hand-painted bow detailing.",
      "Bespoke fit designed from personalized digital size charts."
    ],
    medium: "Magnetic Velvet Gels & High-Glam Ornaments",
    canvas: "Medium Almond Shape Extensions",
    year: "2026",
    url: "https://nezlincollection.com/ruby-present-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-christmas-nc132"
  },
  {
    code: "NC133",
    title: "Pine Beauty",
    category: "HOLIDAY SPLENDOR",
    mainImage: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pine-beauty-2f1a2b.jpg",
    secondaryImages: [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pine-beauty-2f1a2b.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pine-beauty-899b-c.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pine-beauty--4570-.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pine-beauty-1-468a.jpg"
    ],
    details: [
      "Warm evergreen pine baseline with exquisite gold leaf trails.",
      "3D metallic gold details and seasonal holiday decals.",
      "Ergonomic structural flexibility matching natural nail curvature."
    ],
    medium: "Chrome Outlines, Gold Leaf & Alpine Gels",
    canvas: "Medium Square Shape Extensions",
    year: "2026",
    url: "https://nezlincollection.com/pine-beauty-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-christmas-nc133"
  },
  {
    code: "NC134",
    title: "Royal Winter",
    category: "HOLIDAY SPLENDOR",
    mainImage: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/royal-winter-64-54e.jpg",
    secondaryImages: [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/royal-winter-64-54e.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/royal-winter-7ff276.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/royal-winter-ef-251.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/royal-winter-7-8f5d.jpg"
    ],
    details: [
      "Crystalline blue ombré base with delicate hand-drawn snowflakes.",
      "Embedded diamond micro-glitter for a frosted look.",
      "Re-wearable set complete with bespoke prep sizing kits."
    ],
    medium: "Soft Ombré Gels, Frosted Flakes & Diamond Dust",
    canvas: "Elongated Almond Extensions",
    year: "2026",
    url: "https://nezlincollection.com/royal-winter-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc134"
  },
  {
    code: "NC117",
    title: "Pretty Witch Lace",
    category: "GOTHIC ROMANCE",
    mainImage: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/shiny-claws-e-98b9.jpg",
    secondaryImages: [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/shiny-claws-e-98b9.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/shiny-claws-1-863f.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/shiny-claws--0b36b.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/shiny-claws-66-4a1.jpg"
    ],
    details: [
      "Gothic lace detailing meticulously hand-painted with black gel.",
      "Silver bow ribbons and baroque crucifix metal accents.",
      "A stunning contrast of sheer blush pink and solid onyx."
    ],
    medium: "Onyx Lace Hand-Drawing & Baroque Metal Charms",
    canvas: "Long Stiletto Structured Extensions",
    year: "2026",
    url: "https://nezlincollection.com/pretty-witch-lace-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc117"
  },
  {
    code: "NC118",
    title: "Jaguar Paws",
    category: "ORIENTAL MYSTIQUE",
    mainImage: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/jaguar-paws-e-deb6.jpg",
    secondaryImages: [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/jaguar-paws-e-deb6.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/jaguar-paws-7-e810.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/jaguar-paws-11899b.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/jaguar-paws-263-bf.jpg"
    ],
    details: [
      "Hand-spotted wild jaguar animalier print overlays.",
      "Soft watercolor blooming effects with luxury gold frames.",
      "Perfect ergonomic balance between comfort and extension length."
    ],
    medium: "Blooming Watercolor & Gold Chrome Inks",
    canvas: "Structured Square Extension Shapes",
    year: "2026",
    url: "https://nezlincollection.com/jaguar-paws-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-french-blooming-nc118"
  },
  {
    code: "NC127",
    title: "Office Blue",
    category: "MINIMALIST LUXE",
    mainImage: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/office-blue-f815e8.jpg",
    secondaryImages: [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/office-blue-f815e8.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/office-blue-078-7b.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/office-blue--828d-.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/office-blue-4698-8.jpg"
    ],
    details: [
      "Modern steel-blue matte base with metallic silver striping.",
      "Refined daily premium visual style for effortless high fashion.",
      "Reinforced free edges for maximum wear longevity."
    ],
    medium: "Matte Finishes & Metallic Linear Foiling",
    canvas: "Active-Length Square Shapes",
    year: "2026",
    url: "https://nezlincollection.com/office-blue-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc127"
  },
  {
    code: "NC131",
    title: "Berry Christmas",
    category: "HOLIDAY SPLENDOR",
    mainImage: "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/berry-chrismas--4ebd-.jpg",
    secondaryImages: [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/berry-chrismas--4ebd-.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/berry-chrismas-a5ab5d.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/berry-chrismas-0-bdf0.jpg",
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/berry-chrismas-f13-43.jpg"
    ],
    details: [
      "Lustrous deep berry chrome varnish with outstanding brilliance.",
      "Delicate 3D textures matching high-class evening gowns.",
      "Sized to absolute precision matching natural anatomical nails."
    ],
    medium: "Lustrous Chrome Varnish & 3D Clay Detailing",
    canvas: "Medium Stiletto Extensions",
    year: "2026",
    url: "https://nezlincollection.com/berry-christmas-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-christmas-nc131"
  }
];

// Active filter state
let activeFilter = "ALL";

// Document Event Hook
document.addEventListener("DOMContentLoaded", () => {
  initCustomCursor();
  initBackgroundCanvas();
  renderGalleryFilters();
  renderGalleryGrid();
  initLightbox();
  setupScrollReveal();
  setupBoutiqueLinkTracking();
  initFaqAccordion();
});

/* ==========================================================================
   1. SILKY CUSTOM CURSOR FOLLOW ENGINE
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursor-dot");
  
  if (!cursor || !dot) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    dotX += (mouseX - dotX) * 0.4;
    dotY += (mouseY - dotY) * 0.4;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;

    requestAnimationFrame(updateCursor);
  }
  
  updateCursor();

  // Highlight elements globally
  document.body.addEventListener("mouseover", (e) => {
    const target = e.target.closest("a, button, .art-card, .lightbox-thumb, .filter-btn");
    if (target) {
      cursor.style.width = "60px";
      cursor.style.height = "60px";
      cursor.style.backgroundColor = "rgba(205, 162, 80, 0.08)";
      cursor.style.borderColor = "var(--color-accent-rose)";
    }
  });

  document.body.addEventListener("mouseout", (e) => {
    const target = e.target.closest("a, button, .art-card, .lightbox-thumb, .filter-btn");
    if (target) {
      cursor.style.width = "32px";
      cursor.style.height = "32px";
      cursor.style.backgroundColor = "transparent";
      cursor.style.borderColor = "var(--color-accent-gold)";
    }
  });
}

/* ==========================================================================
   2. HIGH-PERFORMANCE DRIFTING GOLD DUST CANVAS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.createElement("canvas");
  canvas.id = "hero-canvas";
  const heroSection = document.getElementById("hero-section");
  if (!heroSection) return;
  
  heroSection.insertBefore(canvas, heroSection.firstChild);
  
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = heroSection.offsetWidth);
  let height = (canvas.height = heroSection.offsetHeight);
  
  // Resize handler
  window.addEventListener("resize", () => {
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
  });

  // Particle class definition
  class GoldParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // initial distribution
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + 10;
      this.size = Math.random() * 1.8 + 0.5;
      this.speedY = -(Math.random() * 0.7 + 0.2);
      this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.15;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.wiggle = Math.random() * 0.02;
      this.wiggleSpeed = Math.random() * 0.02;
    }

    update(mX, mY) {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.wiggle) * 0.2;
      this.wiggle += this.wiggleSpeed;

      // React gently to mouse proximity
      const dx = mX - this.x;
      const dy = mY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x -= dx * force * 0.05;
        this.y -= dy * force * 0.05;
      }

      // Reset when particle goes above screen
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.fillStyle = `rgba(205, 162, 80, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Generate particles
  const particleCount = Math.min(Math.round(width * 0.08), 85);
  const particles = Array.from({ length: particleCount }, () => new GoldParticle());

  let mouseX = -1000, mouseY = -1000;
  heroSection.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  heroSection.addEventListener("mouseleave", () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  // Render loop
  function render() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw slowly moving soft gradient orbs
    particles.forEach(p => {
      p.update(mouseX, mouseY);
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. GALLERY EXHIBITION MINIMAL FILTERS
   ========================================================================== */
function renderGalleryFilters() {
  const showcase = document.getElementById("gallery");
  if (!showcase) return;

  const header = showcase.querySelector(".section-header");
  if (!header) return;

  // Extract unique categories
  const categories = ["ALL", ...new Set(PORTFOLIO_PRODUCTS.map(p => p.category))];

  const filterWrapper = document.createElement("div");
  filterWrapper.className = "filter-wrapper reveal";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `filter-btn hoverable-element ${cat === activeFilter ? "active" : ""}`;
    btn.textContent = cat;
    
    btn.addEventListener("click", () => {
      if (activeFilter === cat) return;
      
      // Update active style classes
      filterWrapper.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      activeFilter = cat;
      filterGalleryGrid();
    });

    filterWrapper.appendChild(btn);
  });

  // Insert filter bar right under the section description
  header.appendChild(filterWrapper);
}

function filterGalleryGrid() {
  const container = document.getElementById("gallery-container");
  if (!container) return;

  const cards = container.querySelectorAll(".art-card-container");
  
  cards.forEach(card => {
    const code = card.getAttribute("data-code");
    const item = PORTFOLIO_PRODUCTS.find(p => p.code === code);
    
    if (activeFilter === "ALL" || (item && item.category === activeFilter)) {
      // Smooth fade-in
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 50);
    } else {
      // Smooth fade-out
      card.style.opacity = "0";
      card.style.transform = "scale(0.92)";
      setTimeout(() => {
        card.style.display = "none";
      }, 400);
    }
  });
}

/* ==========================================================================
   4. DYNAMIC 3D PARALLAX TILT & GRID RENDERER
   ========================================================================== */
function renderGalleryGrid() {
  const container = document.getElementById("gallery-container");
  if (!container) return;

  container.innerHTML = "";
  
  PORTFOLIO_PRODUCTS.forEach((product, index) => {
    const containerDiv = document.createElement("div");
    containerDiv.className = "art-card-container reveal";
    containerDiv.setAttribute("data-code", product.code);
    containerDiv.style.transitionDelay = `${(index % 3) * 0.08}s`;

    containerDiv.innerHTML = `
      <div class="art-card">
        <div class="art-image-wrapper">
          <img class="art-img" src="${product.mainImage}" alt="${product.title}" loading="lazy">
          <div class="art-hover-overlay">
            <div class="art-details">
              <span class="art-code">${product.code}</span>
              <h3 class="art-name title-serif">${product.title}</h3>
              <span class="art-action">Open Masterpiece <i class="fa-solid fa-arrow-right-long"></i></span>
            </div>
          </div>
        </div>
        <div class="art-info-panel">
          <div class="art-info-title">
            <h4 class="title-serif">${product.title}</h4>
            <span>Code: ${product.code}</span>
          </div>
          <div class="art-info-tag">${product.category}</div>
        </div>
      </div>
    `;

    // Click handler to open Lightbox
    containerDiv.addEventListener("click", () => {
      openMasterpieceLightbox(product.code);
    });

    // 3D Parallax Tilt calculation events
    const card = containerDiv.querySelector(".art-card");
    
    containerDiv.addEventListener("mousemove", (e) => {
      const rect = containerDiv.getBoundingClientRect();
      const x = e.clientX - rect.left; // cursor x coordinate in card
      const y = e.clientY - rect.top; // cursor y coordinate in card
      
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      
      // Calculate rotation angles (max 15 degrees)
      const rotateX = -((y - midY) / midY) * 12;
      const rotateY = ((x - midX) / midX) * 12;
      
      // Apply transforms
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset rotation on leave
    containerDiv.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
      card.style.transition = "transform 0.5s ease";
    });

    containerDiv.addEventListener("mouseenter", () => {
      card.style.transition = "none";
    });

    container.appendChild(containerDiv);
  });
}

/* ==========================================================================
   5. EDITORIAL MUSEUM LIGHTBOX CONTROLLER
   ========================================================================== */
let activeLightboxProduct = null;

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightbox-close");

  if (!lightbox || !closeBtn) return;

  closeBtn.addEventListener("click", closeMasterpieceLightbox);

  // Close when clicking outside content card
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeMasterpieceLightbox();
    }
  });

  // ESC Key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeMasterpieceLightbox();
    }
  });
}

function openMasterpieceLightbox(code) {
  const product = PORTFOLIO_PRODUCTS.find(p => p.code === code);
  if (!product) return;

  activeLightboxProduct = product;
  const lightbox = document.getElementById("lightbox");
  
  // Populate details
  document.getElementById("lightbox-code").textContent = product.code;
  document.getElementById("lightbox-name").textContent = product.title;
  document.getElementById("lightbox-category").textContent = product.category;
  
  // Populate Museum Plaque Label Specifications
  let plaqueContainer = document.getElementById("lightbox-plaque");
  if (!plaqueContainer) {
    plaqueContainer = document.createElement("div");
    plaqueContainer.id = "lightbox-plaque";
    plaqueContainer.className = "lightbox-plaque";
    // Insert before specs list
    const specsList = document.getElementById("lightbox-spec-list");
    specsList.parentNode.insertBefore(plaqueContainer, specsList);
  }
  
  plaqueContainer.innerHTML = `
    <div class="lightbox-plaque-item"><strong>Artist:</strong> Nezlin Collection</div>
    <div class="lightbox-plaque-item"><strong>Medium:</strong> ${product.medium}</div>
    <div class="lightbox-plaque-item"><strong>Canvas:</strong> ${product.canvas}</div>
    <div class="lightbox-plaque-item"><strong>Year:</strong> ${product.year}</div>
  `;

  // Populate specifications list
  const specList = document.getElementById("lightbox-spec-list");
  specList.innerHTML = "";
  product.details.forEach(detail => {
    const item = document.createElement("div");
    item.className = "lightbox-spec-item";
    item.innerHTML = `
      <i class="fa-solid fa-gem lightbox-spec-icon"></i>
      <span class="lightbox-spec-text">${detail}</span>
    `;
    specList.appendChild(item);
  });

  // Populate direct boutique shop button link
  const shopBtn = document.getElementById("lightbox-shop-btn");
  shopBtn.setAttribute("href", product.url);
  shopBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Acquire Piece on Boutique`;

  // Load photos (thumbnails and main visual)
  const mainImg = document.getElementById("lightbox-main-img");
  mainImg.setAttribute("src", product.secondaryImages[0]);
  mainImg.setAttribute("alt", product.title);

  const thumbContainer = document.getElementById("lightbox-thumbs");
  thumbContainer.innerHTML = "";

  product.secondaryImages.forEach((imgUrl, index) => {
    const thumb = document.createElement("div");
    thumb.className = `lightbox-thumb ${index === 0 ? "active" : ""}`;
    thumb.innerHTML = `<img src="${imgUrl}" alt="${product.title} details" loading="lazy">`;
    
    // Switch main visual on click
    thumb.addEventListener("click", () => {
      // Remove other actives
      thumbContainer.querySelectorAll(".lightbox-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImg.setAttribute("src", imgUrl);
    });

    thumbContainer.appendChild(thumb);
  });

  // Activate lightbox with animation
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden"; // lock page scroll
}

function closeMasterpieceLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("active");
  document.body.style.overflow = ""; // unlock page scroll
  activeLightboxProduct = null;
}

/* ==========================================================================
   6. SCROLL REVEAL TRIGGERS (IntersectionObserver)
   ========================================================================= */
function setupScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach(el => {
      observer.observe(el);
    });
  }, 350);
}

/* ==========================================================================
   7. REDIRECT LINK FOREGROUND LOGS
   ========================================================================== */
function setupBoutiqueLinkTracking() {
  const shopBtns = document.querySelectorAll("a[href*='nezlincollection.com']");
  shopBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      console.log(`[Boutique Redirect] Fine art acquisition initiated: redirecting to live boutique at ${btn.getAttribute("href")}`);
    });
  });
}

/* ==========================================================================
   8. EXHIBITION FAQ ACCORDION ENGINE
   ========================================================================== */
function initFaqAccordion() {
  const headers = document.querySelectorAll(".faq-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.closest(".faq-item");
      const isActive = item.classList.contains("active");
      
      // Close all other items for a clean accordion effect
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
      
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}
