import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AlertCircle, Hospital, Phone, MapPin, Calendar, FileText, User } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const DIVISIONS = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];

export default function CreateBloodRequest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    patientName: '',
    hospitalName: '',
    bloodGroup: 'O+',
    bagsNeeded: 1,
    division: 'ঢাকা',
    district: '',
    upazila: '',
    contactPhone: '',
    urgencyDate: '',
    details: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('আবেদন করার আগে দয়া করে লগইন করুন।');
        navigate('/login');
        return;
      }

      const { error } = await supabase.from('blood_requests').insert([
        {
          user_id: user.id,
          patient_name: formData.patientName,
          hospital_name: formData.hospitalName,
          blood_group: formData.bloodGroup,
          bags_needed: parseInt(formData.bagsNeeded),
          division: formData.division,
          district: formData.district,
          upazila: formData.upazila || null,
          contact_phone: formData.contactPhone,
          urgency_date: formData.urgencyDate,
          details: formData.details || null,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      alert('রক্তের আবেদনটি সফলভাবে জমা হয়েছে! অ্যাডমিন পর্যালোচনার পর এটি প্রকাশিত হবে।');
      navigate('/requests');
    } catch (err) {
      setErrorMsg(err.message || 'আবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">জরুরি রক্তের আবেদন করুন</h1>
            <p className="text-xs text-slate-500">রোগীর জরুরি রক্তের প্রয়োজনে সঠিক তথ্য দিয়ে পোস্ট করুন</p>
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">রোগীর নাম *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="রোগীর নাম"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">হাসপাতাল / রক্তদানের স্থান *</label>
              <div className="relative">
                <Hospital className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="যেমন: ঢাকা মেডিকেল কলেজ"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">কত ব্যাগ প্রয়োজন? *</label>
              <input
                type="number"
                min="1"
                max="10"
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.bagsNeeded}
                onChange={(e) => setFormData({ ...formData, bagsNeeded: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">কবে রক্ত প্রয়োজন? *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.urgencyDate}
                  onChange={(e) => setFormData({ ...formData, urgencyDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                placeholder="যেমন: চট্টগ্রাম"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">উপজেলা / থানা</label>
              <input
                type="text"
                placeholder="যেমন: সদর"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.upazila}
                onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">যোগাযোগের ফোন নম্বর *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="01700000000"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">বিস্তারিত বিবরণ (রোগীর সমস্যা/পয়েন্ট)</label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                rows="3"
                placeholder="যেমন: সার্জারির জন্য জরুরি ২ ব্যাগ O+ রক্তের প্রয়োজন..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 text-sm mt-2"
          >
            {loading ? 'আবেদন জমা হচ্ছে...' : 'রক্তের আবেদন পোস্ট করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}