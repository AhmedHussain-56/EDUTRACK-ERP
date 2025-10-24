import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admissions from './components/Admissions';
import FeeManagement from './components/FeeManagement';
import HostelAllocation from './components/HostelAllocation';
import ExamRecords from './components/ExamRecords';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'admissions':
        return <Admissions />;
      case 'fees':
        return <FeeManagement />;
      case 'hostel':
        return <HostelAllocation />;
      case 'exams':
        return <ExamRecords />;
      case 'analytics':
        return <Dashboard />; // For now, analytics shows dashboard
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;