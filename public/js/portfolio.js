/* ==========================================================================
   NEZLIN ART PORTFOLIO - CORE ENGINE & ART GALLERY INTERACTION
   Synchronized Live with nezlincollection.com
   ========================================================================== */

// Curated Masterpiece Dataset (Auto-synchronized from nezlincollection.com)
let PORTFOLIO_PRODUCTS = [
  {
    "code": "NC129",
    "title": "Smily Pumpkins",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/smily-pumpkins-513ac3.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/smily-pumpkins-513ac3.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/smily-pumpkins-513ac3.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/smily-pumpkins-98700a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/smily-pumpkins-6-b4a8.jpg"
    ],
    "details": [
      "Smily Pumpkins",
      "Boutique Acquisition: ₺1.449",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/smily-pumpkins"
  },
  {
    "code": "TA01",
    "title": "Küçük Şeffaf Tırnak Albümü - Halkalı Dosya TA01",
    "category": "TIRNAK ALBÜMÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/kucuk-seffaf-tirnak-albumu-ca-487.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/kucuk-seffaf-tirnak-albumu-ca-487.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/kucuk-seffaf-tirnak-albumu-ca-487.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/kucuk-seffaf-tirnak-albumu-4d44-b.jpg"
    ],
    "details": [
      "Küçük Şeffaf Tırnak Albümü - Halkalı Dosya TA01",
      "Boutique Acquisition: ₺499",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/kucuk-seffaf-tirnak-albumu-halkali-dosya-ta01"
  },
  {
    "code": "TY501",
    "title": "Tırnak Yağı 5ml",
    "category": "TIRNAK YAĞI",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tirnak-yagi-5ml-28-a6b.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tirnak-yagi-5ml-28-a6b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tirnak-yagi-5ml-5dea8f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tirnak-yagi-5ml--a545b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tirnak-yagi-5ml-63-cdb.jpg"
    ],
    "details": [
      "Tırnak Yağı 5ml",
      "Boutique Acquisition: ₺129",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/tirnak-yagi-5ml"
  },
  {
    "code": "TA02",
    "title": "Büyük Şeffaf Tırnak Albümü - Halkalı Dosya TA02",
    "category": "TIRNAK ALBÜMÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk-seffaf-tirnak-albumu-e7c-43.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk-seffaf-tirnak-albumu-e7c-43.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/buyuk-seffaf-tirnak-albumu-e7c-43.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/buyuk-seffaf-tirnak-albumu-d-887d.jpg"
    ],
    "details": [
      "Büyük Şeffaf Tırnak Albümü - Halkalı Dosya TA02",
      "Boutique Acquisition: ₺559",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/buyuk-seffaf-tirnak-albumu-halkali-dosya-ta02"
  },
  {
    "code": "TA03",
    "title": "Gümüş Tırnak Albümü Coquette - Halkalı Dosya TA03",
    "category": "TIRNAK ALBÜMÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk-tirnak-albumu-8-b53b.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk-tirnak-albumu-8-b53b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/buyuk-tirnak-albumu-8-b53b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/buyuk-tirnak-albumu-23-826.jpg"
    ],
    "details": [
      "Gümüş Tırnak Albümü Coquette - Halkalı Dosya TA03",
      "Boutique Acquisition: ₺1.699",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/gumus-tirnak-albumu-coquette-halkali-dosya-ta03"
  },
  {
    "code": "TA04",
    "title": "Pembe Kumaş Pembe Coquette Tırnak Albümü Kumaş - Halkalı Dosya TA04",
    "category": "TIRNAK ALBÜMÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-7972e-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-7972e-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-7972e-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-73eba-.jpg"
    ],
    "details": [
      "Pembe Kumaş Pembe Coquette Tırnak Albümü Kumaş - Halkalı Dosya TA04",
      "Boutique Acquisition: ₺649",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/pembe-kumas-pembe-coquette-tirnak-albumu-kumas-halkali-dosya-ta04"
  },
  {
    "code": "NC132",
    "title": "Ruby Present Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Christmas - NC132",
    "category": "NEW YEAR",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ruby-present-483ef0.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ruby-present-483ef0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ruby-present-483ef0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ruby-present-2-41d6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ruby-present-d-d697.jpg"
    ],
    "details": [
      "Ruby Present Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Christmas - NC132",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/ruby-present-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-christmas-nc132"
  },
  {
    "code": "NC133",
    "title": "Pine Beauty Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Christmas - NC133",
    "category": "NEW YEAR",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pine-beauty-1-468a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pine-beauty-1-468a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pine-beauty-1-468a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pine-beauty-2f1a2b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pine-beauty-899b-c.jpg"
    ],
    "details": [
      "Pine Beauty Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Christmas - NC133",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/pine-beauty-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-christmas-nc133"
  },
  {
    "code": "NC131",
    "title": "Berry Christmas Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Christmas - NC131",
    "category": "NEW YEAR",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/berry-chrismas-f13-43.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/berry-chrismas-f13-43.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/berry-chrismas-f13-43.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/berry-chrismas--4ebd-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/berry-chrismas-a5ab5d.jpg"
    ],
    "details": [
      "Berry Christmas Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Christmas - NC131",
      "Boutique Acquisition: ₺949",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/berry-christmas-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-christmas-nc131"
  },
  {
    "code": "NC130",
    "title": "Snow Flakes Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Christmas - NC139",
    "category": "NEW YEAR",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/snow-flakes-2d-869.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/snow-flakes-2d-869.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/snow-flakes-2d-869.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/snow-flakes-1da-91.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/snow-flakes-a4f-4e.jpg"
    ],
    "details": [
      "Snow Flakes Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Christmas - NC139",
      "Boutique Acquisition: ₺1.079",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/snow-flakes-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-christmas-nc139"
  },
  {
    "code": "NC134",
    "title": "Royal Winter Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC134",
    "category": "SEASON",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/royal-winter-7-8f5d.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/royal-winter-7-8f5d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/royal-winter-7-8f5d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/royal-winter-64-54e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/royal-winter-7ff276.jpg"
    ],
    "details": [
      "Royal Winter Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC134",
      "Boutique Acquisition: ₺1.499",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/royal-winter-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc134"
  },
  {
    "code": "NC126",
    "title": "Ancestor Blood Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Koi Fish Dragon - NC126",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancestor-blood-4f-490.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancestor-blood-4f-490.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ancestor-blood-4f-490.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ancestor-blood-7-8486.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ancestor-blood-4-4c5d.jpg"
    ],
    "details": [
      "Ancestor Blood Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Koi Fish Dragon - NC126",
      "Boutique Acquisition: ₺1.099",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/ancestor-blood-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-koi-fish-dragon-nc126"
  },
  {
    "code": "GS108",
    "title": "SM Medium Almond - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS108",
    "category": "GÜÇLENDİRİLMİŞ HAZIR SETLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/party-classic-b-481f.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/party-classic-b-481f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/party-classic-b-481f.jpg"
    ],
    "details": [
      "SM Medium Almond - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS108",
      "Boutique Acquisition: ₺379",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/sm-medium-almond-base-coat-ve-top-coat-ile-guclendirilmis-takma-tirnak-gs108"
  },
  {
    "code": "GS101",
    "title": "XS Long Square - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS101",
    "category": "GÜÇLENDİRİLMİŞ HAZIR SETLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs101-00610-88c1.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs101-00610-88c1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gs101-00610-88c1.jpg"
    ],
    "details": [
      "XS Long Square - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS101",
      "Boutique Acquisition: ₺449",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/xs-long-square-base-coat-ve-top-coat-ile-guclendirilmis-takma-tirnak-gs101"
  },
  {
    "code": "GS102",
    "title": "XS Medium Almond - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS102",
    "category": "GÜÇLENDİRİLMİŞ HAZIR SETLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs102-2-c471c272.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs102-2-c471c272.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gs102-2-c471c272.jpg"
    ],
    "details": [
      "XS Medium Almond - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS102",
      "Boutique Acquisition: ₺299",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/xs-medium-almond-base-coat-ve-top-coat-ile-guclendirilmis-takma-tirnak-gs102"
  },
  {
    "code": "GS105",
    "title": "SM Medium Square - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS105",
    "category": "GÜÇLENDİRİLMİŞ HAZIR SETLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs105--826b-6b69.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs105--826b-6b69.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gs105--826b-6b69.jpg"
    ],
    "details": [
      "SM Medium Square - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS105",
      "Boutique Acquisition: ₺449",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/sm-medium-square-base-coat-ve-top-coat-ile-guclendirilmis-takma-tirnak-gs105"
  },
  {
    "code": "GS106",
    "title": "SM Medium Square - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS106",
    "category": "GÜÇLENDİRİLMİŞ HAZIR SETLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs106-c-b07a-178.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs106-c-b07a-178.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gs106-c-b07a-178.jpg"
    ],
    "details": [
      "SM Medium Square - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS106",
      "Boutique Acquisition: ₺449",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/sm-medium-square-base-coat-ve-top-coat-ile-guclendirilmis-takma-tirnak-gs106"
  },
  {
    "code": "GS107",
    "title": "SM Medium Almond - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS107",
    "category": "GÜÇLENDİRİLMİŞ HAZIR SETLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs107-7-a4af41f6.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gs107-7-a4af41f6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gs107-7-a4af41f6.jpg"
    ],
    "details": [
      "SM Medium Almond - Base coat ve Top Coat İle Güçlendirilmiş Takma Tırnak - GS107",
      "Boutique Acquisition: ₺349",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/sm-medium-almond-base-coat-ve-top-coat-ile-guclendirilmis-takma-tirnak-gs107"
  },
  {
    "code": "NC117",
    "title": "Pretty Witch Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC117",
    "category": "ÖZEL GÜNLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/shiny-claws-66-4a1.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/shiny-claws-66-4a1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/shiny-claws-66-4a1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/shiny-claws-e-98b9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/shiny-claws-1-863f.jpg"
    ],
    "details": [
      "Pretty Witch Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC117",
      "Boutique Acquisition: ₺1.299",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/pretty-witch-lace-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc117"
  },
  {
    "code": "NC118",
    "title": "Jaguar Paws Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art French Blooming - NC118",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/jaguar-paws-263-bf.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/jaguar-paws-263-bf.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/jaguar-paws-263-bf.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/jaguar-paws-e-deb6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/jaguar-paws-7-e810.jpg"
    ],
    "details": [
      "Jaguar Paws Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art French Blooming - NC118",
      "Boutique Acquisition: ₺899",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/jaguar-paws-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-french-blooming-nc118"
  },
  {
    "code": "NC108",
    "title": "Creepy Evening Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Doll - NC108",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/creepy-evening-88d761.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/creepy-evening-88d761.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/creepy-evening-88d761.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/creepy-evening--5cc76.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/creepy-evening-99-404.jpg"
    ],
    "details": [
      "Creepy Evening Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Doll - NC108",
      "Boutique Acquisition: ₺1.799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/creepy-evening-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-doll-nc108"
  },
  {
    "code": "NC124",
    "title": "Eyes On Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Ghostface Blood Halloween - NC124",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/eyes-on-22240-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/eyes-on-22240-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/eyes-on-22240-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/eyes-on--ab27-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/eyes-on-e6755f.jpg"
    ],
    "details": [
      "Eyes On Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Ghostface Blood Halloween - NC124",
      "Boutique Acquisition: ₺1.399",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/eyes-on-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-ghostface-blood-halloween-nc124"
  },
  {
    "code": "NC120",
    "title": "Curious Ghosts Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Halloween - NC120",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/curious-ghosts-4a86-9.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/curious-ghosts-4a86-9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/curious-ghosts-4a86-9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/curious-ghosts-d1a24f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/curious-ghosts-f1c900.jpg"
    ],
    "details": [
      "Curious Ghosts Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Halloween - NC120",
      "Boutique Acquisition: ₺1.199",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/curious-ghosts-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-halloween-nc120"
  },
  {
    "code": "NC109",
    "title": "Tiny Eyes Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ghost Halloween - NC109",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tiny-eyes-38-295.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tiny-eyes-38-295.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tiny-eyes-38-295.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tiny-eyes-7b-44f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tiny-eyes-a76b-2.jpg"
    ],
    "details": [
      "Tiny Eyes Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ghost Halloween - NC109",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/tiny-eyes-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-ghost-halloween-nc109"
  },
  {
    "code": "NC125",
    "title": "Bloody Skeletons Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Creepy Halloween - NC125",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bloody-skeletons-1ea-49.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bloody-skeletons-1ea-49.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bloody-skeletons-1ea-49.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bloody-skeletons-be6c-8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bloody-skeletons-4c-497.jpg"
    ],
    "details": [
      "Bloody Skeletons Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Creepy Halloween - NC125",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/bloody-skeletons-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-creepy-halloween-nc125"
  },
  {
    "code": "NC136",
    "title": "Berry Season Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art 3D Forest - NC136",
    "category": "SEASON",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cherry-season-4674-9.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cherry-season-4674-9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cherry-season-4674-9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cherry-season-c11d5-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cherry-season-4e42-a.jpg"
    ],
    "details": [
      "Berry Season Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art 3D Forest - NC136",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/berry-season-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-3d-forest-nc136"
  },
  {
    "code": "NC135",
    "title": "Soft Dreams Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art French Ombre - NC135",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-dreams-f75dcf.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-dreams-f75dcf.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-dreams-f75dcf.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-dreams-e3-4cf.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-dreams-a-6366.jpg"
    ],
    "details": [
      "Soft Dreams Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art French Ombre - NC135",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/soft-dreams-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-french-ombre-nc135"
  },
  {
    "code": "NC119",
    "title": "French Touch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC119",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/french-touch-595e03.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/french-touch-595e03.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/french-touch-595e03.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/french-touch--860a6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/french-touch--85f7-.jpg"
    ],
    "details": [
      "French Touch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC119",
      "Boutique Acquisition: ₺849",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/french-touch-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc119"
  },
  {
    "code": "NC104",
    "title": "Fairy Leaves Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Gold Chrome - NC104",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/fairy-leaves-protez-jel-takma-tirnak-e-b-76df.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/fairy-leaves-protez-jel-takma-tirnak-e-b-76df.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/fairy-leaves-protez-jel-takma-tirnak-e-b-76df.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/fairy-leaves-protez-jel-takma-tirnak-e--b6e2b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/fairy-leaves-protez-jel-takma-tirnak-e-387-9a.jpg"
    ],
    "details": [
      "Fairy Leaves Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Gold Chrome - NC104",
      "Boutique Acquisition: ₺1.449",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/fairy-leaves-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-gold-chrome-nc104"
  },
  {
    "code": "NC114",
    "title": "Northern Spring Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC114",
    "category": "SEASON",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/northern-spring-b9ff-8.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/northern-spring-b9ff-8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/northern-spring-b9ff-8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/northern-spring-0b-449.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/northern-spring-adbb16.jpg"
    ],
    "details": [
      "Northern Spring Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC114",
      "Boutique Acquisition: ₺1.149",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/northern-spring-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc114"
  },
  {
    "code": "NC101",
    "title": "Angelic Charm Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail French Diamond Haç - NC101",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/angelic-charm-protez-jel-takma-tirnak--d90caf.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/angelic-charm-protez-jel-takma-tirnak--d90caf.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/angelic-charm-protez-jel-takma-tirnak--d90caf.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/angelic-charm-protez-jel-takma-tirnak--65-4af.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/angelic-charm-protez-jel-takma-tirnak--17851e.jpg"
    ],
    "details": [
      "Angelic Charm Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail French Diamond Haç - NC101",
      "Boutique Acquisition: ₺1.799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/angelic-charm-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-french-diamond-hac-nc101"
  },
  {
    "code": "NC106",
    "title": "Cutesy Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Pink Coquette Ribbon Star - NC106",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/childhood-days-21-89a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/childhood-days-21-89a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/childhood-days-21-89a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cutesy-lace-protez-jel-takma-tirnak-el-d0c-6f.png",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cutesy-lace-protez-jel-takma-tirnak-el-a1fb85.jpg"
    ],
    "details": [
      "Cutesy Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Pink Coquette Ribbon Star - NC106",
      "Boutique Acquisition: ₺1.079",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/cutesy-lace-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-pink-coquette-ribbon-star-nc106"
  },
  {
    "code": "NC107",
    "title": "Liquid Gold Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Mirror Chrome Effect - NC107",
    "category": "ÖZEL GÜNLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/metal-elegance-8efcc-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/metal-elegance-8efcc-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/metal-elegance-8efcc-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/liquid-gold-protez-jel-takma-tirnak-el-c1721e.png",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/liquid-gold-protez-jel-takma-tirnak-el--0eed-.jpg"
    ],
    "details": [
      "Liquid Gold Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Mirror Chrome Effect - NC107",
      "Boutique Acquisition: ₺599",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/liquid-gold-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-mirror-chrome-effect-nc107"
  },
  {
    "code": "NC123",
    "title": "Bat Blood Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Halloween - NC123",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bat-blood-f4e822.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bat-blood-f4e822.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bat-blood-f4e822.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bat-blood-5-41cd.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bat-blood-2051-4.jpg"
    ],
    "details": [
      "Bat Blood Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Halloween - NC123",
      "Boutique Acquisition: ₺1.899",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/bat-blood-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-halloween-nc123"
  },
  {
    "code": "NC128",
    "title": "Don't Touch Me Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Diamond Chrome - NC128",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dont-touch-me-90-9ce.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dont-touch-me-90-9ce.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dont-touch-me-90-9ce.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dont-touch-me-2d4-a5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dont-touch-me--b72c-.jpg"
    ],
    "details": [
      "Don't Touch Me Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Diamond Chrome - NC128",
      "Boutique Acquisition: ₺849",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/dont-touch-me-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-diamond-chrome-nc128"
  },
  {
    "code": "NC138",
    "title": "Blooming Flowers Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art 3D Gold Chrome - NC138",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pink-panther--7121d.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pink-panther--7121d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pink-panther--7121d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pink-panther-7-4ae9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pink-panther-b0e6a5.jpg"
    ],
    "details": [
      "Blooming Flowers Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art 3D Gold Chrome - NC138",
      "Boutique Acquisition: ₺1.099",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/blooming-flowers-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-3d-gold-chrome-nc138"
  },
  {
    "code": "NC137",
    "title": "Kitty Cat Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Star Charm Hello Sticker - NC137",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/fairy-stars-2-4057.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/fairy-stars-2-4057.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/fairy-stars-2-4057.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/fairy-stars-a3dc1-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/fairy-stars-a8bd-2.jpg"
    ],
    "details": [
      "Kitty Cat Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Star Charm Hello Sticker - NC137",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/kitty-cat-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-star-charm-hello-sticker-nc137"
  },
  {
    "code": "NC139",
    "title": "Old Stars Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Y2K French Star Blooming - NC139",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/good-old-stars-8f4363.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/good-old-stars-8f4363.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/good-old-stars-8f4363.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/good-old-stars-64-bc5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/good-old-stars-a2-bea.jpg"
    ],
    "details": [
      "Old Stars Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Y2K French Star Blooming - NC139",
      "Boutique Acquisition: ₺899",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/old-stars-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-y2k-french-star-blooming-nc139"
  },
  {
    "code": "NC116",
    "title": "French Twist Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Ombre Diamond Wedding Day -NC116",
    "category": "ÖZEL GÜNLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/my-day-0e9-91.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/my-day-0e9-91.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/my-day-0e9-91.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/my-day-7b7cc4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/my-day-7b6c2d.jpg"
    ],
    "details": [
      "French Twist Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Ombre Diamond Wedding Day -NC116",
      "Boutique Acquisition: ₺1.299",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/french-twist-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-ombre-diamond-wedding-day-nc116"
  },
  {
    "code": "NC115",
    "title": "Daisy Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art 3D Flowers French - NC115",
    "category": "ÖZEL GÜNLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/blossom-day-24d9-4.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/blossom-day-24d9-4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/blossom-day-24d9-4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/blossom-day-ef6-40.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/blossom-day-3a5-a3.jpg"
    ],
    "details": [
      "Daisy Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art 3D Flowers French - NC115",
      "Boutique Acquisition: ₺1.349",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/daisy-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-3d-flowers-french-nc115"
  },
  {
    "code": "AK102",
    "title": "Protez Takma Tırnak Saklama Kutusu Şeffaf",
    "category": "AKSESUARLAR",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/seffaf-tirnak-kutusu-f-901f.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/seffaf-tirnak-kutusu-f-901f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/seffaf-tirnak-kutusu-f-901f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/seffaf-tirnak-kutusu-d-4036.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/seffaf-tirnak-kutusu-1c1097.jpg"
    ],
    "details": [
      "Protez Takma Tırnak Saklama Kutusu Şeffaf",
      "Boutique Acquisition: ₺129",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/protez-takma-tirnak-saklama-kutusu-seffaf-"
  },
  {
    "code": "AK103",
    "title": "Sıvı Yapıştırıcı Protez Takma Tırnak - 10 gr",
    "category": "YAPIŞTIRICI",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/sivi-yapistirici-5-ml--bab3-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/sivi-yapistirici-5-ml--bab3-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/sivi-yapistirici-5-ml-9-f285.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/sivi-yapistirici-5-ml--bab3-.jpg"
    ],
    "details": [
      "Sıvı Yapıştırıcı Protez Takma Tırnak - 10 gr",
      "Boutique Acquisition: ₺99",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/sivi-yapistirici-protez-takma-tirnak-10-gr"
  },
  {
    "code": "AK101",
    "title": "Sticker Yapıştırıcı",
    "category": "YAPIŞTIRICI",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/sticker-yapistirici-3ab639.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/sticker-yapistirici-3ab639.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/sticker-yapistirici-3ab639.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/sticker-yapistirici-5-8465.jpg"
    ],
    "details": [
      "Sticker Yapıştırıcı",
      "Boutique Acquisition: ₺89",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/sticker-yapistirici"
  },
  {
    "code": "NC140",
    "title": "Sugar Lace Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Pink Coquette Ribbon Star -NC140",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/childhood-days-ii-4f49-8.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/childhood-days-ii-4f49-8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/childhood-days-ii-4f49-8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/sugar-lace-protez-jel-takma-tirnak-el--8-6797.png",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/sugar-lace-protez-jel-takma-tirnak-el--134539.jpg"
    ],
    "details": [
      "Sugar Lace Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Pink Coquette Ribbon Star -NC140",
      "Boutique Acquisition: ₺1.079",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/sugar-lace-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-pink-coquette-ribbon-star-nc140"
  },
  {
    "code": "NC141",
    "title": "Love Letter Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Glitter Star - NC141",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/childhood-days-iii-9-ea27.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/childhood-days-iii-9-ea27.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/childhood-days-iii-9-ea27.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/love-letter-protez-jel-takma-tirnak-el-77df-e.png",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/love-letter-protez-jel-takma-tirnak-el-0c-b4d.jpg"
    ],
    "details": [
      "Love Letter Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Glitter Star - NC141",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/love-letter-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-glitter-star-nc141"
  },
  {
    "code": "NC142",
    "title": "Gemmy Ring Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Diamond Chrome- NC142",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gemmy-ring-0b-4f8.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gemmy-ring-0b-4f8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gemmy-ring-0b-4f8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gemmy-ring-56385c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gemmy-ring-7-3d29.jpg"
    ],
    "details": [
      "Gemmy Ring Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Diamond Chrome- NC142",
      "Boutique Acquisition: ₺1.049",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/gemmy-ring-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-diamond-chrome-nc142"
  },
  {
    "code": "HK101",
    "title": "Protez Takma  Tırnak Hazırlık Kiti - Manikür Seti",
    "category": "HAZIRLIK KİTİ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/baslangic-seti-d8e42e.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/baslangic-seti-d8e42e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/baslangic-seti-d8e42e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/baslangic-seti-c8ad-4.jpg"
    ],
    "details": [
      "Protez Takma  Tırnak Hazırlık Kiti - Manikür Seti",
      "Boutique Acquisition: ₺149",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/protez-takma-tirnak-hazirlik-kiti-manikur-seti"
  },
  {
    "code": "TA05",
    "title": "Krem Bej Coquette Tırnak Albümü Kapitone Kumaş - Halkalı Dosya TA05",
    "category": "TIRNAK ALBÜMÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-ta05--9031-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-ta05--9031-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-ta05--9031-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-ta05-43f305.jpg"
    ],
    "details": [
      "Krem Bej Coquette Tırnak Albümü Kapitone Kumaş - Halkalı Dosya TA05",
      "Boutique Acquisition: ₺899",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/krem-bej-coquette-tirnak-albumu-kapitone-kumas-halkali-dosya-ta05"
  },
  {
    "code": "TA06",
    "title": "Pembe Coquette Tırnak Albümü Kapitone Kumaş - Halkalı Dosya TA06",
    "category": "TIRNAK ALBÜMÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-ta06-5b7bb8.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-ta06-5b7bb8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-ta06-5b7bb8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/kumas-tirnak-albumu-ta06-96de-8.jpg"
    ],
    "details": [
      "Pembe Coquette Tırnak Albümü Kapitone Kumaş - Halkalı Dosya TA06",
      "Boutique Acquisition: ₺899",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/pembe-coquette-tirnak-albumu-kapitone-kumas-halkali-dosya-ta06"
  },
  {
    "code": "AK104",
    "title": "Suya Dayanıklı Ekstra Güçlü Zararsız Sticker Yapıştırıcı - Protez Jel Takma Tırnak - AK104",
    "category": "YAPIŞTIRICI",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pembe-sticker-yapistirici-9-494f.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pembe-sticker-yapistirici-9-494f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pembe-sticker-yapistirici-9-494f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pembe-sticker-yapistirici-5222f6.jpg"
    ],
    "details": [
      "Suya Dayanıklı Ekstra Güçlü Zararsız Sticker Yapıştırıcı - Protez Jel Takma Tırnak - AK104",
      "Boutique Acquisition: ₺249",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/suya-dayanikli-ekstra-guclu-zararsiz-sticker-yapistirici-protez-jel-takma-tirnak-ak104"
  },
  {
    "code": "NC143",
    "title": "Gold Marble Protez Jel Takma  Tırnak -El Yapımı  Kalıcı Oje Nail Art Mermer Desenli Chrome -NC143",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/golden-touch-c2091d.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/golden-touch-c2091d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/golden-touch-c2091d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/golden-touch-8e9711.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/golden-touch--4fd3-.jpg"
    ],
    "details": [
      "Gold Marble Protez Jel Takma  Tırnak -El Yapımı  Kalıcı Oje Nail Art Mermer Desenli Chrome -NC143",
      "Boutique Acquisition: ₺1.079",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/gold-marble-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-mermer-desenli-chrome-nc143"
  },
  {
    "code": "AK107",
    "title": "Tırnak Bakımı Toz Temizleme ve Manikür Fırçası - AK107",
    "category": "AKSESUARLAR",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tirnak-temizleme-fircasi-3-b75b.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tirnak-temizleme-fircasi-3-b75b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tirnak-temizleme-fircasi-3-b75b.jpg"
    ],
    "details": [
      "Tırnak Bakımı Toz Temizleme ve Manikür Fırçası - AK107",
      "Boutique Acquisition: ₺49",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/tirnak-bakimi-toz-temizleme-ve-manikur-fircasi-ak107"
  },
  {
    "code": "NC144",
    "title": "Creepy Game Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Halloween - NC144",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/creepy-game--624a6.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/creepy-game--624a6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/creepy-game--624a6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/creepy-game-ecf484.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/creepy-game-protez-jel-takma-tirnak-el-f1048f.png"
    ],
    "details": [
      "Creepy Game Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Halloween - NC144",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/creepy-game-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-halloween-nc144"
  },
  {
    "code": "NC145",
    "title": "Midnight Shimmer Protez Jel Takma  Tırnak -El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC145",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-diamond-b-4630.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-diamond-b-4630.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-diamond-b-4630.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/midnight-shimmer-protez-jel-takma-tirn-9ce-07.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/midnight-shimmer-protez-jel-takma-tirn-ac9c-7.jpg"
    ],
    "details": [
      "Midnight Shimmer Protez Jel Takma  Tırnak -El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC145",
      "Boutique Acquisition: ₺739",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/midnight-shimmer-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-nc145"
  },
  {
    "code": "NC146",
    "title": "Lunar Light Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC146",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-platinum-ea450-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-platinum-ea450-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-platinum-ea450-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lunar-light-protez-jel-takma-tirnak-el-c3a-9c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lunar-light-protez-jel-takma-tirnak-el--8c67-.jpg"
    ],
    "details": [
      "Lunar Light Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC146",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/lunar-light-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-nc146"
  },
  {
    "code": "NC147",
    "title": "Magic Wand Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC147",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-chromium--9684b.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-chromium--9684b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-chromium--9684b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/magic-wand-protez-jel-takma-tirnak-el--415-40.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/magic-wand-protez-jel-takma-tirnak-el--627-51.jpg"
    ],
    "details": [
      "Magic Wand Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC147",
      "Boutique Acquisition: ₺749",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/magic-wand-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-nc147"
  },
  {
    "code": "NC148",
    "title": "Stellar Flash Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC149",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-soft-ruby-e-199a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-soft-ruby-e-199a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-soft-ruby-e-199a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/stellar-flash-protez-jel-takma-tirnak--75-472.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/stellar-flash-protez-jel-takma-tirnak--5e88d3.jpg"
    ],
    "details": [
      "Stellar Flash Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC149",
      "Boutique Acquisition: ₺739",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/stellar-flash-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-nc149"
  },
  {
    "code": "NC149",
    "title": "Honey Bunny Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC149",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-quartz-eacf63.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-quartz-eacf63.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-quartz-eacf63.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/honey-bunny-protez-jel-takma-tirnak-el-97-a6d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/honey-bunny-protez-jel-takma-tirnak-el-af-72a.png"
    ],
    "details": [
      "Honey Bunny Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC149",
      "Boutique Acquisition: ₺599",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/honey-bunny-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc149"
  },
  {
    "code": "NC150",
    "title": "Bunny Pink Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC150",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-ruby-06f39e.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-ruby-06f39e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-ruby-06f39e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bunny-pink-protez-jel-takma-tirnak-el---87bf-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bunny-pink-protez-jel-takma-tirnak-el--47e7-8.jpg"
    ],
    "details": [
      "Bunny Pink Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC150",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/bunny-pink-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc150"
  },
  {
    "code": "NC151",
    "title": "Love Sense Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC151",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-love-68bf-e.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-love-68bf-e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-love-68bf-e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/love-sense-protez-jel-takma-tirnak-el--7e82-7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/love-sense-protez-jel-takma-tirnak-el--a89036.jpg"
    ],
    "details": [
      "Love Sense Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC151",
      "Boutique Acquisition: ₺599",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/love-sense-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc151"
  },
  {
    "code": "NC152",
    "title": "Forest Pond Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC152",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-emerald-0-afb7.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-emerald-0-afb7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-emerald-0-afb7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/forest-pond-protez-jel-takma-tirnak-el--a5a5-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/forest-pond-protez-jel-takma-tirnak-el-7-4acc.jpg"
    ],
    "details": [
      "Forest Pond Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC152",
      "Boutique Acquisition: ₺749",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/forest-pond-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc152"
  },
  {
    "code": "NC153",
    "title": "Pillow Soft Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC153",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-pillow-cdc-47.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-pillow-cdc-47.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-pillow-cdc-47.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pillow-soft-protez-jel-takma-tirnak-el-92-b65.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pillow-soft-protez-jel-takma-tirnak-el-92-998.jpg"
    ],
    "details": [
      "Pillow Soft Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC153",
      "Boutique Acquisition: ₺769",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/pillow-soft-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc153"
  },
  {
    "code": "NC154",
    "title": "Soft Quartz Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC154",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-soft-quartz-2b-85e.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-soft-quartz-2b-85e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-soft-quartz-2b-85e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-quartz-protez-jel-takma-tirnak-el-9816b-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-quartz-protez-jel-takma-tirnak-el-4203-b.jpg"
    ],
    "details": [
      "Soft Quartz Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC154",
      "Boutique Acquisition: ₺749",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/soft-quartz-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc154"
  },
  {
    "code": "NC155",
    "title": "Baby Blush Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC155",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-cotton-candy-583-b1.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-cotton-candy-583-b1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-cotton-candy-583-b1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/baby-blush-protez-jel-takma-tirnak-el--46-887.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/baby-blush-protez-jel-takma-tirnak-el--5651-c.jpg"
    ],
    "details": [
      "Baby Blush Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC155",
      "Boutique Acquisition: ₺499",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/baby-blush-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc155"
  },
  {
    "code": "NC156",
    "title": "Maroon Love Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC156",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-witch-b71-18.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-witch-b71-18.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-witch-b71-18.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/maroon-love-protez-jel-takma-tirnak-el-5-446f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/maroon-love-protez-jel-takma-tirnak-el-bba5-1.jpg"
    ],
    "details": [
      "Maroon Love Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC156",
      "Boutique Acquisition: ₺749",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/maroon-love-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc156"
  },
  {
    "code": "NC157",
    "title": "Forest Green Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC157",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-forest-fa-8d7.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-forest-fa-8d7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-forest-fa-8d7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/forest-green-protez-jel-takma-tirnak-e-0-fd94.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/forest-green-protez-jel-takma-tirnak-e-151-9a.jpg"
    ],
    "details": [
      "Forest Green Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC157",
      "Boutique Acquisition: ₺599",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/forest-green-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc157"
  },
  {
    "code": "NC158",
    "title": "Rose Heart Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC158",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-candy-32f171.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cat-eye-candy-32f171.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cat-eye-candy-32f171.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/rose-heart-protez-jel-takma-tirnak-el--2-413c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/rose-heart-protez-jel-takma-tirnak-el--f94-d0.png"
    ],
    "details": [
      "Rose Heart Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC158",
      "Boutique Acquisition: ₺749",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/rose-heart-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc158"
  },
  {
    "code": "NC159",
    "title": "Retro Grunge Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Gothic Charm -NC159",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/nature-contrast--760d-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/nature-contrast--760d-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/nature-contrast--760d-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/nature-contrast-6557-5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/nature-contrast-4ffd-b.jpg"
    ],
    "details": [
      "Retro Grunge Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Gothic Charm -NC159",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/retro-grunge-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-gothic-charm-nc159"
  },
  {
    "code": "NC160",
    "title": "Cyber Soul Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ombre French - NC160",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/deep-french-0-9bc5.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/deep-french-0-9bc5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/deep-french-0-9bc5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/deep-french-da-424.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/deep-french-369a-7.jpg"
    ],
    "details": [
      "Cyber Soul Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ombre French - NC160",
      "Boutique Acquisition: ₺899",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/cyber-soul-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-ombre-french-nc160"
  },
  {
    "code": "NC161",
    "title": "Starry Navy Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ombre Chrome - NC161",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/golden-stars-ac0b11.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/golden-stars-ac0b11.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/golden-stars-ac0b11.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/golden-stars--4aba-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/golden-stars-0f-974.jpg"
    ],
    "details": [
      "Starry Navy Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ombre Chrome - NC161",
      "Boutique Acquisition: ₺1.449",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/starry-navy-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-ombre-chrome-nc161"
  },
  {
    "code": "NC162",
    "title": "Steppe New Year Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Yılbaşı Christmas -NC162",
    "category": "NEW YEAR",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/steppe-new-year--90e5-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/steppe-new-year--90e5-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/steppe-new-year--90e5-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/steppe-new-year-c14a-4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/steppe-new-year-67-2ad.jpg"
    ],
    "details": [
      "Steppe New Year Protez Jel Takma Tırnak -El Yapımı Kalıcı Oje Nail Art Yılbaşı Christmas -NC162",
      "Boutique Acquisition: ₺949",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/steppe-new-year-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-yilbasi-christmas-nc162"
  },
  {
    "code": "NC164",
    "title": "Diamond Drops Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC164",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/diamond-drops-fb-78f.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/diamond-drops-fb-78f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/diamond-drops-fb-78f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/diamond-drops-9-563f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/diamond-drops-5970-3.jpg"
    ],
    "details": [
      "Diamond Drops Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC164",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/diamond-drops-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc164"
  },
  {
    "code": "NC165",
    "title": "Silk Touch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ombre - NC165",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/teddy-pawn-0c-499.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/teddy-pawn-0c-499.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/teddy-pawn-0c-499.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/teddy-pawn-bf-54c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/teddy-pawn-5ebe6-.jpg"
    ],
    "details": [
      "Silk Touch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ombre - NC165",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/silk-touch-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-ombre-nc165"
  },
  {
    "code": "NC166",
    "title": "Bloody Witch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Kırmızı - NC166",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/elegant-maroon-9418-f.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/elegant-maroon-9418-f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/elegant-maroon-9418-f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/elegant-maroon-ea-4f3.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/elegant-maroon-4e-b5c.jpg"
    ],
    "details": [
      "Bloody Witch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Kırmızı - NC166",
      "Boutique Acquisition: ₺899",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/bloody-witch-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-kirmizi-nc166"
  },
  {
    "code": "NC167",
    "title": "Cherry Red Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC167",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cute-elegant-6-4f38.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cute-elegant-6-4f38.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cute-elegant-6-4f38.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cute-elegant-bdb2-b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cute-elegant-db4-70.jpg"
    ],
    "details": [
      "Cherry Red Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC167",
      "Boutique Acquisition: ₺749",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/cherry-red-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc167"
  },
  {
    "code": "NC168",
    "title": "Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC168",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dark-captain-192-ab.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dark-captain-192-ab.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dark-captain-192-ab.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dark-captain-89d135.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dark-captain--6b34c.jpg"
    ],
    "details": [
      "Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC168",
      "Boutique Acquisition: ₺729",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc168"
  },
  {
    "code": "NC169",
    "title": "Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC169",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/star-cover-b-d689.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/star-cover-b-d689.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/star-cover-b-d689.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/star-cover-ac15f5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/star-cover-3d04-4.jpg"
    ],
    "details": [
      "Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC169",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc169"
  },
  {
    "code": "NC174",
    "title": "Vintage New Year Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC174",
    "category": "VINTAGE",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/vintage-new-year-2ea928.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/vintage-new-year-2ea928.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/vintage-new-year-2ea928.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/vintage-new-year-c767d5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/vintage-new-year-698a24.jpg"
    ],
    "details": [
      "Vintage New Year Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC174",
      "Boutique Acquisition: ₺799",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/vintage-new-year-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc174"
  },
  {
    "code": "NC175",
    "title": "Helloo Kitty Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Yılbaşı - NC175",
    "category": "NEW YEAR",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/heyo-kitty-1c30ca.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/heyo-kitty-1c30ca.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/heyo-kitty-1c30ca.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/heyo-kitty-6058a5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/heyo-kitty-10ef03.jpg"
    ],
    "details": [
      "Helloo Kitty Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Yılbaşı - NC175",
      "Boutique Acquisition: ₺1.199",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/helloo-kitty-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-yilbasi-nc175"
  },
  {
    "code": "NC216",
    "title": "Soft French Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC216",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-c7-41b.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-c7-41b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-c7-41b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-bb3742.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-7f7-c1.jpg"
    ],
    "details": [
      "Soft French Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC216",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/soft-french-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc216"
  },
  {
    "code": "NC215",
    "title": "Starry Void Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ombre Star - NC215",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-aaf42f.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-aaf42f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-aaf42f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-e8f2c8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-64a501.jpg"
    ],
    "details": [
      "Starry Void Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Ombre Star - NC215",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/starry-void-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-ombre-star-nc215"
  },
  {
    "code": "NC214",
    "title": "Rare Simplicity Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC214",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-070-fc.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-070-fc.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-070-fc.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-d0-4e7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-2575-9.jpg"
    ],
    "details": [
      "Rare Simplicity Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC214",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/rare-simplicity-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc214"
  },
  {
    "code": "NC213",
    "title": "Nebula Mist Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC213",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-5-b170.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-5-b170.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-5-b170.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-d74f65.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-9d7-40.jpg"
    ],
    "details": [
      "Nebula Mist Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC213",
      "Boutique Acquisition: ₺779",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/nebula-mist-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-nc213"
  },
  {
    "code": "NC212",
    "title": "Stellar Flare Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC212",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-aad29e.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-aad29e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-aad29e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-82-ab1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-699d5-.jpg"
    ],
    "details": [
      "Stellar Flare Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC212",
      "Boutique Acquisition: ₺779",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/stellar-flare-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-nc212"
  },
  {
    "code": "NC211",
    "title": "Urban Grey Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC211",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-ea639a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-ea639a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-ea639a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-979-4b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-7-4538.jpg"
    ],
    "details": [
      "Urban Grey Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC211",
      "Boutique Acquisition: ₺599",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/urban-grey-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-nc211"
  },
  {
    "code": "NC210",
    "title": "Thin Glow Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Pink - NC210",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-f-72bb.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-f-72bb.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-f-72bb.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-2-bee1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-d33628.jpg"
    ],
    "details": [
      "Thin Glow Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Pink - NC210",
      "Boutique Acquisition: ₺599",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/thin-glow-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-pink-nc210"
  },
  {
    "code": "NC209",
    "title": "Sugar Bunny Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC209",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-2-3de0.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-2-3de0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-2-3de0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-36-2ff.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-5-60d3.jpg"
    ],
    "details": [
      "Sugar Bunny Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC209",
      "Boutique Acquisition: ₺599",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/sugar-bunny-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc209"
  },
  {
    "code": "NC208",
    "title": "Cosmic Dust Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC208",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-2f2f-e.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-2f2f-e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-2f2f-e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-a91d09.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali--9f32-.jpg"
    ],
    "details": [
      "Cosmic Dust Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC208",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/cosmic-dust-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-nc208"
  },
  {
    "code": "NC207",
    "title": "Goldie French Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Chrome - NC207",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-ae9b2a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-ae9b2a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-ae9b2a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-a-966f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-64e-b1.jpg"
    ],
    "details": [
      "Goldie French Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Chrome - NC207",
      "Boutique Acquisition: ₺839",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/goldie-french-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-chrome-nc207"
  },
  {
    "code": "NC205",
    "title": "Magic Wand Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC205",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-964-ec.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-964-ec.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-964-ec.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-e525a-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-db-de3.jpg"
    ],
    "details": [
      "Magic Wand Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye - NC205",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/magic-wand-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-nc205"
  },
  {
    "code": "NC204",
    "title": "Heart Beat Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye Kırmızı - NC204",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali--d264-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali--d264-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali--d264-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-5381a4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-78666d.jpg"
    ],
    "details": [
      "Heart Beat Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye Kırmızı - NC204",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/heart-beat-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-kirmizi-nc204"
  },
  {
    "code": "NC203",
    "title": "Fairy Dust Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Cat Eye Chrome - NC203",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-471e-9.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-471e-9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-471e-9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-694c-7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-1a054a.jpg"
    ],
    "details": [
      "Fairy Dust Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Cat Eye Chrome - NC203",
      "Boutique Acquisition: ₺899",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/fairy-dust-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-chrome-nc203"
  },
  {
    "code": "NC202",
    "title": "Clear Ocean Dots Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC202",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-4fb-22.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-4fb-22.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-4fb-22.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-98383d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-68b7ed.jpg"
    ],
    "details": [
      "Clear Ocean Dots Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC202",
      "Boutique Acquisition: ₺1.199",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/clear-ocean-dots-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc202"
  },
  {
    "code": "NC177",
    "title": "Tiny Bloom Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC177",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-8071a6.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-8071a6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-8071a6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-21-cc5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-d-43dd.jpg"
    ],
    "details": [
      "Tiny Bloom Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC177",
      "Boutique Acquisition: ₺1.449",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/tiny-bloom-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc177"
  },
  {
    "code": "NC176",
    "title": "Timeless Classic Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Kırmızı - NC176",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-0d3893.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-0d3893.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-0d3893.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali-2339-2.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/protez-jel-takma-tirnak-el-yapimi-kali--428f-.jpg"
    ],
    "details": [
      "Timeless Classic Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Kırmızı - NC176",
      "Boutique Acquisition: ₺729",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/timeless-classic-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-kirmizi-nc176"
  },
  {
    "code": "NC249",
    "title": "Night Velvet Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC249",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/night-velvet-protez-jel-takma-tirnak-e-979f-8.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/night-velvet-protez-jel-takma-tirnak-e-979f-8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/night-velvet-protez-jel-takma-tirnak-e-979f-8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/night-velvet-protez-jel-takma-tirnak-e--42a7-.png",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/night-velvet-protez-jel-takma-tirnak-e-4-477d.jpg"
    ],
    "details": [
      "Night Velvet Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC249",
      "Boutique Acquisition: ₺1.299",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/night-velvet-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc249"
  },
  {
    "code": "NC248",
    "title": "Wild Touch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC248",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/wild-touch-protez-jel-takma-tirnak-el--13d-97.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/wild-touch-protez-jel-takma-tirnak-el--13d-97.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/wild-touch-protez-jel-takma-tirnak-el--13d-97.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/wild-touch-protez-jel-takma-tirnak-el---43da-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/wild-touch-protez-jel-takma-tirnak-el--15-474.jpg"
    ],
    "details": [
      "Wild Touch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC248",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/wild-touch-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc248"
  },
  {
    "code": "NC247",
    "title": "Crown Glow Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye Gold - NC247",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/crown-glow-protez-jel-takma-tirnak-el--67a724.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/crown-glow-protez-jel-takma-tirnak-el--67a724.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/crown-glow-protez-jel-takma-tirnak-el--67a724.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/crown-glow-protez-jel-takma-tirnak-el--92-994.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/crown-glow-protez-jel-takma-tirnak-el--160313.jpg"
    ],
    "details": [
      "Crown Glow Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art Cat Eye Gold - NC247",
      "Boutique Acquisition: ₺1.249",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/crown-glow-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-cat-eye-gold-nc247"
  },
  {
    "code": "NC242",
    "title": "Soft Blossom Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Ombre - NC242",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-blossom-protez-jel-takma-tirnak-e-210-46.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-blossom-protez-jel-takma-tirnak-e-210-46.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-blossom-protez-jel-takma-tirnak-e-210-46.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-blossom-protez-jel-takma-tirnak-e--bf3c-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-blossom-protez-jel-takma-tirnak-e-1-b73a.png"
    ],
    "details": [
      "Soft Blossom Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Ombre - NC242",
      "Boutique Acquisition: ₺1.249",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/soft-blossom-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-ombre-nc242"
  },
  {
    "code": "NC246",
    "title": "Night Wave Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC246",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/night-wave-protez-jel-takma-tirnak-el--ea302c.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/night-wave-protez-jel-takma-tirnak-el--ea302c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/night-wave-protez-jel-takma-tirnak-el--ea302c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/night-wave-protez-jel-takma-tirnak-el--aacd-1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/night-wave-protez-jel-takma-tirnak-el--76-a57.jpg"
    ],
    "details": [
      "Night Wave Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC246",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/night-wave-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc246"
  },
  {
    "code": "NC243",
    "title": "Soft French II Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC243",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-french-2-protez-jel-takma-tirnak--41-116.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-french-2-protez-jel-takma-tirnak--41-116.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-french-2-protez-jel-takma-tirnak--41-116.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-french-2-protez-jel-takma-tirnak--05fdd5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-french-2-protez-jel-takma-tirnak--2-17bd.jpg"
    ],
    "details": [
      "Soft French II Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC243",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/soft-french-ii-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc243"
  },
  {
    "code": "NC240",
    "title": "Dirty Ink Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art - NC240",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dirty-ink-protez-jel-takma-tirnak-el-y-21fc8-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dirty-ink-protez-jel-takma-tirnak-el-y-21fc8-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dirty-ink-protez-jel-takma-tirnak-el-y-21fc8-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dirty-ink-protez-jel-takma-tirnak-el-y-c-d970.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dirty-ink-protez-jel-takma-tirnak-el-y--4197-.jpg"
    ],
    "details": [
      "Dirty Ink Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art - NC240",
      "Boutique Acquisition: ₺1.079",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/dirty-ink-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-nc240"
  },
  {
    "code": "NC239",
    "title": "Steel Fade Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Ombre - NC239",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/steel-fade-protez-jel-takma-tirnak-el--b3c9-6.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/steel-fade-protez-jel-takma-tirnak-el--b3c9-6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/steel-fade-protez-jel-takma-tirnak-el--b3c9-6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/steel-fade-protez-jel-takma-tirnak-el--08ebf1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/steel-fade-protez-jel-takma-tirnak-el--ba335e.jpg"
    ],
    "details": [
      "Steel Fade Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Ombre - NC239",
      "Boutique Acquisition: ₺1.299",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/steel-fade-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-ombre-nc239"
  },
  {
    "code": "NC236",
    "title": "Steel Fade 2 Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Ombre - NC236",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/steel-fade-2-protez-jel-takma-tirnak-e-1955-e.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/steel-fade-2-protez-jel-takma-tirnak-e-1955-e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/steel-fade-2-protez-jel-takma-tirnak-e-1955-e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/steel-fade-2-protez-jel-takma-tirnak-e-6-a776.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/steel-fade-2-protez-jel-takma-tirnak-e-3-4eaa.jpg"
    ],
    "details": [
      "Steel Fade 2 Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Ombre - NC236",
      "Boutique Acquisition: ₺1.299",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/steel-fade-2-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-ombre-nc236"
  },
  {
    "code": "NC238",
    "title": "Blush Edge Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art French - NC238",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/blush-edge-protez-jel-takma-tirnak-el--571-cc.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/blush-edge-protez-jel-takma-tirnak-el--571-cc.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/blush-edge-protez-jel-takma-tirnak-el--571-cc.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/blush-edge-protez-jel-takma-tirnak-el--b685-0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/blush-edge-protez-jel-takma-tirnak-el---c7e8-.jpg"
    ],
    "details": [
      "Blush Edge Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art French - NC238",
      "Boutique Acquisition: ₺949",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/blush-edge-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-french-nc238"
  },
  {
    "code": "NC237",
    "title": "Lovely Ribbon Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Coquette - NC237",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/lovely-ribbon-protez-jel-takma-tirnak--7-2108.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/lovely-ribbon-protez-jel-takma-tirnak--7-2108.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lovely-ribbon-protez-jel-takma-tirnak--7-2108.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lovely-ribbon-protez-jel-takma-tirnak--609-f4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lovely-ribbon-protez-jel-takma-tirnak--5d942f.jpg"
    ],
    "details": [
      "Lovely Ribbon Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Coquette - NC237",
      "Boutique Acquisition: ₺949",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/lovely-ribbon-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-coquette-nc237"
  },
  {
    "code": "NC232",
    "title": "Lovely Red Ribbon Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Coquette - NC232",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/lovely-red-ribbon-protez-jel-takma-tir-a895-9.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/lovely-red-ribbon-protez-jel-takma-tir-a895-9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lovely-red-ribbon-protez-jel-takma-tir-a895-9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lovely-red-ribbon-protez-jel-takma-tir--8084-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lovely-red-ribbon-protez-jel-takma-tir-0c-4b3.png"
    ],
    "details": [
      "Lovely Red Ribbon Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art Coquette - NC232",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/lovely-red-ribbon-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-coquette-nc232"
  },
  {
    "code": "NC235",
    "title": "Soft Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Dantel - NC235",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-lace-protez-jel-takma-tirnak-el-y-a-a781.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-lace-protez-jel-takma-tirnak-el-y-a-a781.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-lace-protez-jel-takma-tirnak-el-y-a-a781.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-lace-protez-jel-takma-tirnak-el-y-74f81f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-lace-protez-jel-takma-tirnak-el-y-713-45.jpg"
    ],
    "details": [
      "Soft Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Dantel - NC235",
      "Boutique Acquisition: ₺1.439",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/soft-lace-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-dantel-nc235"
  },
  {
    "code": "NC234",
    "title": "Soft Bridal Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Dantel - NC234",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-bridal-lace-protez-jel-takma-tirn-394-40.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/soft-bridal-lace-protez-jel-takma-tirn-394-40.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-bridal-lace-protez-jel-takma-tirn-394-40.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-bridal-lace-protez-jel-takma-tirn-1-df31.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/soft-bridal-lace-protez-jel-takma-tirn--b906-.jpg"
    ],
    "details": [
      "Soft Bridal Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art Dantel - NC234",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/soft-bridal-lace-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-dantel-nc234"
  },
  {
    "code": "NC230",
    "title": "Dark Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC230",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dark-lace-protez-jel-takma-tirnak-el-y-b-931b.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dark-lace-protez-jel-takma-tirnak-el-y-b-931b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dark-lace-protez-jel-takma-tirnak-el-y-b-931b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dark-lace-protez-jel-takma-tirnak-el-y-999-fe.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dark-lace-protez-jel-takma-tirnak-el-y--ea6d0.jpg"
    ],
    "details": [
      "Dark Lace Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC230",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/dark-lace-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc230"
  },
  {
    "code": "NC231",
    "title": "Wild Leopard French Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC231",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/wild-leopard-french-protez-jel-takma-t-eb-86d.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/wild-leopard-french-protez-jel-takma-t-eb-86d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/wild-leopard-french-protez-jel-takma-t-eb-86d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/wild-leopard-french-protez-jel-takma-t-47a-96.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/wild-leopard-french-protez-jel-takma-t-64-b38.jpg"
    ],
    "details": [
      "Wild Leopard French Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC231",
      "Boutique Acquisition: ₺949",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/wild-leopard-french-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc231"
  },
  {
    "code": "NC233",
    "title": "Night Glitter Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC233",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/night-glitter-protez-jel-takma-tirnak--5b-810.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/night-glitter-protez-jel-takma-tirnak--5b-810.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/night-glitter-protez-jel-takma-tirnak--5b-810.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/night-glitter-protez-jel-takma-tirnak--784836.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/night-glitter-protez-jel-takma-tirnak--e57fa2.jpg"
    ],
    "details": [
      "Night Glitter Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC233",
      "Boutique Acquisition: ₺739",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/night-glitter-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc233"
  },
  {
    "code": "NC229",
    "title": "Milky Pearl Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art İnci Tozu - NC229",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/milky-pearl-protez-jel-takma-tirnak-el-aefaa3.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/milky-pearl-protez-jel-takma-tirnak-el-aefaa3.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/milky-pearl-protez-jel-takma-tirnak-el-aefaa3.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/milky-pearl-protez-jel-takma-tirnak-el--258ef.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/milky-pearl-protez-jel-takma-tirnak-el-e88c-4.jpg"
    ],
    "details": [
      "Milky Pearl Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art İnci Tozu - NC229",
      "Boutique Acquisition: ₺1.199",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/milky-pearl-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-inci-tozu-nc229"
  },
  {
    "code": "NC228",
    "title": "Bridal Glitter Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC228",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bridal-glitter-protez-jel-takma-tirnak-bd-49b.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bridal-glitter-protez-jel-takma-tirnak-bd-49b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bridal-glitter-protez-jel-takma-tirnak-bd-49b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bridal-glitter-protez-jel-takma-tirnak-7f19bd.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bridal-glitter-protez-jel-takma-tirnak-13-347.jpg"
    ],
    "details": [
      "Bridal Glitter Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC228",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/bridal-glitter-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc228"
  },
  {
    "code": "NC223",
    "title": "Rainbow Glitter Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC223",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/rainbow-glitter-protez-jel-takma-tirna-20c469.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/rainbow-glitter-protez-jel-takma-tirna-20c469.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/rainbow-glitter-protez-jel-takma-tirna-20c469.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/rainbow-glitter-protez-jel-takma-tirna-ef7b-4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/rainbow-glitter-protez-jel-takma-tirna-5671a8.jpg"
    ],
    "details": [
      "Rainbow Glitter Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje Nail Art - NC223",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/rainbow-glitter-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc223"
  },
  {
    "code": "NC221",
    "title": "Glitter Ombre Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art - NC221",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/glitter-ombre-protez-jel-takma-tirnak--b-d038.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/glitter-ombre-protez-jel-takma-tirnak--b-d038.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glitter-ombre-protez-jel-takma-tirnak--b-d038.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glitter-ombre-protez-jel-takma-tirnak--e6de9d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glitter-ombre-protez-jel-takma-tirnak--874-4a.jpg"
    ],
    "details": [
      "Glitter Ombre Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art - NC221",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/glitter-ombre-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-nc221"
  },
  {
    "code": "NC220",
    "title": "Glitter Star Gold Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art - NC220",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/glitter-star-gold-protez-jel-takma-tir-83-3a3.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/glitter-star-gold-protez-jel-takma-tir-83-3a3.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glitter-star-gold-protez-jel-takma-tir-83-3a3.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glitter-star-gold-protez-jel-takma-tir-3e220-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glitter-star-gold-protez-jel-takma-tir-a-4efd.jpg"
    ],
    "details": [
      "Glitter Star Gold Protez Jel Takma  Tırnak - El Yapımı  Kalıcı Oje 3D Nail Art - NC220",
      "Boutique Acquisition: ₺849",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/glitter-star-gold-protez-jel-takma-tirnak-el-yapimi-kalici-oje-3d-nail-art-nc220"
  },
  {
    "code": "NC226",
    "title": "Retro Touch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC226",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/retro-touch-protez-jel-takma-tirnak-el--4b69-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/retro-touch-protez-jel-takma-tirnak-el--4b69-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/retro-touch-protez-jel-takma-tirnak-el--4b69-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/retro-touch-protez-jel-takma-tirnak-el-7c50ff.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/retro-touch-protez-jel-takma-tirnak-el-675652.png"
    ],
    "details": [
      "Retro Touch Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC226",
      "Boutique Acquisition: ₺1.149",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/retro-touch-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc226"
  },
  {
    "code": "NC227",
    "title": "Ribbon Charm Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC227",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ribbon-charm-protez-jel-takma-tirnak-e-3dd5-b.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ribbon-charm-protez-jel-takma-tirnak-e-3dd5-b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ribbon-charm-protez-jel-takma-tirnak-e-3dd5-b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ribbon-charm-protez-jel-takma-tirnak-e-026a-d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ribbon-charm-protez-jel-takma-tirnak-e-4-0d7f.jpg"
    ],
    "details": [
      "Ribbon Charm Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC227",
      "Boutique Acquisition: ₺599",
      "Limited Collection Edition • Direct Acquisition"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/ribbon-charm-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc227"
  },
  {
    "code": "NC225",
    "title": "Floral Piercing Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art 3D - NC225",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/floral-piercing-protez-jel-takma-tirna-43-3ec.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/floral-piercing-protez-jel-takma-tirna-43-3ec.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/floral-piercing-protez-jel-takma-tirna-43-3ec.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/floral-piercing-protez-jel-takma-tirna--75956.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/floral-piercing-protez-jel-takma-tirna-e-499b.jpg"
    ],
    "details": [
      "Floral Piercing Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art 3D - NC225",
      "Boutique Acquisition: ₺1.949",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/floral-piercing-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-3d-nc225"
  },
  {
    "code": "NC224",
    "title": "Red Impact Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC224",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/red-impact-protez-jel-takma-tirnak-el--9f6732.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/red-impact-protez-jel-takma-tirnak-el--9f6732.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/red-impact-protez-jel-takma-tirnak-el--9f6732.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/red-impact-protez-jel-takma-tirnak-el---eba72.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/red-impact-protez-jel-takma-tirnak-el--ac4a-5.png"
    ],
    "details": [
      "Red Impact Protez Jel Takma Tırnak - El Yapımı Kalıcı Oje Nail Art - NC224",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/red-impact-protez-jel-takma-tirnak-el-yapimi-kalici-oje-nail-art-nc224"
  },
  {
    "code": "NC218",
    "title": "Dream - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre - NC218",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ocean-glow-ombre-protez-jel-takma-tirn-9-6f3a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ocean-glow-ombre-protez-jel-takma-tirn-9-6f3a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ocean-glow-ombre-protez-jel-takma-tirn-9-6f3a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ocean-glow-ombre-protez-jel-takma-tirn-4fd-95.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dream-el-yapimi-tekrar-kullanilabilir--2-0988.png"
    ],
    "details": [
      "Dream - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre - NC218",
      "Boutique Acquisition: ₺1.199",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/dream-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-ombre-nc218"
  },
  {
    "code": "NC219",
    "title": "Aura - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - 3D Ombre - NC219",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-08bd5a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-08bd5a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-08bd5a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-cd24-4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-be840-.jpg"
    ],
    "details": [
      "Aura - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - 3D Ombre - NC219",
      "Boutique Acquisition: ₺1.649",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/aura-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-3d-ombre-nc219"
  },
  {
    "code": "NC217",
    "title": "Nebula - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC217",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/nebula-protez-jel-takma-tirnak-el-yapi-f-4105.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/nebula-protez-jel-takma-tirnak-el-yapi-f-4105.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/nebula-protez-jel-takma-tirnak-el-yapi-f-4105.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/nebula-protez-jel-takma-tirnak-el-yapi-96-244.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/nebula-protez-jel-takma-tirnak-el-yapi--4533-.jpg"
    ],
    "details": [
      "Nebula - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC217",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/nebula-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-cat-eye-nc217"
  },
  {
    "code": "CND103",
    "title": "Custom Nail Design CND103",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/custom-nail-design-a1-49f892c36e0.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/custom-nail-design-a1-49f892c36e0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/custom-nail-design-a1-49f892c36e0.jpg"
    ],
    "details": [
      "Custom Nail Design CND103",
      "Boutique Acquisition: ₺1.199",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/custom-nail-design-cnd103"
  },
  {
    "code": "CND104",
    "title": "Custom Nail Design CND104",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/custom-nail-design-cnd104-20475a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/custom-nail-design-cnd104-20475a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/custom-nail-design-cnd104-20475a.jpg"
    ],
    "details": [
      "Custom Nail Design CND104",
      "Boutique Acquisition: ₺2.199",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/custom-nail-design-cnd104"
  },
  {
    "code": "NC250",
    "title": "Silver Web - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC250",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-04b39.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-04b39.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-04b39.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-c85bd.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/purple-violet-aura-protez-jel-takma-ti-b3398.jpg"
    ],
    "details": [
      "Silver Web - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC250",
      "Boutique Acquisition: ₺1.699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/silver-web-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-cat-eye-nc250"
  },
  {
    "code": "NC251",
    "title": "Thorn - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC251",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/thorn-el-yapimi-tekrar-kullanilabilir--6411-c.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/thorn-el-yapimi-tekrar-kullanilabilir--6411-c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/thorn-el-yapimi-tekrar-kullanilabilir--6411-c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/thorn-el-yapimi-tekrar-kullanilabilir--ea58da.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/thorn-el-yapimi-tekrar-kullanilabilir---416e-.jpg"
    ],
    "details": [
      "Thorn - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC251",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/thorn-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc251"
  },
  {
    "code": "NC253",
    "title": "Ballerina - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC253",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-7a-3c0.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-7a-3c0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-7a-3c0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-83de-4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab--9262-.jpg"
    ],
    "details": [
      "Ballerina - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC253",
      "Boutique Acquisition: ₺1.249",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/ballerina-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-cat-eye-nc253"
  },
  {
    "code": "NC254",
    "title": "Splash - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC254",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/splash-el-yapimi-tekrar-kullanilabilir-0a-4c0.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/splash-el-yapimi-tekrar-kullanilabilir-0a-4c0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/splash-el-yapimi-tekrar-kullanilabilir-0a-4c0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/splash-el-yapimi-tekrar-kullanilabilir-5aaec2.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/splash-el-yapimi-tekrar-kullanilabilir-5990-4.jpg"
    ],
    "details": [
      "Splash - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC254",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/splash-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc254"
  },
  {
    "code": "NC255",
    "title": "Ballerina II - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC255",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ballerina-ii-el-yapimi-tekrar-kullanil-4-441a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ballerina-ii-el-yapimi-tekrar-kullanil-4-441a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ballerina-ii-el-yapimi-tekrar-kullanil-4-441a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ballerina-ii-el-yapimi-tekrar-kullanil-3-b8e5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ballerina-ii-el-yapimi-tekrar-kullanil-99fe34.jpg"
    ],
    "details": [
      "Ballerina II - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC255",
      "Boutique Acquisition: ₺1.149",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/ballerina-ii-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-cat-eye-nc250"
  },
  {
    "code": "NC256",
    "title": "Bloody Dead - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC256",
    "category": "HALLOWEEN",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-8687d1.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-8687d1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-8687d1.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-cd1208.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-fd35-1.jpg"
    ],
    "details": [
      "Bloody Dead - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC256",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/bloody-dead-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc256"
  },
  {
    "code": "NC257",
    "title": "Oscar Carpet - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC257",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/oscar-carpet-el-yapimi-tekrar-kullanil-1f1-46.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/oscar-carpet-el-yapimi-tekrar-kullanil-1f1-46.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/oscar-carpet-el-yapimi-tekrar-kullanil-1f1-46.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/oscar-carpet-el-yapimi-tekrar-kullanil-28b-4a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/oscar-carpet-el-yapimi-tekrar-kullanil-4827-9.jpg"
    ],
    "details": [
      "Oscar Carpet - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC257",
      "Boutique Acquisition: ₺749",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/oscar-carpet-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc257"
  },
  {
    "code": "NC258",
    "title": "Cutee - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC258",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cutee-el-yapimi-tekrar-kullanilabilir--0b-93e.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cutee-el-yapimi-tekrar-kullanilabilir--0b-93e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cutee-el-yapimi-tekrar-kullanilabilir--0b-93e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cutee-el-yapimi-tekrar-kullanilabilir--8451df.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cutee-el-yapimi-tekrar-kullanilabilir---b4d6-.jpg"
    ],
    "details": [
      "Cutee - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC258",
      "Boutique Acquisition: ₺759",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/cutee-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-cat-eye-nc258"
  },
  {
    "code": "NC259",
    "title": "Bride Haze - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Jel - NC259",
    "category": "ÖZEL GÜNLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bride-haze-el-yapimi-tekrar-kullanilab-0b-ae4.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bride-haze-el-yapimi-tekrar-kullanilab-0b-ae4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bride-haze-el-yapimi-tekrar-kullanilab-0b-ae4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bride-haze-el-yapimi-tekrar-kullanilab-58b72d.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bride-haze-el-yapimi-tekrar-kullanilab-ca9dba.jpg"
    ],
    "details": [
      "Bride Haze - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Jel - NC259",
      "Boutique Acquisition: ₺639",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/bride-haze-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-jel-nc259"
  },
  {
    "code": "NC260",
    "title": "Bride Sky - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Jel - NC260",
    "category": "ÖZEL GÜNLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bride-sky-el-yapimi-tekrar-kullanilabi-15d1-8.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/bride-sky-el-yapimi-tekrar-kullanilabi-15d1-8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bride-sky-el-yapimi-tekrar-kullanilabi-15d1-8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bride-sky-el-yapimi-tekrar-kullanilabi-4-490b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/bride-sky-el-yapimi-tekrar-kullanilabi-c9-c59.jpg"
    ],
    "details": [
      "Bride Sky - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Jel - NC260",
      "Boutique Acquisition: ₺599",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/bride-sky-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-jel-nc260"
  },
  {
    "code": "NC261",
    "title": "Rainbow II - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre Glitter - NC261",
    "category": "ÖZEL GÜNLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-6a1-a7.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-6a1-a7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-6a1-a7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-0e086c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-59-729.jpg"
    ],
    "details": [
      "Rainbow II - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre Glitter - NC261",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/rainbow-ii-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-ombre-glitter-nc261"
  },
  {
    "code": "NC262",
    "title": "Rainbow III - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre Glitter- NC262",
    "category": "ÖZEL GÜNLER",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-6b142.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-6b142.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-6b142.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-0d392.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/glowing-dust-el-yapimi-tekrar-kullanil-56cd4.jpg"
    ],
    "details": [
      "Rainbow III - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre Glitter- NC262",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/rainbow-iii-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-ombre-glitter-nc262"
  },
  {
    "code": "NC263",
    "title": "Silver Star - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre - NC263",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/silver-star-el-yapimi-tekrar-kullanila--b5d2-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/silver-star-el-yapimi-tekrar-kullanila--b5d2-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-star-el-yapimi-tekrar-kullanila--b5d2-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-star-el-yapimi-tekrar-kullanila-9bed-4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-star-el-yapimi-tekrar-kullanila-ab1452.jpg"
    ],
    "details": [
      "Silver Star - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre - NC263",
      "Boutique Acquisition: ₺1.249",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/silver-star-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-ombre-nc263"
  },
  {
    "code": "NC264",
    "title": "Gold Favor - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre - NC264",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gold-favor-el-yapimi-tekrar-kullanilab-030dd-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/gold-favor-el-yapimi-tekrar-kullanilab-030dd-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gold-favor-el-yapimi-tekrar-kullanilab-030dd-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gold-favor-el-yapimi-tekrar-kullanilab-ce7-47.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/gold-favor-el-yapimi-tekrar-kullanilab-294-0c.jpg"
    ],
    "details": [
      "Gold Favor - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Ombre - NC264",
      "Boutique Acquisition: ₺1.499",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/gold-favor-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-ombre-nc264"
  },
  {
    "code": "NC265",
    "title": "Olive Beauty - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC265",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/olive-beauty-el-yapimi-tekrar-kullanil-faae14.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/olive-beauty-el-yapimi-tekrar-kullanil-faae14.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/olive-beauty-el-yapimi-tekrar-kullanil-faae14.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/olive-beauty-el-yapimi-tekrar-kullanil-f-3292.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/olive-beauty-el-yapimi-tekrar-kullanil-e43-40.jpg"
    ],
    "details": [
      "Olive Beauty - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC265",
      "Boutique Acquisition: ₺829",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/olive-beauty-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc265"
  },
  {
    "code": "NC266",
    "title": "Tamga Blue - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC266",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tamga-blue-el-yapimi-tekrar-kullanilab-8a68c7.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tamga-blue-el-yapimi-tekrar-kullanilab-8a68c7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tamga-blue-el-yapimi-tekrar-kullanilab-8a68c7.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tamga-blue-el-yapimi-tekrar-kullanilab-5bc-4b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tamga-blue-el-yapimi-tekrar-kullanilab-f-bd52.jpg"
    ],
    "details": [
      "Tamga Blue - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Cat Eye - NC266",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/tamga-blue-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-cat-eye-nc266"
  },
  {
    "code": "NC267",
    "title": "Lady Knight - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Charm - NC267",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/lady-knight-el-yapimi-tekrar-kullanila-ec-611.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/lady-knight-el-yapimi-tekrar-kullanila-ec-611.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lady-knight-el-yapimi-tekrar-kullanila-ec-611.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lady-knight-el-yapimi-tekrar-kullanila-b0-404.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/lady-knight-el-yapimi-tekrar-kullanila-b11571.jpg"
    ],
    "details": [
      "Lady Knight - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - Charm - NC267",
      "Boutique Acquisition: ₺1.279",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/lady-knight-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-charm-nc267"
  },
  {
    "code": "NC268",
    "title": "Dracula Red - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC268",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dracula-red-el-yapimi-tekrar-kullanila-4854-b.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dracula-red-el-yapimi-tekrar-kullanila-4854-b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dracula-red-el-yapimi-tekrar-kullanila-4854-b.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dracula-red-el-yapimi-tekrar-kullanila-c-738c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dracula-red-el-yapimi-tekrar-kullanila-de-993.jpg"
    ],
    "details": [
      "Dracula Red - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC268",
      "Boutique Acquisition: ₺749",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/dracula-red-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc268"
  },
  {
    "code": "NC269",
    "title": "Star Beauty - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC269",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/star-beauty-el-yapimi-tekrar-kullanila-6a5404.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/star-beauty-el-yapimi-tekrar-kullanila-6a5404.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/star-beauty-el-yapimi-tekrar-kullanila-6a5404.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/star-beauty-el-yapimi-tekrar-kullanila-43a7-a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/star-beauty-el-yapimi-tekrar-kullanila-8a914f.jpg"
    ],
    "details": [
      "Star Beauty - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC269",
      "Boutique Acquisition: ₺1.399",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/star-beauty-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc269"
  },
  {
    "code": "NC270",
    "title": "Pisi Pisi - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC270",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-b-9178.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-b-9178.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-b-9178.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-ac-4ab.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-c7a-6a.jpg"
    ],
    "details": [
      "Pisi Pisi - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC270",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/pisi-pisi-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc270"
  },
  {
    "code": "NC271",
    "title": "Princess Ribbon - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC271",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/princess-ribbon-el-yapimi-tekrar-kulla-9201-4.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/princess-ribbon-el-yapimi-tekrar-kulla-9201-4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/princess-ribbon-el-yapimi-tekrar-kulla-9201-4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/princess-ribbon-el-yapimi-tekrar-kulla-4a-4f3.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/princess-ribbon-el-yapimi-tekrar-kulla-4fa9-b.jpg"
    ],
    "details": [
      "Princess Ribbon - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC271",
      "Boutique Acquisition: ₺999",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/princess-ribbon-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc271"
  },
  {
    "code": "NC272",
    "title": "White Pierce - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC272",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/white-pierce-el-yapimi-tekrar-kullanil-49c656.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/white-pierce-el-yapimi-tekrar-kullanil-49c656.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/white-pierce-el-yapimi-tekrar-kullanil-49c656.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-a35a5.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-493d2.jpg"
    ],
    "details": [
      "White Pierce - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC272",
      "Boutique Acquisition: ₺1.249",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/white-pierce-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc272"
  },
  {
    "code": "NC273",
    "title": "White Pierce II - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC273",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/white-pierce-ii-el-yapimi-tekrar-kulla-835-47.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/white-pierce-ii-el-yapimi-tekrar-kulla-835-47.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/white-pierce-ii-el-yapimi-tekrar-kulla-835-47.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-a9763.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-477fa.jpg"
    ],
    "details": [
      "White Pierce II - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC273",
      "Boutique Acquisition: ₺1.149",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/white-pierce-ii-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc273"
  },
  {
    "code": "NC274",
    "title": "Chromium Web - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC274",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/chromium-web-el-yapimi-tekrar-kullanil-10-4a6.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/chromium-web-el-yapimi-tekrar-kullanil-10-4a6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/chromium-web-el-yapimi-tekrar-kullanil-10-4a6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/chromium-web-el-yapimi-tekrar-kullanil-68d43c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/chromium-web-el-yapimi-tekrar-kullanil-5f1-4d.jpg"
    ],
    "details": [
      "Chromium Web - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC274",
      "Boutique Acquisition: ₺1.449",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/chromium-web-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc274"
  },
  {
    "code": "NC275",
    "title": "Tekir Paw - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC275",
    "category": "KEDİ GÖZÜ",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tekir-paw-el-yapimi-tekrar-kullanilabi-0618d9.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tekir-paw-el-yapimi-tekrar-kullanilabi-0618d9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tekir-paw-el-yapimi-tekrar-kullanilabi-0618d9.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tekir-paw-el-yapimi-tekrar-kullanilabi-722b12.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tekir-paw-el-yapimi-tekrar-kullanilabi-e1-9e0.jpg"
    ],
    "details": [
      "Tekir Paw - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC275",
      "Boutique Acquisition: ₺849",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/tekir-paw-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc275"
  },
  {
    "code": "NC276",
    "title": "Silver Flames - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC276",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/silver-flames-el-yapimi-tekrar-kullani-e-b3c8.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/silver-flames-el-yapimi-tekrar-kullani-e-b3c8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-flames-el-yapimi-tekrar-kullani-e-b3c8.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-flames-el-yapimi-tekrar-kullani-196-87.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-flames-el-yapimi-tekrar-kullani-1-192c.jpg"
    ],
    "details": [
      "Silver Flames - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC276",
      "Boutique Acquisition: ₺1.249",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/silver-flames-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc276"
  },
  {
    "code": "NC277",
    "title": "Blue Berries - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC277",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/blue-berries-el-yapimi-tekrar-kullanil-67-4fb.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/blue-berries-el-yapimi-tekrar-kullanil-67-4fb.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/blue-berries-el-yapimi-tekrar-kullanil-67-4fb.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/blue-berries-el-yapimi-tekrar-kullanil-69-83c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/blue-berries-el-yapimi-tekrar-kullanil-cc777e.jpg"
    ],
    "details": [
      "Blue Berries - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC277",
      "Boutique Acquisition: ₺1.249",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/blue-berries-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc277"
  },
  {
    "code": "NC279",
    "title": "Pure French - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC279",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pure-french-el-yapimi-tekrar-kullanila--4ad3-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/pure-french-el-yapimi-tekrar-kullanila--4ad3-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pure-french-el-yapimi-tekrar-kullanila--4ad3-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-a0b16.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-4cc6e.jpg"
    ],
    "details": [
      "Pure French - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC279",
      "Boutique Acquisition: ₺799",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/pure-french-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc279"
  },
  {
    "code": "NC280",
    "title": "Diamond Stars - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC280",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/diamond-stars-el-yapimi-tekrar-kullani-58a-1a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/diamond-stars-el-yapimi-tekrar-kullani-58a-1a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/diamond-stars-el-yapimi-tekrar-kullani-58a-1a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-a9c9e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-48a19.jpg"
    ],
    "details": [
      "Diamond Stars - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC280",
      "Boutique Acquisition: ₺1.099",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/diamond-stars-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc280"
  },
  {
    "code": "NC281",
    "title": "Cheering Beauty - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC281",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cheering-beauty-el-yapimi-tekrar-kulla-9548a6.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/cheering-beauty-el-yapimi-tekrar-kulla-9548a6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cheering-beauty-el-yapimi-tekrar-kulla-9548a6.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cheering-beauty-el-yapimi-tekrar-kulla-c77d5c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/cheering-beauty-el-yapimi-tekrar-kulla-af6420.jpg"
    ],
    "details": [
      "Cheering Beauty - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC281",
      "Boutique Acquisition: ₺1.349",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/cheering-beauty-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc281"
  },
  {
    "code": "NC282",
    "title": "Deep Space - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC282",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/deep-space-el-yapimi-tekrar-kullanilab-88d-c4.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/deep-space-el-yapimi-tekrar-kullanilab-88d-c4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/deep-space-el-yapimi-tekrar-kullanilab-88d-c4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/deep-space-el-yapimi-tekrar-kullanilab--416a-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/deep-space-el-yapimi-tekrar-kullanilab-6a3d-a.jpg"
    ],
    "details": [
      "Deep Space - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC282",
      "Boutique Acquisition: ₺1.399",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/deep-space-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc282"
  },
  {
    "code": "NC283",
    "title": "Dots - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC283",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dots-el-yapimi-tekrar-kullanilabilir-p-a50687.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/dots-el-yapimi-tekrar-kullanilabilir-p-a50687.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dots-el-yapimi-tekrar-kullanilabilir-p-a50687.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dots-el-yapimi-tekrar-kullanilabilir-p--9c1c-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/dots-el-yapimi-tekrar-kullanilabilir-p-7d306f.jpg"
    ],
    "details": [
      "Dots - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC283",
      "Boutique Acquisition: ₺749",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/dots-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc283"
  },
  {
    "code": "NC284",
    "title": "Ghost Face - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC284",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ghost-face-el-yapimi-tekrar-kullanilab-c9ad19.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ghost-face-el-yapimi-tekrar-kullanilab-c9ad19.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ghost-face-el-yapimi-tekrar-kullanilab-c9ad19.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ghost-face-el-yapimi-tekrar-kullanilab-82-49e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ghost-face-el-yapimi-tekrar-kullanilab-0d6b09.jpg"
    ],
    "details": [
      "Ghost Face - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC284",
      "Boutique Acquisition: ₺2.299",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/ghost-face-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc284"
  },
  {
    "code": "NC285",
    "title": "Ruby Jaguar - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC285",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ruby-jaguar-el-yapimi-tekrar-kullanila-93be8f.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ruby-jaguar-el-yapimi-tekrar-kullanila-93be8f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ruby-jaguar-el-yapimi-tekrar-kullanila-93be8f.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ruby-jaguar-el-yapimi-tekrar-kullanila-70c168.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ruby-jaguar-el-yapimi-tekrar-kullanila--a893-.jpg"
    ],
    "details": [
      "Ruby Jaguar - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC285",
      "Boutique Acquisition: ₺1.099",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/ruby-jaguar-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc285"
  },
  {
    "code": "NC286",
    "title": "Anatolian Breeze - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC286",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/anatolian-breeze-el-yapimi-tekrar-kull-f418a-.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/anatolian-breeze-el-yapimi-tekrar-kull-f418a-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/anatolian-breeze-el-yapimi-tekrar-kull-f418a-.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/anatolian-breeze-el-yapimi-tekrar-kull-fe3-00.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/anatolian-breeze-el-yapimi-tekrar-kull-09b004.jpg"
    ],
    "details": [
      "Anatolian Breeze - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC286",
      "Boutique Acquisition: ₺1.899",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/anatolian-breeze-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc286"
  },
  {
    "code": "NC287",
    "title": "Anatolian Breeze II - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC287",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/anatolian-breeze-ii-el-yapimi-tekrar-k-48-a83.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/anatolian-breeze-ii-el-yapimi-tekrar-k-48-a83.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/anatolian-breeze-ii-el-yapimi-tekrar-k-48-a83.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/anatolian-breeze-ii-el-yapimi-tekrar-k-e1-bb0.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/anatolian-breeze-ii-el-yapimi-tekrar-k-60-bab.jpg"
    ],
    "details": [
      "Anatolian Breeze II - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC287",
      "Boutique Acquisition: ₺1.899",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/anatolian-breeze-ii-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc287"
  },
  {
    "code": "NC288",
    "title": "Anatolian Breeze III - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC288",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/anatolian-breeze-iii-el-yapimi-tekrar--cfb7-a.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/anatolian-breeze-iii-el-yapimi-tekrar--cfb7-a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/anatolian-breeze-iii-el-yapimi-tekrar--cfb7-a.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-aa71e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-4a589.jpg"
    ],
    "details": [
      "Anatolian Breeze III - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC288",
      "Boutique Acquisition: ₺1.849",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/anatolian-breeze-iii-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc288"
  },
  {
    "code": "NC289",
    "title": "Anatolian Breeze IV - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC289",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/anatolian-breeze-iv-el-yapimi-tekrar-k--f0cb2.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/anatolian-breeze-iv-el-yapimi-tekrar-k--f0cb2.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/anatolian-breeze-iv-el-yapimi-tekrar-k--f0cb2.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-af8e4.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-4ea37.jpg"
    ],
    "details": [
      "Anatolian Breeze IV - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC289",
      "Boutique Acquisition: ₺1.849",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/anatolian-breeze-iv-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc289"
  },
  {
    "code": "NC290",
    "title": "Royal Stones - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC290",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/royal-stones-el-yapimi-tekrar-kullanil-4e0344.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/royal-stones-el-yapimi-tekrar-kullanil-4e0344.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/royal-stones-el-yapimi-tekrar-kullanil-4e0344.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/royal-stones-el-yapimi-tekrar-kullanil-d8c282.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/royal-stones-el-yapimi-tekrar-kullanil-7b138c.jpg"
    ],
    "details": [
      "Royal Stones - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC290",
      "Boutique Acquisition: ₺1.299",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/royal-stones-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc290"
  },
  {
    "code": "NC291",
    "title": "Diamond Beach - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC291",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/diamond-beach-el-yapimi-tekrar-kullani-f69f0c.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/diamond-beach-el-yapimi-tekrar-kullani-f69f0c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/diamond-beach-el-yapimi-tekrar-kullani-f69f0c.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-a475e.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-433aa.jpg"
    ],
    "details": [
      "Diamond Beach - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC291",
      "Boutique Acquisition: ₺1.199",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/diamond-beach-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc291"
  },
  {
    "code": "NC292",
    "title": "Ancient Egypt - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC292",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancient-egypt-el-yapimi-tekrar-kullani-6ba992.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancient-egypt-el-yapimi-tekrar-kullani-6ba992.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ancient-egypt-el-yapimi-tekrar-kullani-6ba992.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-a5b03.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-4c643.jpg"
    ],
    "details": [
      "Ancient Egypt - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC292",
      "Boutique Acquisition: ₺1.399",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/ancient-egypt-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc292"
  },
  {
    "code": "NC293",
    "title": "Ancient Africa - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC293",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancient-africa-el-yapimi-tekrar-kullan-b8-470.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/ancient-africa-el-yapimi-tekrar-kullan-b8-470.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/ancient-africa-el-yapimi-tekrar-kullan-b8-470.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/silver-web-el-yapimi-tekrar-kullanilab-adb93.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/pisi-pisi-el-yapimi-tekrar-kullanilabi-4aba0.jpg"
    ],
    "details": [
      "Ancient Africa - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC293",
      "Boutique Acquisition: ₺1.349",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/ancient-africa-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc293"
  },
  {
    "code": "NC293",
    "title": "Tek fiyat 599tl - Ekim ayına özel kampanya - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC300",
    "category": "KLASİK",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tek-fiyat-499tl-7-gun-gecerli-kampanya-2-9be1.jpeg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/tek-fiyat-499tl-7-gun-gecerli-kampanya-2-9be1.jpeg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tek-fiyat-499tl-7-gun-gecerli-kampanya-2-9be1.jpeg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tek-fiyat-499tl-7-gun-gecerli-kampanya-96a-cc.jpeg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/tek-fiyat-499tl-7-gun-gecerli-kampanya-a717-1.jpeg"
    ],
    "details": [
      "Tek fiyat 599tl - Ekim ayına özel kampanya - El Yapımı Tekrar Kullanılabilir Protez Takma Tırnak - NC300",
      "Boutique Acquisition: ₺599",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/tek-fiyat-599tl-ekim-ayina-ozel-kampanya-el-yapimi-tekrar-kullanilabilir-protez-takma-tirnak-nc300"
  },
  {
    "code": "CND105",
    "title": "Custom Nail Design CND105",
    "category": "SANATSAL",
    "mainImage": "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/custom-nail-design-cnd104-20475ab282.jpg",
    "secondaryImages": [
      "https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=99/75191/uploads/urunresimleri/buyuk/custom-nail-design-cnd104-20475ab282.jpg",
      "https://static.ticimax.cloud/75191/uploads/urunresimleri/buyuk/custom-nail-design-cnd104-20475ab282.jpg"
    ],
    "details": [
      "Custom Nail Design CND105",
      "Boutique Acquisition: ₺699",
      "Handcrafted to Order • Reusable High-Gloss Wear"
    ],
    "medium": "Bespoke Salon Gel Lacquer & Chrome Art",
    "canvas": "Handcrafted Structured Nail Extensions",
    "year": "2026",
    "url": "https://nezlincollection.com/custom-nail-design-cnd105"
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

  // Asynchronously verify with live database for real-time changes
  initPortfolioData();
});

/* ==========================================================================
   DYNAMIC DATA LOADER (Always Live Sync)
   ========================================================================== */
async function initPortfolioData() {
  try {
    const res = await fetch('/products.json');
    if (res.ok) {
      const items = await res.json();
      if (Array.isArray(items) && items.length > 0) {
        PORTFOLIO_PRODUCTS = items.map(p => {
          const images = (p.images && p.images.length > 0) ? p.images : (p.imageUrl ? [p.imageUrl] : []);
          const mainImage = p.imageUrl || images[0] || '';
          const parts = (p.category || 'GENEL').split('>').map(s => s.trim());
          const cleanCat = parts[parts.length - 1].toUpperCase();

          return {
            code: p.code || 'NC',
            title: p.title || 'Handcrafted Design',
            category: cleanCat,
            mainImage: mainImage,
            secondaryImages: images.length > 0 ? images.slice(0, 4) : [mainImage],
            details: [
              p.title,
              'Boutique Acquisition: ₺' + Number(p.discountedPrice || p.undiscountedPrice || 0).toLocaleString('tr-TR'),
              p.inStock !== false ? 'Handcrafted to Order • Reusable Wear' : 'Limited Edition • Direct Acquisition'
            ],
            medium: 'Bespoke Salon Gel Lacquer & Chrome Art',
            canvas: 'Handcrafted Structured Extensions',
            year: '2026',
            url: p.url || 'https://nezlincollection.com'
          };
        });
        renderGalleryFilters();
        renderGalleryGrid();
        setupScrollReveal();
      }
    }
  } catch (err) {
    console.log('[Portfolio] Initialized with pre-baked high speed catalog.');
  }
}

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
  
  window.addEventListener("resize", () => {
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
  });

  class GoldParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
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

      const dx = mX - this.x;
      const dy = mY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x -= dx * force * 0.05;
        this.y -= dy * force * 0.05;
      }

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

  function render() {
    ctx.clearRect(0, 0, width, height);
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
  const showcase = document.getElementById("exhibition") || document.getElementById("gallery");
  if (!showcase) return;

  const header = showcase.querySelector(".section-header");
  if (!header) return;

  // Remove existing filters if re-rendering
  const existingWrapper = showcase.querySelector(".filter-wrapper");
  if (existingWrapper) existingWrapper.remove();

  // Extract unique categories
  const rawCats = Array.from(new Set(PORTFOLIO_PRODUCTS.map(p => p.category).filter(Boolean)));
  const categories = ["ALL", ...rawCats];

  const filterWrapper = document.createElement("div");
  filterWrapper.className = "filter-wrapper reveal";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `filter-btn hoverable-element ${cat === activeFilter ? "active" : ""}`;
    btn.textContent = cat;
    
    btn.addEventListener("click", () => {
      if (activeFilter === cat) return;
      
      filterWrapper.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      activeFilter = cat;
      filterGalleryGrid();
    });

    filterWrapper.appendChild(btn);
  });

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
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 50);
    } else {
      card.style.opacity = "0";
      card.style.transform = "scale(0.92)";
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
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
    containerDiv.style.transitionDelay = `${(index % 6) * 0.05}s`;

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

    containerDiv.addEventListener("click", () => {
      openMasterpieceLightbox(product.code);
    });

    const card = containerDiv.querySelector(".art-card");
    
    containerDiv.addEventListener("mousemove", (e) => {
      const rect = containerDiv.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      
      const rotateX = -((y - midY) / midY) * 10;
      const rotateY = ((x - midX) / midX) * 10;
      
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    containerDiv.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
      card.style.transition = "transform 0.4s ease";
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

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeMasterpieceLightbox();
    }
  });

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
  
  document.getElementById("lightbox-code").textContent = product.code;
  document.getElementById("lightbox-name").textContent = product.title;
  document.getElementById("lightbox-category").textContent = product.category;
  
  let plaqueContainer = document.getElementById("lightbox-plaque");
  if (!plaqueContainer) {
    plaqueContainer = document.createElement("div");
    plaqueContainer.id = "lightbox-plaque";
    plaqueContainer.className = "lightbox-plaque";
    const specsList = document.getElementById("lightbox-spec-list");
    specsList.parentNode.insertBefore(plaqueContainer, specsList);
  }
  
  plaqueContainer.innerHTML = `
    <div class="lightbox-plaque-item"><strong>Artist:</strong> Nezlin Collection</div>
    <div class="lightbox-plaque-item"><strong>Medium:</strong> ${product.medium}</div>
    <div class="lightbox-plaque-item"><strong>Canvas:</strong> ${product.canvas}</div>
    <div class="lightbox-plaque-item"><strong>Year:</strong> ${product.year}</div>
  `;

  const specList = document.getElementById("lightbox-spec-list");
  specList.innerHTML = "";
  (product.details || []).forEach(detail => {
    const item = document.createElement("div");
    item.className = "lightbox-spec-item";
    item.innerHTML = `
      <i class="fa-solid fa-gem lightbox-spec-icon"></i>
      <span class="lightbox-spec-text">${detail}</span>
    `;
    specList.appendChild(item);
  });

  const shopBtn = document.getElementById("lightbox-shop-btn");
  shopBtn.setAttribute("href", product.url);
  shopBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Acquire Piece on Boutique`;

  const mainImg = document.getElementById("lightbox-main-img");
  mainImg.setAttribute("src", product.secondaryImages[0] || product.mainImage);
  mainImg.setAttribute("alt", product.title);

  const thumbContainer = document.getElementById("lightbox-thumbs");
  thumbContainer.innerHTML = "";

  (product.secondaryImages || [product.mainImage]).forEach((imgUrl, index) => {
    const thumb = document.createElement("div");
    thumb.className = `lightbox-thumb ${index === 0 ? "active" : ""}`;
    thumb.innerHTML = `<img src="${imgUrl}" alt="${product.title} details" loading="lazy">`;
    
    thumb.addEventListener("click", () => {
      thumbContainer.querySelectorAll(".lightbox-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImg.setAttribute("src", imgUrl);
    });

    thumbContainer.appendChild(thumb);
  });

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMasterpieceLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  activeLightboxProduct = null;
}

/* ==========================================================================
   6. SCROLL REVEAL TRIGGERS
   ========================================================================== */
function setupScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.05
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
  }, 250);
}

/* ==========================================================================
   7. REDIRECT LINK FOREGROUND LOGS
   ========================================================================== */
function setupBoutiqueLinkTracking() {
  const shopBtns = document.querySelectorAll("a[href*='nezlincollection.com']");
  shopBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      console.log(`[Boutique Redirect] Acquisition initiated: ${btn.getAttribute("href")}`);
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
      
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
      
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}
