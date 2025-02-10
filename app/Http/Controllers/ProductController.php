<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Fetch all products
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Add a new product
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price_per_unit' => 'required|numeric',
            'availability_in_stock' => 'required|boolean', // Boolean validation
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle the image upload
        $imagePath = $request->file('image')->store('public/products');

        // Create the product
        $product = Product::create([
            'name' => $validated['name'],
            'price_per_unit' => $validated['price_per_unit'],
            'availability_in_stock' => $validated['availability_in_stock'], // Save as boolean
            'image_path' => $imagePath, // Save the path to the image
        ]);

        return response()->json($product, 201); // Return the created product
    }

    // Edit a product
    public function update(Request $request, $id)
    {
        // Find the product
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Validate the request
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'price_per_unit' => 'nullable|numeric',
            'availability_in_stock' => 'nullable|boolean', // Boolean validation
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle the image upload if present
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            Storage::delete($product->image_path);

            // Store the new image
            $imagePath = $request->file('image')->store('public/products');
            $product->image_path = $imagePath;
        }

        // Update the product fields
        $product->update(array_filter($validated));

        return response()->json($product); // Return the updated product
    }

    // Delete a product
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete the product's image
        Storage::delete($product->image_path);

        // Delete the product
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
