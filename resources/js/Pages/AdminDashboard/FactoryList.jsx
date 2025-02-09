import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const FactoryList = ({ onEdit }) => {
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

    const handleDelete = (id) => {
        axios.delete(`/api/factories/${id}`)
            .then(response => {
                setFactories(factories.filter(factory => factory.id !== id));
                console.log('Factory deleted successfully', response.data);
            })
            .catch(error => {
                console.error('There was an error deleting the factory!', error);
            });
    };

    return (
        <div>
            <h1>Factory List</h1>
            <ul>
                {factories.map(factory => (
                    <li key={factory.id}>
                        {factory.name} - {factory.location}
                        <button onClick={() => onEdit(factory)}>Edit</button>
                        <button onClick={() => handleDelete(factory.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
