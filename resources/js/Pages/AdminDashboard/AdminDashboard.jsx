import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AddEmployee } from './AddEmployee.jsx';
import { FactoryList } from './FactoryList.jsx';
import EmployeeList from './EmployeeList.jsx';
import ProductionList from "./ProductionList.jsx";
import { Users, Factory, BarChart3, LogOut, ChevronDown } from 'lucide-react';

export default function AdminDashboard() {
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedFactory, setSelectedFactory] = useState(null);
  const [factories, setFactories] = useState([]);
  const [activePage, setActivePage] = useState('employees');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    axios.get('/api/factories')
      .then(response => {
        setFactories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the factories!', error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleEditManager = (manager) => {
    setSelectedManager(manager);
  };

  const handleDeleteManager = async (email) => {
    try {
      await axios.delete(`/admin/managers/${email}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditFactory = (factory) => {
    setSelectedFactory(factory);
  };

  const handleDeleteFactory = async (id) => {
    try {
      await axios.delete(`/api/factories/${id}`);
      setFactories(factories.filter(factory => factory.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f4f7fc]">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 w-64 h-screen bg-[#2c3e50]">
          <div className="p-4">
            <h2 className="text-white text-xl font-semibold">Admin Panel</h2>
          </div>
          <div className="px-4 mt-6">
            <Link
              to="/employees"
              className={`flex items-center p-3 text-white rounded ${activePage === 'employees' ? 'bg-[#00b894]' : 'hover:bg-[#34495e]'}`}
              onClick={() => setActivePage('employees')}
            >
              <Users className="w-5 h-5 mr-3" />
              Employees
            </Link>
            <Link
              to="/factories"
              className={`flex items-center p-3 text-white rounded ${activePage === 'factories' ? 'bg-[#00b894]' : 'hover:bg-[#34495e]'}`}
              onClick={() => setActivePage('factories')}
            >
              <Factory className="w-5 h-5 mr-3" />
              Factories
            </Link>
            <Link
              to="/production"
              className={`flex items-center p-3 text-white rounded ${activePage === 'production' ? 'bg-[#00b894]' : 'hover:bg-[#34495e]'}`}
              onClick={() => setActivePage('production')}
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Production
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64">
          {/* Header */}
          <div className="bg-white shadow-md border-b border-gray-200 w-full fixed z-10 top-0 left-0">
            <div className="flex justify-between items-center h-16 px-6">
              {/* Page Title */}
              <h1 className="text-2xl font-semibold text-gray-800">
                {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
              </h1>

              {/* Profile Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="mr-2">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Area with padding for fixed header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-20">
            <Routes>
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/factories" element={<FactoryList />} />
              <Route path="/production" element={<ProductionList />} />
              <Route path="/add-employee" element={<AddEmployee />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
