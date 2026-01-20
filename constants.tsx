
import { ConfigOptions } from './types';

export const BACKDROP_COLORS = [
  { label: 'Matte Cool Slate Grey (#DCE1E6)', value: 'Matte Cool Slate Grey (#DCE1E6)' },
  { label: 'Warm Beige (#E8DCC8)', value: 'Warm Beige (#E8DCC8)' },
  { label: 'Soft White (#F5F5F5)', value: 'Soft White (#F5F5F5)' },
  { label: 'Charcoal (#3A3A3A)', value: 'Charcoal (#3A3A3A)' },
  { label: 'Light Blue (#D4E6F1)', value: 'Light Blue (#D4E6F1)' },
];

export const LAYOUT_STYLES = [
  { label: 'Asymmetrical 3-Column Balance', value: 'Asymmetrical 3-Column Balance' },
  { label: 'Symmetrical Grid (2x2/2x3)', value: 'Symmetrical Grid (2x2/2x3)' },
  { label: 'Diagonal Cascade', value: 'Diagonal Cascade' },
  { label: 'Linear Horizontal Alignment', value: 'Linear Horizontal Alignment' },
  { label: 'Organic Free-Form Arrangement', value: 'Organic Free-Form Arrangement' },
];

export const PRODUCT_HIERARCHIES = [
  { label: 'Hero Item Centered', value: 'Hero Item Centered' },
  { label: 'Heaviest Items in Corners', value: 'Heaviest Items in Corners' },
  { label: 'Largest Item Top-Left', value: 'Largest Item Top-Left' },
  { label: 'Equal Visual Weight Distribution', value: 'Equal Visual Weight Distribution' },
];

export const PERSPECTIVE_VIEWS = [
  { label: 'Orthographic Top-Down (90°)', value: 'Orthographic Top-Down (90°)' },
  { label: 'Slight Angle (15° tilt)', value: 'Slight Angle (15° tilt)' },
  { label: '45° Angled View', value: '45° Angled View' },
  { label: 'Three-Quarter Perspective', value: 'Three-Quarter Perspective' },
];

export const LIGHT_POSITIONS = [
  { label: 'Top-Left Overhead', value: 'Top-Left Overhead' },
  { label: 'Top-Center Overhead', value: 'Top-Center Overhead' },
  { label: 'Top-Right Overhead', value: 'Top-Right Overhead' },
  { label: 'Diffused (No Clear Direction)', value: 'Diffused (No Clear Direction)' },
];

export const SHADOW_STYLES = [
  { label: 'Soft Contact Shadows', value: 'Soft Contact Shadows (15-20px blur, 25% opacity)' },
  { label: 'Subtle Shadows', value: 'Subtle Shadows (5-10px blur, 15% opacity)' },
  { label: 'Prominent Shadows', value: 'Prominent Shadows (25-30px blur, 40% opacity)' },
  { label: 'No Shadows', value: 'No Shadows (Completely Flat)' },
];

export const LIGHTING_MOODS = [
  { label: 'Professional Studio (5600K)', value: 'Professional Studio (5600K, Medium-Low Contrast)' },
  { label: 'Bright & Airy (6500K)', value: 'Bright & Airy (6500K, High Contrast)' },
  { label: 'Warm & Inviting (4500K)', value: 'Warm & Inviting (4500K, Low Contrast)' },
  { label: 'Premium Luxury (5800K)', value: 'Premium Luxury (5800K, Medium Contrast with Lifted Blacks)' },
  { label: 'Natural Daylight (5500K)', value: 'Natural Daylight (5500K, Medium Contrast)' },
];

export const SURFACE_FINISHES = [
  { label: 'Matte with Fine Grain', value: 'Matte with Fine Grain' },
  { label: 'Smooth Matte', value: 'Smooth Matte' },
  { label: 'Subtle Texture (Linen)', value: 'Subtle Texture (Linen)' },
  { label: 'Glossy/Reflective', value: 'Glossy/Reflective' },
  { label: 'Paper/Canvas Texture', value: 'Paper/Canvas Texture' },
];

export const ASPECT_RATIOS = [
  { label: '3:4 (Vertical)', value: '3:4' },
  { label: '4:3 (Horizontal)', value: '4:3' },
  { label: '1:1 (Square)', value: '1:1' },
  { label: '16:9 (Widescreen)', value: '16:9' },
];

export const COLOR_GRADING = [
  { label: 'Natural & Authentic', value: 'Natural & Authentic' },
  { label: 'Vibrant & Saturated', value: 'Vibrant & Saturated' },
  { label: 'Desaturated & Minimal', value: 'Desaturated & Minimal' },
  { label: 'Warm & Vintage', value: 'Warm & Vintage' },
  { label: 'Cool & Modern', value: 'Cool & Modern' },
];

export const DEFAULT_CONFIG: ConfigOptions = {
  backdropColor: BACKDROP_COLORS[0].value,
  layoutStyle: LAYOUT_STYLES[0].value,
  productHierarchy: PRODUCT_HIERARCHIES[0].value,
  perspectiveView: PERSPECTIVE_VIEWS[0].value,
  lightPosition: LIGHT_POSITIONS[0].value,
  shadowStyle: SHADOW_STYLES[0].value,
  lightingMood: LIGHTING_MOODS[0].value,
  surfaceFinish: SURFACE_FINISHES[0].value,
  aspectRatio: "3:4",
  colorGrading: COLOR_GRADING[0].value,
};
