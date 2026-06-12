import { X, ShoppingBag, Trash2, ChevronRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const {
    isCartOpen, setIsCartOpen,
    cartItems, addToCart, removeFromCart, deleteFromCart,
    itemTotal, deliveryFee, platformFee, totalAmount,
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col animate-slide-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-green-600" />
            <h2 className="font-bold text-gray-900">My Cart</h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Delivery badge */}
        <div className="mx-4 mt-3 bg-green-50 border border-green-100 rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <div>
            <p className="text-xs font-bold text-green-700">Delivery in 10 minutes</p>
            <p className="text-xs text-gray-500">Shipment of {cartItems.length} item{cartItems.length > 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              {/* Emoji */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.bg} flex items-center justify-center text-2xl shrink-0`}>
                {item.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-400">{item.weight}</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">₹{item.price * item.qty}</p>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <button
                  onClick={() => deleteFromCart(item.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
                <QuantitySelector
                  qty={item.qty}
                  onAdd={() => addToCart(item)}
                  onRemove={() => removeFromCart(item.id)}
                  size="sm"
                />
              </div>
            </div>
          ))}

          {/* Coupon */}
          <button className="w-full flex items-center justify-between bg-white border border-dashed border-gray-200 rounded-xl px-3 py-3 hover:border-green-400 transition-colors group">
            <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-green-600">
              <Tag size={14} />
              Apply coupon code
            </div>
            <ChevronRight size={14} className="text-gray-300 group-hover:text-green-500" />
          </button>
        </div>

        {/* Bill Details */}
        <div className="border-t border-gray-100 px-4 pt-4 pb-2 space-y-2">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Bill Details</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Item Total</span>
            <span>₹{itemTotal}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              Delivery Fee
              <span className="text-xs bg-green-100 text-green-600 px-1 rounded">FREE above ₹199</span>
            </span>
            <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>
          <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
            <span>To Pay</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 pb-4 pt-2">
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl flex items-center justify-between px-5 transition-all shadow-lg shadow-green-200"
          >
            <span className="bg-green-700 text-xs px-2 py-1 rounded-lg">{cartItems.reduce((s, i) => s + i.qty, 0)} items</span>
            <span>Proceed to Pay</span>
            <span>₹{totalAmount}</span>
          </button>
        </div>
      </div>
    </>
  );
}
