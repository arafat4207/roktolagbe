import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AlertCircle, Hospital, MapPin, Phone, Calendar, Clock } from 'lucide-react';

const BLOOD_GROUPS = ['সবগুলো', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('সবগুলো');

  useEffect(() => {
    fetchRequests();
  }, [selectedGroup]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('blood_requests')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (selectedGroup !== 'সবগুলো') {
        query = query.eq('blood_group', selectedGroup);
      }

      const { data, error } = await query;
      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching blood requests:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">জরুরি রক্তের অনুরোধসমূহ</h1>
        <p className="text-sm text-slate-600 mt-1">
          রোগীদের জরুরি প্রয়োজনে এগিয়ে আসুন এবং রক্তদান করে জীবন বাঁচান।
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 flex items-center justify-between">
        <div className="w-full sm:w-64">
          <label className="block text-xs font-semibold text-slate-700 mb-1">রক্তের গ্রুপ দিয়ে ফিল্টার করুন</label>
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
      </div>

      {/* Requests List Cards */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">লোড হচ্ছে...</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">কোনো অনুমোদিত রক্তের আবেদন পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm relative space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-red-100 text-red-700 font-bold text-xs rounded-full mb-2">
                    {req.bags_needed} ব্যাগ প্রয়োজন
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg">রোগী: {req.patient_name}</h3>
                </div>
                <span className="w-12 h-12 bg-red-600 text-white font-extrabold text-lg rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  {req.blood_group}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Hospital className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-800">{req.hospital_name}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{req.upazila ? `${req.upazila}, ` : ''}{req.district}, {req.division}</span>
                </p>
                <p className="flex items-center gap-2 text-red-600 font-semibold">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>রক্তদানের প্রয়োজনীয় তারিখ: {req.urgency_date}</span>
                </p>
              </div>

              {req.details && (
                <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl leading-relaxed">
                  "{req.details}"
                </p>
              )}

              <div className="pt-2">
                <a
                  href={`tel:${req.contact_phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-red-600 text-white font-semibold text-xs rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  যোগাযোগ করুন ({req.contact_phone})
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}