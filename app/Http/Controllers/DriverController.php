<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;

// class DriverController extends Controller
// {
//     //
//     public function show(Request $request){

//         //return $request->user();
//         $user=$request->user();
//         $user->load('driver');
//         return $user;
//     }


//     public function update(){
//         $request->validate([
//             'year' => 'required|numeric|between:1990,2024',
//             'make' => 'required',
//             'model' => 'required',
//             'color' => 'required|alpha',
//             'license_plate' => 'required',
//             'name' => 'required'
//         ]);

//         $user = $request->user();
//         $user->update($request->only('name'));

//         $user->driver()->updateOrCreate($request->only([
//             'year',
//             'make',
//             'model',
//             'color',
//             'license_plate'
//         ]));
//         $user->load('driver');
//         return $user;

//     }
// }


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Driver;
use Illuminate\Support\Facades\Hash;

class DriverController extends Controller
{
    public function registerDriver(Request $request)
    {
        // Validate the input
        $request->validate([
            'fname' => 'required|string|max:50',
            'lname' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:15|unique:users,phone',
            'gender' => 'required|in:male,female',
            'address' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
            'nid' => 'required|string|max:50|unique:drivers,nid',
            'driving_license' => 'required|string|max:50|unique:drivers,driving_license',
            'blood_group' => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'dop_test' => 'required|in:positive,negative',
            'vehicle_type' => 'required|in:car,CNG',
            'vehicle_number' => 'required|string|max:20|unique:drivers,vehicle_number',
            'year' => 'required|numeric|between:1990,2025', // Vehicle year
            'make' => 'required|string|max:50', // Vehicle make
            'model' => 'required|string|max:50', // Vehicle model
            'color' => 'required|string|max:30', // Vehicle color
            'license_plate' => 'required|string|max:20|unique:drivers,license_plate', // Add this
        ]);

        // Create the user record
        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'phone' => $request->phone,
            'email' => $request->email,
            'gender' => $request->gender,
            'address' => $request->address,
            'password' => $request->password,
            'role' => 'driver',
        ]);

        // Create the driver record
        Driver::create([
            'user_id' => $user->id,
            'nid' => $request->nid,
            'driving_license' => $request->driving_license,
            'blood_group' => $request->blood_group,
            'dop_test' => $request->dop_test,
            'vehicle_type' => $request->vehicle_type,
            'vehicle_number' => $request->vehicle_number,
            'year' => $request->year,
            'make' => $request->make,
            'model' => $request->model,
            'color' => $request->color,
            'license_plate' => $request->license_plate, // Add this
        ]);

        return response()->json(['message' => 'Driver registered successfully'], 201);
    }
}
