<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Production;  // Assuming you have a Production model

class ProductionManagement extends Controller
{
    // GET: Retrieve all production records
    public function index()
    {
        // Fetch all production records, ordered by ID (descending)
        $productions = Production::orderBy('id', 'desc')->get();
        return response()->json($productions);
    }

    // GET: Retrieve a single production record by ID
    public function show($id)
    {
        $production = Production::find($id);
        if (!$production) {
            return response()->json(['message' => 'Production record not found'], 404);
        }
        return response()->json($production);
    }

    // POST: Create a new production record with calculated costs
    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'product_id' => 'required|integer',  // Ensure product_id is required
            'material_total_cost' => 'nullable|numeric',
            'factory' => 'required|string',
            'product_name' => 'required|string',
            'labor_cost' => 'required|numeric',
            'energy_cost' => 'required|numeric',
            'maintenance_cost' => 'required|numeric',
            'overhead_cost' => 'required|numeric',
            'admin_cost' => 'required|numeric',
            'facility_cost' => 'required|numeric',
            'additional_cost' => 'required|numeric',
            'revenue' => 'required|numeric',
            'items_produced_perday' => 'nullable|integer',
            'production_date' => 'required|date',
        ]);

        // Proceed with the calculations directly:
        $totalCost = array_sum([
            $validated['material_total_cost'] ?? 0,
            $validated['labor_cost'] ?? 0,
            $validated['energy_cost'] ?? 0,
            $validated['maintenance_cost'] ?? 0,
            $validated['overhead_cost'] ?? 0,
            $validated['admin_cost'] ?? 0,
            $validated['facility_cost'] ?? 0,
            $validated['additional_cost'] ?? 0
        ]);

        $costPerItem = $validated['items_produced_perday'] > 0 ? $totalCost / $validated['items_produced_perday'] : 0;
        $profitLoss = isset($validated['revenue']) ? $validated['revenue'] - $totalCost : 0;

        // Create the production record
        $production = Production::create([
            'product_id' => $validated['product_id'],  // Ensure product_id is included
            'product_name' => $validated['product_name'],
            'material_total_cost' => $validated['material_total_cost'],
            'factory' => $validated['factory'],
            'labor_cost' => $validated['labor_cost'],
            'energy_cost' => $validated['energy_cost'],
            'maintenance_cost' => $validated['maintenance_cost'],
            'overhead_cost' => $validated['overhead_cost'],
            'admin_cost' => $validated['admin_cost'],
            'facility_cost' => $validated['facility_cost'],
            'additional_cost' => $validated['additional_cost'],
            'total_cost' => $totalCost,
            'cost_per_item' => $costPerItem,
            'revenue' => $validated['revenue'],
            'profit_loss' => $profitLoss,
            'items_produced_perday' => $validated['items_produced_perday'] ?? 0,
            'production_date' => $validated['production_date'],
        ]);

        return response()->json($production, 201); // Return the created production record
    }

    // PUT: Update an existing production record
    public function update(Request $request, $id)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'product_id' => 'required|integer',  // Ensure product_id is required
            'factory' => 'required|string', // Ensure factory is required
            'product_name' => 'required|string',  // Ensure product_name is required
            'material_total_cost' => 'nullable|numeric',
            'labor_cost' => 'nullable|numeric',
            'energy_cost' => 'nullable|numeric',
            'maintenance_cost' => 'nullable|numeric',
            'overhead_cost' => 'nullable|numeric',
            'admin_cost' => 'nullable|numeric',
            'facility_cost' => 'nullable|numeric',
            'additional_cost' => 'nullable|numeric',
            'revenue' => 'nullable|numeric',
            'items_produced_perday' => 'nullable|integer',
            'production_date' => 'required|date',  // Ensure production_date is required
        ]);

        $production = Production::find($id);
        if (!$production) {
            return response()->json(['message' => 'Production record not found'], 404);
        }

        // Proceed with the calculations directly:
        $totalCost = array_sum([
            $validated['material_total_cost'] ?? $production->material_total_cost,
            $validated['labor_cost'] ?? $production->labor_cost,
            $validated['energy_cost'] ?? $production->energy_cost,
            $validated['maintenance_cost'] ?? $production->maintenance_cost,
            $validated['overhead_cost'] ?? $production->overhead_cost,
            $validated['admin_cost'] ?? $production->admin_cost,
            $validated['facility_cost'] ?? $production->facility_cost,
            $validated['additional_cost'] ?? $production->additional_cost
        ]);

        $costPerItem = $validated['items_produced_perday'] > 0 ? $totalCost / $validated['items_produced_perday'] : 0;
        $profitLoss = isset($validated['revenue']) ? $validated['revenue'] - $totalCost : 0;

        // Update the production record
        $production->update([
            'product_id' => $validated['product_id'],
            'product_name' => $validated['product_name'],
            'material_total_cost' => $validated['material_total_cost'],
            'factory' => $validated['factory'],
            'labor_cost' => $validated['labor_cost'],
            'energy_cost' => $validated['energy_cost'],
            'maintenance_cost' => $validated['maintenance_cost'],
            'overhead_cost' => $validated['overhead_cost'],
            'admin_cost' => $validated['admin_cost'],
            'facility_cost' => $validated['facility_cost'],
            'additional_cost' => $validated['additional_cost'],
            'total_cost' => $totalCost,
            'cost_per_item' => $costPerItem,
            'revenue' => $validated['revenue'],
            'profit_loss' => $profitLoss,
            'items_produced_perday' => $validated['items_produced_perday'] ?? 0,
            'production_date' => $validated['production_date'],
        ]);

        return response()->json($production); // Return the updated production record
    }

    // DELETE: Remove a production record
    public function destroy($id)
    {
        $production = Production::find($id);
        if (!$production) {
            return response()->json(['message' => 'Production record not found'], 404);
        }
        $production->delete();
        return response()->json(['message' => 'Production record deleted successfully']);
    }
}
