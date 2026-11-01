import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">যোগাযোগ করুন (Contact Us)</h1>
        <p className="text-sm text-slate-600">যেকোনো প্রশ্ন, মতামত বা জরুরি সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন:</p>
        
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <Phone className="w-5 h-5 text-red-600" />
            <span>হটলাইন: +880 1893581615 (ARROZI Foundation)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <Mail className="w-5 h-5 text-red-600" />
            <span>ইমেইল: support@roktolagbe.org</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <MapPin className="w-5 h-5 text-red-600" />
            <span>ঠিকানা: ঢাকা, বাংলাদেশ</span>
          </div>
        </div>
      </div>
    </div>
  );
}