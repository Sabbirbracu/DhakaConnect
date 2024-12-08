<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\UserResource;



class Authcontroller extends Controller
{
    //
   public function login(Request $request)
   {
       // Validate incoming request
       $request->validate([
           'email' => 'required|email',
           'password' => 'required|min:8',
       ]);

       // Check if credentials are correct
       $user = User::where('email', $request->email)->first();

       if (!$user || !Hash::check($request->password, $user->password)) {
           throw ValidationException::withMessages([
               'email' => ['The provided credentials are incorrect.'],
           ]);
       }

       // Generate token using Laravel Sanctum or JWT
       // Here, we're using Laravel Sanctum (you can also use JWT if you prefer)

       $token = $user->createToken('ConnectDHakaApp')->plainTextToken;

       // Return success response with token
       return response()->json([
           'message' => 'Login successful',
           'token' => $token,
           'user' => new UserResource($user)
       ]);
   }
}

