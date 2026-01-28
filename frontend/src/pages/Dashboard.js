import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leadService from '../services/leadService';
import LeadForm from '../components/LeadForm';
import LeadTable from '../components/LeadTable';
import FilterBar from '../components/FilterBar';
import StatsCard from '../components/StatsCard';
import Modal from '../components/Modal';
import './Dashboard.css';

/**
 * Dashboard Component
 * Main page for lead management
 */
const Dashboard = ({ onLogout }) => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, byStatus: [] });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Fetch all leads on component mount
   */
  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, []);

  /**
   * Filter leads when filter or search changes
   */
  useEffect(() => {
    const filterLeads = () => {
      let filtered = [...leads];

      // Filter by status
      if (statusFilter !== 'All') {
        filtered = filtered.filter((lead) => lead.status === statusFilter);
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (lead) =>
            lead.fullName.toLowerCase().includes(query) ||
            lead.email.toLowerCase().includes(query) ||
            lead.companyName.toLowerCase().includes(query)
        );
      }

      setFilteredLeads(filtered);
    };

    filterLeads();
  }, [leads, statusFilter, searchQuery]);

  /**
   * Fetch leads from API
   */
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await leadService.getAllLeads();
      setLeads(response.data);
    } catch (error) {
      toast.error('Failed to fetch leads');
      console.error('Fetch leads error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch statistics from API
   */
  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const response = await leadService.getLeadStats();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to fetch statistics');
      console.error('Fetch stats error:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  /**
   * Handle create lead
   */
  const handleCreateLead = async (leadData) => {
    try {
      const response = await leadService.createLead(leadData);
      toast.success(response.message || 'Lead created successfully!');
      setShowAddModal(false);
      fetchLeads();
      fetchStats();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create lead';
      toast.error(message);
      console.error('Create lead error:', error);
    }
  };

  /**
   * Handle update lead
   */
  const handleUpdateLead = async (leadData) => {
    try {
      const response = await leadService.updateLead(currentLead._id, leadData);
      toast.success(response.message || 'Lead updated successfully!');
      setShowEditModal(false);
      setCurrentLead(null);
      fetchLeads();
      fetchStats();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update lead';
      toast.error(message);
      console.error('Update lead error:', error);
    }
  };

  /**
   * Handle delete lead
   */
  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await leadService.deleteLead(id);
        toast.success(response.message || 'Lead deleted successfully!');
        fetchLeads();
        fetchStats();
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete lead';
        toast.error(message);
        console.error('Delete lead error:', error);
      }
    }
  };

  /**
   * Handle status change
   */
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await leadService.updateLeadStatus(id, newStatus);
      toast.success(response.message || 'Status updated successfully!');
      fetchLeads();
      fetchStats();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update status';
      toast.error(message);
      console.error('Update status error:', error);
    }
  };

  /**
   * Open edit modal
   */
  const handleEditClick = (lead) => {
    setCurrentLead(lead);
    setShowEditModal(true);
  };

  return (
    <div className="dashboard">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Top Navigation Bar */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo-title">Bytes Quantum</h1>
            <p className="logo-tagline">Build Beyond Boundaries</p>
          </div>
          <div className="header-center">
            <p className="header-quote">"You never know which door will open, so keep knocking"</p>
          </div>
          <div className="header-actions">
            <button className="btn-add" onClick={() => setShowAddModal(true)}>
              + Add New Lead
            </button>
            {onLogout && (
              <button className="btn-logout" onClick={onLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Dashboard Overview Section */}
        <h2 className="dashboard-title">Dashboard Overview</h2>

        {/* Statistics Cards */}
        <StatsCard stats={stats} loading={statsLoading} />

        {/* All Leads Section */}
        <h2 className="section-title">All Leads ({filteredLeads.length})</h2>

        {/* Filter Bar */}
        <FilterBar
          onFilterChange={setStatusFilter}
          onSearchChange={setSearchQuery}
          currentFilter={statusFilter}
        />

        {/* Leads Table */}
        <LeadTable
          leads={filteredLeads}
          onEdit={handleEditClick}
          onDelete={handleDeleteLead}
          onStatusChange={handleStatusChange}
          loading={loading}
        />
      </main>

      {/* Add Lead Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Lead"
      >
        <LeadForm
          onSubmit={handleCreateLead}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Lead Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setCurrentLead(null);
        }}
        title="Edit Lead"
      >
        <LeadForm
          initialData={currentLead}
          onSubmit={handleUpdateLead}
          onCancel={() => {
            setShowEditModal(false);
            setCurrentLead(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
