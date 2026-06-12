import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-yellow-400 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-yellow-900" fill="currentColor" />
          </div>
          <span className="font-black text-gray-800">Quick<span className="text-yellow-500">Dash</span></span>
        </div>
        <p className="text-xs text-gray-400 mb-4 max-w-sm">
          Delivering groceries, snacks, and essentials to your door in under 10 minutes.
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600">About Us</a>
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <a href="#" className="hover:text-gray-600">Contact</a>
        </div>
        <p className="text-xs text-gray-300 mt-4">© 2025 QuickDash. All rights reserved.</p>
      </div>
    </footer>
  );
}
