import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookOnline from './components/BookOnline';
import Locations from './components/Locations';
import Footer from './components/Footer';
import './assets/style.css';
import { Route, Routes } from 'react-router-dom';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
      <div className="App">
        <Navbar />
        <Home />
        <BookOnline/>
        <Locations />
        <Footer />
        <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
  );
}

export default App;
