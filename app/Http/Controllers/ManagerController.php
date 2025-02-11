<?php

namespace App\Http\Controllers;

use App\Models\Manager;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagerController extends Controller
{
    public function index()
    {
        return inertia::render('ManagerDashboard/Managers');
    }

    // Add a new manager
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string',
        ]);

        $manager = Manager::create($request->all());
        return response()->json($manager, 201);
    }

    // Update an existing manager
    public function update(Request $request, $email)
    {
        $manager = Manager::where('email', $email)->firstOrFail();

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $manager->id,
            'password' => 'sometimes|required|string|min:8',
            'role' => 'sometimes|required|string',
        ]);

        $manager->update($request->all());
        return response()->json($manager);
    }

    // Delete a manager
    public function destroy($email)
    {
        $manager = Manager::where('email', $email)->firstOrFail();
        $manager->delete();
        return response()->json(null, 204);
    }

    // Fetch all managers
    public function fetchAll()
    {
        $managers = Manager::all();
        return response()->json($managers);
    }

    // Initial logic
    
    public function availableManagers()
    {
        $managers = \App\Models\User::where('role', 'manager')
            ->whereNotIn('id', function ($query) {
                $query->select('manager')->from('factory');
            })
            ->get(['id', 'name']);
        return response()->json($managers);
    }
}
