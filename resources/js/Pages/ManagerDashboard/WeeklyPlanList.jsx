import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeeklyPlansList = () => {
  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
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

  // Fetch all weekly plans
  useEffect(() => {
    fetchWeeklyPlans();
  }, []);

  const fetchWeeklyPlans = async () => {
    try {
      const response = await axios.get('/api/weeklyplans');
      setWeeklyPlans(response.data);
    } catch (error) {
      console.error('Error fetching weekly plans:', error);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this weekly plan?')) {
      try {
        await axios.delete(`/api/weeklyplans/${id}`);
        setWeeklyPlans(weeklyPlans.filter((plan) => plan.id !== id));
        alert('Weekly plan deleted successfully');
      } catch (error) {
        console.error('Error deleting weekly plan:', error);
        alert('Failed to delete weekly plan');
      }
    }
  };

  // Handle edit button click to pre-fill the form
  const handleEdit = (plan) => {
    setSelectedPlan(plan.id);
    setFormData({
      factory: plan.factory,
      week_start_date: plan.week_start_date,
      week_end_date: plan.week_end_date,
      status: plan.status,
      notes: plan.notes || '',
      materials_needed: plan.materials_needed || [],
      total_cost: plan.total_cost || '',
    });
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding a new material to the list
  const addMaterial = () => {
    setFormData((prevData) => ({
      ...prevData,
      materials_needed: [
        ...prevData.materials_needed,
        { product_id: '', quantity: '' },
      ],
    }));
  };

  // Handle removing a material from the list
  const removeMaterial = (index) => {
    const updatedMaterials = formData.materials_needed.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      materials_needed: updatedMaterials,
    }));
  };

  // Handle material field changes
  const handleMaterialChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMaterials = [...formData.materials_needed];
    updatedMaterials[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      materials_needed: updatedMaterials,
    }));
  };

  // Handle updating the weekly plan
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedPlan = await axios.put(`/api/weeklyplans/${selectedPlan}`, formData);
      setSuccessMessage('Weekly plan updated successfully!');
      setSelectedPlan(null);
      fetchWeeklyPlans(); // Refresh the list
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
      console.error('Error updating weekly plan:', error);
      setError('Failed to update weekly plan');
    }
  };

  // Render weekly plans list
  return (
    <div>
      <h2>Weekly Plans</h2>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      <table>
        <thead>
          <tr>
            <th>Factory</th>
            <th>Week Start Date</th>
            <th>Week End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {weeklyPlans.length > 0 ? (
            weeklyPlans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.factory}</td>
                <td>{new Date(plan.week_start_date).toLocaleDateString()}</td>
                <td>{new Date(plan.week_end_date).toLocaleDateString()}</td>
                <td>{plan.status}</td>
                <td>
                  <button onClick={() => handleEdit(plan)}>Edit</button>
                  <button onClick={() => handleDelete(plan.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No weekly plans found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Form */}
      {selectedPlan && (
        <div>
          <h3>Edit Weekly Plan</h3>
          <form onSubmit={handleUpdate}>
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
              <label htmlFor="materials_needed">Materials Needed</label>
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

            <button type="submit">Update Weekly Plan</button>
            <button type="button" onClick={() => setSelectedPlan(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WeeklyPlansList;
