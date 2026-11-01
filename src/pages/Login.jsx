import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../lib/auth';
import { LogIn, Phone, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await loginUser(phone, password);
      alert('সফলভাবে লগইন হয়েছে!');
      navigate('/');
      window.location.reload();
    } catch (err) {
      setErrorMsg('ফোন নম্বর বা পাসওয়ার্ড সঠিক নয়!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">লগইন করুন</h1>
          <p className="text-xs text-slate-500 mt-1">আপনার ফোন নম্বর ও পাসওয়ার্ড দিন</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">ফোন নম্বর</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="01700000000"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="আপনার পাসওয়ার্ড"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 text-sm mt-2"
          >
            {loading ? 'প্রবেশ করা হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-6">
          নতুন ব্যবহারকারী?{' '}
          <Link to="/register" className="text-red-600 font-semibold hover:underline">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>
    </div>
  );
}