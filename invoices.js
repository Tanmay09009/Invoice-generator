const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a db module to handle database operations

// Create a new invoice
router.post('/', async (req, res) => {
    const { customerName, customerAddress, items, taxRate } = req.body;

    // Calculate subtotal, tax, and grand total
    let subtotal = items.reduce((total, item) => total + (item.price * item.qty), 0);
    let tax = subtotal * (taxRate / 100);
    let grandTotal = subtotal + tax;

    try {
        const invoice = await db.createInvoice({
            customerName,
            customerAddress,
            items,
            taxRate,
            subtotal,
            tax,
            grandTotal
        });
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create invoice' });
    }
});

// Retrieve all invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await db.getInvoices();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve invoices' });
    }
});

// Retrieve a specific invoice by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await db.getInvoiceById(id);
        if (invoice) {
            res.status(200).json(invoice);
        } else {
            res.status(404).json({ error: 'Invoice not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve invoice' });
    }
});

// Update an existing invoice
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { customerName, customerAddress, items, taxRate } = req.body;

    let subtotal = items.reduce((total, item) => total + (item.price * item.qty), 0);
    let tax = subtotal * (taxRate / 100);
    let grandTotal = subtotal + tax;

    try {
        const updatedInvoice = await db.updateInvoice(id, {
            customerName,
            customerAddress,
            items,
            taxRate,
            subtotal,
            tax,
            grandTotal
        });
        if (updatedInvoice) {
            res.status(200).json(updatedInvoice);
        } else {
            res.status(404).json({ error: 'Invoice not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update invoice' });
    }
});

// Delete an invoice
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await db.deleteInvoice(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Invoice not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete invoice' });
    }
});

module.exports = router;