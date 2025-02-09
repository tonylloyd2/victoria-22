import React, { useState } from 'react';
import axios from 'axios';

const AddManager = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('manager');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/admin/managers', {
                name,
                email,
                password,
                role
            });
            console.log('Manager added:', response.data);
        } catch (error) {
            console.error('Error adding manager:', error);
        }
    };

    return (
        <div>
            <h2>Add Manager</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Manager</button>
            </form>
        </div>
    );
};

export default AddManager;
