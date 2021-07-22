const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('../models/user');

// User Schema
const activitySchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  images: [String],
  point: {
    type: Number,
    required:true
  },
  hours:{
    type: Number,
    required:true
  },
  desc: {
    type: String,
    required:true
  },
  students: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
],
  completed: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
  ],
  bookmarked:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('Activity', activitySchema);

