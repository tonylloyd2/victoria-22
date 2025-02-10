import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditEmployee = ({ employee, onUpdate }) => {
    const [formData, setFormData] = useState(employee);

    useEffect(() => {
        setFormData(employee);  // Populate the form with the employee data
    }, [employee]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/employees/${employee.id}`, formData);
            onUpdate();  // Callback after the update is successful
        } catch (err) {
            console.error('Error updating employee:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Daily Wage:</label>
                <input
                    type="number"
                    name="daily_wage"
                    value={formData.daily_wage}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Active:</label>
                <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Employee</button>
        </form>
    );
};

export default EditEmployee;
