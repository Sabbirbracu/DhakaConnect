<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RideRequest;
use App\Models\User;
use Carbon\Carbon;

class RideRequestController extends Controller
{
    public function createRideRequest(Request $request)
    {
        $validated = $request->validate([
            'end_location_id' => 'required|exists:locations,id',
        ]);

        $rideRequest = RideRequest::create([
            'user_id' => $request->user()->id, // Assuming authentication middleware
            'end_location_id' => $validated['end_location_id'],
        ]);

        return response()->json(['message' => 'Ride request created', 'ride_request' => $rideRequest], 201);
    }

    public function getRideGroup(Request $request, $end_location_id)
    {
        $fiveMinutesAgo = Carbon::now()->subMinutes(5);

        $rideRequests = RideRequest::where('end_location_id', $end_location_id)
            ->where('created_at', '>=', $fiveMinutesAgo)
            ->take(3)
            ->with('user')
            ->get();

        return response()->json(['group' => $rideRequests], 200);
    }
}
