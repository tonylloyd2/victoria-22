import React, { useState } from 'react';
import axios from 'axios';

const AddOrder = () => {
    const [order, setOrder] = useState({
        user_id: '',
        expected_delivery: '',
        payment_status: '',
        order_date: '',
        total_cost: '',
        products_ordered: [{ product_id: '', quantity: 1 }],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value,
        });
    };

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...order.products_ordered];
        updatedProducts[index][name] = value;
        setOrder({ ...order, products_ordered: updatedProducts });
    };

    const addProduct = () => {
        setOrder({
            ...order,
            products_ordered: [...order.products_ordered, { product_id: '', quantity: 1 }],
        });
    };

    const removeProduct = (index) => {
        const updatedProducts = order.products_ordered.filter((_, i) => i !== index);
        setOrder({ ...order, products_ordered: updatedProducts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure total_cost is a number
        const orderData = {
            ...order,
            total_cost: parseFloat(order.total_cost)
        };

        console.log('Order Data:', orderData); // Log the corrected data

        try {
            const response = await axios.post('/api/orders', orderData);
            alert('Order created successfully!');
        } catch (error) {
            console.error('Error creating order:', error.response?.data || error);
            alert('There was an error creating your order. Please try again.');
        }
    };



    return (
        <div>
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user_id">User ID</label>
                    <input
                        type="text"
                        id="user_id"
                        name="user_id"
                        value={order.user_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="expected_delivery">Expected Delivery</label>
                    <input
                        type="date"
                        id="expected_delivery"
                        name="expected_delivery"
                        value={order.expected_delivery}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="payment_status">Payment Status</label>
                    <input
                        type="text"
                        id="payment_status"
                        name="payment_status"
                        value={order.payment_status}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="order_date">Order Date</label>
                    <input
                        type="date"
                        id="order_date"
                        name="order_date"
                        value={order.order_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="total_cost">Total Cost</label>
                    <input
                        type="number"
                        id="total_cost"
                        name="total_cost"
                        value={order.total_cost}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Products Ordered</label>
                    {order.products_ordered.map((product, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="product_id"
                                value={product.product_id}
                                placeholder="Product ID"
                                onChange={(e) => handleProductChange(index, e)}
                                required
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                                placeholder="Quantity"
                                min="1"
                                onChange={(e) => handleProductChange(index, e)}
                                required
                            />
                            <button type="button" onClick={() => removeProduct(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addProduct}>
                        Add Product
                    </button>
                </div>

                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default AddOrder;
