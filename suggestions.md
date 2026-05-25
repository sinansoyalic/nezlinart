# Nezlin Fiyatlandırma Sistemi (NFS) - Geliştirme Önerileri

Bu belgede, yerel ortamda (localhost) çalışan **Nezlin Fiyatlandırma Sistemi (NFS)** web uygulamasının görsel kalitesini, kullanıcı deneyimini (UX), erişilebilirliğini (a11y) ve yerel verimliliğini en üst seviyeye çıkarmak için tasarlanmış **30 adet premium öneri** yer almaktadır. 

Bu öneriler, mevcut lüks koyu coquette glassmorphism tasarım diline (kadife antrasit, bordo, gül kurusu, altın yaldız detaylar) sadık kalınarak hazırlanmıştır.

---

## 🎨 A. Görsel Tasarım & Estetik (Visual Aesthetics)

### 1. Dinamik Kart Parıltısı Efekti (Dynamic Card Glow)
* **Öneri:** Fare imlecinin konumuna göre ürün kartlarının sınırlarında hareket eden hafif bir altın-rose gold parıltısı (hover glow effect) eklenebilir.
* **Katkısı:** Koyu cam (glassmorphism) temasında premium hissi ve etkileşimi muazzam şekilde artırır.

### 2. İskelet Yükleme Ekranı Animasyonları (Skeleton Loaders)
* **Öneri:** Veriler yüklenirken veya senkronizasyon sırasında düz dönen bir yükleme çemberi yerine, kart şeklinde hafifçe yanıp sönen dalgalı gri/bordo iskelet tasarımlar (skeleton cards) kullanılabilir.
* **Katkısı:** Yükleme süresi algısını kısaltır ve daha profesyonel bir arayüz geçişi sağlar.

### 3. İnteraktif KDV ve Toplam Dağılım Grafiği (Donut Chart)
* **Öneri:** Ürün kartlarının fiyatlandırma bölümünde, toplam fiyatın hangi bileşenlerden (Kargo, Nail Art, Tips vb.) oluştuğunu gösteren mikro bir halka grafiği (donut chart) veya renkli bölümlü bir ilerleme çubuğu (stacked bar) gösterilebilir.
* **Katkısı:** Maliyet kırılımlarını saniyeler içinde görsel olarak analiz etmeyi kolaylaştırır.

### 4. Gelişmiş Resim Yakınlaştırma (Magnifier / Lightbox)
* **Öneri:** Ürün resminin üzerine gelindiğinde resmi 1500x1800 piksel çözünürlüğünde detaylı incelemek için bir büyüteç efekti (glass magnifier) veya tıklandığında ekranı kaplayan lüks bir galeri modu (lightbox) eklenebilir.
* **Katkısı:** Tırnak tasarımlarındaki ince detayların ve taşların lokal arayüzden çıkmadan rahatça incelenmesini sağlar.

### 5. Yumuşak CSS Geçişleri ve Mikro-Animasyonlar
* **Öneri:** Fiyatlandırma seçeneklerindeki kutular (checkbox) işaretlendiğinde fiyat artışını anında küt diye değiştirmek yerine, sayının tatlı bir yukarı kayma ve artış animasyonuyla (counter roll effect) güncellenmesi sağlanabilir.
* **Katkısı:** Arayüze "yaşayan ve tepki veren" organik bir ruh kazandırır.

### 6. Gece / Gündüz Kadife Temaları (Coquette Dark & Light)
* **Öneri:** Mevcut lüks koyu temaya (Velvet Charcoal) ek olarak, yumuşak pembe-krem tonlarında, gül kurusu ve gold detaylarla süslenmiş lüks bir açık tema (Coquette Light Rose) seçeneği eklenebilir.
* **Katkısı:** Farklı ışık ortamlarında çalışan kullanıcı için göz yorgunluğunu engeller.

---

## ⚡ B. Kullanıcı Deneyimi & Etkileşim (UX & Interaction)

### 7. Toplu İşlem Modu (Bulk Actions)
* **Öneri:** Birden fazla ürünü yanlarındaki onay kutuları ile seçip, tek tıkla hepsine aynı ayarları (örneğin: hepsine kargo ekle, hepsine Nail Art 80 TL uygula vb.) atayabilen bir toplu düzenleme çubuğu eklenebilir.
* **Katkısı:** 127 ürünün tek tek düzenlenmesi yerine saniyeler içinde gruplar halinde güncellenmesini sağlar.

### 8. Akıllı Hızlı Filtre Butonları (Quick Filters)
* **Öneri:** Kategori filtresinin yanına tek tıkla çalışan "Sadece Sıfır Fiyatlılar", "Yüksek Uyuşmazlıklar (>100 TL)", "Not Eklenmiş Ürünler", "Kargo Hariç Olanlar" gibi hazır filtre butonları eklenebilir.
* **Katkısı:** Filtreleme menüsünde zaman kaybetmeden doğrudan kritik ürünlere odaklanmayı sağlar.

### 9. Arama Sonuçlarında Kelime Vurgulama (Text Highlighting)
* **Öneri:** Arama kutusuna yazılan kelimelerin, ürün adı ve stok kodu içindeki eşleşen kısımlarının gold/rose gold renkle vurgulanması (highlighting) sağlanabilir.
* **Katkısı:** Kalabalık arama sonuçlarında ürünün neden listelendiğini anında görmeyi kolaylaştırır.

### 10. Son Yapılan İşlemi Geri Al (Undo / Redo - Ctrl+Z)
* **Öneri:** Yanlışlıkla bir kutuyu kaldırdığınızda veya fiyat yazdığınızda bunu yerel bellekte hafızada tutup tek tıkla veya `Ctrl + Z` ile geri alabilen bir eylem geçmişi sistemi kurulabilir.
* **Katkısı:** Hatalı veri girişlerini düzeltirken büyük bir konfor ve güvenlik hissi verir.

### 11. Canlı Arama Geçmişi ve Popüler Aramalar
* **Öneri:** Arama çubuğuna tıklandığında son aranan 5 terimi ve en çok düzenleme yapılan ürün kodlarını hızlı erişim etiketi olarak sunan bir açılır menü eklenebilir.
* **Katkısı:** Sık sık aranan ürünlere (örneğin en çok satan NC kodları) ulaşma süresini en aza indirir.

### 12. Not Bölümü için Hızlı Şablonlar (Note Templates)
* **Öneri:** Fiyatlandırma notları alanının altına "Özel Tasarım", "Kampanyalı Fiyat", "Taşlı Model Artışı" gibi sık kullanılan not kalıplarını tek tıkla ekleyen küçük etiket butonlar yerleştirilebilir.
* **Katkısı:** Elle klavyeden uzun uzun not yazma ihtiyacını ortadan kaldırır.

---

## ♿ C. Erişilebilirlik (Accessibility - a11y)

### 13. Eksiksiz Klavye Navigasyonu (Keyboard Friendly)
* **Öneri:** Arayüzdeki tüm checkbox'ların, butonların ve girdi alanlarının `Tab` tuşu ile sırayla seçilebilir ve `Space/Enter` ile değiştirilebilir olması sağlanmalıdır. Kartlar arasında yön tuşları (`Left / Right`) ile gezilebilmelidir.
* **Katkısı:** Fare kullanmadan sadece klavye ile yıldırım hızında fiyatlandırma ve kontrol yapabilmeyi sağlar.

### 14. Ekran Okuyucu Desteği (ARIA Attributes)
* **Öneri:** Görseller için otomatik `alt="..."` açıklamaları, uyuşmazlık uyarıları için `role="alert"`, butonlar için `aria-label` nitelikleri eklenmelidir.
* **Katkısı:** Görme engelli veya yardımcı teknolojiler kullanan kişilerin sistemi hatasız kullanabilmesini sağlar.

### 15. Dinamik Yazı Boyutu Ayarı (Text Resizer)
* **Öneri:** Arayüzün sağ üst köşesine tüm yazı boyutlarını orantılı şekilde büyüten/küçülten (AAA, AA) hızlı kontrol butonları eklenebilir.
* **Katkısı:** Yakını görme zorluğu yaşayan kullanıcıların ekranı yakınlaştırmadan kartları rahatça okumasını sağlar.

### 16. Yüksek Kontrast Modu (High Contrast Mode)
* **Öneri:** Glassmorphism'in getirdiği şeffaflık ve hafif arka plan parazitlerini tamamen kapatıp, siyah arka plan üzerine keskin beyaz ve altın renklerle arayüzü çizen tek tıkla aktifleşen bir yüksek kontrast modu sunulabilir.
* **Katkısı:** Düşük görme yetisine sahip kullanıcılar için okunabilirliği garantiler.

### 17. Sesli Geri Bildirim ve Uyarılar (Screen Reader Announcements)
* **Öneri:** "Veri Eşitleme Başarılı", "Değişiklik Kaydedildi ✔️" veya "Uyuşmazlık Tespit Edildi ⚠️" durumlarında arayüzün bunu sadece görsel değil, tarayıcı konuşma motorunu (Web Speech API) kullanarak Türkçe sesli olarak da bildirmesi sağlanabilir.
* **Katkısı:** Kullanıcının gözü ekranda değilken bile senkronizasyon durumunu takip edebilmesini sağlar.

---

## 💻 D. Yerel İşlevsellik & Verimlilik (Local Productivity)

### 18. Excel / CSV Formatında Dışa Aktarma (Export Data)
* **Öneri:** Tüm ürün listesini, güncel hesaplanan maliyetleri, notları ve site fiyatlarını içeren detaylı bir Excel (`.xlsx`) veya `.csv` raporunu tek tıkla bilgisayara indiren bir buton eklenebilir.
* **Katkısı:** NFS dışında veri analizi yapmak veya bu verileri kargo/muhasebe sistemlerine aktarmak için mükemmel bir köprü oluşturur.

### 19. Yedekleme ve Geri Yükleme (Backup & Restore)
* **Öneri:** Kullanıcının yaptığı tüm özel seçimleri, notları ve SoT ayarlarını (`user_data.json` ve `config.json`) tek tıkla yedek dosyası (`.json`) olarak bilgisayarına indirmesini ve bilgisayardan yükleyerek geri yüklemesini sağlayan bir arayüz eklenebilir.
* **Katkısı:** Bilgisayar değiştirildiğinde veya bir çökme durumunda değerli verilerin sıfırlanmasını engeller.

### 20. Yazıcı Dostu Sayfa Düzeni (Print Stylesheet - CSS)
* **Öneri:** Sayfa yazdırılmak istendiğinde (`Ctrl + P`), tüm arka plan renklerini beyaz yapan, gereksiz menüleri gizleyen ve ürün kartlarını kağıda mükemmel sığacak şekilde 3'lü kolonlara yerleştiren bir yazıcı CSS'i (Print CSS) eklenebilir.
* **Katkısı:** Fiziksel katalog, fiyat listesi veya atölye üretim fişi hazırlamayı inanılmaz kolaylaştırır.

### 21. Yerel Sistem Bildirimleri (Web Notifications API)
* **Öneri:** Senkronizasyon işlemi arka planda sürerken kullanıcı başka bir tarayıcı sekmesinde veya Excel'de çalışıyorsa, veri çekme bittiğinde işletim sisteminin sağ alt köşesinde yerel bir Windows bildirimi gösterilebilir.
* **Katkısı:** Kullanıcının tarayıcı sekmesine kilitlenip kalmasını önler, arka planda işlerini takip etmesini sağlar.

### 22. Hızlı Erişim Klavye Kısayolları Kılavuzu (Cheatsheet)
* **Öneri:** Uygulama içinde örneğin `F` tuşuna basınca arama kutusuna odaklanma, `S` tuşuna basınca senkronizasyon tabına geçme, `D` tuşuna basınca Varsayılanlar sekmesine geçme gibi kısayollar eklenebilir ve sağ alt köşede bir kısayol kılavuz paneli sunulabilir.
* **Katkısı:** Sistemi profesyonel bir ERP aracı gibi çok hızlı yönetmeyi sağlar.

### 23. Çevrimdışı Çalışma Göstergesi ve Güvenlik Kilidi
* **Öneri:** Localhost sunucusuyla olan bağlantı herhangi bir sebeple kesilirse arayüzün etkileşimi kilitleyip "Bağlantı Kesildi - Kaydedilmemiş Değişiklikler Mevcut" uyarısı vermesi sağlanmalıdır.
* **Katkısı:** Bağlantı koptuğunda kullanıcının boşuna veri girişi yapıp veri kaybetmesini %100 engeller.

---

## 📈 E. Gelişmiş Fiyatlandırma Motoru (Advanced Pricing)

### 24. Kar Marjı ve Fiyat Öneri Sihirbazı
* **Öneri:** Varsayılanlar sekmesine "Hedeflenen Net Kar Oranı (%)" girdisi eklenebilir. Sistem, modüllerin toplam maliyetine bu karı ekleyip KDV'yi de üstüne koyarak otomatik olarak canlı sitede olması gereken "Önerilen Satış Fiyatı"nı hesaplayıp gösterebilir.
* **Katkısı:** Fiyat belirleme süreçlerini tamamen matematiksel ve karlı bir zemine oturtur.

### 25. Akıllı Kural Motoru (Dynamic Pricing Rules)
* **Öneri:** Belirli kategoriler için (örneğin sadece aksesuarlar veya sadece New Year koleksiyonu) Kargo veya KDV oranını sıfırlayan veya farklı modül fiyatları tanımlayan kategori bazlı esnek fiyat kuralları eklenebilir.
* **Katkısı:** Tüm ürünlere tek bir şablon uygulamak yerine, kategorilerin doğasına uygun esnek hesaplamalar yapabilmeyi sağlar.

### 26. Kademeli Nail Art Fiyatlandırıcı (Tiered Nail Art)
* **Öneri:** Tek bir "Nail Art" kutusu yerine "Nail Art Seviye 1 (Basit)", "Nail Art Seviye 2 (Orta)", "Nail Art Seviye 3 (Karmaşık)" şeklinde 3 aşamalı checkbox yapısı kurulabilir.
* **Katkısı:** Ürün üzerindeki tırnak sanatının işçilik seviyesine göre çok daha hassas maliyet analizi yapılmasını sağlar.

### 27. Uyuşmazlık Tolerans Limiti Ayarlayıcı
* **Öneri:** Şu an kodda sabit olan 10 TL'lik uyuşmazlık tolerans sınırını kullanıcının Varsayılanlar (SoT) sekmesinden dinamik olarak değiştirebilmesi (örneğin 5 TL veya 50 TL yapabilmesi) sağlanabilir.
* **Katkısı:** Kullanıcının kendi belirlediği hassasiyet düzeyine göre uyarıları filtrelemesini sağlar.

### 28. "Kopyala ve Git" Butonu (Copy Price & Link)
* **Öneri:** Uyuşmazlık uyarısı veren ürünlerde, hesaplanan yeni GENEL TOPLAM fiyatını tek tıkla panoya kopyalayan ve hemen yanında yer alan "Sitede Düzenle" butonuyla doğrudan o ürünün canlı yönetim paneli sayfasına yönlendiren hızlı linkler eklenebilir.
* **Katkısı:** Sitedeki fiyatları güncelleme sürecindeki zaman kaybını neredeyse sıfıra indirir.

### 29. Toplam Portföy Değeri ve Analitik Kartlar
* **Öneri:** Fiyatlandırma sayfasının en üstüne "Toplam Portföy Değeri (Sitedeki)", "Hesaplanan Toplam Portföy Değeri (NFS)", "Toplam Olası Gelir Farkı" gibi tüm ürünlerin toplamını gösteren küçük analitik özet kartları eklenebilir.
* **Katkısı:** Tüm işletmenin fiyatlandırma strategisinin genel finansal boyutunu tek bakışta görmeyi sağlar.

### 30. Gelişmiş Küsurat Yuvarlama Motoru (Price Rounding Engine)
* **Öneri:** Hesaplanan Genel Toplam fiyatları için küsurat yuvarlama seçenekleri eklenebilir (Örn: En yakın 9 TL'ye yuvarla: 493.20 TL -> 499.00 TL veya En yakın 5 TL'ye yuvarla vb.).
* **Katkısı:** E-ticaret psikolojisine uygun profesyonel vitrin fiyatları (`.90`, `.99`, `.00`) üretilmesine yardımcı olur.
