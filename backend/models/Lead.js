const mongoose = require('mongoose');

/**
 * Lead Schema Definition
 * Defines the structure and validation for lead documents
 */
const leadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please provide a valid phone number'],
      default: '',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
      default: '',
    },
    linkedinProfile: {
      type: String,
      trim: true,
      default: '',
    },
    projectType: {
      type: String,
      enum: {
        values: ['App', 'Website', 'IOT'],
        message: '{VALUE} is not a valid project type',
      },
      required: [true, 'Project type is required'],
    },
    requirement: {
      type: String,
      required: [true, 'Project requirement is required'],
      trim: true,
      maxlength: [2000, 'Requirement cannot exceed 2000 characters'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'Followed Up', 'On Hold', 'Dropped', 'Meeting', 'Done'],
        message: '{VALUE} is not a valid status',
      },
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

/**
 * Pre-save hook for additional processing
 */
leadSchema.pre('save', function (next) {
  // Capitalize first letter of full name
  if (this.isModified('fullName')) {
    this.fullName = this.fullName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  next();
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
