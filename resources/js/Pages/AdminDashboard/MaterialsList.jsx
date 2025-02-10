// MaterialsList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('/admin/materials');
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  return (
    <div>
      <h2>Material List</h2>
      <table>
        <thead>
          <tr>
            <th>Material Name</th>
            <th>Material Quantity</th>
            <th>Supplier Name</th>
            <th>Price per Unit</th>
            <th>Stock Value</th>
            <th>Measurement Unit</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id}>
              <td>{material.material_name}</td>
              <td>{material.material_quantity}</td>
              <td>{material.supplier_name}</td>
              <td>{material.material_price_perUnit}</td>
              <td>{material.stock_value}</td>
              <td>{material.measurement_unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialList;  // Ensure it's a default export
