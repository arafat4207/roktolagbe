import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, MapPin, Phone, Calendar, Heart, ShieldCheck } from 'lucide-react';

const BLOOD_GROUPS = ['সবগুলো', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const DIVISIONS = ['সবগুলো', 'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];

export default function FindDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('সবগুলো');
  const [selectedDivision, setSelectedDivision] = useState('সবগুলো');
  const [searchDistrict, setSearchDistrict] = useState('');

  useEffect(() => {
    fetchDonors();
  }, [selectedGroup, selectedDivision]);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      // টেবিলের নাম সঠিকভাবে 'donor_posts' করা হয়েছে এবং approved স্ট্যাটাস ফিল্টার করা হয়েছে
      let query = supabase
        .from('donor_posts')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (selectedGroup !== 'সবগুলো') {
        query = query.eq('blood_group', selectedGroup);
      }

      if (selectedDivision !== 'সবগুলো') {
        query = query.eq('division', selectedDivision);
      }

      const { data, error } = await query;
      if (error) throw error;
      setDonors(data || []);
    } catch (err) {
      console.error('Error fetching donors:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonors = donors.filter((donor) =>
    donor.district?.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">রক্তদাতা খুঁজুন (Find Donors)</h1>
        <p className="text-sm text-slate-600 mt-1">
          জরুরি প্রয়োজনে আপনার নিকটস্থ ভেরিফাইড রক্তদাতাদের খুঁজে বের করুন।
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">রক্তের গ্রুপ</label>
            <select
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">বিভাগ</label>
            <select
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
            >
              {DIVISIONS.map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">জেলা দিয়ে খুঁজুন</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="যেমন: ঢাকা / বগুড়া"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Donor List Cards */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">লোড হচ্ছে...</div>
      ) : filteredDonors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">কোনো অনুমোদিত ডোনার পাওয়া যায়নি।</p>
          <p className="text-xs text-slate-400 mt-1">পছন্দমতো সার্চ ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <div key={donor.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-1.5">
                    {donor.full_name}
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {donor.upazila ? `${donor.upazila}, ` : ''}{donor.district}, {donor.division}
                  </p>
                </div>
                <span className="w-12 h-12 bg-red-100 text-red-600 font-extrabold text-lg rounded-2xl flex items-center justify-center shrink-0">
                  {donor.blood_group}
                </span>
              </div>

              {donor.last_donated_date && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>সর্বশেষ রক্তদান: {donor.last_donated_date}</span>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href={`tel:${donor.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 font-semibold text-xs rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  কল করুন ({donor.phone})
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}