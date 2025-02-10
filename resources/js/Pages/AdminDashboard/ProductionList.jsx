import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Trash2 } from 'lucide-react';

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
        <div className="space-y-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factory</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {productions.map((production) => (
                                <tr key={production.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{production.product_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{production.product_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{production.factory}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{production.production_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => handleEdit(production)} className="text-indigo-600 hover:text-indigo-900">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(production.id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Production</h3>
                        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
                            {/* Form fields in a two-column layout */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Product ID</label>
                                <input
                                    type="number"
                                    name="productId"
                                    value={editForm.productId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={editForm.productName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Factory</label>
                                <input
                                    type="text"
                                    name="factory"
                                    value={editForm.factory}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Production Date</label>
                                <input
                                    type="date"
                                    name="productionDate"
                                    value={editForm.productionDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Material Cost</label>
                                <input
                                    type="number"
                                    name="materialTotalCost"
                                    value={editForm.materialTotalCost}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Labor Cost</label>
                                <input
                                    type="number"
                                    name="laborCost"
                                    value={editForm.laborCost}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Energy Cost</label>
                                <input
                                    type="number"
                                    name="energyCost"
                                    value={editForm.energyCost}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Maintenance Cost</label>
                                <input
                                    type="number"
                                    name="maintenanceCost"
                                    value={editForm.maintenanceCost}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Overhead Cost</label>
                                <input
                                    type="number"
                                    name="overheadCost"
                                    value={editForm.overheadCost}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Admin Cost</label>
                                <input
                                    type="number"
                                    name="adminCost"
                                    value={editForm.adminCost}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Facility Cost</label>
                                <input
                                    type="number"
                                    name="facilityCost"
                                    value={editForm.facilityCost}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Additional Cost</label>
                                <input
                                    type="number"
                                    name="additionalCost"
                                    value={editForm.additionalCost}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Revenue</label>
                                <input
                                    type="number"
                                    name="revenue"
                                    value={editForm.revenue}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Items Produced Per Day</label>
                                <input
                                    type="number"
                                    name="itemsProducedPerDay"
                                    value={editForm.itemsProducedPerDay}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-2 mt-4 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                                >
                                    Update Production
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductionList;
