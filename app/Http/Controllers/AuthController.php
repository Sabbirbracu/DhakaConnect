<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Registration with role
    public function register(Request $request)
    {
        $request->validate([
            'fname'     => 'required|string|max:255',
            'lname'     => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|min:8|confirmed',
            'gender'    => 'required|string',
            'phone'     => 'required|numeric|unique:users,phone',
            'role'      => 'nullable|string|in:user,driver' // Validate role
        ]);

        $user = User::create([
            'fname'     => $request->fname,
            'lname'     => $request->lname,
            'phone'     => $request->phone,
            'email'     => $request->email,
            'password'  => $request->password, // No hashing
            'gender'    => $request->gender,
            'role'      => $request->role ?? 'user'
        ]);
        
        
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    // Get all users (optional)
    public function getAllUsers()
    {
        $users = User::all();

        return response()->json([
            'message' => 'Users retrieved successfully',
            'data'    => $users,
        ], 200);
    }

    // Login with role
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email'    => 'required|email',
                'password' => 'required',
            ]);
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json([
                    'message' => 'User with this email does not exist.',
                ], 404);
            }
            if ($request->password !== $user->password) {
                return response()->json([
                    'message' => 'Incorrect password. Please try again.',
                ], 401);
            }

            
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Logged in successfully',
                'user'    => [
                    'id'    => $user->id,
                    'email' => $user->email,
                    'name'  => $user->fname . ' ' . $user->lname,
                    'role'  => $user->role, // Include role in response
                ],
                'token'   => $token,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Log the exception for debugging
            \Log::error('Login Error: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while processing your request. Please try again later.',
            ], 500);
        }
    }
}
