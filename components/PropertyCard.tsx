import React from 'react';
import { Property, TransactionType } from '../types';

interface PropertyCardProps {
  property: Property;
  onCardClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onCardClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 duration-300 flex flex-col cursor-pointer"
        onClick={() => onCardClick(property)}
    >
      <div className="relative">
        <img src={property.images[0]} alt={property.title} className="w-full h-56 object-cover" />
        <div className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold text-white rounded-full ${property.transaction_type === TransactionType.SALE ? 'bg-green-500' : 'bg-blue-500'}`}>
          {property.transaction_type === TransactionType.SALE ? 'للبيع' : 'للإيجار'}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 mb-2 truncate">{property.title}</h3>
        <p className="text-sm text-slate-500 mb-4 flex items-center">
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
            {property.neighborhood}, {property.city}
        </p>
        <div className="grid grid-cols-3 gap-4 text-center my-4 text-sm text-slate-600">
            <div className="flex flex-col items-center">
                <span className="font-semibold">{property.bedrooms}</span>
                <span className="text-xs text-slate-500">غرف</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-semibold">{property.bathrooms}</span>
                <span className="text-xs text-slate-500">حمامات</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-semibold">{property.area} م²</span>
                <span className="text-xs text-slate-500">المساحة</span>
            </div>
        </div>
        <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center">
             <p className="text-2xl font-bold text-teal-600">
                {formatPrice(property.price)}
                {property.transaction_type === TransactionType.RENT && <span className="text-sm font-normal text-slate-500">/شهرياً</span>}
             </p>
            <div className="bg-teal-100 text-teal-700 font-semibold py-2 px-4 rounded-lg hover:bg-teal-200 transition-colors">
                عرض التفاصيل
            </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;