<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Fetch all orders
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    // Create a new order
    public function store(Request $request)
    {
        // Validation
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'expected_delivery' => 'required|date',
            'payment_status' => 'required|string',
            'products_ordered' => 'required|array', // The products must be an array of products
            'products_ordered.*.product_id' => 'required|exists:products,id',
            'products_ordered.*.quantity' => 'required|integer|min:1',
            'total_cost'=> 'required|numeric',
            'order_date' => 'required|date'
        ]);

        // Create the order (only saving data in the orders table)
        $order = Order::create([
            'user_id' => $validated['user_id'],
            'expected_delivery' => $validated['expected_delivery'],
            'payment_status' => $validated['payment_status'],
            'products_ordered' => json_encode($validated['products_ordered']), // Store products as JSON
            'total_cost' => $validated['total_cost'], // Store the total cost from request
            'order_date' => $validated['order_date'], // Store the order date from request
        ]);

        return response()->json($order, 201); // Return the created order
    }

    // Fetch a single order
    public function show($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    // Delete an order
    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }

    // Update an order (without updating other tables)
    public function update(Request $request, $id)
    {
        // Find the order
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Validation
        $validated = $request->validate([
            'expected_delivery' => 'nullable|date',
            'payment_status' => 'nullable|string',
            'order_date' => 'nullable|date',
            'products_ordered' => 'nullable|array',
            'products_ordered.*.product_id' => 'nullable|exists:products,id',
            'products_ordered.*.quantity' => 'nullable|integer|min:1',
            'total_cost'=> 'nullable|numeric', // Make total_cost nullable, it will be updated if provided
        ]);

        // Update the order details (only updating the order)
        if (isset($validated['expected_delivery'])) {
            $order->expected_delivery = $validated['expected_delivery'];
        }
        if (isset($validated['payment_status'])) {
            $order->payment_status = $validated['payment_status'];
        }
        if (isset($validated['order_date'])) {
            $order->order_date = $validated['order_date'];
        }
        if (isset($validated['products_ordered'])) {
            $order->products_ordered = json_encode($validated['products_ordered']);
        }

        // If total_cost is provided, update it
        if (isset($validated['total_cost'])) {
            $order->total_cost = $validated['total_cost'];
        }

        // Save the updated order
        $order->save();

        return response()->json($order); // Return the updated order
    }
}
