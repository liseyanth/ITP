const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  issueFoundAt: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
//hello
