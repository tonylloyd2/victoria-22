import React, { useState } from 'react';
import axios from 'axios';

export const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        factory_id: '',
        daily_wage: '',
        is_active: true,
    });

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
                <label>Factory ID:</label>
                <input
                    type="text"
                    name="factory_id"
                    value={employee.factory_id}
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
            <button type="submit">Add Employee</button>
        </form>
    );
};
