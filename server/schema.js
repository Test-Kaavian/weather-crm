const mongoose = require('mongoose');

const Customer = new mongoose.Schema({
  CustomerId: {
    type: String,
    unique: true,
    required: [true, 'Please Enter  CustomerID'],
  },
  Name: {
    type: String,
    required: [true, 'Please Enter  CustomerName'],
  },
  Address: {
    type: String,
    required: [true, 'Please Enter Address'],
  },
  City: {
    type: String,
    required: [true, 'Please Enter City'],
  },
  Contact: {
    type: Number,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    required: [true, 'Please Enter ContactNumber'],
  },
}, { collection: 'weatherCustomer' });

const AlertLog = new mongoose.Schema({
  Reason: String,
  Time: Date,
  Location: String,
  Count: Number,
}, { timestamps: true }, { collection: 'weatherlogs' });

const User = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, { collection: 'users' });

const AlertLogSchema = mongoose.model('weatherlogs', AlertLog);
const CustomerSchema = mongoose.model('weatherCustomer', Customer);
const Users = mongoose.model('users', User);
module.exports = { AlertLogSchema, CustomerSchema, Users };
