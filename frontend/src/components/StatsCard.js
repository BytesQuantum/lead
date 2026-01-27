import React from 'react';
import './StatsCard.css';

/**
 * StatsCard Component
 * Displays lead statistics in cards
 */
const StatsCard = ({ stats, loading }) => {
  if (loading) {
    return <div className="stats-loading">Loading statistics...</div>;
  }

  // Calculate stats
  const totalLeads = stats.total || 0;
  const newLeads = stats.byStatus?.find(s => s._id === 'New')?.count || 0;
  const wonDeals = stats.byStatus?.find(s => s._id === 'Done')?.count || 0;
  const lostDeals = stats.byStatus?.find(s => s._id === 'Dropped')?.count || 0;
  
  // Project type stats
  const appProjects = stats.byProjectType?.find(s => s._id === 'App')?.count || 0;
  const websiteProjects = stats.byProjectType?.find(s => s._id === 'Website')?.count || 0;
  const iotProjects = stats.byProjectType?.find(s => s._id === 'IOT')?.count || 0;

  return (
    <div className="stats-container">
      {/* Total Leads */}
      <div className="stats-card">
        <div className="stats-icon" style={{ backgroundColor: '#E07856' }}>
          <span>👥</span>
        </div>
        <div className="stats-content">
          <h3>Total Leads</h3>
          <p className="stats-number">{totalLeads}</p>
        </div>
      </div>

      {/* New Leads */}
      <div className="stats-card">
        <div className="stats-icon" style={{ backgroundColor: '#6BA5CF' }}>
          <span>⭐</span>
        </div>
        <div className="stats-content">
          <h3>New Leads</h3>
          <p className="stats-number">{newLeads}</p>
        </div>
      </div>

      {/* Won Deals */}
      <div className="stats-card">
        <div className="stats-icon" style={{ backgroundColor: '#77A372' }}>
          <span>✓</span>
        </div>
        <div className="stats-content">
          <h3>Won Deals</h3>
          <p className="stats-number">{wonDeals}</p>
        </div>
      </div>

      {/* Lost Deals */}
      <div className="stats-card">
        <div className="stats-icon" style={{ backgroundColor: '#C57C7C' }}>
          <span>✕</span>
        </div>
        <div className="stats-content">
          <h3>Lost Deals</h3>
          <p className="stats-number">{lostDeals}</p>
        </div>
      </div>

      {/* App Projects */}
      <div className="stats-card">
        <div className="stats-icon" style={{ backgroundColor: '#7DB4D4' }}>
          <span>📱</span>
        </div>
        <div className="stats-content">
          <h3>App Projects</h3>
          <p className="stats-number">{appProjects}</p>
        </div>
      </div>

      {/* Website Projects */}
      <div className="stats-card">
        <div className="stats-icon" style={{ backgroundColor: '#D4A962' }}>
          <span>🌐</span>
        </div>
        <div className="stats-content">
          <h3>Website Projects</h3>
          <p className="stats-number">{websiteProjects}</p>
        </div>
      </div>

      {/* IOT Projects */}
      <div className="stats-card">
        <div className="stats-icon" style={{ backgroundColor: '#6B6B6B' }}>
          <span>🔌</span>
        </div>
        <div className="stats-content">
          <h3>IOT Projects</h3>
          <p className="stats-number">{iotProjects}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
