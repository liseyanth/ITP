const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

router.post('/add', async (req, res) => {
    try {
        const { customerId, subject, message, issueFoundAt, details } = req.body;

        // Create a new ticket document
        const newTicket = new Ticket({ customerId, subject, message, issueFoundAt, details });

        // Save the new ticket to the database
        await newTicket.save();
        res.json('Ticket added');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a Ticket by ID
router.put('/update/:id', async (req, res) => {
    try {
        const ticketId = req.params.id;
        const { customerId, subject, message, issueFoundAt, details } = req.body;

        // Update the ticket document
        const updateTicket = { customerId, subject, message, issueFoundAt, details };
        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, updateTicket, { new: true });

        if (!updatedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json({ status: 'Ticket Updated', ticket: updatedTicket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a Ticket by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const ticketId = req.params.id;
        const deletedTicket = await Ticket.findByIdAndRemove(ticketId);

        if (!deletedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json({ status: 'Ticket Deleted', ticket: deletedTicket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a Ticket by ID
router.get('/get/:id', async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
