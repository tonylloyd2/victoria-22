import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagersList = ({ onEdit, onDelete }) => {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await axios.get('/admin/managers/all');
                setManagers(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchManagers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading managers: {error.message}</p>;

    return (
        <div>
            <h1>Managers List</h1>
            <ul>
                {managers.map(manager => (
                    <li key={manager.email}>
                        <button onClick={() => onEdit(manager)}>
                            {manager.name} - {manager.email}
                        </button>
                        <button onClick={() => onDelete(manager.email)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagersList;
