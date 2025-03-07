import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeR from "./pages/HomeR.jsx";
import Resultados from "./pages/Resultados.jsx";
import HomeC from "./pages/HomeC.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HomeR" element={<HomeR />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/HomeC" element={<HomeC />} />
      </Routes>
    </Router>
  );
}

export default App;

