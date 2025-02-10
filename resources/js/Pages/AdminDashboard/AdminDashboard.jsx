import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

import { AddEmployee } from './AddEmployee.jsx';
import { FactoryList } from './FactoryList.jsx';
import EmployeeList from './EmployeeList.jsx';
import ProductionList from "./ProductionList.jsx";

export default function AdminDashboard() {
    const [selectedManager, setSelectedManager] = useState(null);
    const [selectedFactory, setSelectedFactory] = useState(null);
    const [factories, setFactories] = useState([]);

    useEffect(() => {
        // Fetch all factories
        axios.get('/api/factories')
            .then(response => {
                setFactories(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the factories!', error);
            });
    }, []);

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

    const handleUpdateManager = () => {
        setSelectedManager(null);
        window.location.reload();
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

    const handleUpdateFactory = () => {
        setSelectedFactory(null);
        window.location.reload();
    };

    return (
        <BrowserRouter> {/* Wrap everything inside BrowserRouter */}
            <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                    Welcome to Inertia with React!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    Your React frontend is now seamlessly integrated with Laravel.
                </p>
            </div>
            {/*<AddEmployee />*/}
            {/*<FactoryList />*/}
            {/*<EmployeeList />*/}
            <ProductionList />
        </BrowserRouter>
);
}
