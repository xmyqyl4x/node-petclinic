import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/style.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function OwnerDetails() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/owners/${id}`);
        if (!res.ok) throw new Error('Owner not found');
        const data = await res.json();
        setOwner(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOwner();
  }, [id]);

  if (error) return <div className="owners-container"><p className="no-results">{error}</p></div>;
  if (!owner) return <div className="owners-container"><p>Loading...</p></div>;

  return (
    <div className="owners-container">
      <h2>Owner Information</h2>

      <table className="owner-detail-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{owner.first_name} {owner.last_name}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{owner.address}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{owner.city}</td>
          </tr>
          <tr>
            <th>Telephone</th>
            <td>{owner.telephone}</td>
          </tr>
        </tbody>
      </table>

      <div className="form-actions" style={{ marginTop: '20px' }}>
        <Link to="/owners" className="btn-find">Back to Find Owners</Link>
      </div>
    </div>
  );
}

export default OwnerDetails;
