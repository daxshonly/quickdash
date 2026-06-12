import { categories } from '../data/products';

export default function CategoryGrid({ activeCategory, onSelect }) {
  return (
    <section className="mb-6">
      <h2 className="text-base font-bold text-gray-800 mb-3">Shop by Category</h2>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
            activeCategory === null
              ? 'border-green-500 bg-green-50 shadow-sm'
              : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <span className="text-2xl">🛒</span>
          <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">All Items</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.name)}
            className={`shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
              activeCategory === cat.name
                ? 'border-green-500 bg-green-50 shadow-sm'
                : `border-gray-100 bg-white hover:border-gray-200 ${cat.color}`
            }`}
          >
            <span className="text-2xl">{cat.emoji}</span>
            <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
