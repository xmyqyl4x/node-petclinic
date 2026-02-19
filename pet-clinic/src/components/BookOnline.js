import React, { useEffect, useState } from 'react';
import '../assets/style.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const initialFormData = {
  pet_name: '',
  pet_type: '',
  email: '',
  service_type: '',
  doctor: '',
  appointment_date: '',
  appointment_time: '',
  reminder: false
};

function BookOnline() {
  const [formData, setFormData] = useState(initialFormData);
  const [reservations, setReservations] = useState([]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const loadReservations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reservations`);
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setReservations(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      await response.json();
      alert('Reservation submitted successfully!');
      setFormData(initialFormData);
      loadReservations();
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert(`Error submitting reservation: ${error.message}`);
    }
  };

  return (
    <section id="book-online">
      <div className="book-online-text">
        <h2>Book Online</h2>
        <p>Schedule an online consultation with one of our veterinarians for personalized advice and care.</p>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="pet_name">Pet's Name:</label>
            <input type="text" id="pet_name" name="pet_name" required className="form-control" value={formData.pet_name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pet_type">Pet's Type:</label>
            <select id="pet_type" name="pet_type" required className="form-control" value={formData.pet_type} onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required className="form-control" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="service_type">Service Type:</label>
            <select id="service_type" name="service_type" className="form-control" value={formData.service_type} onChange={handleChange}>
              <option value="">--Please choose a service--</option>
              <option value="consultation">Consultation</option>
              <option value="spa_treatment">Spa Treatment</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="doctor">Preferred Doctor:</label>
            <select id="doctor" name="doctor" className="form-control" value={formData.doctor} onChange={handleChange}>
              <option value="">--Please choose a doctor--</option>
              <option value="dr_smith">Dr. Smith</option>
              <option value="dr_jones">Dr. Jones</option>
              <option value="dr_jackob">Dr. Jackob</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="appointment_date">Appointment Date:</label>
            <input
              type="date"
              id="appointment_date"
              name="appointment_date"
              required
              className="form-control"
              value={formData.appointment_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointment_time">Appointment Time:</label>
            <input
              type="time"
              id="appointment_time"
              name="appointment_time"
              required
              className="form-control"
              value={formData.appointment_time}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reminder">Set Appointment Reminder:</label>
            <input
              type="checkbox"
              id="reminder"
              name="reminder"
              className="form-check-input"
              checked={formData.reminder}
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Book Appointment" className="btn btn-primary book-button" />
        </form>

        {reservations.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h3>Recent Reservations</h3>
            <ul>
              {reservations.map((reservation) => (
                <li key={reservation.id}>
                  {reservation.pet_name} ({reservation.pet_type}) - {reservation.appointment_date}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default BookOnline;
