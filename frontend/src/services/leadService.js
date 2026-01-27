import axios from 'axios';

/**
 * API Service Configuration
 * Centralized API calls for lead management
 */
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (development)
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`📥 Response:`, response.data);
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('Response Error:', message);
    return Promise.reject(error);
  }
);

/**
 * Lead API Service Methods
 */
const leadService = {
  /**
   * Get all leads with optional filters
   * @param {Object} params - Query parameters (status, search, sort)
   * @returns {Promise} - API response
   */
  getAllLeads: async (params = {}) => {
    const response = await api.get('/leads', { params });
    return response.data;
  },

  /**
   * Get a single lead by ID
   * @param {string} id - Lead ID
   * @returns {Promise} - API response
   */
  getLeadById: async (id) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },

  /**
   * Create a new lead
   * @param {Object} leadData - Lead information
   * @returns {Promise} - API response
   */
  createLead: async (leadData) => {
    const response = await api.post('/leads', leadData);
    return response.data;
  },

  /**
   * Update an existing lead
   * @param {string} id - Lead ID
   * @param {Object} leadData - Updated lead information
   * @returns {Promise} - API response
   */
  updateLead: async (id, leadData) => {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
  },

  /**
   * Delete a lead
   * @param {string} id - Lead ID
   * @returns {Promise} - API response
   */
  deleteLead: async (id) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },

  /**
   * Update lead status only
   * @param {string} id - Lead ID
   * @param {string} status - New status
   * @returns {Promise} - API response
   */
  updateLeadStatus: async (id, status) => {
    const response = await api.patch(`/leads/${id}/status`, { status });
    return response.data;
  },

  /**
   * Get lead statistics
   * @returns {Promise} - API response
   */
  getLeadStats: async () => {
    const response = await api.get('/leads/stats');
    return response.data;
  },
};

export default leadService;
