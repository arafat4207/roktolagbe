import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { logoutUser } from '../lib/auth';
import { User, Phone, MapPin, Shield, LogOut, FileText } from 'lucide-react';

export default function MyAccount() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert('সফলভাবে লগআউট হয়েছে!');
      navigate('/');
      window.location.reload();
    } catch (err) {
      alert('লগআউট করতে সমস্যা হয়েছে।');
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500 text-sm">প্রোফাইল লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-2xl">
              {profile?.blood_group}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{profile?.full_name}</h1>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                রোল: {profile?.role === 'admin' ? 'এডমিন (Admin)' : 'স্বেচ্ছাসেবক / সাধারণ ব্যবহারকারী'}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/my-posts')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200 transition-colors"
          >
            <FileText className="w-4 h-4 text-red-600" />
            আমার পোস্টসমূহ
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-xs text-slate-400 font-medium">ফোন নম্বর</p>
              <p className="font-semibold text-slate-800">{profile?.phone}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
            <MapPin className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-xs text-slate-400 font-medium">ঠিকানা</p>
              <p className="font-semibold text-slate-800">{profile?.district}, {profile?.division}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 font-semibold text-xs rounded-lg hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            লগআউট করুন
          </button>
        </div>
      </div>
    </div>
  );
}