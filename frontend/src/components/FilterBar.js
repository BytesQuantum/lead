import React from 'react';
import './FilterBar.css';

/**
 * FilterBar Component
 * Provides filtering and search capabilities
 */
const FilterBar = ({ onFilterChange, onSearchChange, currentFilter }) => {
  const statusOptions = [
    'All Statuses',
    'Contacted',
    'Followed Up',
    'On Hold',
    'Dropped',
    'Meeting',
    'Done',
  ];

  const projectTypes = [
    'All Project Types',
    'App',
    'Website',
    'IOT',
  ];

  return (
    <div className="filter-bar">
      <div className="filter-section search-section">
        <input
          type="text"
          id="search"
          placeholder="Search by name or email..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-section">
        <select
          id="status-filter"
          value={currentFilter}
          onChange={(e) => onFilterChange(e.target.value === 'All Statuses' ? 'All' : e.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <select id="project-filter">
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
