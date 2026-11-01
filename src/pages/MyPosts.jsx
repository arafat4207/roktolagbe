import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Heart, Trash2, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function MyPosts() {
  const navigate = useNavigate();
  const [donorPosts, setDonorPosts] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // Fetch Donor Posts
      const { data: dPosts } = await supabase
        .from('donor_posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch Blood Requests
      const { data: bRequests } = await supabase
        .from('blood_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setDonorPosts(dPosts || []);
      setBloodRequests(bRequests || []);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDonorPost = async (id) => {
    if (!window.confirm('আপনি কি এই ডোনার পোস্টটি মুছে ফেলতে চান?')) return;
    try {
      const { error } = await supabase.from('donor_posts').delete().eq('id', id);
      if (error) throw error;
      setDonorPosts(donorPosts.filter(p => p.id !== id));
      alert('ডোনার পোস্ট সফলভাবে মুছে ফেলা হয়েছে।');
    } catch (err) {
      alert('পোস্ট মুছতে সমস্যা হয়েছে।');
    }
  };

  const handleDeleteBloodRequest = async (id) => {
    if (!window.confirm('আপনি কি এই রক্তের আবেদনটি মুছে ফেলতে চান?')) return;
    try {
      const { error } = await supabase.from('blood_requests').delete().eq('id', id);
      if (error) throw error;
      setBloodRequests(bloodRequests.filter(r => r.id !== id));
      alert('আবেদনটি সফলভাবে মুছে ফেলা হয়েছে।');
    } catch (err) {
      alert('আবেদন মুছতে সমস্যা হয়েছে।');
    }
  };

  const renderStatusBadge = (status) => {
    if (status === 'approved') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
          <CheckCircle className="w-3.5 h-3.5" /> অনুমোদিত (Approved)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">
        <Clock className="w-3.5 h-3.5" /> পর্যালোচনাধীন (Pending)
      </span>
    );
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500 text-sm">পোস্টগুলো লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">আমার পোস্টসমূহ</h1>
        <p className="text-sm text-slate-600">আপনার তৈরি করা ডোনার পোস্ট এবং রক্তের আবেদনগুলোর বর্তমান অবস্থা।</p>
      </div>

      {/* Donor Posts Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-600" /> আমার ডোনার নিবন্ধন পোস্ট ({donorPosts.length})
        </h2>

        {donorPosts.length === 0 ? (
          <p className="text-xs text-slate-500 bg-white p-4 rounded-xl border border-slate-200">আপনার কোনো ডোনার পোস্ট নেই।</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donorPosts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900">{post.full_name}</span>
                    <p className="text-xs text-slate-500">{post.district}, {post.division}</p>
                  </div>
                  <span className="w-10 h-10 bg-red-100 text-red-600 font-bold rounded-xl flex items-center justify-center">
                    {post.blood_group}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  {renderStatusBadge(post.status)}
                  <button
                    onClick={() => handleDeleteDonorPost(post.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blood Requests Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-red-600" /> আমার রক্তের আবেদন পোস্ট ({bloodRequests.length})
        </h2>

        {bloodRequests.length === 0 ? (
          <p className="text-xs text-slate-500 bg-white p-4 rounded-xl border border-slate-200">আপনার কোনো রক্তের আবেদন নেই।</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bloodRequests.map(req => (
              <div key={req.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900">রোগী: {req.patient_name}</span>
                    <p className="text-xs text-slate-500">{req.hospital_name}, {req.district}</p>
                  </div>
                  <span className="w-10 h-10 bg-red-600 text-white font-bold rounded-xl flex items-center justify-center">
                    {req.blood_group}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  {renderStatusBadge(req.status)}
                  <button
                    onClick={() => handleDeleteBloodRequest(req.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}