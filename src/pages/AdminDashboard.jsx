import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Droplet, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [pendingDonors, setPendingDonors] = useState([]);
  const [stats, setStats] = useState({ approved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // ১. যেসব ইউজারদের status 'pending' বা খালি আছে তাদের নিয়ে আসা
      const { data: pendingData, error: pendingError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'user')
        .or('status.eq.pending,status.is.null')
        .order('created_at', { ascending: false });

      if (pendingError) throw pendingError;

      // ২. মোট অনুমোদিত (Approved) রক্তদাতার সংখ্যা গণনা করা
      const { count: approvedCount, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('role', 'user')
        .eq('status', 'approved');

      if (countError) throw countError;

      setPendingDonors(pendingData || []);
      setStats({
        approved: approvedCount || 0,
        pending: pendingData ? pendingData.length : 0,
      });
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // রক্তদাতা অ্যাপ্রুভ (Accept) করার ফাংশন
  const handleApprove = async (userId) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'approved' })
        .eq('id', userId);

      if (error) {
        alert('Approve করতে সমস্যা হয়েছে!');
        console.error(error);
      } else {
        alert('রক্তদাতা সফলভাবে Approve করা হয়েছে!');
        fetchAdminData(); // ডাটা রিফ্রেশ করা
      }
    } catch (err) {
      console.error(err);
    }
  };

  // রক্তদাতা বাতিল (Reject) করার ফাংশন
  const handleReject = async (userId) => {
    if (!window.confirm('আপনি কি এই আবেদনটি বাতিল করতে চান?')) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'rejected' })
        .eq('id', userId);

      if (error) {
        alert('Reject করতে সমস্যা হয়েছে!');
      } else {
        fetchAdminData(); // ডাটা রিফ্রেশ করা
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 font-medium">
        অ্যাডমিন ডাটা লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          ROKTO LAGBE — অ্যাডমিন কন্ট্রোল প্যানেল
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          রক্তদাতাদের আবেদন পর্যালোচনা ও পরিচালনা করুন।
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              অপেক্ষমাণ রক্তদাতা (Pending)
            </p>
            <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{stats.pending} জন</h3>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl">
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              অনুমোদিত রক্তদাতা (Approved)
            </p>
            <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.approved} জন</h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Pending Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">রক্তদাতা অনুমোদনের আবেদনসমূহ</h2>
          <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
            {pendingDonors.length} টি পেন্ডিং
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">নাম</th>
                <th className="p-4">ফোন নম্বর</th>
                <th className="p-4">রক্তের গ্রুপ</th>
                <th className="p-4">বিভাগ ও জেলা</th>
                <th className="p-4 text-center">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {pendingDonors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">
                    কোনো অপেক্ষমাণ রিকোয়েস্ট নেই!
                  </td>
                </tr>
              ) : (
                pendingDonors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{donor.full_name}</td>
                    <td className="p-4 text-slate-600">{donor.phone}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-red-100 text-red-600 font-extrabold rounded-md text-xs">
                        {donor.blood_group}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {donor.district}, {donor.division}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleApprove(donor.id)}
                          className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1 hover:bg-emerald-700 transition"
                        >
                          <CheckCircle className="w-4 h-4" /> Accept
                        </button>
                        <button
                          onClick={() => handleReject(donor.id)}
                          className="bg-rose-500 text-white px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1 hover:bg-rose-600 transition"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}