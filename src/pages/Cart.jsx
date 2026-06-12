import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Trash2, Tag, ChevronRight, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems, addToCart, removeFromCart, deleteFromCart,
    itemTotal, deliveryFee, platformFee, totalAmount,
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-20 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 py-5">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div>
            <h1 className="font-black text-xl text-gray-900">My Cart</h1>
            <p className="text-xs text-gray-400">{cartItems.length} items in your cart</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag size={64} className="text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Add items to get started</p>
            <button
              onClick={() => navigate('/')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Items list */}
            <div className="lg:col-span-3 space-y-3">
              {/* Delivery ETA */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <p className="font-bold text-green-700">Delivery in 10 minutes</p>
                  <p className="text-xs text-gray-500">Shipment of {cartItems.length} items</p>
                </div>
              </div>

              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center text-3xl shrink-0`}>
                    {item.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.weight}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                      {item.mrp > item.price && (
                        <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => deleteFromCart(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="flex items-center bg-green-600 rounded-lg overflow-hidden h-8">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-full flex items-center justify-center text-white hover:bg-green-700"
                      >
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span className="text-white text-sm font-bold px-2 tabular-nums">{item.qty}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-8 h-full flex items-center justify-center text-white hover:bg-green-700"
                      >
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-sm font-bold text-gray-900">₹{item.price * item.qty}</p>
                    <p className="text-xs text-gray-400">{item.qty} × ₹{item.price}</p>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <button className="w-full bg-white border border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-green-400 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Tag size={16} className="text-orange-500" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-green-600">
                    Apply coupon or promo code
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-green-500" />
              </button>
            </div>

            {/* Bill summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 sticky top-20">
                <h2 className="font-bold text-gray-800 mb-4">Bill Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Item Total ({cartItems.reduce((s, i) => s + i.qty, 0)} items)</span>
                    <span>₹{itemTotal}</span>
                  </div>

                  {cartItems.some(i => i.mrp > i.price) && (
                    <div className="flex justify-between text-green-600">
                      <span>Product Discount</span>
                      <span>-₹{cartItems.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <div>
                      <span>Delivery Fee</span>
                      <p className="text-xs text-gray-400">Free above ₹199</p>
                    </div>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                    <span>Grand Total</span>
                    <span className="text-green-700">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="mt-4 bg-green-50 rounded-xl p-3 text-xs text-green-700 flex items-center gap-2">
                  <span>🎉</span>
                  <span>You're saving ₹{cartItems.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0)} on this order!</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold py-4 rounded-xl flex items-center justify-between px-4 transition-all shadow-lg shadow-green-200"
                >
                  <span className="bg-green-700 text-xs px-2 py-1 rounded-lg">
                    {cartItems.reduce((s, i) => s + i.qty, 0)} items
                  </span>
                  <span>Proceed to Checkout</span>
                  <span>₹{totalAmount}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
