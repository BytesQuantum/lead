const express = require('express');
const router = express.Router();
const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  getLeadStats,
} = require('../controllers/leadController');

// Statistics route (must come before :id routes)
router.get('/stats', getLeadStats);

// CRUD Routes - NO VALIDATION
router.post('/', createLead);
router.get('/', getAllLeads);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

// Status update route
router.patch('/:id/status', updateLeadStatus);

module.exports = router;
