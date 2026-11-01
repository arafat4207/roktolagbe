import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Heart, User, Phone, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const DIVISIONS = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];

export default function CreateDonorPost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    bloodGroup: 'O+',
    division: 'ঢাকা',
    district: '',
    upazila: '',
    lastDonatedDate: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('পোস্ট করার আগে দয়া করে লগইন করুন।');
        navigate('/login');
        return;
      }

      const { error } = await supabase.from('donor_posts').insert([
        {
          user_id: user.id,
          full_name: formData.fullName,
          phone: formData.phone,
          blood_group: formData.bloodGroup,
          division: formData.division,
          district: formData.district,
          upazila: formData.upazila || null,
          last_donated_date: formData.lastDonatedDate || null,
          status: 'pending', // অ্যাডমিন পর্যালোচনার জন্য প্যান্ডিং থাকবে
        },
      ]);

      if (error) throw error;

      alert('আপনার ডোনার পোস্টটি সফলভাবে জমা হয়েছে! অ্যাডমিন পর্যালোচনার পর এটি প্রকাশিত হবে।');
      navigate('/donors');
    } catch (err) {
      setErrorMsg(err.message || 'পোস্ট জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">রক্তদাতা হিসেবে নিবন্ধন / পোস্ট করুন</h1>
            <p className="text-xs text-slate-500">আপনার রক্তদানে বেঁচে যেতে পারে একটি মানবজীবন</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">পূর্ণ নাম *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="আপনার নাম"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ফোন নম্বর (যোগাযোগের জন্য) *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="01700000000"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">রক্তের গ্রুপ *</label>
              <select
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">বিভাগ *</label>
              <select
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
              >
                {DIVISIONS.map((div) => (
                  <option key={div} value={div}>{div}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">জেলা *</label>
              <input
                type="text"
                required
                placeholder="যেমন: ঢাকা"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">উপজেলা / এলাকা (ঐচ্ছিক)</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="যেমন: মিরপুর / ধানমন্ডি"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.upazila}
                  onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">সর্বশেষ রক্তদানের তারিখ (যদি দিয়ে থাকেন)</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.lastDonatedDate}
                  onChange={(e) => setFormData({ ...formData, lastDonatedDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>জমা দেওয়া পোস্টটি অ্যাডমিন কর্তৃক ভেরিফাই করার পর রক্তদাতা অনুসন্ধানে প্রদর্শিত হবে।</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 text-sm mt-2"
          >
            {loading ? 'পোস্ট জমা হচ্ছে...' : 'ডোনার পোস্ট জমা দিন'}
          </button>
        </form>
      </div>
    </div>
  );
}