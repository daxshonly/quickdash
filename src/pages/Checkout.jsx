import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, CreditCard, Smartphone, Banknote,
  ChevronRight, ShieldCheck, Tag, CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import OrderTracking from '../components/OrderTracking';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', sub: 'Pay via any UPI app', icon: Smartphone, popular: true },
  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: CreditCard },
  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when delivered', icon: Banknote },
];

const ADDRESSES = [
  { id: 1, label: 'Home', addr: '12, Andheri West, Mumbai 400053', icon: '🏠' },
  { id: 2, label: 'Office', addr: 'WeWork, BKC, Mumbai 400051', icon: '🏢' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems, itemTotal, deliveryFee, platformFee, totalAmount,
    placeOrder, currentOrder, orderStatus,
  } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      placeOrder();
      setPlacing(false);
    }, 1500);
  };

  // ── Post-order: show tracking ──
  if (orderStatus === 'placed' && currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-lg mx-auto px-4 pt-20 pb-16">
          <div className="py-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-green-600" />
              </div>
              <div>
                <h1 className="font-black text-xl text-gray-900">Order Confirmed!</h1>
                <p className="text-xs text-gray-400">Sit tight, we're on it ⚡</p>
              </div>
            </div>
          </div>
          <OrderTracking
            orderId={currentOrder.id}
            totalAmount={currentOrder.totalAmount}
            // status prop: pass Appwrite Realtime value here to override auto-demo
          />
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 border-2 border-gray-200 hover:border-green-300 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            Continue Shopping
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-20 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 py-5">
          <button
            onClick={() => navigate('/cart')}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div>
            <h1 className="font-black text-xl text-gray-900">Checkout</h1>
            <p className="text-xs text-gray-400">{cartItems.length} items · ₹{totalAmount} to pay</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <p className="text-gray-500 mb-4">Nothing to checkout</p>
            <button onClick={() => navigate('/')} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold">
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left col */}
            <div className="lg:col-span-3 space-y-4">
              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-green-600" />
                  <h2 className="font-bold text-gray-800">Delivery Address</h2>
                </div>
                <div className="space-y-2">
                  {ADDRESSES.map(addr => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border-2 transition-all ${
                        selectedAddress === addr.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        className="mt-0.5 accent-green-600"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                      />
                      <div className="flex items-center gap-2">
                        <span>{addr.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{addr.label}</p>
                          <p className="text-xs text-gray-500">{addr.addr}</p>
                        </div>
                      </div>
                    </label>
                  ))}

                  <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-300 transition-colors text-sm text-gray-500 hover:text-green-600">
                    <span>+ Add new address</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={16} className="text-green-600" />
                  <h2 className="font-bold text-gray-800">Payment Method</h2>
                </div>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map(method => {
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transition-all ${
                          selectedPayment === method.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          className="accent-green-600"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                        />
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                          <Icon size={16} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-800">{method.label}</span>
                            {method.popular && (
                              <span className="text-[10px] bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded-full">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{method.sub}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Security note */}
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 bg-gray-50 rounded-xl p-3">
                  <ShieldCheck size={13} className="text-green-500 shrink-0" />
                  All transactions are 100% secure & encrypted
                </div>
              </div>

              {/* Items summary */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-3">
                  Order Summary
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({cartItems.length} items)
                  </span>
                </h2>
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.qty} × ₹{item.price}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-800 shrink-0">
                        ₹{item.price * item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col — bill */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 sticky top-20">
                <h2 className="font-bold text-gray-800 mb-4">Bill Details</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Item Total</span>
                    <span>₹{itemTotal}</span>
                  </div>
                  {cartItems.some(i => i.mrp > i.price) && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{cartItems.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-gray-900 text-base">
                    <span>Total Payable</span>
                    <span className="text-green-700">₹{totalAmount}</span>
                  </div>
                </div>

                {/* Coupon */}
                <button className="w-full flex items-center gap-2 mt-4 bg-orange-50 border border-orange-100 rounded-xl px-3 py-3 text-sm text-orange-600 hover:bg-orange-100 transition-colors">
                  <Tag size={14} />
                  <span className="flex-1 text-left font-semibold">Apply Coupon</span>
                  <ChevronRight size={14} />
                </button>

                <div className="mt-4 bg-green-50 rounded-xl p-3 text-xs text-green-700">
                  🎉 Savings: ₹{cartItems.reduce((s, i) => s + (i.mrp - i.price) * i.qty, 0)} on this order
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:opacity-60 active:scale-[0.98] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-200"
                >
                  {placing ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Place Order · ₹{totalAmount}
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  By placing this order, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
