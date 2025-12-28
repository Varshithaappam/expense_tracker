import React, { useState } from 'react';
import API from '../api';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExpense = { 
        item_name: itemName, 
        amount: parseFloat(amount), 
        category 
      };
      
      // Send to Backend
      const { data } = await API.post('/expenses', newExpense);
      
      // Notify Dashboard to refresh the list
      onExpenseAdded(data);
      
      // Reset Form
      setItemName('');
      setAmount('');
      setCategory('Food');
    } catch (err) {
      alert("Failed to add expense. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Item Name</label>
        <input 
          type="text" 
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="e.g. Groceries"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
        <input 
          type="number" 
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="0.00"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;