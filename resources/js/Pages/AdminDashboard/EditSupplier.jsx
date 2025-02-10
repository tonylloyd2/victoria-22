import React, { useState } from 'react';
import axios from 'axios';

const AddSupplier = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [materialsSupplied, setMaterialsSupplied] = useState(['']); // Initially empty array to hold materials
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input change for materials
    const handleMaterialChange = (index, event) => {
        const values = [...materialsSupplied];
        values[index] = event.target.value;
        setMaterialsSupplied(values);
    };

    // Add more material input fields
    const addMaterialField = () => {
        setMaterialsSupplied([...materialsSupplied, '']);
    };

    // Remove material input field
    const removeMaterialField = (index) => {
        const values = [...materialsSupplied];
        values.splice(index, 1);
        setMaterialsSupplied(values);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const supplierData = {
            name,
            email,
            mobile_number: mobileNumber,
            materials_supplied: materialsSupplied.filter(material => material !== '') // Filter out any empty material values
        };

        setLoading(true);

        try {
            // Make the POST request to the backend API
            const response = await axios.post('/admin/suppliers', supplierData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Clear the form and handle successful response
            setName('');
            setEmail('');
            setMobileNumber('');
            setMaterialsSupplied(['']);
            alert('Supplier added successfully!');
        } catch (err) {
            setError('There was an error adding the supplier.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Supplier</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Supplier Name:</label>
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
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Materials Supplied:</label>
                    {materialsSupplied.map((material, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={material}
                                onChange={(e) => handleMaterialChange(index, e)}
                                required
                            />
                            <button type="button" onClick={() => removeMaterialField(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addMaterialField}>Add Material</button>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding Supplier...' : 'Add Supplier'}
                </button>
            </form>
        </div>
    );
};

export default AddSupplier;
