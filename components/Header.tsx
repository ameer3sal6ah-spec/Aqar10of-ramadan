
import React from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="bg-white shadow-md" dir="rtl">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-teal-600">
                    عقار العاشر
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-slate-700">مرحباً، <span className="font-semibold">{user.fullName}</span></span>
                    <button 
                        onClick={onLogout}
                        className="bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors duration-300"
                    >
                        تسجيل الخروج
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
