
import React, { useRef, useState } from 'react';
import { ProductImage } from '../types';

interface UploadStepProps {
  images: ProductImage[];
  setImages: React.Dispatch<React.SetStateAction<ProductImage[]>>;
  onNext: () => void;
}

const UploadStep: React.FC<UploadStepProps> = ({ images, setImages, onNext }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files: File[]) => {
    setError(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const newImages: ProductImage[] = [];
    
    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Please upload JPG, PNG, or WebP.`);
        continue;
      }
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}. Max size is 10MB.`);
        continue;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setImages(prev => {
          if (prev.length >= 6) return prev;
          const next = [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            url: reader.result as string,
            base64,
            file
          }];
          return next;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const isReady = images.length >= 4 && images.length <= 6;

  return (
    <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Upload Product Assets</h2>
          <p className="text-slate-500">Upload 4-6 high-quality individual product shots to compose your flat-lay.</p>
        </div>

        {/* Upload Zone */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-slate-400 transition-colors cursor-pointer bg-slate-50/50"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            processFiles(Array.from(e.dataTransfer.files));
          }}
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            multiple 
            accept="image/jpeg,image/png,image/webp" 
            onChange={handleFileChange}
          />
          <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-slate-900 font-medium">Click to browse or drag and drop</p>
          <p className="text-slate-500 text-sm mt-1">PNG, JPG or WebP (Max 10MB each)</p>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-start">
             <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
             </svg>
             {error}
          </div>
        )}

        {/* Thumbnails */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
              <img src={img.url} alt="Product preview" className="w-full h-full object-cover" />
              <button 
                onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                className="absolute top-1 right-1 p-1 bg-white/90 backdrop-blur rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          {Array.from({ length: Math.max(0, 6 - images.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square rounded-xl border-2 border-dotted border-slate-100 flex items-center justify-center text-slate-200">
              <span className="text-2xl font-light">{images.length + i + 1}</span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
          <div className="text-sm text-slate-500">
            {images.length < 4 ? (
              <span>Add <span className="font-bold text-slate-700">{4 - images.length}</span> more images to proceed</span>
            ) : (
              <span className="text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Upload requirement met ({images.length} images)
              </span>
            )}
          </div>
          <button
            onClick={onNext}
            disabled={!isReady}
            className={`px-8 py-3 rounded-xl font-semibold transition-all shadow-lg ${
              isReady 
                ? 'bg-slate-900 text-white hover:bg-slate-800' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            Continue to Customization
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadStep;
