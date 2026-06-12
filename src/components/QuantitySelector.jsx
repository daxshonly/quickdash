import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ qty, onAdd, onRemove, size = 'md' }) {
  const isSmall = size === 'sm';

  return (
    <div className={`flex items-center bg-green-600 rounded-lg overflow-hidden ${isSmall ? 'h-7' : 'h-9'}`}>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className={`flex items-center justify-center text-white hover:bg-green-700 active:bg-green-800 transition-colors ${isSmall ? 'w-7' : 'w-9'} h-full`}
      >
        <Minus size={isSmall ? 12 : 14} strokeWidth={3} />
      </button>
      <span className={`text-white font-bold tabular-nums ${isSmall ? 'text-xs px-2' : 'text-sm px-3'}`}>
        {qty}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onAdd(); }}
        className={`flex items-center justify-center text-white hover:bg-green-700 active:bg-green-800 transition-colors ${isSmall ? 'w-7' : 'w-9'} h-full`}
      >
        <Plus size={isSmall ? 12 : 14} strokeWidth={3} />
      </button>
    </div>
  );
}
