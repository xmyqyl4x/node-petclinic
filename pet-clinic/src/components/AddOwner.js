import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AddOwner() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    telephone: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.first_name || !form.last_name) {
      setError('First name and last name are required.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/owners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add owner');
      }

      // Navigate back to find owners and trigger a search to show all owners
      navigate('/owners?showAll=true');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="owners-container">
      <h2>New Owner</h2>

      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit} className="owner-form">
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input id="first_name" name="first_name" type="text" value={form.first_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input id="last_name" name="last_name" type="text" value={form.last_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input id="address" name="address" type="text" value={form.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input id="city" name="city" type="text" value={form.city} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="telephone">Telephone:</label>
          <input id="telephone" name="telephone" type="text" value={form.telephone} onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-find">Add Owner</button>
        </div>
      </form>
    </div>
  );
}

export default AddOwner;
