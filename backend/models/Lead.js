const mongoose = require('mongoose');

/**
 * Lead Schema Definition
 * NO VALIDATION - All fields optional
 */
const leadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      default: '',
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    linkedinProfile: {
      type: String,
      trim: true,
      default: '',
    },
    projectType: {
      type: String,
      default: 'App',
    },
    requirement: {
      type: String,
      trim: true,
      default: '',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      default: 'New',
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for faster queries
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ email: 1 });

/**
 * Virtual field to format created date
 */
leadSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toLocaleDateString();
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
