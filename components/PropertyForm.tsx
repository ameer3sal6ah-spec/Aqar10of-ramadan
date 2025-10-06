import React, { useState } from 'react';
import { Property, TransactionType } from '../types';
import { TENTH_OF_RAMADAN_NEIGHBORHOODS } from '../constants';
import { supabase } from '../supabaseClient';

interface PropertyFormProps {
    onSubmit: (propertyData: Omit<Property, 'id' | 'owner_id'>) => void;
    onCancel: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [area, setArea] = useState(0);
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [floor, setFloor] = useState(0);
    const [neighborhood, setNeighborhood] = useState(TENTH_OF_RAMADAN_NEIGHBORHOODS[0]);
    const [transactionType, setTransactionType] = useState(TransactionType.SALE);
    const [contactPhone, setContactPhone] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        let uploadedImageUrls: string[] = [];

        if (imageFiles.length > 0) {
            const uploadPromises = imageFiles.map(file => {
                const fileName = `${Date.now()}-${file.name}`;
                return supabase.storage.from('property-images').upload(fileName, file);
            });

            try {
                const uploadResults = await Promise.all(uploadPromises);

                const successfulUploads = uploadResults.filter(({ error }) => !error);
                const errors = uploadResults.filter(({ error }) => error);

                if (errors.length > 0) {
                    console.error('Some image uploads failed:', errors);
                }

                if (successfulUploads.length > 0) {
                    const urlPromises = successfulUploads.map(({ data }) => {
                        const { data: publicUrlData } = supabase.storage.from('property-images').getPublicUrl(data.path);
                        return publicUrlData.publicUrl;
                    });
                    uploadedImageUrls = urlPromises;
                } else {
                     alert("فشل رفع الصور، يرجى المحاولة مرة أخرى.");
                     setIsUploading(false);
                     return;
                }
            } catch (error) {
                console.error("Error during image upload process:", error);
                alert("حدث خطأ أثناء رفع الصور.");
                setIsUploading(false);
                return;
            }
        }
        
        const propertyData = {
            title,
            description,
            price,
            area,
            bedrooms,
            bathrooms,
            floor,
            neighborhood,
            city: 'مدينة العاشر من رمضان',
            transaction_type: transactionType,
            contact_phone: contactPhone,
            images: uploadedImageUrls.length > 0 ? uploadedImageUrls : ['https://picsum.photos/seed/' + Date.now() + '/800/600'],
        };

        onSubmit(propertyData);
        // No need to set isUploading to false, as the parent component will close the modal and unmount this one.
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">إضافة عقار جديد</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700">عنوان الإعلان</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-slate-700">السعر (EGP)</label>
                    <input type="number" id="price" value={price} onChange={e => setPrice(Number(e.target.value))} required disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                </div>
                 <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-slate-700">رقم الهاتف للتواصل</label>
                    <input type="tel" id="contactPhone" value={contactPhone} onChange={e => setContactPhone(e.target.value)} required disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                </div>
                <div>
                    <label htmlFor="neighborhood" className="block text-sm font-medium text-slate-700">الحي / المجاورة</label>
                    <select id="neighborhood" value={neighborhood} onChange={e => setNeighborhood(e.target.value)} disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100">
                        {TENTH_OF_RAMADAN_NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="area" className="block text-sm font-medium text-slate-700">المساحة (م²)</label>
                    <input type="number" id="area" value={area} onChange={e => setArea(Number(e.target.value))} required disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                </div>
                 <div>
                    <label htmlFor="floor" className="block text-sm font-medium text-slate-700">الدور</label>
                    <input type="number" id="floor" value={floor} onChange={e => setFloor(Number(e.target.value))} required disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                </div>
                <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-slate-700">عدد غرف النوم</label>
                    <input type="number" id="bedrooms" min="1" value={bedrooms} onChange={e => setBedrooms(Number(e.target.value))} required disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                </div>
                <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-slate-700">عدد الحمامات</label>
                    <input type="number" id="bathrooms" min="1" value={bathrooms} onChange={e => setBathrooms(Number(e.target.value))} required disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                </div>
                
            </div>
             <div>
                <label htmlFor="transactionType" className="block text-sm font-medium text-slate-700">نوع المعاملة</label>
                <select id="transactionType" value={transactionType} onChange={e => setTransactionType(e.target.value as TransactionType)} disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100">
                    <option value={TransactionType.SALE}>للبيع</option>
                    <option value={TransactionType.RENT}>للإيجار</option>
                </select>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">وصف شامل للعقار</label>
                <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} required disabled={isUploading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100"></textarea>
            </div>
             <div>
                <label htmlFor="images" className="block text-sm font-medium text-slate-700">
                    صور العقار (يمكن اختيار أكثر من صورة)
                </label>
                <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    disabled={isUploading}
                    className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 disabled:opacity-50"
                />
            </div>

            <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                <button type="button" onClick={onCancel} disabled={isUploading} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200">
                    إلغاء
                </button>
                <button type="submit" disabled={isUploading} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400">
                    {isUploading ? 'جاري رفع الصور...' : 'حفظ العقار'}
                </button>
            </div>
        </form>
    );
};

export default PropertyForm;