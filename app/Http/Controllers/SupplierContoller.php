<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    // Method to add a new supplier
    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email',
            'mobile_number' => 'required|string|max:20',
            'materials_supplied' => 'required|array',
        ]);

        // Create the supplier record
        $supplier = Supplier::create($validated);

        // Return the created supplier
        return response()->json($supplier, 201);
    }

    // Method to update an existing supplier
    public function update(Request $request, $id)
    {
        // Find the supplier by ID
        $supplier = Supplier::find($id);

        // If the supplier doesn't exist, return an error
        if (!$supplier) {
            return response()->json(['message' => 'Supplier not found'], 404);
        }

        // Validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email,' . $id,
            'mobile_number' => 'required|string|max:20',
            'materials_supplied' => 'required|array',
        ]);

        // Update the supplier with the validated data
        $supplier->update($validated);

        // Return the updated supplier
        return response()->json($supplier);
    }

    // Method to delete a supplier
    public function destroy($id)
    {
        // Find the supplier by ID
        $supplier = Supplier::find($id);

        // If the supplier doesn't exist, return an error
        if (!$supplier) {
            return response()->json(['message' => 'Supplier not found'], 404);
        }

        // Delete the supplier
        $supplier->delete();

        // Return a success message
        return response()->json(['message' => 'Supplier deleted successfully']);
    }

    // Method to fetch all suppliers
    public function index()
    {
        // Fetch all suppliers
        $suppliers = Supplier::all();

        // Return the list of suppliers
        return response()->json($suppliers);
    }
}
