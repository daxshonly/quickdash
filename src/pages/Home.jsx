import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const { itemCount, totalAmount, setIsCartOpen } = useCart();

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory) list = list.filter(p => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearchChange={setSearch} searchValue={search} />

      <main className="max-w-7xl mx-auto px-4 pt-20 pb-4">
        <Hero />
        <CategoryGrid activeCategory={activeCategory} onSelect={setActiveCategory} />

        {/* Products section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">
              {activeCategory || 'All Products'}
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({filtered.length} items)
              </span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-6xl mb-4">🔍</span>
              <h3 className="text-lg font-bold text-gray-700 mb-1">No products found</h3>
              <p className="text-sm text-gray-400">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <CartDrawer />

      {/* Floating cart button (mobile) */}
      {itemCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-between px-5 shadow-2xl shadow-green-300 active:scale-[0.98] transition-transform"
          >
            <span className="bg-green-700 text-xs px-2 py-1 rounded-lg">{itemCount} items</span>
            <span className="flex items-center gap-2"><ShoppingBag size={16} />View Cart</span>
            <span>₹{totalAmount}</span>
          </button>
        </div>
      )}
    </div>
  );
}
