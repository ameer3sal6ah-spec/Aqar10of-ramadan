import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { UserRole } from '../types';
import { EyeIcon, EyeSlashIcon } from './icons/PasswordIcons';

const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.BUYER);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('يرجى ملء جميع الحقول');
      return;
    }
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
       // On success, the onAuthStateChange listener in App.tsx will handle the new user state.
       // Supabase may send a confirmation email, which the user needs to verify.
       alert('تم إنشاء حسابك بنجاح! يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-1">
          الاسم الكامل
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 text-slate-900 bg-slate-50"
          placeholder="مثال: محمد أحمد"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="email-register" className="block text-sm font-semibold text-slate-700 mb-1">
          البريد الإلكتروني
        </label>
        <input
          id="email-register"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 text-slate-900 bg-slate-50"
          placeholder="example@email.com"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label
          htmlFor="password-register"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          كلمة المرور
        </label>
        <div className="relative">
          <input
            id="password-register"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 text-slate-900 bg-slate-50 pr-10"
            placeholder="********"
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-teal-600"
            disabled={loading}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
       <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">أقوم بالتسجيل كـ:</label>
        <div className="flex items-center space-x-4 space-x-reverse">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="role"
              value={UserRole.BUYER}
              checked={role === UserRole.BUYER}
              onChange={() => setRole(UserRole.BUYER)}
              className="form-radio h-4 w-4 text-teal-600"
              disabled={loading}
            />
            <span className="mr-2 text-slate-800">أبحث عن عقار</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="role"
              value={UserRole.OWNER}
              checked={role === UserRole.OWNER}
              onChange={() => setRole(UserRole.OWNER)}
              className="form-radio h-4 w-4 text-teal-600"
              disabled={loading}
            />
            <span className="mr-2 text-slate-800">صاحب عقار</span>
          </label>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105 duration-300 mt-4 disabled:bg-teal-400 disabled:scale-100"
      >
        {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء حساب'}
      </button>
    </form>
  );
};

export default RegisterForm;
