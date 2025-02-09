import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateFactory = ({ factory, onUpdate }) => {
    const [formData, setFormData] = useState(factory);

    useEffect(() => {
        setFormData(factory);
    }, [factory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/factories/${factory.id}`, formData);
            onUpdate();
        } catch (err) {
            console.error(err);
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
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Manager:</label>
                <input
                    type="number"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Update Factory</button>
        </form>
    );
};

export default UpdateFactory;
