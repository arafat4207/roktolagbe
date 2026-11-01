import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <Heart className="w-8 h-8 text-red-600 fill-current" />
          <h1 className="text-2xl font-bold text-slate-900">আমাদের সম্পর্কে (About Us)</h1>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>ROKTO LAGBE (রক্ত লাগবে)</strong> হলো ARROZI Foundation-এর একটি মানবিক ও অলাভজনক উদ্যোগ। বাংলাদেশে জরুরি রক্তের অভাবে কোনো মানুষের জীবন যেন বিপন্ন না হয়, সেই লক্ষ্যে এই ডিজিটাল প্ল্যাটফর্মটি তৈরি করা হয়েছে।
        </p>
        <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 space-y-2">
          <p className="font-bold text-slate-800 text-sm">আমাদের লক্ষ্য ও উদ্দেশ্য:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>রক্তদাতা ও গ্রহীতার মধ্যে সরাসরি সংযোগ তৈরি করা।</li>
            <li>সম্পূর্ণ বিনামূল্যে মানবিক সেবা প্রদান করা।</li>
            <li>রক্তদানে তরুণ সমাজকে উৎসাহিত করা।</li>
          </ul>
        </div>
      </div>
    </div>
  );
}