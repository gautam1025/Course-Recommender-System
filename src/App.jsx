// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import UploadResume from "./pages/UploadResume";
// import Recommendations from "./pages/Recommendations";
// import About from "./pages/About" ;
// import HowItWorks from "./pages/HowItWorks";
// import Roadmap from "./pages/Roadmap";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/upload" element={<UploadResume />} />
//         <Route path="/recommend" element={<Recommendations />} />
//         <Route path="/roadmap" element={<Roadmap />} />
//         <Route path ="/about" element={<About />} />
//         <Route path="/how-it-works" element={<HowItWorks />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// src/App.jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UploadResume from "./pages/UploadResume";
import Recommendations from "./pages/Recommendations";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Roadmap from "./pages/Roadmap";
import bgImage from "./assets/bg.webp";

function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed text-white flex flex-col"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <Navbar />

        <main className="w-full h-full flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/recommend" element={<Recommendations />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
