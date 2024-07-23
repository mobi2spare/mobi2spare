import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './requestview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getToken } from '../../tokenutility';

const RequestView = () => {
  const [buyerId, setBuyerId] = useState('');
  const [requests, setRequests] = useState({ myRequests: [], otherRequests: [] });
  const [error, setError] = useState('');
  const fetchRequests = async (id) => {
    try {
      const token=getToken();
      const response = await axios.get(`http://localhost:8800/api/requests/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch requests. Please try again.');
    }
  };

  useEffect(() => {
    fetchRequests(1);
  }, []);

  const handleSearch = () => {
    if (buyerId) {
      fetchRequests(buyerId);
    }
  };

  return (
    <div className="request-management">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Buyer ID"
          value={buyerId}
          onChange={(e) => setBuyerId(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="requests-container">
        <div className="requests">
          <h2>My Requests</h2>
          {requests.myRequests.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Model</th>
                </tr>
              </thead>
              <tbody>
                {requests.myRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.cname}</td>
                    <td>{request.bname}</td>
                    <td>{request.mname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests found.</p>
          )}
        </div>
        <div className="requests">
          <h2>Other Requests</h2>
          {requests.otherRequests.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Model</th>
                </tr>
              </thead>
              <tbody>
                {requests.otherRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.cname}</td>
                    <td>{request.bname}</td>
                    <td>{request.mname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestView;
