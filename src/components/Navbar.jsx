import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X, User, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900 tracking-tight block leading-none">
                  ROKTO LAGBE
                </span>
                <span className="text-xs text-red-600 font-medium tracking-wide">
                  রক্ত লাগবে (ARROZI Foundation)
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-700 hover:text-red-600 font-medium transition-colors">
              হোম
            </Link>
            <Link to="/donors" className="text-slate-700 hover:text-red-600 font-medium transition-colors">
              ডোনার খুঁজুন
            </Link>
            <Link to="/requests" className="text-slate-700 hover:text-red-600 font-medium transition-colors">
              রক্তের অনুরোধ
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-red-600 font-medium transition-colors">
              আমাদের সম্পর্কে
            </Link>

            <div className="flex items-center gap-3 ml-4">
              <Link
                to="/create-donor"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-red-600" />
                ডোনার হন
              </Link>
              <Link
                to="/create-request"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                <Heart className="w-4 h-4" />
                রক্তের প্রয়োজন
              </Link>
              
              {isLoggedIn ? (
                <Link
                  to="/account"
                  className="p-2 text-slate-600 hover:text-red-600 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-red-600 transition-colors"
                >
                  লগইন
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            হোম
          </Link>
          <Link
            to="/donors"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            ডোনার খুঁজুন
          </Link>
          <Link
            to="/requests"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            রক্তের অনুরোধ
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            আমাদের সম্পর্কে
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/create-donor"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              ডোনার হিসেবে নিবন্ধন করুন
            </Link>
            <Link
              to="/create-request"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg"
            >
              রক্তের অনুরোধ পোস্ট করুন
            </Link>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-300 rounded-lg"
            >
              লগইন / রেজিস্টার
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}