import { supabase } from "./supabase";

export const formatPhoneToEmail = (phone) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `${cleanPhone}@roktolagbe.com`;
};

// নতুন ইউজার রেজিস্ট্রেশন (স্বয়ংক্রিয়ভাবে সরাসরি লগইন ও প্রোফাইল তৈরি করবে)
export const registerUser = async (formData) => {
  const email = formatPhoneToEmail(formData.phone);

  // ১. সাইন আপ করার চেষ্টা করা
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.fullName,
        phone: formData.phone,
        blood_group: formData.bloodGroup,
        division: formData.division,
        district: formData.district,
      },
    },
  });

  // যদি ইউজার ইতিমধ্যে রেজিস্টার্ড থাকে বা রেট লিমি트 এরর দেয়, তবে সরাসরি সাইন-ইন করে পাসওয়ার্ড দিয়ে প্রোফাইল আপডেট বা লগইন নিশ্চিত করার চেষ্টা করবে
  if (error) {
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: email,
      password: formData.password,
    });
    if (loginError) throw error; // আসল এররটি থ্রো করবে
    data = loginData;
  }

  // ২. Profiles টেবিলে ডাটা সেভ করা বা আপডেট করা
  if (data?.user) {
    const { error: profileError } = await supabase.from('profiles').upsert([
      {
        id: data.user.id,
        full_name: formData.fullName,
        phone: formData.phone,
        blood_group: formData.bloodGroup,
        division: formData.division,
        district: formData.district,
        role: 'user',
      },
    ]);

    if (profileError) {
      console.error('Profile save error:', profileError);
    }
  }

  return data;
};

// ইউজার লগইন
export const loginUser = async (phone, password) => {
  const email = formatPhoneToEmail(phone);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw error;
  return data;
};

// লগআউট
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};