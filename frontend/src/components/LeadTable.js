import React, { useState } from 'react';
import './LeadTable.css';

/**
 * LeadTable Component
 * Displays leads in a table format with actions
 */
const LeadTable = ({ leads, onEdit, onDelete, onStatusChange, loading }) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  /**
   * Get status badge color
   */
  const getStatusColor = (status) => {
    const colors = {
      New: '#718096',
      Contacted: '#3182ce',
      'Followed Up': '#805ad5',
      'On Hold': '#d69e2e',
      Dropped: '#e53e3e',
      Meeting: '#319795',
      Done: '#38a169',
    };
    return colors[status] || '#718096';
  };

  /**
   * Format date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Handle sort
   */
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  /**
   * Sort leads
   */
  const sortedLeads = [...leads].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'createdAt' || sortField === 'updatedAt') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) {
    return <div className="loading">Loading leads...</div>;
  }

  if (leads.length === 0) {
    return <div className="no-data">No leads found. Add your first lead!</div>;
  }

  return (
    <div className="table-container">
      <table className="lead-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('fullName')} className="sortable">
              Client Name {sortField === 'fullName' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Contact Info</th>
            <th>Project Type</th>
            <th>Requirement</th>
            <th>Status</th>
            <th onClick={() => handleSort('createdAt')} className="sortable">
              Created {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead) => (
            <tr key={lead._id}>
              <td>
                <strong>{lead.fullName}</strong>
              </td>
              <td>
                <div className="contact-info">
                  {lead.email && <div>📧 {lead.email}</div>}
                  {lead.phoneNumber && <div>📱 {lead.phoneNumber}</div>}
                  {lead.linkedinProfile && (
                    <div>
                      <a 
                        href={lead.linkedinProfile} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#0077b5', textDecoration: 'none' }}
                      >
                        🔗 LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </td>
              <td>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '4px',
                  fontSize: '0.813rem',
                  fontWeight: '500',
                  backgroundColor: lead.projectType === 'App' ? '#e8f4f8' : 
                                   lead.projectType === 'Website' ? '#fef3e8' : '#f0f0f0',
                  color: lead.projectType === 'App' ? '#0277bd' : 
                         lead.projectType === 'Website' ? '#d97706' : '#4a5568'
                }}>
                  {lead.projectType}
                </span>
              </td>
              <td className="requirement-cell">
                {lead.requirement ? (
                  <span title={lead.requirement}>
                    {lead.requirement.length > 50
                      ? lead.requirement.substring(0, 50) + '...'
                      : lead.requirement}
                  </span>
                ) : (
                  <span className="empty">No requirement</span>
                )}
              </td>
              <td>
                <select
                  className="status-select"
                  value={lead.status}
                  onChange={(e) => onStatusChange(lead._id, e.target.value)}
                  style={{ backgroundColor: getStatusColor(lead.status) }}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Followed Up">Followed Up</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Dropped">Dropped</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Done">Done</option>
                </select>
              </td>
              <td>{formatDate(lead.createdAt)}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => onEdit(lead)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => onDelete(lead._id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
