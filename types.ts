
export enum Step {
  UPLOAD = 0,
  CUSTOMIZE = 1,
  GENERATE = 2
}

export interface ProductImage {
  id: string;
  url: string;
  base64: string;
  file: File;
}

export interface ConfigOptions {
  backdropColor: string;
  layoutStyle: string;
  productHierarchy: string;
  perspectiveView: string;
  lightPosition: string;
  shadowStyle: string;
  lightingMood: string;
  surfaceFinish: string;
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
  colorGrading: string;
}

export interface GenerationState {
  isAnalyzing: boolean;
  isGenerating: boolean;
  progress: string;
  resultUrl?: string;
  error?: string;
  metadata?: {
    resolution: string;
    fileSize: string;
    timestamp: string;
  };
}
