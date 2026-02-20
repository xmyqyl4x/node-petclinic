import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { datadogLogs } from '@datadog/browser-logs';
import '../assets/style.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function FindOwners() {
  const [lastName, setLastName] = useState('');
  const [owners, setOwners] = useState([]);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleFind = async (e) => {
    e.preventDefault();
    const query = lastName ? `?lastName=${encodeURIComponent(lastName)}` : '';
    datadogLogs.logger.info('Owner search initiated', {
      search_term: lastName || '(all)',
      url: `${API_BASE}/api/owners${query}`,
    });
    try {
      const res = await fetch(`${API_BASE}/api/owners${query}`);
      const data = await res.json();
      setOwners(data);
      setSearched(true);
      datadogLogs.logger.info('Owner search completed', {
        search_term: lastName || '(all)',
        results_count: data.length,
        http_status: res.status,
      });
    } catch (err) {
      datadogLogs.logger.error('Owner search failed', {
        search_term: lastName || '(all)',
        error: err.message,
      });
    }
  };

  return (
    <div className="owners-container">
      <h2>Find Owners</h2>

      <form onSubmit={handleFind} className="find-form">
        <div className="form-row">
          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-find">Find Owner</button>
          <button type="button" className="btn-add" onClick={() => navigate('/owners/add')}>
            Add Owner
          </button>
        </div>
      </form>

      {searched && (
        <div className="owners-results">
          {owners.length === 0 ? (
            <p className="no-results">No owners found.</p>
          ) : (
            <table className="owners-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Telephone</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner) => (
                  <tr key={owner.id} onClick={() => navigate(`/owners/${owner.id}`)} className="owner-row">
                    <td className="owner-name-link">{owner.first_name} {owner.last_name}</td>
                    <td>{owner.address}</td>
                    <td>{owner.city}</td>
                    <td>{owner.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default FindOwners;
