import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-teal-600 mb-2 text-center">
              عقار العاشر
            </h1>
            <p className="text-slate-500 mb-8 text-center">
              بوابتك لسوق العقارات في مدينة العاشر من رمضان
            </p>

            {isLoginView ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLoginView(!isLoginView)}
                className="text-teal-600 hover:text-teal-800 font-semibold transition-colors duration-300"
              >
                {isLoginView
                  ? 'ليس لديك حساب؟ إنشاء حساب جديد'
                  : 'لديك حساب بالفعل؟ تسجيل الدخول'}
              </button>
            </div>
          </div>

          {/* Right Side - Info & Banner */}
          <div className="w-full md:w-1/2 bg-teal-600 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
             <div 
                className="absolute inset-0 bg-cover bg-center z-0 opacity-20" 
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop')"}}
            ></div>
             <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800 opacity-80 z-10"></div>
            <div className="relative z-20">
              <h2 className="text-4xl font-bold mb-6">
                منصة سهلة، بسيطة، ومجانية
              </h2>
              <p className="text-lg text-teal-100 leading-relaxed">
                نحن نصلك مباشرة بالبائع أو المشتري بدون وسطاء. تصفح، أعلن، وتواصل بكل سهولة.
              </p>
            </div>
            <div className="relative z-20 mt-8">
                <ul className="space-y-4 text-lg">
                    <li className="flex items-center">
                        <svg className="w-6 h-6 mr-3 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>بحث سهل ومخصص لاحتياجاتك</span>
                    </li>
                    <li className="flex items-center">
                        <svg className="w-6 h-6 mr-3 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>إضافة إعلانك العقاري مجاناً</span>
                    </li>
                    <li className="flex items-center">
                        <svg className="w-6 h-6 mr-3 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>تواصل مباشر وآمن بين الطرفين</span>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
