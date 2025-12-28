const db = require('../config/db');

exports.getExpenses = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM expenses WHERE user_id = ?', [req.user.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addExpense = async (req, res) => {
    const { item_name, amount, category } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO expenses (user_id, item_name, amount, category) VALUES (?, ?, ?, ?)',
            [req.user.id, item_name, amount, category]
        );
        res.status(201).json({ id: result.insertId, item_name, amount, category });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add this to your existing exports in expenseController.js
exports.deleteExpense = async (req, res) => {
    const { id } = req.params; // Get ID from the URL
    const userId = req.user.id; // Get User ID from JWT middleware

    try {
        const [result] = await db.query(
            'DELETE FROM expenses WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Expense not found or unauthorized" });
        }

        res.json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};