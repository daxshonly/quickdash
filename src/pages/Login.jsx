import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Phone, ArrowRight, ShieldCheck, Clock, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const perks = [
  { icon: Clock, label: '10-minute delivery', sub: 'From store to your door' },
  { icon: ShieldCheck, label: 'Fresh & quality assured', sub: '100% quality guarantee' },
  { icon: Tag, label: 'Best prices always', sub: 'No hidden charges' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');
    if (otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login({ name: 'Darshan', phone: `+91 ${phone}`, id: '1' });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 flex-col justify-center px-16 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-yellow-400/10 rounded-full -translate-y-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
              <Zap size={24} className="text-yellow-900" fill="currentColor" />
            </div>
            <span className="font-black text-3xl text-white tracking-tight">
              Quick<span className="text-yellow-300">Dash</span>
            </span>
          </div>

          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Groceries<br />at lightning<br />speed ⚡
          </h1>
          <p className="text-green-100 text-lg mb-12">
            From store to your door in under 10 minutes. Every time.
          </p>

          <div className="space-y-4">
            {perks.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-green-200 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
            <Zap size={20} className="text-yellow-900" fill="currentColor" />
          </div>
          <span className="font-black text-2xl text-gray-900">
            Quick<span className="text-yellow-500">Dash</span>
          </span>
        </div>

        <div className="w-full max-w-sm">
          {step === 'phone' ? (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-black text-gray-900 mb-1">Sign in</h2>
              <p className="text-gray-500 text-sm mb-8">
                Enter your mobile number to continue
              </p>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Mobile Number
                  </label>
                  <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-green-500 transition-colors">
                    <div className="flex items-center gap-2 px-3 py-3 border-r border-gray-200 bg-gray-50 shrink-0">
                      <span className="text-base">🇮🇳</span>
                      <span className="text-sm font-semibold text-gray-600">+91</span>
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit mobile number"
                      className="flex-1 px-3 py-3 text-sm outline-none placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <span>⚠</span> {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-green-200"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Get OTP
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">or continue as</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <button
                onClick={() => {
                  login({ name: 'Guest', phone: '', id: 'guest' });
                  navigate('/');
                }}
                className="mt-4 w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Browse as Guest
              </button>
            </div>
          ) : (
            <div className="animate-fade-in">
              <button
                onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                className="text-xs text-green-600 font-semibold flex items-center gap-1 mb-6 hover:underline"
              >
                ← Change number
              </button>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Verify OTP</h2>
              <p className="text-gray-500 text-sm mb-2">
                Sent to <strong>+91 {phone}</strong>
              </p>
              <p className="text-xs text-green-600 font-semibold mb-8 bg-green-50 px-3 py-2 rounded-lg">
                💡 Hint: Use any 6 digits (demo mode)
              </p>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    One-Time Password
                  </label>
                  <input
                    type="tel"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • • • •"
                    className="w-full px-4 py-4 border-2 border-gray-200 focus:border-green-500 rounded-xl text-center text-2xl font-black tracking-[0.5em] outline-none placeholder:tracking-[0.3em] placeholder:text-gray-200 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <span>⚠</span> {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-green-200"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Verify & Continue
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-4">
                Didn't receive it?{' '}
                <button className="text-green-600 font-semibold hover:underline">
                  Resend in 30s
                </button>
              </p>
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-8">
            By continuing, you agree to our{' '}
            <a href="#" className="text-green-600 hover:underline">Terms</a>
            {' '}&{' '}
            <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
