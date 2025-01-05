<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TripController extends Controller
{
    //
    public function store(Request $request){
        $request->validate([
            'origin' => 'required',
            'destination' => 'required',
            'destination_name' => 'required'

        ]);

        return $request->user()->trips()->create($request->only([
            'origin',
            'destination',
            'destination_name'
        ]));
    }

    public function show(Request $request, Trip $trip){
        // is the trip associated with the auth user?
        if($trip->driver->id == $request->user()->id){
            return $trip;
        }

        if($trip->driver && $request->user()->driver){
            if($trip->driver->id == $request->user()->driver->id){
                return $trip;
            }
        }

        return response()->json(['message'=> "Can't find this trip"],404);


    }


    public function accept(Request $request, Trip $trip){
        //a driver accepts a trip
        $request->validate([
            'driver_location'=>'required'
        ]);
        
        
        $trip->update([
            'driver_id'=> $request->user()->id,
            'driver_location'=>$request->driver_location
        ]);

        $trip->load('driver.user');

        TripAccepted::dispatch($trip, $trip->user);

        return $trip;
    }


    public function start(Request $request, Trip $trip){
        //a driver has started taking a passenger to their location
        $trip->update([
            'is_started' => true
        ]);
        $trip->load('driver.user');

        TripStarted::dispatch($trip, $request->user());
        return $trip;
    }


    public function end(Request $request, Trip $trip){
        //a driver has ended a trip
        $trip->update([
            'is_complete' => true
        ]);
        $trip->load('driver.user');

        TripEnded::dispatch($trip, $request->user());

        return $trip;
    }



    public function location(Request $request, Trip $trip){
        //update the driver's current location
        $request->validate([
            'driver_location' => 'required'
        ]);
        
        $trip->update([
            'driver_location'=>$request->driver_location
        ]);

        $trip->load('driver.user');

        TripLocationUpdated::dispatch($trip, $trip->user);
        return $trip;
    }

    public function createTrip(Request $request)
    {
        $request->validate([
            'origin' => 'required|array',
            'origin.lat' => 'required|numeric',
            'origin.lng' => 'required|numeric',
            'destination' => 'required|array',
            'destination.lat' => 'required|numeric',
            'destination.lng' => 'required|numeric',
            'destination_name' => 'required|string|max:255',
            'driver_id' => 'required|exists:drivers,id',
        ]);
    
        $trip = Trip::create([
            'start_lat' => $request->origin['lat'],
            'start_lng' => $request->origin['lng'],
            'destination_lat' => $request->destination['lat'],
            'destination_lng' => $request->destination['lng'],
            'destination_name' => $request->destination_name,
            'driver_id' => $request->driver_id,
            'status' => 'created',
        ]);
    
        return response()->json($trip, 201);
    }
    

}
