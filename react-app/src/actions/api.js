import axios from 'axios';

// Base URL configuration
const baseURL = 'http://localhost:5269/api/DCandidate';

// Create axios instance
const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// API methods with logging
export const fetchAll = () => {
  console.log('GET Request to:', baseURL);
  return api.get('');
}

export const create = (newRecord) => {
  console.log('POST Request to:', baseURL, 'Data:', newRecord);
  return api.post('', newRecord);
}

export const update = (id, updatedRecord) => {
  const url = `/${id}`;
  console.log('PUT Request to:', baseURL + url, 'Data:', updatedRecord);
  return api.put(url, updatedRecord);
}

export const Delete = (id) => {
  const url = `/${id}`;
  console.log('DELETE Request to:', baseURL + url);
  return api.delete(url);
}