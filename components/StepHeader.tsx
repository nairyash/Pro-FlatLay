
import React from 'react';
import { Step } from '../types';

interface StepHeaderProps {
  currentStep: Step;
}

const StepHeader: React.FC<StepHeaderProps> = ({ currentStep }) => {
  const steps = [
    { id: Step.UPLOAD, label: '01: Upload Images', description: 'Select 4-6 products' },
    { id: Step.CUSTOMIZE, label: '02: Customize', description: 'Composition rules' },
    { id: Step.GENERATE, label: '03: Generate', description: 'AI Rendering' },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        {steps.map((s) => (
          <div 
            key={s.id} 
            className={`flex flex-col flex-1 items-start px-2 ${
              s.id === currentStep ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              s.id <= currentStep ? 'text-slate-900' : 'text-slate-400'
            }`}>
              {s.label}
            </span>
            <span className="text-[10px] text-slate-500 font-medium hidden sm:block">
              {s.description}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-slate-900 transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default StepHeader;
