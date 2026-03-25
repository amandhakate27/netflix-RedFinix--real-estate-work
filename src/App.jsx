import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/schedule" element={<Home />} />
      <Route path="/about" element={<Home />} />
      <Route path="/contact" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default App;
