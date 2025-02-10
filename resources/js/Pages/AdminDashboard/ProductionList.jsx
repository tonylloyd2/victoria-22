import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductionList = () => {
    const [productions, setProductions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        id: '',
        productName: '',
        productId: '',
        materialTotalCost: '',
        laborCost: '',
        energyCost: '',
        maintenanceCost: '',
        overheadCost: '',
        adminCost: '',
        facilityCost: '',
        additionalCost: '',
        revenue: '',
        itemsProducedPerDay: '',
        productionDate: '',
        factory: ''
    });

    // Fetch all productions on component mount
    useEffect(() => {
        fetchProductions();
    }, []);

    const fetchProductions = async () => {
        try {
            const response = await axios.get('/admin/productions');  // Assuming this endpoint returns all productions
            setProductions(response.data);
        } catch (error) {
            console.error('Error fetching productions:', error);
        }
    };

    const handleEdit = (production) => {
        setIsEditing(true);
        setEditForm({
            id: production.id,
            productName: production.product_name,
            productId: production.product_id,
            materialTotalCost: production.material_total_cost,
            laborCost: production.labor_cost,
            energyCost: production.energy_cost,
            maintenanceCost: production.maintenance_cost,
            overheadCost: production.overhead_cost,
            adminCost: production.admin_cost,
            facilityCost: production.facility_cost,
            additionalCost: production.additional_cost,
            revenue: production.revenue,
            itemsProducedPerDay: production.items_produced_perday,
            productionDate: production.production_date,
            factory: production.factory
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/admin/productions/${id}`);
            setProductions(productions.filter(production => production.id !== id));
            console.log('Production deleted successfully');
        } catch (error) {
            console.error('Error deleting production:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/admin/productions/${editForm.id}`, {
                product_id: editForm.productId,
                product_name: editForm.productName,
                production_date: editForm.productionDate,
                factory: editForm.factory,
                material_total_cost: editForm.materialTotalCost,
                labor_cost: editForm.laborCost,
                energy_cost: editForm.energyCost,
                maintenance_cost: editForm.maintenanceCost,
                overhead_cost: editForm.overheadCost,
                admin_cost: editForm.adminCost,
                facility_cost: editForm.facilityCost,
                additional_cost: editForm.additionalCost,
                revenue: editForm.revenue,
                items_produced_perday: editForm.itemsProducedPerDay
            });
            setProductions(productions.map((production) => production.id === editForm.id ? response.data : production));
            setIsEditing(false);
            setEditForm({});
            console.log('Production updated successfully');
        } catch (error) {
            console.error('Error updating production:', error);
        }
    };

    return (
        <div>
            <h2>Production List</h2>
            <table>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Factory</th>
                    <th>Production Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {productions.map((production) => (
                    <tr key={production.id}>
                        <td>{production.product_id}</td>
                        <td>{production.product_name}</td>
                        <td>{production.factory}</td>
                        <td>{production.production_date}</td>
                        <td>
                            <button onClick={() => handleEdit(production)}>Edit</button>
                            <button onClick={() => handleDelete(production.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isEditing && (
                <div>
                    <h3>Edit Production</h3>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Product ID:</label>
                            <input
                                type="number"
                                name="productId"
                                value={editForm.productId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="productName"
                                value={editForm.productName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Factory:</label>
                            <input
                                type="text"
                                name="factory"
                                value={editForm.factory}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Production Date:</label>
                            <input
                                type="date"
                                name="productionDate"
                                value={editForm.productionDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Material Cost:</label>
                            <input
                                type="number"
                                name="materialTotalCost"
                                value={editForm.materialTotalCost}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Labor Cost:</label>
                            <input
                                type="number"
                                name="laborCost"
                                value={editForm.laborCost}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Energy Cost:</label>
                            <input
                                type="number"
                                name="energyCost"
                                value={editForm.energyCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Maintenance Cost:</label>
                            <input
                                type="number"
                                name="maintenanceCost"
                                value={editForm.maintenanceCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Overhead Cost:</label>
                            <input
                                type="number"
                                name="overheadCost"
                                value={editForm.overheadCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Admin Cost:</label>
                            <input
                                type="number"
                                name="adminCost"
                                value={editForm.adminCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Facility Cost:</label>
                            <input
                                type="number"
                                name="facilityCost"
                                value={editForm.facilityCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Additional Cost:</label>
                            <input
                                type="number"
                                name="additionalCost"
                                value={editForm.additionalCost}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Revenue:</label>
                            <input
                                type="number"
                                name="revenue"
                                value={editForm.revenue}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Items Produced Per Day:</label>
                            <input
                                type="number"
                                name="itemsProducedPerDay"
                                value={editForm.itemsProducedPerDay}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Update Production</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductionList;
