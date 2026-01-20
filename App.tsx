
import React, { useState } from 'react';
import { Step, ProductImage, ConfigOptions } from './types';
import { DEFAULT_CONFIG } from './constants';
import UploadStep from './components/UploadStep';
import CustomizeStep from './components/CustomizeStep';
import GenerateStep from './components/GenerateStep';
import StepHeader from './components/StepHeader';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.UPLOAD);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [config, setConfig] = useState<ConfigOptions>(DEFAULT_CONFIG);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, Step.GENERATE));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, Step.UPLOAD));
  const restart = () => {
    setImages([]);
    setConfig(DEFAULT_CONFIG);
    setCurrentStep(Step.UPLOAD);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">ProFlatLay</h1>
            <p className="text-slate-500 text-sm mt-1">Product Composite Generator</p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Professional Grade
            </span>
          </div>
        </div>
        
        <StepHeader currentStep={currentStep} />
      </header>

      <main className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
        {currentStep === Step.UPLOAD && (
          <UploadStep 
            images={images} 
            setImages={setImages} 
            onNext={nextStep} 
          />
        )}
        {currentStep === Step.CUSTOMIZE && (
          <CustomizeStep 
            config={config} 
            setConfig={setConfig} 
            onBack={prevStep} 
            onNext={nextStep} 
            images={images}
          />
        )}
        {currentStep === Step.GENERATE && (
          <GenerateStep 
            images={images} 
            config={config} 
            onRestart={restart} 
            onRegenerate={() => setCurrentStep(Step.CUSTOMIZE)}
            onKeyMissing={() => {}} // No longer needed
          />
        )}
      </main>

      <footer className="mt-8 py-6 border-t border-slate-200 text-center text-slate-400 text-xs">
        <p>© 2024 ProFlatLay AI Solutions. All rights reserved.</p>
        <p className="mt-1">Generated images are high-fidelity AI composites based on user inputs.</p>
      </footer>
    </div>
  );
};

export default App;
