# 🎨 Frontend - Course Recommender System

The frontend for the Course Recommender System, built with **React (+Vite)** and styled with **Tailwind CSS**. It features a modern, premium **Glassmorphism** design with smooth animations and a responsive layout.

## ✨ Key Features

- **Premium UI**: Deep dark theme (`#0a0a0f`) with glass-effect cards and vibrant gradients.
- **Global Layout**: Unified navigation and animated background across all pages.
- **Dynamic Animations**: Custom keyframe animations for floating elements, glowing pulses, and fade-in effects.
- **Resume Upload**: Drag-and-drop interface for parsing resumes via the backend.
- **Interactive Roadmap**: Visual career timeline with progress tracking.
- **Course Recommendations**: filtering and sorting for suggested courses.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (bootstrapped with [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: Lucide React / Heroicons (via SVG/Component)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## 📂 Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── AnimatedBackground.jsx  # Global background effect
│   ├── GlobalLayout.jsx        # Wrapper for Nav/Footer/Content
│   ├── Navbar.jsx              # Responsive navigation
│   └── CourseCard.jsx          # Glass-styled course display
├── pages/              # Route components
│   ├── Home.jsx                # Landing page
│   ├── UploadResume.jsx        # Parse resume & set goals
│   ├── Recommendations.jsx     # View results
│   └── Roadmap.jsx             # Career timeline
├── App.jsx             # Main routing setup
└── index.css           # Global styles & Tailwind directives
```

## 🎨 Styling & Theming

The project uses a custom Tailwind configuration. Key styles include:

-   **Background**: `#0a0a0f` (Deep Space)
-   **Glass Effect**: `backdrop-blur-md bg-white/10 border-white/20`
-   **Animations**:
    -   `animate-float`: Floating background orbs.
    -   `animate-fade-in`: Smooth entry for page content.

To modify the theme, check `index.css` for CSS variables and `tailwind.config.js`.

## 🔌 API Integration

The frontend communicates with the backend API Gateway (running on port 5000) for:
-   `/api/recommend`: sending PDFs and receiving course data.
-   `/api/roadmap`: generating career paths.
