import React, { useState } from 'react';
import axios from 'axios';

const AddWeeklyPlan = () => {
  const [formData, setFormData] = useState({
    factory: '',
    week_start_date: '',
    week_end_date: '',
    status: 'draft', // Default to 'draft'
    notes: '',
    materials_needed: [],
    total_cost: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding new product to materials_needed (if needed)
  const handleMaterialChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMaterials = [...formData.materials_needed];
    updatedMaterials[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      materials_needed: updatedMaterials,
    }));
  };

  const addMaterial = () => {
    setFormData((prevData) => ({
      ...prevData,
      materials_needed: [
        ...prevData.materials_needed,
        { product_id: '', quantity: '' },
      ],
    }));
  };

  const removeMaterial = (index) => {
    const updatedMaterials = formData.materials_needed.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      materials_needed: updatedMaterials,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear any previous errors or success messages
      setError(null);
      setSuccessMessage(null);

      // Send POST request to create weekly plan
      const response = await axios.post('/api/weeklyplans', formData);
      
      setSuccessMessage('Weekly Plan created successfully!');
      setFormData({
        factory: '',
        week_start_date: '',
        week_end_date: '',
        status: 'draft',
        notes: '',
        materials_needed: [],
        total_cost: '',
      });
    } catch (error) {
      // Handle error response from API
      if (error.response) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('An error occurred while submitting the form.');
      }
    }
  };

  return (
    <div>
      <h2>Add Weekly Plan</h2>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="factory">Factory</label>
          <input
            type="text"
            id="factory"
            name="factory"
            value={formData.factory}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="week_start_date">Week Start Date</label>
          <input
            type="date"
            id="week_start_date"
            name="week_start_date"
            value={formData.week_start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="week_end_date">Week End Date</label>
          <input
            type="date"
            id="week_end_date"
            name="week_end_date"
            value={formData.week_end_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Materials Needed</label>
          {formData.materials_needed.map((material, index) => (
            <div key={index}>
              <input
                type="text"
                name="product_id"
                placeholder="Product ID"
                value={material.product_id}
                onChange={(e) => handleMaterialChange(index, e)}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={material.quantity}
                onChange={(e) => handleMaterialChange(index, e)}
                required
              />
              <button type="button" onClick={() => removeMaterial(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addMaterial}>Add Material</button>
        </div>

        <div>
          <label htmlFor="total_cost">Total Cost</label>
          <input
            type="number"
            id="total_cost"
            name="total_cost"
            value={formData.total_cost}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Weekly Plan</button>
      </form>
    </div>
  );
};

export default AddWeeklyPlan;
