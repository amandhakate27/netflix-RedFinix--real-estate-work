import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ShowProperty from './pages/ShowProperty.jsx';
import ScheduleBooking from './pages/ScheduleBooking.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import Schedule from './pages/Schedule.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/show-property" element={<ShowProperty />} />
      <Route path="/schedule-booking" element={<ScheduleBooking />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
);

export default App;
