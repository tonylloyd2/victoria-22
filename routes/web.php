<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\FactoryController;
use App\Http\Controllers\EmployeesController;
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

// Manager routes accessible to admin only
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
});

// Factory routes accessible to admin only
Route::middleware('auth:sanctum')->group(function () {
    Route::get('admin/factories', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(FactoryController::class)->index();
    })->name('admin.factories.index');

    Route::post('api/factories', function (Request $request) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(FactoryController::class)->store($request);
    })->name('admin.factories.store');

    Route::put('api/factories/{id}', function (Request $request, $id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(FactoryController::class)->update($request, $id);
    })->name('admin.factories.update');

    Route::delete('api/factories/{id}', function ($id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(FactoryController::class)->destroy($id);
    })->name('admin.factories.destroy');

    // Route to fetch available managers
    Route::get('api/available-managers', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(ManagerController::class)->availableManagers();
    })->name('available.managers');

    // Route to fetch all factories
    Route::get('api/factories', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(FactoryController::class)->index();
    })->name('api.factories.index');
});

// Employee routes accessible to admin only
Route::middleware('auth:sanctum')->group(function () {
    Route::get('admin/employees', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(EmployeesController::class)->index();
    })->name('admin.employees.index');

    Route::post('api/employees', function (Request $request) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(EmployeesController::class)->store($request);
    })->name('admin.employees.store');

    Route::get('api/employees/{id}', function ($id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(EmployeesController::class)->show($id);
    })->name('admin.employees.show');

    Route::put('api/employees/{id}', function (Request $request, $id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(EmployeesController::class)->update($request, $id);
    })->name('admin.employees.update');

    Route::delete('api/employees/{id}', function ($id) {
        if (Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        return app(EmployeesController::class)->destroy($id);
    })->name('admin.employees.destroy');
});
