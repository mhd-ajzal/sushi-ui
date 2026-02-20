'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import CartSidebar, { CartItem } from '@/components/CartSidebar';
import { MENU, Product } from '@/lib/data';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('special');
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = Object.values(cart).reduce((a, b) => a + b.qty, 0);

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.name];
      if (existing) {
        return {
          ...prev,
          [product.name]: { ...existing, ...product, qty: existing.qty + 1 },
        };
      }
      return {
        ...prev,
        [product.name]: { ...product, qty: 1 },
      };
    });
    setIsCartOpen(true);
  };

  const updateQty = (name: string, delta: number) => {
    setCart((prev) => {
      const item = prev[name];
      if (!item) return prev;
      const newQty = Math.max(0, item.qty + delta);
      if (newQty === 0) {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
      return {
        ...prev,
        [name]: { ...item, qty: newQty },
      };
    });
  };

  const categoryTitles: { [key: string]: string } = {
    special: 'Special Offers',
    lovers: 'Signature & Lovers Box',
    sakura: 'Sakura Combos',
    cooked: 'Cooked Box',
    vip: 'Fusion VIP Moriwase',
    maki: 'Hoso Maki',
    temaki: 'Temaki Handroll Sushi',
  };

  return (
    <main>
      <Header cartCount={cartCount} onToggleCart={() => setIsCartOpen(!isCartOpen)} />
      <CategoryBar
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
      />
      <div className="page-body">
        <div className="main-content">
          <h2 className="section-title">{categoryTitles[activeCategory]}</h2>
          <div className="product-grid">
            {MENU[activeCategory]?.map((item, i) => (
              <ProductCard key={i} product={item} onAdd={addToCart} />
            ))}
          </div>
        </div>

        <CartSidebar
          cart={cart}
          onUpdateQty={updateQty}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    </main>
  );
}
