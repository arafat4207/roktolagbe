import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, PlusCircle, ShieldCheck, Users, PhoneCall } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
            <Heart className="w-4 h-4 fill-current" />
            ARROZI Foundation-এর একটি মানবিক উদ্যোগ
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            জরুরি প্রয়োজনে <span className="text-red-600">রক্তদাতা</span> খুঁজুন খুব সহজেই
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            "ROKTO LAGBE" একটি সম্পূর্ণ ফ্রী ও নন-কমার্শিয়াল ব্লাড ডোনেশন কানেক্টর প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য মুমূর্ষু রোগীর জন্য রক্তদাতা খুঁজে পাওয়া সহজ করা।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/donors"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-md transition-colors text-sm"
            >
              <Search className="w-4 h-4" />
              রক্তদাতা খুঁজুন
            </Link>
            <Link
              to="/create-request"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 shadow-md transition-colors text-sm"
            >
              <PlusCircle className="w-4 h-4 text-red-500" />
              রক্তের আবেদন করুন
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">১০০% ফ্রী সেবা</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              এখানে রক্তদাতা এবং রক্তগ্রহীতা উভয়ের জন্যই সেবা সম্পূর্ণ ফ্রী। কোনো মধ্যস্থতা বা চার্জ নেই।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">সরাসরি যোগাযোগ</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              জরুরি মুহূর্তে কোনো রকম বিলম্ব ছাড়াই রক্তদাতার সাথে সরাসরি ফোনে যোগাযোগের সুবিধা।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">জরুরি হেল্পলাইন</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              যেকোনো প্রয়োজনে আমাদের স্বেচ্ছাসেবক টিম এবং হটলাইন নম্বরে যোগাযোগের সুবিধা।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}