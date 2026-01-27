const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  getLeadStats,
} = require('../controllers/leadController');

/**
 * Validation Rules for Lead Creation and Update
 */
const leadValidationRules = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
    .withMessage('Please provide a valid phone number'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('requirement')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Requirement cannot exceed 1000 characters'),
  
  body('status')
    .optional()
    .isIn(['Contacted', 'Followed Up', 'On Hold', 'Dropped', 'Meeting', 'Done'])
    .withMessage('Invalid status value'),
];

// Statistics route (must come before :id routes)
router.get('/stats', getLeadStats);

// CRUD Routes
router.post('/', leadValidationRules, createLead);
router.get('/', getAllLeads);
router.get('/:id', getLeadById);
router.put('/:id', leadValidationRules, updateLead);
router.delete('/:id', deleteLead);

// Status update route
router.patch('/:id/status', updateLeadStatus);

module.exports = router;
