import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalLayout from "./components/GlobalLayout";
import Home from "./pages/Home";
import UploadResume from "./pages/UploadResume";
import Recommendations from "./pages/Recommendations";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Roadmap from "./pages/Roadmap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/recommend" element={<Recommendations />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
