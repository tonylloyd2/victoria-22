import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AddFactory = () => {
    const [managers, setManagers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        manager: ''
    });

    useEffect(() => {
        // Fetch available managers
        axios.get('/api/available-managers')
            .then(response => {
                setManagers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the managers!', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/factories', formData)
            .then(response => {
                console.log('Factory added successfully', response.data);
            })
            .catch(error => {
                console.error('There was an error adding the factory!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div>
                <label>Manager:</label>
                <select name="manager" value={formData.manager} onChange={handleChange} required>
                    <option value="">Select a manager</option>
                    {managers.map(manager => (
                        <option key={manager.id} value={manager.id}>{manager.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Add Factory</button>
        </form>
    );
};
