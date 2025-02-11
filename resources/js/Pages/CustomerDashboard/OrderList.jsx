import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Trash2 } from 'lucide-react';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);  // Store selected order for editing
    const [orderData, setOrderData] = useState({
        expected_delivery: '',
        payment_status: '',
        products_ordered: [],  // Initialize as an empty array
        total_cost: '',
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrders(Array.isArray(response.data) ? response.data : response.data.data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle delete order
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await axios.delete(`/api/orders/${id}`);
                setOrders(orders.filter(order => order.id !== id));
                alert('Order deleted successfully');
            } catch (error) {
                console.error('Error deleting order:', error);
                alert('Failed to delete order');
            }
        }
    };

    // Handle Edit Button click
    const handleEdit = (order) => {
        setSelectedOrder(order.id);
        setOrderData({
            expected_delivery: order.expected_delivery,
            payment_status: order.payment_status,
            products_ordered: Array.isArray(order.products_ordered) ? order.products_ordered : [], // Ensure it's an array
            total_cost: order.total_cost,
        });
    };

    // Handle updating the order
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const updatedOrderData = {
                ...orderData,
                products_ordered: orderData.products_ordered, // Ensure products_ordered is an array
            };

            // Send the PUT request to update the order
            await axios.put(`/api/orders/${selectedOrder}`, updatedOrderData);

            setSelectedOrder(null);  // Close the form after updating
            fetchOrders();  // Refresh the orders list
            alert('Order updated successfully!');
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Failed to update order');
        }
    };

    // Render orders list
    return (
        <div>
            <h2>Your Orders</h2>
            {isLoading ? (
                <p>Loading orders...</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date Placed</th>
                        <th>Expected Delivery</th>
                        <th>Payment Status</th>
                        <th>Products Ordered</th>
                        <th>Total Cost</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                <td>{new Date(order.expected_delivery).toLocaleDateString()}</td>
                                <td>{order.payment_status}</td>
                                <td>
                                    {order.products_ordered && Array.isArray(order.products_ordered) ? (
                                        <ul>
                                            {order.products_ordered.map((product, index) => (
                                                <li key={index}>
                                                    Product ID: {product.product_id} (x{product.quantity})
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No products ordered</p>
                                    )}
                                </td>
                                <td>${order.total_cost}</td>
                                <td>
                                    <button onClick={() => handleEdit(order)}>
                                        <Edit2 size={18} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(order.id)}>
                                        <Trash2 size={18} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No orders found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}

            {/* Edit Form Modal or Section */}
            {selectedOrder && (
                <div className="edit-form">
                    <h3>Edit Order</h3>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label htmlFor="expected_delivery">Expected Delivery</label>
                            <input
                                type="date"
                                id="expected_delivery"
                                value={orderData.expected_delivery}
                                onChange={(e) => setOrderData({ ...orderData, expected_delivery: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="payment_status">Payment Status</label>
                            <input
                                type="text"
                                id="payment_status"
                                value={orderData.payment_status}
                                onChange={(e) => setOrderData({ ...orderData, payment_status: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="total_cost">Total Cost</label>
                            <input
                                type="number"
                                id="total_cost"
                                value={orderData.total_cost}
                                onChange={(e) => setOrderData({ ...orderData, total_cost: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="products_ordered">Products Ordered</label>
                            {orderData.products_ordered.map((product, index) => (
                                <div key={index}>
                                    <input
                                        type="number"
                                        placeholder="Product ID"
                                        value={product.product_id}
                                        onChange={(e) => {
                                            const updatedProducts = [...orderData.products_ordered];
                                            updatedProducts[index].product_id = e.target.value;
                                            setOrderData({ ...orderData, products_ordered: updatedProducts });
                                        }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        value={product.quantity}
                                        onChange={(e) => {
                                            const updatedProducts = [...orderData.products_ordered];
                                            updatedProducts[index].quantity = e.target.value;
                                            setOrderData({ ...orderData, products_ordered: updatedProducts });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <button type="submit">Update Order</button>
                        <button type="button" onClick={() => setSelectedOrder(null)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default OrderList;
