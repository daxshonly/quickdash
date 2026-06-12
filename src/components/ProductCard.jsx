import { Plus, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';

export default function ProductCard({ product }) {
  const { addToCart, removeFromCart, getQty } = useCart();
  const qty = getQty(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image area */}
      <div className={`relative bg-gradient-to-br ${product.bg} h-36 flex items-center justify-center`}>
        {product.badge && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
            {product.badge}
          </span>
        )}
        <div className="text-6xl select-none">{product.emoji}</div>

        {/* Delivery time */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
          <Clock size={10} className="text-green-600" />
          {product.deliveryTime}
        </div>

        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-gray-400 font-medium mb-0.5">{product.weight}</p>
        <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through ml-1">₹{product.mrp}</span>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors rounded-lg px-3 h-9 text-sm font-bold active:scale-95"
            >
              <Plus size={14} strokeWidth={3} />
              ADD
            </button>
          ) : (
            <QuantitySelector
              qty={qty}
              onAdd={() => addToCart(product)}
              onRemove={() => removeFromCart(product.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
