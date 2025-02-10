import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        id: '',
        name: '',
        email: '',
        mobile_number: '',
        materials_supplied: [{ material: '', price_per_unit: '' }]  // Ensure correct structure
    });

    // Fetch all suppliers on component mount
    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('/admin/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleEdit = (supplier) => {
        setIsEditing(true);
        // Split material and price per unit from the fetched data
        const parsedMaterials = supplier.materials_supplied.map((item) => {
            const [material, price] = item.split(',');  // Assuming the format "material,price"
            return {
                material: material.trim(),
                price_per_unit: price ? price.trim() : ''
            };
        });

        setEditForm({
            id: supplier.id,
            name: supplier.name,
            email: supplier.email,
            mobile_number: supplier.mobile_number,
            materials_supplied: parsedMaterials
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/admin/suppliers/${id}`);
            setSuppliers(suppliers.filter(supplier => supplier.id !== id));
            alert('Supplier deleted successfully');
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleMaterialChange = (index, event) => {
        const values = [...editForm.materials_supplied];
        const [name, price] = event.target.value.split(',');  // Split on comma to separate material and price
        values[index] = { material: name.trim(), price_per_unit: price ? price.trim() : '' };
        setEditForm({ ...editForm, materials_supplied: values });
    };

    const addMaterialField = () => {
        setEditForm({
            ...editForm,
            materials_supplied: [...editForm.materials_supplied, { material: '', price_per_unit: '' }]
        });
    };

    const removeMaterialField = (index) => {
        const values = [...editForm.materials_supplied];
        values.splice(index, 1);
        setEditForm({ ...editForm, materials_supplied: values });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/admin/suppliers/${editForm.id}`, editForm);
            setSuppliers(suppliers.map((supplier) => supplier.id === editForm.id ? response.data : supplier));
            setIsEditing(false);
            setEditForm({
                id: '',
                name: '',
                email: '',
                mobile_number: '',
                materials_supplied: [{ material: '', price_per_unit: '' }]
            });
            alert('Supplier updated successfully');
        } catch (error) {
            console.error('Error updating supplier:', error);
        }
    };

    return (
        <div>
            <h2>Supplier List</h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Materials Supplied</th>
                        <th>Price per Unit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.mobile_number}</td>
                            <td>
                                {supplier.materials_supplied.map((item, index) => {
                                    const [material, price] = item.split(',');  // Split material and price
                                    return (
                                        <div key={index}>
                                            {material.trim()}
                                        </div>
                                    );
                                })}
                            </td>
                            <td>
                                {supplier.materials_supplied.map((item, index) => {
                                    const [material, price] = item.split(',');
                                    return (
                                        <div key={index}>
                                            {price ? price.trim() : 'N/A'}
                                        </div>
                                    );
                                })}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(supplier)}>Edit</button>
                                <button onClick={() => handleDelete(supplier.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <div>
                    <h3>Edit Supplier</h3>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={editForm.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Mobile Number:</label>
                            <input
                                type="text"
                                name="mobile_number"
                                value={editForm.mobile_number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Materials Supplied:</label>
                            {editForm.materials_supplied.map((material, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={`${material.material},${material.price_per_unit}`}
                                        onChange={(e) => handleMaterialChange(index, e)}
                                        required
                                    />
                                    <button type="button" onClick={() => removeMaterialField(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={addMaterialField}>Add Material</button>
                        </div>
                        <button type="submit">Update Supplier</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SupplierList;
