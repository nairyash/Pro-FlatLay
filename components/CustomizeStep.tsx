
import React from 'react';
import { ConfigOptions, ProductImage } from '../types';
import * as Constants from '../constants';

interface CustomizeStepProps {
  config: ConfigOptions;
  setConfig: React.Dispatch<React.SetStateAction<ConfigOptions>>;
  images: ProductImage[];
  onBack: () => void;
  onNext: () => void;
}

const CustomizeStep: React.FC<CustomizeStepProps> = ({ config, setConfig, images, onBack, onNext }) => {
  const handleChange = (key: keyof ConfigOptions, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const formFields = [
    { label: 'Backdrop Color', key: 'backdropColor', options: Constants.BACKDROP_COLORS, desc: 'Background surface color for composition.' },
    { label: 'Layout Style', key: 'layoutStyle', options: Constants.LAYOUT_STYLES, desc: 'Positioning of products relative to each other.' },
    { label: 'Product Hierarchy', key: 'productHierarchy', options: Constants.PRODUCT_HIERARCHIES, desc: 'Determines the focal point item.' },
    { label: 'Perspective View', key: 'perspectiveView', options: Constants.PERSPECTIVE_VIEWS, desc: 'Camera angle and viewpoint.' },
    { label: 'Light Position', key: 'lightPosition', options: Constants.LIGHT_POSITIONS, desc: 'Direction of main overhead lighting.' },
    { label: 'Shadow Style', key: 'shadowStyle', options: Constants.SHADOW_STYLES, desc: 'Pronouncement of contact shadows.' },
    { label: 'Lighting Mood', key: 'lightingMood', options: Constants.LIGHTING_MOODS, desc: 'Color temperature and contrast.' },
    { label: 'Surface Finish', key: 'surfaceFinish', options: Constants.SURFACE_FINISHES, desc: 'Tactile quality of backdrop surface.' },
    { label: 'Aspect Ratio', key: 'aspectRatio', options: Constants.ASPECT_RATIOS, desc: 'Final output dimensions.' },
    { label: 'Color Grading', key: 'colorGrading', options: Constants.COLOR_GRADING, desc: 'Post-processing aesthetic grading.' },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
      {/* Form Area */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 border-r border-slate-100">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">Composition Control</h2>
            <p className="text-slate-500 text-sm">Fine-tune the photorealistic generation parameters.</p>
          </div>

          <div className="space-y-8">
            {formFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 uppercase tracking-wide">{field.label}</label>
                  <span className="text-[10px] text-slate-400 font-medium">CONFIG.{field.key.toUpperCase()}</span>
                </div>
                <select
                  value={(config as any)[field.key]}
                  onChange={(e) => handleChange(field.key as any, e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundSize: '1rem' }}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 leading-relaxed italic">{field.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex gap-4 border-t border-slate-100 pt-8">
            <button
              onClick={onBack}
              className="flex-1 px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
            >
              Back
            </button>
            <button
              onClick={onNext}
              className="flex-[2] px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg"
            >
              Confirm & Generate Composite
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar / Preview Area */}
      <div className="hidden lg:flex w-80 xl:w-96 flex-col bg-slate-50 p-8 overflow-y-auto">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Current Selection</h3>
        
        <div className="space-y-4 mb-10">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-tight">Active Assets</div>
            <div className="flex -space-x-2 overflow-hidden">
              {images.map((img) => (
                <img 
                  key={img.id} 
                  src={img.url} 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
                  alt="" 
                />
              ))}
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 ring-2 ring-white text-[10px] font-bold text-slate-400">
                +{images.length}
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-tight">Environment Spec</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Color</span>
                <span className="text-slate-900 font-medium truncate ml-4">{config.backdropColor.split('(')[0]}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Shadows</span>
                <span className="text-slate-900 font-medium">{config.shadowStyle.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Output</span>
                <span className="text-slate-900 font-medium">HD {config.aspectRatio}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white">
          <h4 className="text-sm font-bold mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pro Tips
          </h4>
          <ul className="text-xs text-slate-400 space-y-3 list-disc pl-4">
            <li>Choose <strong>Orthographic Top-Down</strong> for the most professional "flat-lay" look.</li>
            <li><strong>Hero Item Centered</strong> works best for singular product launches.</li>
            <li>Matte finishes produce the most natural contact shadows.</li>
            <li>Use <strong>Vibrant & Saturated</strong> for social media ads.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomizeStep;
