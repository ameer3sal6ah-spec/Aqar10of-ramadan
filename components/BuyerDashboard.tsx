import React, { useState, useMemo } from 'react';
import { User, Property, TransactionType, BannerItem } from '../types';
import { TENTH_OF_RAMADAN_NEIGHBORHOODS } from '../constants';
import PropertyCard from './PropertyCard';
import Header from './Header';
import PropertyDetailModal from './PropertyDetailModal';
import AdBanner from './AdBanner';

interface BuyerDashboardProps {
  user: User;
  onLogout: () => void;
  properties: Property[];
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ user, onLogout, properties }) => {
    const [neighborhood, setNeighborhood] = useState<string>('All');
    const [transactionType, setTransactionType] = useState<string>('All');
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    const filteredProperties = useMemo(() => {
        return properties.filter(prop => {
            const neighborhoodMatch = neighborhood === 'All' || prop.neighborhood === neighborhood;
            const transactionMatch = transactionType === 'All' || prop.transaction_type === transactionType;
            return neighborhoodMatch && transactionMatch;
        });
    }, [properties, neighborhood, transactionType]);

    const handleCardClick = (property: Property) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };


    return (
        <div dir="rtl">
            <Header user={user} onLogout={onLogout} />
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-slate-800">ابحث عن عقارك المثالي</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">المدينة</label>
                            <input
                                id="city"
                                type="text"
                                value="مدينة العاشر من رمضان"
                                disabled
                                className="w-full px-4 py-2 bg-slate-200 border border-slate-300 rounded-lg text-slate-600 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label htmlFor="neighborhood" className="block text-sm font-medium text-slate-700 mb-1">الحي / المجاورة</label>
                            <select
                                id="neighborhood"
                                value={neighborhood}
                                onChange={(e) => setNeighborhood(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            >
                                <option value="All">كل الأحياء</option>
                                {TENTH_OF_RAMADAN_NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="transactionType" className="block text-sm font-medium text-slate-700 mb-1">نوع المعاملة</label>
                             <select
                                id="transactionType"
                                value={transactionType}
                                onChange={(e) => setTransactionType(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            >
                                <option value="All">الكل</option>
                                <option value={TransactionType.SALE}>شراء</option>
                                <option value={TransactionType.RENT}>إيجار</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map(prop => <PropertyCard key={prop.id} property={prop} onCardClick={handleCardClick} />)
                    ) : (
                        <p className="text-slate-500 text-center col-span-full">لا توجد عقارات تطابق بحثك.</p>
                    )}
                </div>
            </main>
            {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={handleCloseModal} />}
        </div>
    );
};

export default BuyerDashboard;