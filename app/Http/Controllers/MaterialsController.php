<?php

namespace App\Http\Controllers;

use App\Models\Materials;
use Illuminate\Http\Request;

class MaterialsController extends Controller
{
    // Add a new material to the stock
    public function add(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'material_name' => 'required|string',
            'material_quantity' => 'required|integer',
            'supplier_name' => 'required|string',
            'material_price_perUnit' => 'required|string',
            'stock_value' => 'required|integer',
            'measurement_unit' => 'required|string',
        ]);

        try {
            // Create a new material record
            $material = Materials::create($validated);

            return response()->json(['message' => 'Material added successfully', 'material' => $material], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error adding material', 'error' => $e->getMessage()], 500);
        }
    }

    // Fetch all materials in the stock
    public function fetch()
    {
        try {
            $materials = Materials::all();
            return response()->json($materials, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching materials', 'error' => $e->getMessage()], 500);
        }
    }

    // Update a specific material in the stock
    public function update(Request $request, $id)
    {
        // Validate incoming request
        $validated = $request->validate([
            'material_name' => 'nullable|string',
            'material_quantity' => 'nullable|integer',
            'supplier_name' => 'nullable|string',
            'material_price_perUnit' => 'nullable|string',
            'stock_value' => 'nullable|integer',
            'measurement_unit' => 'nullable|string',
        ]);

        try {
            // Find the material to be updated
            $material = Materials::find($id);

            if (!$material) {
                return response()->json(['message' => 'Material not found'], 404);
            }

            // Update material attributes
            $material->update($validated);

            return response()->json(['message' => 'Material updated successfully', 'material' => $material], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating material', 'error' => $e->getMessage()], 500);
        }
    }

    // Delete a specific material from the stock
    public function delete($id)
    {
        try {
            // Find the material to be deleted
            $material = Materials::find($id);

            if (!$material) {
                return response()->json(['message' => 'Material not found'], 404);
            }

            // Delete the material
            $material->delete();

            return response()->json(['message' => 'Material deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting material', 'error' => $e->getMessage()], 500);
        }
    }
}
