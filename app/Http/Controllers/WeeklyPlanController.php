<?php

namespace App\Http\Controllers;

use App\Models\Weeklyplan; // Import the Weeklyplan model
use Illuminate\Http\Request;

class WeeklyPlanController extends Controller
{
    /**
     * Fetch all weekly plans.
     */
    public function index()
    {
        // Fetch all weekly plans from the database
        $weeklyPlans = Weeklyplan::all();
        return response()->json($weeklyPlans);
    }

    /**
     * Fetch a single weekly plan by its ID.
     */
    public function show($id)
    {
        // Fetch a single weekly plan by its ID
        $weeklyPlan = Weeklyplan::find($id);

        if (!$weeklyPlan) {
            return response()->json(['message' => 'Weekly plan not found'], 404);
        }

        return response()->json($weeklyPlan);
    }

    /**
     * Create a new weekly plan.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'factory' => 'required|string|max:255',
            'week_start_date' => 'required|date',
            'week_end_date' => 'required|date',
            'status' => 'required|in:draft,pending,approved,rejected',
            'notes' => 'nullable|string',
            'materials_needed' => 'nullable|array',
            'total_cost' => 'nullable|numeric',
        ]);

        // Create a new weekly plan with the validated data
        $weeklyPlan = Weeklyplan::create($validated);

        return response()->json($weeklyPlan, 201); // Return the newly created weekly plan with a 201 status
    }

    /**
     * Update an existing weekly plan.
     */
    public function update(Request $request, $id)
    {
        // Find the weekly plan by its ID
        $weeklyPlan = Weeklyplan::find($id);

        if (!$weeklyPlan) {
            return response()->json(['message' => 'Weekly plan not found'], 404);
        }

        // Validate incoming request
        $validated = $request->validate([
            'factory' => 'required|string|max:255',
            'week_start_date' => 'required|date',
            'week_end_date' => 'required|date',
            'status' => 'required|in:draft,pending,approved,rejected',
            'notes' => 'nullable|string',
            'materials_needed' => 'nullable|array',
            'total_cost' => 'nullable|numeric',
        ]);

        // Update the weekly plan with the validated data
        $weeklyPlan->update($validated);

        return response()->json($weeklyPlan); // Return the updated weekly plan
    }

    /**
     * Delete a weekly plan by its ID.
     */
    public function destroy($id)
    {
        // Find the weekly plan by its ID
        $weeklyPlan = Weeklyplan::find($id);

        if (!$weeklyPlan) {
            return response()->json(['message' => 'Weekly plan not found'], 404);
        }

        // Delete the weekly plan
        $weeklyPlan->delete();

        return response()->json(['message' => 'Weekly plan deleted successfully']);
    }
}
