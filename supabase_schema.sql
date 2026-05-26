-- Nezlin Fiyatlandırma Sistemi (NFS) - Supabase Veritabanı Şeması
-- Bu SQL kodlarını Supabase Panelinizdeki "SQL Editor" kısmına yapıştırıp çalıştırarak tablolarınızı anında oluşturabilirsiniz.

-- 1. nfs_config Tablosu (Varsayılan Fiyat Ayarları - SoT)
CREATE TABLE IF NOT EXISTS public.nfs_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. nfs_products Tablosu (Siteden Çekilen Ürün Bilgileri)
CREATE TABLE IF NOT EXISTS public.nfs_products (
    url TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    code TEXT NOT NULL,
    category TEXT DEFAULT 'Genel',
    "undiscountedPrice" NUMERIC DEFAULT 0,
    "discountedPrice" NUMERIC DEFAULT 0,
    "imageUrl" TEXT,
    lastmod TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. nfs_user_data Tablosu (Ürünler için Özel Fiyatlandırma Seçimleri)
CREATE TABLE IF NOT EXISTS public.nfs_user_data (
    code TEXT PRIMARY KEY,
    "checkedOptions" JSONB DEFAULT '{}'::jsonb,
    "customPrices" JSONB DEFAULT '{}'::jsonb,
    notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. nfs_customers Tablosu (Müşteri CRM & Parmak Ölçüleri)
CREATE TABLE IF NOT EXISTS public.nfs_customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    instagram TEXT,
    phone TEXT,
    orders TEXT,
    address TEXT,
    sizes JSONB DEFAULT '{"thumb": 10, "index": 10, "middle": 10, "ring": 10, "pinky": 10}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) Ayarları
-- Bu sistem yerel panelden erişim sağladığı için tabloların RLS politikalarını basitleştirebiliriz.
ALTER TABLE public.nfs_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfs_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfs_user_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfs_customers ENABLE ROW LEVEL SECURITY;

-- Eski politikalar varsa çakışmayı önlemek için önce silelim:
DROP POLICY IF EXISTS "Enable read/write for all users" ON public.nfs_config;
DROP POLICY IF EXISTS "Enable read/write for all users" ON public.nfs_products;
DROP POLICY IF EXISTS "Enable read/write for all users" ON public.nfs_user_data;
DROP POLICY IF EXISTS "Enable read/write for all users" ON public.nfs_customers;

-- Herkesin okuyup yazabileceği (Anon/Public) geçici genel izin politikaları (İsteğe bağlı olarak daha da sıkılaştırılabilir):
CREATE POLICY "Enable read/write for all users" ON public.nfs_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable read/write for all users" ON public.nfs_products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable read/write for all users" ON public.nfs_user_data FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable read/write for all users" ON public.nfs_customers FOR ALL USING (true) WITH CHECK (true);
