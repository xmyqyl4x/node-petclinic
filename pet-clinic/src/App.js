import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import FindOwners from './components/FindOwners';
import OwnerDetails from './components/OwnerDetails';
import AddOwner from './components/AddOwner';
import './assets/style.css';
import { Route, Routes } from 'react-router-dom';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/owners" element={<FindOwners />} />
          <Route path="/owners/add" element={<AddOwner />} />
          <Route path="/owners/:id" element={<OwnerDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
