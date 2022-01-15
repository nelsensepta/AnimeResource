import { Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Popular from "./pages/Songs";
import Songs from "./pages/Songs";
import Quotes from "./pages/Quotes";
// import "swiper/css";
import Details from "./pages/Details";
// import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Popular" element={<Popular />} />
      <Route path="Songs" element={<Songs />} />
      <Route path="Quotes" element={<Quotes />} />
      <Route path="anime/:slug" element={<Details />} />
    </Routes>
  );
}

export default App;
