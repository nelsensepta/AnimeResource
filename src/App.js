import { Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
// import Popular from "./pages/Songs";
import Songs from "./pages/Songs";
import Favorites from "./pages/Favorites";
import Quotes from "./pages/Quotes";
import Details from "./pages/Details";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="songs" element={<Songs />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="anime/:slug" element={<Details />} />
      </Routes>
    </Layout>
  );
}

export default App;
