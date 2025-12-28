const express = require('express');
const router = express.Router();
const { getExpenses, addExpense ,deleteExpense } = require('../controllers/expenseController');
const auth = require('../middleware/auth'); // Import the JWT middleware

router.get('/', auth, getExpenses); // Protected by auth middleware
router.post('/', auth, addExpense); // Protected by auth middleware
router.delete('/:id', auth, deleteExpense);

module.exports = router;