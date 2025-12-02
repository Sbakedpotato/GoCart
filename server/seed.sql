-- Disable foreign key checks to allow truncation
SET FOREIGN_KEY_CHECKS = 0;

-- Truncate tables to start fresh
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE addresses;
TRUNCATE TABLE wishlists;
TRUNCATE TABLE recommendation_items;
TRUNCATE TABLE recommendation_sections;
TRUNCATE TABLE flash_deals;
TRUNCATE TABLE hero_banners;
TRUNCATE TABLE products;
TRUNCATE TABLE brands;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
TRUNCATE TABLE site_content;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users
INSERT INTO users (id, name, email, password_hash) VALUES
(1, 'User1', 'User@example.com', '$2a$12$wbX016wYA8JCjvn64GporeeckICej2xNlVI2zMO20bBMz2olf5S2K'); -- Password: 12345678

-- 2. Categories
INSERT INTO categories (id, name, image_url) VALUES
('laptops', 'Laptops', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500'),
('audio', 'Audio', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=500'),
('wearables', 'Wearables', 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=500'),
('phones', 'Smartphones', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=500'),
('cameras', 'Cameras', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=500'),
('accessories', 'Accessories', 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=500'),
('tablets', 'Tablets', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500'),
('gaming', 'Gaming', 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=500'),
('smarthome', 'Smart Home', 'https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&q=80&w=500'),
('monitors', 'Monitors', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=500');

-- 3. Brands
INSERT INTO brands (id, name, image_url) VALUES
('apple', 'Apple', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'),
('sony', 'Sony', 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sony_logo.svg'),
('samsung', 'Samsung', 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg'),
('bose', 'Bose', 'https://upload.wikimedia.org/wikipedia/commons/8/82/Bose_logo.svg'),
('canon', 'Canon', 'https://upload.wikimedia.org/wikipedia/commons/8/82/Canon_logo_vector.svg'),
('logitech', 'Logitech', 'https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg'),
('nintendo', 'Nintendo', 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo.svg'),
('microsoft', 'Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'),
('google', 'Google', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'),
('lg', 'LG', 'https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg'),
('dell', 'Dell', 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg');

-- 4. Products
INSERT INTO products (id, title, description, price, old_price, rating, review_count, category_id, brand_id, image_url, inventory_status, discount, features, specs) VALUES
-- Laptops
('macbook-pro-14', 'MacBook Pro 14"', 'The most powerful MacBook Pro ever is here. With the blazing-fast M3 Pro or M3 Max chip, the first Apple silicon designed for pros, you get groundbreaking performance and amazing battery life.', 199999.00, 219900.00, 4.9, 128, 'laptops', 'apple', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000', 'In Stock', 9, '["M3 Pro chip", "14-inch Liquid Retina XDR display", "18GB unified memory", "512GB SSD storage"]', '{"Processor": "Apple M3 Pro", "RAM": "18GB", "Storage": "512GB SSD", "Display": "14.2-inch Liquid Retina XDR"}'),
('xps-15', 'Dell XPS 15', 'Immersive display, powerful performance. The XPS 15 is the perfect balance of power and portability with an InfinityEdge display.', 185000.00, 200000.00, 4.7, 85, 'laptops', 'samsung', 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=1000', 'In Stock', 7, '["15.6-inch OLED display", "Intel Core i9", "32GB RAM", "1TB SSD"]', '{"Processor": "Intel Core i9-13900H", "RAM": "32GB DDR5", "Storage": "1TB SSD", "Display": "15.6-inch 3.5K OLED"}'),

-- Audio
('sony-wh1000xm5', 'Sony WH-1000XM5', 'Industry-leading noise cancellation with two processors controlling 8 microphones for unprecedented noise cancellation and exceptional call quality.', 29990.00, 34990.00, 4.8, 450, 'audio', 'sony', 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000', 'In Stock', 14, '["Industry-leading noise cancellation", "30-hour battery life", "Crystal clear hands-free calling", "Multipoint connection"]', '{"Type": "Over-ear", "Battery Life": "30 hours", "Noise Cancellation": "Yes", "Weight": "250g"}'),
('airpods-max', 'AirPods Max', 'AirPods Max reimagine over-ear headphones. An Apple-designed dynamic driver provides high-fidelity audio. Every detail, from canopy to cushions, has been designed for an exceptional fit.', 59900.00, 0, 4.6, 210, 'audio', 'apple', 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=1000', 'Low Stock', 0, '["Active Noise Cancellation", "Transparency mode", "Spatial audio", "20 hours of listening time"]', '{"Type": "Over-ear", "Battery Life": "20 hours", "Noise Cancellation": "Yes", "Weight": "384.8g"}'),

-- Wearables
('apple-watch-ultra', 'Apple Watch Ultra 2', 'The most rugged and capable Apple Watch pushes the limits again. Featuring the all-new S9 SiP.', 89900.00, 0, 4.9, 150, 'wearables', 'apple', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=1000', 'In Stock', 0, '["49mm titanium case", "Water resistant 100m", "Up to 36 hours battery life", "Precision dual-frequency GPS"]', '{"Case Material": "Titanium", "Size": "49mm", "Connectivity": "GPS + Cellular", "Water Resistance": "100m"}'),
('galaxy-watch-6', 'Samsung Galaxy Watch 6', 'Start your everyday wellness journey. Galaxy Watch6 Classic features a rotating bezel for easy navigation.', 34999.00, 39999.00, 4.5, 95, 'wearables', 'samsung', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=1000', 'In Stock', 12, '["Rotating bezel", "Sleep coaching", "Heart rate monitoring", "Sapphire Crystal glass"]', '{"Case Material": "Stainless Steel", "Size": "47mm", "Connectivity": "Bluetooth", "Water Resistance": "IP68"}'),

-- Phones
('iphone-15-pro', 'iPhone 15 Pro Max', 'Titanium design. A17 Pro chip. The longest optical zoom in iPhone ever. And a customizable Action button.', 159900.00, 0, 4.8, 500, 'phones', 'apple', 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=1000', 'In Stock', 0, '["Titanium design", "A17 Pro chip", "48MP Main camera", "USB-C connector"]', '{"Processor": "A17 Pro", "Storage": "256GB", "Display": "6.7-inch Super Retina XDR", "Camera": "48MP Main"}'),
('s24-ultra', 'Samsung Galaxy S24 Ultra', 'Unleash new ways to create, connect and more with Galaxy AI. The new titanium exterior is tougher than ever.', 129999.00, 134999.00, 4.7, 320, 'phones', 'samsung', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=1000', 'In Stock', 4, '["Galaxy AI", "Titanium frame", "200MP camera", "Built-in S Pen"]', '{"Processor": "Snapdragon 8 Gen 3", "Storage": "512GB", "Display": "6.8-inch QHD+", "Camera": "200MP Main"}'),

-- Cameras
('eos-r5', 'Canon EOS R5', 'Professional mirrorless redefined. 45MP full-frame sensor, 8K video, and advanced autofocus.', 339995.00, 350000.00, 4.9, 60, 'cameras', 'canon', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000', 'Low Stock', 3, '["45MP Full-Frame Sensor", "8K Video Recording", "In-Body Image Stabilization", "Dual Pixel CMOS AF II"]', '{"Sensor": "Full-Frame CMOS", "Resolution": "45MP", "Video": "8K RAW", "ISO Range": "100-51200"}'),
('a7iv', 'Sony Alpha 7 IV', 'The basic has never been this good. 33MP full-frame sensor with outstanding performance for both stills and movies.', 244990.00, 262990.00, 4.8, 110, 'cameras', 'sony', 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=1000', 'In Stock', 7, '["33MP Full-Frame Exmor R Sensor", "4K 60p Video", "Real-time Eye AF", "Vari-angle LCD"]', '{"Sensor": "Full-Frame Exmor R", "Resolution": "33MP", "Video": "4K 60p", "ISO Range": "100-51200"}'),

-- Tablets
('ipad-pro-12', 'iPad Pro 12.9"', 'The ultimate iPad experience with the M2 chip.', 112900.00, 0, 4.9, 320, 'tablets', 'apple', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000', 'In Stock', 0, '["M2 chip", "12.9-inch Liquid Retina XDR display", "ProMotion technology", "Face ID"]', '{"Processor": "M2", "Storage": "128GB", "Display": "12.9-inch Liquid Retina XDR"}'),
('galaxy-tab-s9', 'Samsung Galaxy Tab S9 Ultra', 'Crystal clear viewing on a large AMOLED display.', 108999.00, 119999.00, 4.7, 150, 'tablets', 'samsung', 'https://images.unsplash.com/photo-1588702547923-7093a6c3f067?auto=format&fit=crop&q=80&w=1000', 'In Stock', 9, '["14.6-inch Dynamic AMOLED 2X", "Snapdragon 8 Gen 2", "S Pen included", "IP68 water resistance"]', '{"Processor": "Snapdragon 8 Gen 2", "Storage": "256GB", "Display": "14.6-inch AMOLED"}'),

-- Gaming
('ps5', 'PlayStation 5', 'Experience lightning fast loading with an ultra-high speed SSD.', 54990.00, 0, 4.9, 1200, 'gaming', 'sony', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=1000', 'In Stock', 0, '["Ultra-high speed SSD", "Ray Tracing", "4K-TV Gaming", "Haptic Feedback"]', '{"Storage": "825GB SSD", "Resolution": "4K", "Frame Rate": "Up to 120fps"}'),
('xbox-series-x', 'Xbox Series X', 'The fastest, most powerful Xbox ever.', 55990.00, 0, 4.8, 950, 'gaming', 'microsoft', 'https://images.unsplash.com/photo-1621259182902-885a1c933c7d?auto=format&fit=crop&q=80&w=1000', 'In Stock', 0, '["12 TFLOPS Processing Power", "True 4K Gaming", "1TB Custom SSD", "8K HDR"]', '{"Storage": "1TB SSD", "Resolution": "True 4K", "Frame Rate": "Up to 120fps"}'),
('switch-oled', 'Nintendo Switch OLED', '7-inch OLED screen for vivid colors and crisp contrast.', 33990.00, 0, 4.8, 800, 'gaming', 'nintendo', 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80&w=1000', 'In Stock', 0, '["7-inch OLED screen", "Wide adjustable stand", "Wired LAN port", "64GB internal storage"]', '{"Storage": "64GB", "Screen": "7-inch OLED", "Modes": "TV, Tabletop, Handheld"}'),

-- Smart Home
('nest-hub', 'Google Nest Hub (2nd Gen)', 'The center of your helpful home.', 7999.00, 9999.00, 4.6, 450, 'smarthome', 'google', 'https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&q=80&w=1000', 'In Stock', 20, '["Sleep Sensing", "Gesture Control", "Smart Home Control", "Entertainment"]', '{"Display": "7-inch touchscreen", "Connectivity": "Wi-Fi, Bluetooth", "Voice Assistant": "Google Assistant"}'),

-- Monitors
('lg-ultragear', 'LG UltraGear 27"', 'Nano IPS 1ms gaming monitor.', 32999.00, 45000.00, 4.7, 210, 'monitors', 'lg', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000', 'In Stock', 27, '["27-inch QHD Nano IPS", "144Hz Refresh Rate", "NVIDIA G-SYNC Compatible", "HDR 10"]', '{"Resolution": "2560 x 1440", "Refresh Rate": "144Hz", "Response Time": "1ms"}');

-- 5. Hero Banners
INSERT INTO hero_banners (id, title, subtitle, cta, image_url, background) VALUES
('banner-1', 'iPhone 15 Pro', 'Titanium. So strong. So light. So Pro.', 'Shop Now', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=2000', 'bg-black'),
('banner-2', 'MacBook Air 15"', 'Impressively big. Impossibly thin.', 'Learn More', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=2000', 'bg-[#F5F5F7]'),
('banner-3', 'Sony WH-1000XM5', 'Your world. Nothing else.', 'Buy Now', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=2000', 'bg-[#E5E5E5]');

-- 6. Flash Deals
INSERT INTO flash_deals (product_id, claimed, starts_at, ends_at) VALUES
('sony-wh1000xm5', 85, NOW(), DATE_ADD(NOW(), INTERVAL 24 HOUR)),
('xps-15', 45, NOW(), DATE_ADD(NOW(), INTERVAL 24 HOUR)),
('galaxy-watch-6', 60, NOW(), DATE_ADD(NOW(), INTERVAL 24 HOUR)),
('eos-r5', 15, NOW(), DATE_ADD(NOW(), INTERVAL 24 HOUR));

-- 7. Recommendation Sections & Items
INSERT INTO recommendation_sections (id, title) VALUES
('trending', 'Trending Now'),
('new-arrivals', 'New Arrivals');

INSERT INTO recommendation_items (section_id, product_id, position) VALUES
('trending', 'iphone-15-pro', 1),
('trending', 'airpods-max', 2),
('trending', 's24-ultra', 3),
('trending', 'macbook-pro-14', 4),
('new-arrivals', 'apple-watch-ultra', 1),
('new-arrivals', 'a7iv', 2),
('new-arrivals', 'sony-wh1000xm5', 3),
('new-arrivals', 'xps-15', 4);

-- 8. Site Content
INSERT INTO site_content (content_key, content_value) VALUES
('notification', 'Free shipping on all orders over Rs. 5,000. Limited time only.');

-- 9. Addresses (Sample for Demo User)
INSERT INTO addresses (user_id, label, recipient, line1, city, phone) VALUES
(1, 'Home', 'Demo User', '123 Tech Park, Sector 5', 'Bangalore', '9876543210');

-- 10. Orders (Sample for Demo User)
INSERT INTO orders (user_id, status, total, shipping_address_id) VALUES
(1, 'Delivered', 29990.00, 1);

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 'sony-wh1000xm5', 1, 29990.00);

-- 11. Wishlists (Sample for Demo User)
INSERT INTO wishlists (user_id, product_id) VALUES
(1, 'macbook-pro-14');
