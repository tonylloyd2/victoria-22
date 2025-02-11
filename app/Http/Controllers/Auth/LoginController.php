<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Login');
    }  

    public function home()
    {
        return Inertia::render('Home');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            $response = [
                'auth' => [
                    'user' => $user,
                ],
                'token' => $token,
            ];

            switch ($user->role) {
                case 'admin':
                    return Inertia::render('AdminDashboard/AdminDashboard', $response);
                case 'manager':
                    return inertia::render('ManagerDashboard/ManagerDashboard', $response);
                case 'customer':
                    return Inertia::render('CustomerDashboard/CustomerDashboard', $response);
                default:
                    Auth::logout();
                    return Inertia::render('Login', ['errors' => ['role' => 'Invalid role']]);
            }
        }

        return Inertia::render('Login', ['errors' => ['email' => 'Invalid credentials']]);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete();
        Auth::logout();
        return Inertia::render('Login');
    }

    public function showRegistrationForm()
    {
        return Inertia::render('Register');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return Inertia::render('Register', ['errors' => $validator->errors()]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'customer',
        ]);

        Auth::login($user);

        return Inertia::render('CustomerDashboard/CustomerDashboard', [
            'auth' => [
                'user' => $user,
            ],
        ]);
    }
}
