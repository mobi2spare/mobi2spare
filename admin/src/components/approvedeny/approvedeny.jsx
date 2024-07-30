// src/components/approvedeny/TempRequestsTable.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the configured Axios instance
import './approvedeny.css';
import { API_ENDPOINTS } from '../../constants'; // Import API endpoints

const TempRequestsTable = () => {
  const [tempRequests, setTempRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchTempRequests = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_EMP_REQ);

        if (response.data.success) {
          const sortedData = response.data.data.sort((a, b) => {
            const statusOrder = { 'Pending': 1, 'Rejected': 2, 'Approved': 3 };
            return statusOrder[a.request_status] - statusOrder[b.request_status];
          });

          const requestsWithNames = await Promise.all(sortedData.map(async (request) => {
            const [brandResponse, categoryResponse, attributeResponse, buyerResponse] = await Promise.all([
              axiosInstance.get(`${API_ENDPOINTS.BRANDS}${request.brand_id}`),
              axiosInstance.get(`${API_ENDPOINTS.CATEGORY}${request.category_id}`),
              axiosInstance.get(`/attribute/getvalue/${request.attribute_value_id}`), // Endpoint seems specific
              axiosInstance.get(`${API_ENDPOINTS.USERS}${request.seller_id}`)
            ]);

            return {
              ...request,
              brand_name: brandResponse.data.data.name || 'Unknown Brand',
              category_name: categoryResponse.data.data[0].name || 'Unknown Category',
              attribute_value: attributeResponse.data.data.value || 'Unknown Attribute',
              buyer_name: buyerResponse.data.username || 'Unknown Buyer'
            };
          }));

          setTempRequests(requestsWithNames);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized request. Please check your token.');
        } else {
          setError('Error fetching data: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTempRequests();
  }, []);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleApprove = async (request) => {
    try {
      const model_name = request.model_id ? '' : request.model_name;
      const ram_storage_name = request.ram_storage_id ? '' : request.ram_storage_config;

      if ((model_name === '' && !request.model_id) || (model_name !== '' && request.model_id)) {
        alert('Model name and model ID constraints are not met.');
        return;
      }

      if ((ram_storage_name === '' && !request.ram_storage_id) || (ram_storage_name !== '' && request.ram_storage_id)) {
        alert('RAM storage config and RAM storage ID constraints are not met.');
        return;
      }

      const response = await axiosInstance.post(`${API_ENDPOINTS.APPROVE_PRODUCT}${request.request_id}`, {
        brand_id: request.brand_id,
        category_id: request.category_id,
        quantity: request.quantity,
        description: request.description,
        price: request.price,
        seller_id: request.seller_id,
        attribute_value_id: request.attribute_value_id,
        model_id: request.model_id,
        ram_storage_id: request.ram_storage_id,
        model_name: model_name,
        ram_storage_name: ram_storage_name
      });

      if (response.data.success) {
        setTempRequests(prevRequests =>
          prevRequests.map(r =>
            r.request_id === request.request_id ? { ...r, request_status: 'Approved' } : r
          )
        );
      } else {
        alert('Failed to approve request');
      }
    } catch (error) {
      alert('Error approving request: ' + error.message);
    }
  };

  const handleDeny = async (request) => {
    try {
      const response = await axiosInstance.post(`${API_ENDPOINTS.DENY_PRODUCT}${request.request_id}`);

      if (response.data.success) {
        setTempRequests(prevRequests =>
          prevRequests.map(r =>
            r.request_id === request.request_id ? { ...r, request_status: 'Rejected' } : r
          )
        );
      } else {
        alert('Failed to deny request');
      }
    } catch (error) {
      alert('Error denying request: ' + error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="temp-requests">
      <button className="description-btn" onMouseEnter={toggleDescription} onMouseLeave={toggleDescription}>
        Description
      </button>
      {showDescription && (
        <div className="description-popup">
          <ul>
            <li><strong>RI</strong>: Request ID</li>
            <li><strong>BI</strong>: Brand Name</li>
            <li><strong>CI</strong>: Category Name</li>
            <li><strong>quan</strong>: Quantity</li>
            <li><strong>desc</strong>: Description</li>
            <li><strong>SI</strong>: Seller ID</li>
            <li><strong>Price</strong>: Price</li>
            <li><strong>MN</strong>: Model Name</li>
            <li><strong>RSC</strong>: RAM Storage Config</li>
            <li><strong>MI</strong>: Model ID</li>
            <li><strong>RSI</strong>: RAM Storage ID</li>
            <li><strong>AI</strong>: Admin ID</li>
            <li><strong>AVI</strong>: Attribute Value IDs</li>
            <li><strong>Request Status</strong>: Request Status</li>
          </ul>
        </div>
      )}
      <table className="requests-table">
        <thead>
          <tr>
            <th>RI</th>
            <th>Brand Name</th>
            <th>Category Name</th>
            <th>quan</th>
            <th>desc</th>
            <th>BN</th>
            <th>Price</th>
            <th>MN</th>
            <th>RSC</th>
            <th>Request Status</th>
            <th>Att Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tempRequests.map(request => (
            <tr key={request.request_id}>
              <td>{request.request_id || 'null'}</td>
              <td>{request.brand_name || 'null'}</td>
              <td>{request.category_name || 'null'}</td>
              <td>{request.quantity || 'null'}</td>
              <td>{request.description || 'null'}</td>
              <td>{request.buyer_name || 'null'}</td>
              <td>{request.price || 'null'}</td>
              <td>{request.model_name || 'null'}</td>
              <td>{request.ram_storage_config || 'null'}</td>
              <td>{request.request_status || 'null'}</td>
              <td>{request.attribute_value || 'null'}</td>
              <td className="action-buttons">
                {request.request_status === 'Pending' ? (
                  <div className="pending-buttons">
                    <button className="approved-btn" onClick={() => handleApprove(request)}>Approve</button>
                    <button className="denied-btn" onClick={() => handleDeny(request)}>Deny</button>
                  </div>
                ) : (
                  <button className={request.request_status === 'Approved' ? 'approved-btn' : 'denied-btn'}>
                    {request.request_status}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TempRequestsTable;
