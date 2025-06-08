import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Information from './pages/Information'
import Navbar from './common/Navbar'
import Footer from './common/Footer'
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import BookingConfirmation from './components/BookingConfirmation';
function App() {
  return (
    <div className="App container">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/booking" element={<Information/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/booking-confirmation" element={<BookingConfirmation/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;