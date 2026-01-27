import React, { useState } from 'react';
import './LeadForm.css';

/**
 * LeadForm Component
 * Form for creating and editing leads
 */
const LeadForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      fullName: '',
      phoneNumber: '',
      email: '',
      linkedinProfile: '',
      status: 'New',
      projectType: 'App',
      requirement: '',
      notes: '',
    }
  );

  const [errors, setErrors] = useState({});

  // Status options
  const statusOptions = ['New', 'Contacted', 'Followed Up', 'On Hold', 'Dropped', 'Meeting', 'Done'];
  
  // Project type options
  const projectTypes = ['App', 'Website', 'IOT'];

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validate form data
   */
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Client name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Project type is required';
    }

    if (!formData.requirement.trim()) {
      newErrors.requirement = 'Project requirement is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fullName">
            Client Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter client name"
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Mobile Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10 digit mobile number"
            className={errors.phoneNumber ? 'error' : ''}
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="client@example.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="linkedinProfile">LinkedIn Profile</label>
          <input
            type="url"
            id="linkedinProfile"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className={errors.linkedinProfile ? 'error' : ''}
          />
          {errors.linkedinProfile && <span className="error-message">{errors.linkedinProfile}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">
            Status <span className="required">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={errors.status ? 'error' : ''}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && <span className="error-message">{errors.status}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="projectType">
            Project Type <span className="required">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={errors.projectType ? 'error' : ''}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && <span className="error-message">{errors.projectType}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="requirement">
          Project Requirement <span className="required">*</span>
        </label>
        <textarea
          id="requirement"
          name="requirement"
          value={formData.requirement}
          onChange={handleChange}
          placeholder="Describe the project requirements..."
          rows="4"
          className={errors.requirement ? 'error' : ''}
        ></textarea>
        {errors.requirement && <span className="error-message">{errors.requirement}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Additional Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional notes or comments..."
          rows="4"
        ></textarea>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Lead' : 'Add Lead'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default LeadForm;
