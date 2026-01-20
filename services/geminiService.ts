
import { GoogleGenAI } from "@google/genai";
import { ProductImage, ConfigOptions } from "../types";

export class GeminiService {
  private static instance: GeminiService;

  private constructor() {}

  static getInstance(): GeminiService {
    if (!this.instance) {
      this.instance = new GeminiService();
    }
    return this.instance;
  }

  async analyzeImages(images: ProductImage[]): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const imageParts = images.map(img => ({
      inlineData: {
        mimeType: img.file.type,
        data: img.base64
      }
    }));

    const prompt = `Analyze these ${images.length} specific product images. For each product, extract every detail: logos, text, packaging shape, and exact textures. Your goal is to provide a reference for an exact reconstruction. Describe them with technical precision so a generator can replicate them without any creative deviation.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [...imageParts, { text: prompt }] },
    });

    return response.text || "Failed to analyze products.";
  }

  async generateComposite(
    images: ProductImage[],
    analysisSummary: string, 
    config: ConfigOptions,
    onProgress: (status: string) => void
  ): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    onProgress("Synthesizing Reference Data...");
    
    const imageParts = images.map(img => ({
      inlineData: {
        mimeType: img.file.type,
        data: img.base64
      }
    }));

    const masterPrompt = `
      STRICT INSTRUCTION: I am attaching ${images.length} source images. Use these EXACT products to create a professional studio flat-lay. 
      
      DO NOT ALTER: 
      - Do not change any logos, text, or branding.
      - Do not modify product shapes or proportions.
      - Do not "hallucinate" new details or labels. 
      - The products in the final image MUST be exact recreations of the ones provided in the source images.
      
      PRODUCT DESCRIPTIONS FROM ANALYSIS:
      ${analysisSummary}
      
      COMPOSITION & ART DIRECTION:
      - Backdrop: ${config.backdropColor} with ${config.surfaceFinish}
      - Layout Arrangement: ${config.layoutStyle}
      - Product Hierarchy: ${config.productHierarchy}
      - Camera Perspective: ${config.perspectiveView}
      - Lighting Source: ${config.lightPosition}
      - Shadow Detail: ${config.shadowStyle}
      - Lighting Mood: ${config.lightingMood}
      - Color Grading: ${config.colorGrading}
      
      TECHNICAL REQUIREMENTS:
      - Aspect Ratio: ${config.aspectRatio}
      - Style: High-end commercial product photography.
      - Use the provided source images as the ONLY reference for the products themselves.
    `;

    onProgress("Rendering Identical Recreations...");

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [...imageParts, { text: masterPrompt }] },
        config: {
          imageConfig: {
            aspectRatio: config.aspectRatio
          }
        }
      });

      let imageUrl = "";
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (!imageUrl) throw new Error("No image was generated in the response.");
      
      return imageUrl;
    } catch (error: any) {
      throw error;
    }
  }
}
