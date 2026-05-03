import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Dashboard, AddIncome, AddExpense, Categories, Reports } from './pages';
import Layout from './components/Layout';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-income" element={<AddIncome />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Layout>
  );
};

export default App;