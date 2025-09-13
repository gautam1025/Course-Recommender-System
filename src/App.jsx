import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadResume from "./pages/UploadResume";
import Recommendations from "./pages/Recommendations";
import About from "./pages/About" ;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/recommend" element={<Recommendations />} />
        <Route path ="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
