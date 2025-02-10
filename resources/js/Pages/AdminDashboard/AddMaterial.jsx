import React, { useState } from 'react';
import axios from 'axios';

const AddMaterial = ({ setIsAdding, fetchMaterials }) => {
  // Form state to hold material data
  const [addForm, setAddForm] = useState({
    material_name: '',
    material_quantity: '',
    supplier_name: '',
    material_price_perUnit: '',
    stock_value: '',
    measurement_unit: '',
  });

  // Handle form field changes
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm({
      ...addForm,
      [name]: value,
    });
  };

  // Handle form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/admin/materials', addForm); // Send the data to the backend
      fetchMaterials(); // Refresh the materials list
      setIsAdding(false); // Close the form after submission
      alert('Material added successfully');
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  return (
    <div>
      <h3>Add New Material</h3>
      <form onSubmit={handleAddSubmit}>
        <div>
          <label>Material Name:</label>
          <input
            type="text"
            name="material_name"
            value={addForm.material_name}
            onChange={handleAddChange}
            required
          />
        </div>
        <div>
          <label>Material Quantity:</label>
          <input
            type="number"
            name="material_quantity"
            value={addForm.material_quantity}
            onChange={handleAddChange}
            required
          />
        </div>
        <div>
          <label>Supplier Name:</label>
          <input
            type="text"
            name="supplier_name"
            value={addForm.supplier_name}
            onChange={handleAddChange}
            required
          />
        </div>
        <div>
          <label>Price per Unit:</label>
          <input
            type="number"
            name="material_price_perUnit"
            value={addForm.material_price_perUnit}
            onChange={handleAddChange}
            required
          />
        </div>
        <div>
          <label>Stock Value:</label>
          <input
            type="number"
            name="stock_value"
            value={addForm.stock_value}
            onChange={handleAddChange}
            required
          />
        </div>
        <div>
          <label>Measurement Unit:</label>
          <input
            type="text"
            name="measurement_unit"
            value={addForm.measurement_unit}
            onChange={handleAddChange}
            required
          />
        </div>
        <button type="submit">Add Material</button>
      </form>
    </div>
  );
};

export default AddMaterial;
