import React, { useState } from 'react';
import { Property, TransactionType } from '../types';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', minimumFractionDigits: 0 }).format(price);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(property.contact_phone).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      dir="rtl"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row animate-fade-in-up"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Image Gallery */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col">
          <div className="relative aspect-w-4 aspect-h-3 mb-4">
            <img 
              src={property.images[currentImageIndex]} 
              alt={`${property.title} - image ${currentImageIndex + 1}`} 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
          {property.images.length > 1 && (
            <div className="flex space-x-2 space-x-reverse overflow-x-auto p-1">
              {property.images.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-105' : 'border-transparent'}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col">
          <div className={`self-start px-3 py-1 text-sm font-semibold text-white rounded-full mb-4 ${property.transaction_type === TransactionType.SALE ? 'bg-green-500' : 'bg-blue-500'}`}>
            {property.transaction_type === TransactionType.SALE ? 'للبيع' : 'للإيجار'}
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h2>
          <p className="text-md text-slate-500 mb-4 flex items-center">
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
            {property.neighborhood}, {property.city}
          </p>

          <div className="grid grid-cols-2 gap-4 text-slate-700 my-4">
            <div className="bg-slate-100 p-3 rounded-lg text-center">
                <div className="font-bold">{property.area} م²</div>
                <div className="text-sm text-slate-500">المساحة</div>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg text-center">
                <div className="font-bold">{property.bedrooms}</div>
                <div className="text-sm text-slate-500">غرف النوم</div>
            </div>
             <div className="bg-slate-100 p-3 rounded-lg text-center">
                <div className="font-bold">{property.bathrooms}</div>
                <div className="text-sm text-slate-500">الحمامات</div>
            </div>
             <div className="bg-slate-100 p-3 rounded-lg text-center">
                <div className="font-bold">{property.floor === 0 ? 'أرضي' : property.floor}</div>
                <div className="text-sm text-slate-500">الدور</div>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto my-4 pr-2 max-h-40">
             <h4 className="font-semibold text-slate-800 mb-2">الوصف:</h4>
             <p className="text-slate-600 leading-relaxed">{property.description}</p>
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-200">
             <p className="text-3xl font-bold text-teal-600 mb-4">
                {formatPrice(property.price)}
                {property.transaction_type === TransactionType.RENT && <span className="text-base font-normal text-slate-500"> / شهرياً</span>}
             </p>
             { !showPhoneNumber ? (
                <button
                    onClick={() => setShowPhoneNumber(true)}
                    className="w-full text-center block bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105 duration-300"
                >
                    إظهار رقم الهاتف
                </button>
             ) : (
                <div className="text-center p-3 bg-teal-50 rounded-lg border border-teal-200 flex items-center justify-center space-x-4 space-x-reverse">
                    <a href={`tel:${property.contact_phone}`} className="text-2xl font-bold text-teal-700 tracking-wider">
                        {property.contact_phone}
                    </a>
                    <button
                        onClick={handleCopy}
                        className="bg-slate-200 text-slate-700 text-sm font-semibold py-1 px-3 rounded-lg hover:bg-slate-300 transition-colors"
                        disabled={isCopied}
                    >
                        {isCopied ? 'تم النسخ!' : 'نسخ'}
                    </button>
                </div>
             )}
          </div>
        </div>
      </div>
       <style>{`
            @keyframes fade-in-up {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default PropertyDetailModal;