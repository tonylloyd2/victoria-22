<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\FactoryController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\ProductionManagement; // Add this line for the production cost controller
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

// Post routes
Route::get('/', [PostController::class, 'index']);
Route::resource('posts', PostController::class)->except('index');

// Authentication routes
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');

// Dashboard routes based on roles
Route::middleware('auth:sanctum')->group(function () {
    Route::get('admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('manager/dashboard', [ManagerController::class, 'index'])->name('manager.dashboard');
    Route::get('customer/dashboard', [CustomerController::class, 'index'])->name('customer.dashboard');
});

// Registration routes
Route::get('/register', [LoginController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [LoginController::class, 'register']);

// Admin routes for managing managers
Route::middleware('auth:sanctum')->group(function () {
    Route::get('admin/managers', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ManagerController::class)->index();
    })->name('admin.managers.index');

    Route::post('admin/managers', function (Request $request) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ManagerController::class)->store($request);
    })->name('admin.managers.store');

    Route::put('admin/managers/{email}', function (Request $request, $email) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ManagerController::class)->update($request, $email);
    })->name('admin.managers.update');

    Route::delete('admin/managers/{email}', function ($email) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ManagerController::class)->destroy($email);
    })->name('admin.managers.destroy');

    // Fetch all managers
    Route::get('admin/managers/all', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ManagerController::class)->fetchAll();
    })->name('admin.managers.fetchAll');
});

// Admin routes for managing productions (only accessible by admins)
Route::middleware('auth:sanctum')->group(function () {
    // Production Routes accessible to admin only
    Route::get('admin/productions', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ProductionManagement::class)->index();  // Fetch all production records
    })->name('admin.productions.index');

    Route::post('admin/productions', function (Request $request) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ProductionManagement::class)->store($request);  // Add a new production record
    })->name('admin.productions.store');

    Route::put('admin/productions/{id}', function (Request $request, $id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ProductionManagement::class)->update($request, $id);  // Update an existing production record
    })->name('admin.productions.update');

    Route::delete('admin/productions/{id}', function ($id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ProductionManagement::class)->destroy($id);  // Delete a production record
    })->name('admin.productions.destroy');
});
