import { getToken } from './tokenutility';

/**
 * Makes an API request.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {string} url - The API endpoint URL.
 * @param {object} [body] - The request body (used for POST, PUT, etc.).
 * @param {string} [contentType='application/json'] - The Content-Type header value.
 * @returns {Promise<object>} - The response data.
 */
export const apiRequest = async (method, url, body = null, contentType = 'application/json') => {
  const token = getToken();

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': contentType,
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, options);
  const data = await response.json(); 
  if (response.ok) {
    return { success: true, data };
  }

  return { success: false, message: data.message || 'An error occurred' };
};
