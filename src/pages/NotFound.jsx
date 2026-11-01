import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20 px-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">পেজটি পাওয়া যায়নি!</h2>
      <p className="text-slate-600 mb-6">আপনি যে লিঙ্কটিতে প্রবেশের চেষ্টা করছেন তা বিদ্যমান নেই বা মুছে ফেলা হয়েছে।</p>
      <Link to="/" className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}