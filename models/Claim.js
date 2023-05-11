const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  claimCreator: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  claimChallenger: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  topic: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  reminded: {
    type: Boolean,
    default: false,
  },
});

const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;
