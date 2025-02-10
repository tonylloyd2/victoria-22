import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        daily_wage: '',
        is_active: true,
        factory: '',
    });

    const [managers, setManagers] = useState([]);

    useEffect(() => {
        // Fetch all managers
        axios.get('/admin/managers/all')
            .then(response => {
                setManagers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the managers!', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/employees', employee);
            console.log('Employee added:', response.data);
        } catch (error) {
            console.error('There was an error adding the employee!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Daily Wage:</label>
                <input
                    type="number"
                    name="daily_wage"
                    value={employee.daily_wage}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Is Active:</label>
                <input
                    type="checkbox"
                    name="is_active"
                    checked={employee.is_active}
                    onChange={(e) => setEmployee({ ...employee, is_active: e.target.checked })}
                />
            </div>
            <div>
                <label>Factory:</label>
                <select
                    name="factory"
                    value={employee.factory}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a factory</option>
                    {managers.map((manager) => (
                        <option key={manager.id} value={manager.name}>
                            {manager.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Add Employee</button>
        </form>
    );
};
