const Lead = require('../models/Lead');

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Public
 */
const createLead = async (req, res) => {
  try {
    const { 
      fullName, 
      phoneNumber, 
      email, 
      linkedinProfile, 
      projectType, 
      requirement, 
      notes, 
      status 
    } = req.body;

    // Create new lead - NO VALIDATION
    const lead = await Lead.create({
      fullName: fullName || '',
      phoneNumber: phoneNumber || '',
      email: email || '',
      linkedinProfile: linkedinProfile || '',
      projectType: projectType || 'App',
      requirement: requirement || '',
      notes: notes || '',
      status: status || 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead,
    });
  } catch (error) {
    console.error('Create Lead Error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to create lead',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all leads with optional filtering
 * @route   GET /api/leads?status=Contacted
 * @access  Public
 */
const getAllLeads = async (req, res) => {
  try {
    const { status, search, sort } = req.query;
    
    // Build query object
    let query = {};

    // Filter by status if provided
    if (status && status !== 'All') {
      query.status = status;
    }

    // Search across multiple fields
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { linkedinProfile: { $regex: search, $options: 'i' } },
        { requirement: { $regex: search, $options: 'i' } },
      ];
    }

    // Determine sort order
    let sortOption = {};
    switch (sort) {
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'name':
        sortOption = { fullName: 1 };
        break;
      case 'company':
        sortOption = { companyName: 1 };
        break;
      default:
        sortOption = { createdAt: -1 }; // newest first
    }

    const leads = await Lead.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error('Get All Leads Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single lead by ID
 * @route   GET /api/leads/:id
 * @access  Public
 */
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error('Get Lead By ID Error:', error);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch lead',
      error: error.message,
    });
  }
};

/**
 * @desc    Update lead by ID
 * @route   PUT /api/leads/:id
 * @access  Public
 */
const updateLead = async (req, res) => {
  try {
    const { 
      fullName, 
      phoneNumber, 
      email, 
      linkedinProfile, 
      projectType, 
      requirement, 
      notes, 
      status 
    } = req.body;

    // Check if lead exists
    let lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    // Update lead - NO VALIDATION
    lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        phoneNumber,
        email,
        linkedinProfile,
        projectType,
        requirement,
        notes,
        status,
      },
      {
        new: true, // Return updated document
        runValidators: false, // DISABLE validators
      }
    );

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    });
  } catch (error) {
    console.error('Update Lead Error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update lead',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete lead by ID
 * @route   DELETE /api/leads/:id
 * @access  Public
 */
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Delete Lead Error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete lead',
      error: error.message,
    });
  }
};

/**
 * @desc    Update lead status
 * @route   PATCH /api/leads/:id/status
 * @access  Public
 */
const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    const validStatuses = ['New', 'Contacted', 'Followed Up', 'On Hold', 'Dropped', 'Meeting', 'Done'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', '),
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead status updated successfully',
      data: lead,
    });
  } catch (error) {
    console.error('Update Lead Status Error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update lead status',
      error: error.message,
    });
  }
};

/**
 * @desc    Get leads statistics
 * @route   GET /api/leads/stats
 * @access  Public
 */
const getLeadStats = async (req, res) => {
  try {
    // Get stats by status
    const statusStats = await Lead.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get stats by project type
    const projectTypeStats = await Lead.aggregate([
      {
        $group: {
          _id: '$projectType',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Lead.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus: statusStats,
        byProjectType: projectTypeStats,
      },
    });
  } catch (error) {
    console.error('Get Lead Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lead statistics',
      error: error.message,
    });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  getLeadStats,
};
