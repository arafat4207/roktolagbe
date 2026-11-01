import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                ROKTO LAGBE
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              "এক ফোঁটা রক্ত, একটি জীবনের আশা।"<br />
              ARROZI Foundation-এর অধীনে পরিচালিত একটি সম্পূর্ণ বিনামূল্যের স্বেচ্ছাসেবী রক্তদান মেলবন্ধন প্ল্যাটফর্ম।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">দ্রুত নেভিগেশন</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/donors" className="hover:text-white transition-colors">ডোনার খুঁজুন</Link></li>
              <li><Link to="/requests" className="hover:text-white transition-colors">রক্তের অনুরোধ তালিকা</Link></li>
              <li><Link to="/create-donor" className="hover:text-white transition-colors">ডোনার পোস্ট তৈরি করুন</Link></li>
              <li><Link to="/create-request" className="hover:text-white transition-colors">রক্তের আবেদন জমা দিন</Link></li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">নীতিমালা ও সহায়িকা</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/policies" className="hover:text-white transition-colors">Rules & Policies (শর্তাবলী)</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy (গোপনীয়তা)</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">আমাদের লক্ষ্য ও উদ্দেশ্য</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">যোগাযোগ করুন</Link></li>
            </ul>
          </div>

          {/* Emergency Warning */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              জরুরি স্বাস্থ্য সতর্কবার্তা
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              ROKTO LAGBE কোনো জরুরি চিকিৎসা সেবা সংস্থা বা ব্ল্যাড ব্যাংক নয়। আশঙ্কাজনক অবস্থায় প্ল্যাটফর্মের পোস্টের অপেক্ষায় না থেকে সরাসরি নিকটস্থ হাসপাতাল বা চিকিৎসকের পরামর্শ নিন।
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-center text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ROKTO LAGBE — ARROZI Foundation. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="text-slate-400">রক্ত কেনাবেচা দণ্ডনীয় অপরাধ। এখানে কোনো আর্থিক লেনদেন করা হয় না।</p>
        </div>
      </div>
    </footer>
  );
}