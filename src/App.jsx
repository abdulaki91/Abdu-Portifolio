import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Hero";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/hero" element={<HeroSection />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route
            path="*"
            element={<div className="text-center ">404 Not Found</div>}
          />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}
