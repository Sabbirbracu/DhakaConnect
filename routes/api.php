<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\RouteController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user-data', [AuthController::class, 'getAllUsers']);
Route::post('/register-driver', [DriverController::class, 'registerDriver']);

Route::post('/test-password', function (Request $request) {
    $user = App\Models\User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    if (Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Password matches']);
    } else {
        return response()->json(['message' => 'Incorrect password'], 401);
    }
});


// Test routes (public for now)
Route::post('/direct-buses', [RouteController::class, 'getDirectBuses']);
Route::post('/multi-bus-routes', [RouteController::class, 'getMultiBusRoutes']);
Route::post('/shortest-path', [RouteController::class, 'getShortestRoute']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Other protected routes
    Route::get('/driver', [DriverController::class, 'show']);
    Route::post('/driver', [DriverController::class, 'update']);
    Route::post('/trip', [TripController::class, 'store']);
    Route::get('/trip/{trip}', [TripController::class, 'show']);
    Route::post('/trip/{trip}/accept', [TripController::class, 'accept']);
    Route::post('/trip/{trip}/start', [TripController::class, 'start']);
    Route::post('/trip/{trip}/end', [TripController::class, 'end']);
    Route::post('/trip/{trip}/location', [TripController::class, 'location']);
});
