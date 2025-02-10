<?php

namespace App\Http\Controllers;

use App\Models\Factory;
use Illuminate\Http\Request;


class FactoryController extends Controller
{
    // Fetch all factories
    public function index()
    {
        $factories = Factory::all();
        return response()->json($factories);
    }

    // Add a new factory
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'manager' => 'required|integer|unique:factory,manager',
        ]);

        $factory = Factory::create($request->all());
        return response()->json($factory, 201);
    }

    // Update an existing factory
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'manager' => 'sometimes|required|integer|unique:factory,manager,' . $id,
        ]);

        $factory = Factory::findOrFail($id);
        $factory->update($request->all());
        return response()->json($factory);
    }

    // Delete a factory
    public function destroy($id)
    {
        $factory = Factory::findOrFail($id);
        $factory->delete();
        return response()->json(null, 204);
    }
}
