import { Clock, Shield, Tag } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'Groceries in',
    highlight: '10 Minutes',
    subtitle: 'Fresh vegetables, dairy & more',
    emoji: '🛵',
    bg: 'from-yellow-400 to-orange-400',
    badge: 'LIGHTNING FAST',
  },
  {
    id: 2,
    title: 'Fresh Fruits',
    highlight: 'Every Morning',
    subtitle: 'Sourced from local farms daily',
    emoji: '🍎',
    bg: 'from-green-400 to-emerald-500',
    badge: 'FARM FRESH',
  },
  {
    id: 3,
    title: 'Midnight Snacks',
    highlight: 'We Deliver',
    subtitle: 'Open 24x7 for your cravings',
    emoji: '🌙',
    bg: 'from-indigo-500 to-purple-600',
    badge: '24x7 OPEN',
  },
];

const features = [
  { icon: Clock, label: '10 min delivery', color: 'text-green-600 bg-green-50' },
  { icon: Shield, label: 'Quality assured', color: 'text-blue-600 bg-blue-50' },
  { icon: Tag, label: 'Best prices', color: 'text-orange-600 bg-orange-50' },
];

export default function Hero() {
  return (
    <section className="mt-2 mb-6">
      {/* Banner strip */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {banners.map((b) => (
          <div
            key={b.id}
            className={`shrink-0 w-72 sm:w-80 rounded-2xl bg-gradient-to-br ${b.bg} p-5 flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-transform`}
          >
            <div>
              <span className="text-white/80 text-[10px] font-bold tracking-widest uppercase">{b.badge}</span>
              <p className="text-white font-bold text-xl leading-tight mt-1">{b.title}</p>
              <p className="text-white font-black text-2xl leading-tight">{b.highlight}</p>
              <p className="text-white/80 text-xs mt-1">{b.subtitle}</p>
            </div>
            <div className="text-6xl ml-3 select-none">{b.emoji}</div>
          </div>
        ))}
      </div>

      {/* Feature pills */}
      <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
        {features.map(({ icon: Icon, label, color }) => (
          <div key={label} className={`flex items-center gap-1.5 ${color} rounded-full px-3 py-1.5 text-xs font-semibold shrink-0 border border-current/10`}>
            <Icon size={12} />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
