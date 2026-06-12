import { useState, useEffect } from 'react';
import { Phone, Star, MapPin, CheckCircle2, Circle, Package, Bike, Home } from 'lucide-react';
import { deliveryPartner } from '../data/products';

const STATUSES = [
  {
    id: 'placed',
    label: 'Order Placed',
    sub: 'We received your order',
    icon: CheckCircle2,
    emoji: '📋',
  },
  {
    id: 'packed',
    label: 'Being Packed',
    sub: 'Items being packed by store',
    icon: Package,
    emoji: '📦',
  },
  {
    id: 'out_for_delivery',
    label: 'Out for Delivery',
    sub: `${deliveryPartner.name} is on the way`,
    icon: Bike,
    emoji: '🛵',
  },
  {
    id: 'delivered',
    label: 'Delivered',
    sub: 'Enjoy your order!',
    icon: Home,
    emoji: '🎉',
  },
];

const STATUS_INDEX = STATUSES.reduce((acc, s, i) => ({ ...acc, [s.id]: i }), {});

// Auto-progress demo: status prop can be overridden via Appwrite Realtime listener
export default function OrderTracking({ status: externalStatus, orderId, totalAmount }) {
  const [status, setStatus] = useState(externalStatus || 'placed');
  const [countdown, setCountdown] = useState(10 * 60); // 10 minutes in seconds

  // Auto-advance for demo purposes
  useEffect(() => {
    if (externalStatus) { setStatus(externalStatus); return; }
    const delays = [2500, 5000, 9000];
    const ids = delays.map((d, i) =>
      setTimeout(() => setStatus(STATUSES[i + 1].id), d)
    );
    return () => ids.forEach(clearTimeout);
  }, [externalStatus]);

  // Countdown timer
  useEffect(() => {
    if (status === 'delivered') return;
    const id = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [status]);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;
  const currentIdx = STATUS_INDEX[status] ?? 0;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Order ID + ETA */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 font-medium">Order ID</p>
            <p className="font-bold text-gray-800 text-sm">{orderId}</p>
          </div>
          {status !== 'delivered' ? (
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium">Arriving in</p>
              <p className="font-black text-2xl text-green-600 tabular-nums">
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </p>
            </div>
          ) : (
            <div className="text-right">
              <span className="bg-green-100 text-green-700 font-bold text-sm px-3 py-1 rounded-full">
                ✓ Delivered
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
            style={{ width: `${((currentIdx + 1) / STATUSES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Order Status</h3>
        <div className="space-y-0">
          {STATUSES.map((step, i) => {
            const isCompleted = i < currentIdx;
            const isActive = i === currentIdx;
            const isFuture = i > currentIdx;

            return (
              <div key={step.id} className="flex gap-4">
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 transition-all duration-500 ${
                    isCompleted ? 'bg-green-100' :
                    isActive ? 'bg-green-600 shadow-lg shadow-green-200 scale-110' :
                    'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 size={18} className="text-green-600" />
                    ) : isActive ? (
                      <span>{step.emoji}</span>
                    ) : (
                      <Circle size={18} className="text-gray-300" />
                    )}
                  </div>
                  {i < STATUSES.length - 1 && (
                    <div className={`w-0.5 h-8 my-1 transition-colors duration-500 ${
                      isCompleted ? 'bg-green-400' : 'bg-gray-100'
                    }`} />
                  )}
                </div>

                {/* Text */}
                <div className="pb-6 pt-1.5">
                  <p className={`text-sm font-semibold ${
                    isActive ? 'text-green-700' :
                    isCompleted ? 'text-gray-700' :
                    'text-gray-300'
                  }`}>
                    {step.label}
                    {isActive && (
                      <span className="ml-2 text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold animate-pulse">
                        LIVE
                      </span>
                    )}
                  </p>
                  <p className={`text-xs ${isFuture ? 'text-gray-200' : 'text-gray-400'}`}>
                    {step.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery partner */}
      {(status === 'out_for_delivery' || status === 'delivered') && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-fade-in">
          <h3 className="font-bold text-gray-800 mb-4">Delivery Partner</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-3xl shrink-0">
              {deliveryPartner.avatar}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800">{deliveryPartner.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold text-gray-600">{deliveryPartner.rating}</span>
                <span className="text-xs text-gray-400">· {deliveryPartner.totalDeliveries.toLocaleString()} deliveries</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                <MapPin size={10} />
                {deliveryPartner.vehicle}
              </p>
            </div>
            <a
              href="tel:+919999999999"
              className="w-11 h-11 rounded-xl bg-green-600 hover:bg-green-700 flex items-center justify-center text-white transition-colors shrink-0"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>
      )}

      {/* Bill summary */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3">Order Total</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Amount Paid</span>
          <span className="font-black text-lg text-green-700">₹{totalAmount}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Paid via UPI · Cash on Delivery</p>
      </div>
    </div>
  );
}
