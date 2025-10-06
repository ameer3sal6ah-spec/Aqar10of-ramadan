import React from 'react';
import { BannerItem } from '../types';

interface AdBannerProps {
  banners: BannerItem[];
}

const AdBanner: React.FC<AdBannerProps> = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4">عروض قد تهمك</h3>
      <div className="flex space-x-6 space-x-reverse overflow-x-auto pb-4 scrollbar-hide">
        {banners.map((banner) => (
          <a
            key={banner.id}
            href={banner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 duration-300 group"
          >
            <div className="h-40 overflow-hidden">
              <img 
                src={banner.imageUrl} 
                alt={banner.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-slate-800 truncate">{banner.title}</h4>
              <p className="text-sm text-slate-500 mt-1">{banner.description}</p>
            </div>
          </a>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AdBanner;
