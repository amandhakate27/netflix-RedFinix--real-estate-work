import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ShowProperty from './pages/ShowProperty.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/show-property" element={<ShowProperty />} />
      <Route path="/schedule" element={<Home />} />
      <Route path="/about" element={<Home />} />
      <Route path="/contact" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default App;
