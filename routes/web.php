<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\FactoryController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\ProductionManagement;
use App\Http\Controllers\SupplierController; // Correct namespace
use App\Http\Controllers\MaterialsController; // Correct namespace for Materials
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

    Route::get('admin/managers/all', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ManagerController::class)->fetchAll();
    })->name('admin.managers.fetchAll');

    Route::get('api/employees', function () {
        return app(EmployeesController::class)->index();
    })->name('api.employees.index');

    Route::post('api/employees', function (Request $request) {
        return app(EmployeesController::class)->store($request);
    })->name('api.employees.store');

    Route::get('api/employees/{id}', function ($id) {
        return app(EmployeesController::class)->show($id);
    })->name('api.employees.show');

    Route::put('api/employees/{id}', function (Request $request, $id) {
        return app(EmployeesController::class)->update($request, $id);
    })->name('api.employees.update');

    Route::delete('api/employees/{id}', function ($id) {
        return app(EmployeesController::class)->destroy($id);
    })->name('api.employees.destroy');

    Route::get('api/factories', function () {
        return app(FactoryController::class)->index();
    })->name('api.factories.index');

    Route::post('api/factories', function (Request $request) {
        return app(FactoryController::class)->store($request);
    })->name('api.factories.store');

    Route::get('api/factories/{id}', function ($id) {
        return app(FactoryController::class)->show($id);
    })->name('api.factories.show');

    Route::put('api/factories/{id}', function (Request $request, $id) {
        return app(FactoryController::class)->update($request, $id);
    })->name('api.factories.update');

    Route::delete('api/factories/{id}', function ($id) {
        return app(FactoryController::class)->destroy($id);
    })->name('api.factories.destroy');

    Route::get('admin/products', [ProductController::class, 'index'])->name('admin.products.index');
    Route::post('admin/products', [ProductController::class, 'store'])->name('admin.products.store');
    Route::put('admin/products/{id}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('admin/products/{id}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
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

// Admin routes for managing suppliers (only accessible by admins)
Route::middleware('auth:sanctum')->group(function () {
    // Supplier Routes accessible to admin only
    Route::get('admin/suppliers', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(SupplierController::class)->index();  // Fetch all suppliers
    })->name('admin.suppliers.index');
    
    
    Route::post('admin/suppliers', function (Request $request) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(SupplierController::class)->store($request);  // Add a new supplier
    })->name('admin.suppliers.store');

    Route::put('admin/suppliers/{id}', function (Request $request, $id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(SupplierController::class)->update($request, $id);  // Update an existing supplier
    })->name('admin.suppliers.update');

    Route::delete('admin/suppliers/{id}', function ($id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(SupplierController::class)->destroy($id);  // Delete a supplier
    })->name('admin.suppliers.destroy');
});

// Admin routes for managing materials (only accessible by admins)
Route::middleware('auth:sanctum')->group(function () {
    // Material Routes accessible to admin only
    Route::get('admin/materials', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(MaterialsController::class)->fetch();  // Fetch all materials
    })->name('admin.materials.index');

    Route::post('admin/materials', function (Request $request) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(MaterialsController::class)->add($request);  // Add a new material
    })->name('admin.materials.store');

    Route::put('admin/materials/{id}', function (Request $request, $id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(MaterialsController::class)->update($request, $id);  // Update an existing material
    })->name('admin.materials.update');

    Route::delete('admin/materials/{id}', function ($id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(MaterialsController::class)->delete($id);  // Delete a material
    })->name('admin.materials.destroy');
});
