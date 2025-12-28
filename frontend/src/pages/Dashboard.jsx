import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import ExpenseForm from '../components/ExpenseForm';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // 1. Fetch expenses from MySQL via Node.js backend
  const fetchExpenses = async () => {
    try {
      const { data } = await API.get('/expenses');
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Load data on mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  // 3. Handle deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await API.delete(`/expenses/${id}`);
        fetchExpenses(); // Refresh list after delete
      } catch (err) {
        alert("Failed to delete expense");
      }
    }
  };

  // 4. This function is passed to the ExpenseForm
  const handleExpenseAdded = () => {
    fetchExpenses(); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-1 text-gray-800">Add New Expense</h3>
            <p className="text-sm text-gray-500 mb-6">Logged in as: <span className="font-semibold">{user?.username}</span></p>
            
            {/* Integrated ExpenseForm and passing the refresh function */}
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          </div>
        </div>

        {/* Right Column: List */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-white">
              <h3 className="font-bold text-gray-700">Recent Transactions</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Item</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="4" className="p-10 text-center text-gray-400 italic">Fetching data...</td></tr>
                ) : expenses.length > 0 ? (
                  expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 text-gray-800 font-medium">{exp.item_name}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-bold">
                          {exp.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-900 font-bold">
                        ${Number(exp.amount).toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => handleDelete(exp.id)} 
                          className="text-red-400 hover:text-red-600 text-sm font-medium transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400">
                      No expenses found. Start by adding one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;