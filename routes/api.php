<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\TripController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // Add other protected routes here
    Route::get('/driver',[DriverController::class, 'show']);
    Route::post('/driver',[DriverController::class, 'update']);

    Route::post('/trip',[TripController::class, 'store']);
    Route::get('/trip/{trip}',[TripController::class, 'show']);
    Route::post('/trip/{trip}/accept',[TripController::class,'accept']);
    Route::post('/trip/{trip}/start',[TripController::class,'start']);
    Route::post('/trip/{trip}/end',[TripController::class,'end']);
    Route::post('/trip/{trip}/location',[TripController::class,'location']);
    
});
