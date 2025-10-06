import React, { useState } from 'react';
import { User, Property } from '../types';
import PropertyCard from './PropertyCard';
import PropertyForm from './PropertyForm';
import Header from './Header';
import PropertyDetailModal from './PropertyDetailModal';

interface OwnerDashboardProps {
  user: User;
  onLogout: () => void;
  properties: Property[];
  onAddProperty: (propertyData: Omit<Property, 'id' | 'owner_id'>) => void;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ user, onLogout, properties, onAddProperty }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    const handleAddProperty = (propertyData: Omit<Property, 'id' | 'owner_id'>) => {
        onAddProperty(propertyData);
        setIsFormOpen(false);
    }

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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">عقاراتي</h1>
                    <button 
                        onClick={() => setIsFormOpen(true)}
                        className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105 duration-300"
                    >
                        + إضافة عقار جديد
                    </button>
                </div>
                
                {isFormOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
                         <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <PropertyForm onSubmit={handleAddProperty} onCancel={() => setIsFormOpen(false)} />
                         </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.length > 0 ? (
                        properties.map(prop => <PropertyCard key={prop.id} property={prop} onCardClick={handleCardClick} />)
                    ) : (
                        <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-md">
                           <p className="text-slate-500 text-lg">لم تقم بإضافة أي عقارات بعد.</p>
                           <p className="text-slate-400 mt-2">انقر على زر "إضافة عقار جديد" للبدء.</p>
                        </div>
                    )}
                </div>
            </main>
            {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={handleCloseModal} />}
        </div>
    );
};

export default OwnerDashboard;