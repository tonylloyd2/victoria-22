import React, { useState } from 'react';
import axios from 'axios';

const AddProductionCost = () => {
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState('');
    const [materialTotalCost, setMaterialCost] = useState('');
    const [laborCost, setLaborCost] = useState('');
    const [energyCost, setEnergyCost] = useState('');
    const [maintenanceCost, setMaintenanceCost] = useState('');
    const [overheadCost, setOverheadCost] = useState('');
    const [adminCost, setAdminCost] = useState('');
    const [facilityCost, setFacilityCost] = useState('');
    const [additionalCost, setAdditionalCost] = useState('');
    const [revenue, setRevenue] = useState('');
    const [itemsProducedPerDay, setItemsProducedPerDay] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [factory, setFactory] = useState(''); // Added factory state

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/production-costs', {
                product_id: productId,
                product_name: productName,
                material_total_cost: materialTotalCost,
                labor_cost: laborCost,
                energy_cost: energyCost,
                maintenance_cost: maintenanceCost,
                overhead_cost: overheadCost,
                admin_cost: adminCost,
                facility_cost: facilityCost,
                additional_cost: additionalCost,
                revenue: revenue,
                items_produced_perday: itemsProducedPerDay,
                production_date: productionDate,
                factory: factory // Sending factory field
            });
            console.log('Production cost added:', response.data);
        } catch (error) {
            console.error('Error adding production cost:', error);
        }
    };

    return (
        <div>
            <h2>Add Production Cost</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product ID:</label>
                    <input
                        type="number"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Factory:</label>
                    <input
                        type="text"
                        value={factory}
                        onChange={(e) => setFactory(e.target.value)} // Handle factory input
                        required
                    />
                </div>
                <div>
                    <label>Production Date:</label>
                    <input
                        type="date"
                        value={productionDate}
                        onChange={(e) => setProductionDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Material Cost:</label>
                    <input
                        type="number"
                        value={materialTotalCost}
                        onChange={(e) => setMaterialCost(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Labor Cost:</label>
                    <input
                        type="number"
                        value={laborCost}
                        onChange={(e) => setLaborCost(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Energy Cost:</label>
                    <input
                        type="number"
                        value={energyCost}
                        onChange={(e) => setEnergyCost(e.target.value)}
                    />
                </div>
                <div>
                    <label>Maintenance Cost:</label>
                    <input
                        type="number"
                        value={maintenanceCost}
                        onChange={(e) => setMaintenanceCost(e.target.value)}
                    />
                </div>
                <div>
                    <label>Overhead Cost:</label>
                    <input
                        type="number"
                        value={overheadCost}
                        onChange={(e) => setOverheadCost(e.target.value)}
                    />
                </div>
                <div>
                    <label>Admin Cost:</label>
                    <input
                        type="number"
                        value={adminCost}
                        onChange={(e) => setAdminCost(e.target.value)}
                    />
                </div>
                <div>
                    <label>Facility Cost:</label>
                    <input
                        type="number"
                        value={facilityCost}
                        onChange={(e) => setFacilityCost(e.target.value)}
                    />
                </div>
                <div>
                    <label>Additional Cost:</label>
                    <input
                        type="number"
                        value={additionalCost}
                        onChange={(e) => setAdditionalCost(e.target.value)}
                    />
                </div>
                <div>
                    <label>Revenue:</label>
                    <input
                        type="number"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Items Produced Per Day:</label>
                    <input
                        type="number"
                        value={itemsProducedPerDay}
                        onChange={(e) => setItemsProducedPerDay(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Production Cost</button>
            </form>
        </div>
    );
};

export default AddProductionCost;
