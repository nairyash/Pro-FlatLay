# 📸 ProFlatLay

**AI Product Composite Generator**

ProFlatLay is a sophisticated web application designed for e-commerce owners, marketing professionals, and photographers. It leverages the power of the Google Gemini 2.5 API to transform individual product shots into high-end, professional studio "flat-lay" composites while strictly preserving original product identity.

---

## ✨ Key Features

- **Zero-Deviation Identity Locking:** Unlike standard AI generators that might "hallucinate" logos or text, ProFlatLay uses advanced reference mapping to ensure your product's branding remains 100% authentic.

- **Multi-Asset Composition:** Upload 4-6 individual product images and watch the AI arrange them into a cohesive commercial scene.

- **Granular Art Direction:**
  - **Backdrop Selection:** Choose from slate grey, warm beige, charcoal, and more.
  - **Layout Styles:** From asymmetrical balance to organic free-form arrangements.
  - **Lighting Moods:** Professional studio (5600K), Bright & Airy, or Premium Luxury settings.
  - **Perspective Control:** Orthographic top-down or angled views.

- **High-Fidelity Rendering:** Generates clean, photorealistic images optimized for social media and web storefronts.

- **Responsive UX:** A modern, multi-step interface built with Tailwind CSS and Inter typography.

---

## 🚀 Tech Stack

- **Frontend:** React 19 (ES6+ Modules)
- **Styling:** Tailwind CSS (Utility-first)
- **AI Integration:** @google/genai (Gemini 2.5 Flash)
- **Language:** TypeScript
- **Icons/UI:** SVG-based custom components

---

## 🛠️ Getting Started

### Prerequisites

- A Google AI Studio API Key
- A modern web browser with ESM support

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/proflatlay.git
   cd proflatlay
   ```

2. **Configure your environment:** The application expects your Gemini API key to be available in the execution environment. If you are running this in a local development environment, ensure `process.env.API_KEY` is set.

3. **Run the application:** Since the project uses a modular index.html structure with importmap, you can serve it using any local static file server:
   ```bash
   # Example using Python
   python -m http.server 8000

   # Or using live-server
   live-server
   ```

---

## 📖 Usage Guide

1. **Upload Assets:** Drag and drop 4 to 6 high-quality product images (transparent backgrounds or clean shots work best).

2. **Analyze Identity:** The AI automatically scans your products for logos, textures, and branding markers.

3. **Customize Scene:** Use the "Composition Control" panel to select your backdrop, surface finish, lighting, and shadow depth.

4. **Generate:** Click "Confirm & Generate." The AI will synthesize the references and produce a final photorealistic composite.

5. **Download:** Export your final high-resolution render for your marketing materials.

---

## 🧠 Technical Overview: "Identity Locking"

One of the core challenges in AI image generation is maintaining the integrity of text and logos. ProFlatLay solves this by:

1. **Dual-Phase Analysis:** First, a gemini-3-flash pass extracts technical branding metadata.

2. **Direct Reference Injection:** The source images are injected directly into the generation prompt of gemini-2.5-flash-image with strict system instructions to "use provided assets only."

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ for e-commerce professionals
