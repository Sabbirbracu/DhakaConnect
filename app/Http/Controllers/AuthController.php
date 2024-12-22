<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'fname'     => 'required|string|max:255',
            'lname'     => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|min:8|confirmed',
            'gender'    => 'required|string',
            'phone'     => 'required|numeric|unique:users,phone', // if you want to validate phone
        ]);
        

        $user = User::create([
            'fname'     => $request->fname,
            'lname'     => $request->lname,
            'phone'     => $request->phone,
            'email'     => $request->email,
            'password'  => $request->password, // hashing done automatically in model or you can Hash::make here
            'gender'    => $request->gender,
        ]);

        // Generate a Sanctum token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    public function getAllUsers()
    {
        // Fetch all users from the database
        $users = User::all();

        // Return response as JSON
        return response()->json([
            'message' => 'Users retrieved successfully',
            'data'    => $users
        ], 200);
    }



    public function login(Request $request)
    {
        try{
            $request->validate([
                'email'    => 'required|email',
                'password' => 'required',
            ]);
    
            $user = User::where('email', $request->email)->first();
    
            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
    
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'message' => 'Logged in successfully',
                'user'    => $user,
                'token'   => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
            ], 500);
        }
        
    }
}
