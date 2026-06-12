import { useState } from 'react';
import { Search, ShoppingCart, MapPin, ChevronDown, Zap, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onSearchChange, searchValue }) {
  const { itemCount, totalAmount, setIsCartOpen, cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
        {/* Logo */}
        <div
          className="flex items-center gap-1.5 cursor-pointer shrink-0"
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <Zap size={18} className="text-yellow-900" fill="currentColor" />
          </div>
          <span className="font-black text-lg text-gray-900 hidden sm:block tracking-tight">
            Quick<span className="text-yellow-500">Dash</span>
          </span>
        </div>

        {/* Location */}
        <button className="flex items-center gap-1 text-sm shrink-0 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
          <MapPin size={14} className="text-green-600 shrink-0" />
          <div className="text-left hidden md:block">
            <p className="text-xs text-gray-400 font-medium leading-none mb-0.5">Delivering to</p>
            <div className="flex items-center gap-0.5">
              <span className="text-xs font-bold text-gray-800">Mumbai, 400001</span>
              <ChevronDown size={12} className="text-gray-500" />
            </div>
          </div>
        </button>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200 shrink-0" />

        {/* Search */}
        <div className="flex-1 relative min-w-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search 'milk' or 'bread'"
            className="w-full pl-9 pr-4 h-10 bg-gray-100 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all"
          />
        </div>

        {/* Cart Button */}
        <button
          onClick={() => {
            if (cartItems.length > 0) setIsCartOpen(true);
            else navigate('/cart');
          }}
          className={`flex items-center gap-2 rounded-xl px-3 h-10 text-sm font-bold transition-all shrink-0 ${
            itemCount > 0
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <ShoppingCart size={16} />
          {itemCount > 0 ? (
            <>
              <span className="hidden sm:block tabular-nums">{itemCount} items</span>
              <span className="hidden sm:block text-green-100">|</span>
              <span className="hidden sm:block tabular-nums">₹{totalAmount}</span>
              <span className="sm:hidden tabular-nums">{itemCount}</span>
            </>
          ) : (
            <span className="hidden sm:block">My Cart</span>
          )}
        </button>

        {/* User menu */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-9 h-9 rounded-full bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center hover:border-yellow-400 transition-colors"
          >
            <User size={16} className="text-yellow-700" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-11 bg-white rounded-xl shadow-lg border border-gray-100 w-44 py-1 z-50 animate-fade-in">
              <div className="px-3 py-2 border-b border-gray-50">
                <p className="text-xs font-bold text-gray-800 truncate">{user?.name || 'Guest'}</p>
                <p className="text-xs text-gray-400 truncate">{user?.phone || ''}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
