<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Route;
use App\Models\Location;

class RouteSeeder extends Seeder
{
    public function run(): void
    {
        $routes = [
            // Alif Bus Routes
            ['start' => 'Mirpur 10', 'end' => 'Kazipara', 'distance' => 2, 'buses' => 'Alif'],
            ['start' => 'Kazipara', 'end' => 'Shewrapara', 'distance' => 1, 'buses' => 'Alif'],
            ['start' => 'Shewrapara', 'end' => 'Agargaon', 'distance' => 2, 'buses' => 'Alif'],
            ['start' => 'Agargaon', 'end' => 'Farmgate', 'distance' => 2, 'buses' => 'Alif'],
            ['start' => 'Farmgate', 'end' => 'Mohakhali', 'distance' => 2, 'buses' => 'Alif'],
            ['start' => 'Mohakhali', 'end' => 'Wireless', 'distance' => 2, 'buses' => 'Alif'],
            ['start' => 'Wireless', 'end' => 'Gulshan 1', 'distance' => 2, 'buses' => 'Alif'],
            ['start' => 'Gulshan 1', 'end' => 'Badda', 'distance' => 3, 'buses' => 'Alif'],
            ['start' => 'Badda', 'end' => 'Merul Badda', 'distance' => 1, 'buses' => 'Alif'],
            ['start' => 'Merul Badda', 'end' => 'Rampura Bridge', 'distance' => 2, 'buses' => 'Alif'],

            // Achim Bus Routes
            ['start' => 'Gabtoli', 'end' => 'Technical', 'distance' => 2, 'buses' => 'Achim'],
            ['start' => 'Technical', 'end' => 'Kallyanpur', 'distance' => 3, 'buses' => 'Achim'],
            ['start' => 'Kallyanpur', 'end' => 'Shyamoli', 'distance' => 1, 'buses' => 'Achim'],
            ['start' => 'Shyamoli', 'end' => 'Farmgate', 'distance' => 2, 'buses' => 'Achim'],
            ['start' => 'Farmgate', 'end' => 'Mohakhali', 'distance' => 2, 'buses' => 'Achim'],
            ['start' => 'Mohakhali', 'end' => 'Badda', 'distance' => 5, 'buses' => 'Achim'],
            ['start' => 'Badda', 'end' => 'Rampura Bridge', 'distance' => 2, 'buses' => 'Achim'],

            // Ajmeri Glory Bus Routes
            ['start' => 'Gabtoli', 'end' => 'Technical', 'distance' => 2, 'buses' => 'Ajmeri Glory'],
            ['start' => 'Technical', 'end' => 'Kallyanpur', 'distance' => 3, 'buses' => 'Ajmeri Glory'],
            ['start' => 'Kallyanpur', 'end' => 'Shyamoli', 'distance' => 1, 'buses' => 'Ajmeri Glory'],
            ['start' => 'Shyamoli', 'end' => 'Farmgate', 'distance' => 2, 'buses' => 'Ajmeri Glory'],
            ['start' => 'Farmgate', 'end' => 'Mohakhali', 'distance' => 2, 'buses' => 'Ajmeri Glory'],
            ['start' => 'Mohakhali', 'end' => 'Banani', 'distance' => 3, 'buses' => 'Ajmeri Glory'],
            ['start' => 'Banani', 'end' => 'Rampura Bridge', 'distance' => 2, 'buses' => 'Ajmeri Glory'],
        ];

        // Loop for forward routes
        foreach ($routes as $route) {
            $start = Location::where('name', $route['start'])->first();
            $end = Location::where('name', $route['end'])->first();

            if (!$start || !$end) {
                echo "Invalid route: {$route['start']} to {$route['end']}\n";
                continue;
            }

            Route::create([
                'start_location_id' => $start->id,
                'end_location_id' => $end->id,
                'distance' => $route['distance'],
                'fare' => $route['distance'] * 5, // Assume 5 BDT per km
                'buses' => $route['buses'],
            ]);
        }

        // Loop for reverse routes
        foreach ($routes as $route) {
            $start = Location::where('name', $route['start'])->first();
            $end = Location::where('name', $route['end'])->first();

            if (!$start || !$end) {
                echo "Invalid reverse route: {$route['end']} to {$route['start']}\n";
                continue;
            }

            Route::create([
                'start_location_id' => $end->id, // Reverse start and end
                'end_location_id' => $start->id,
                'distance' => $route['distance'], // Same distance for reverse
                'fare' => $route['distance'] * 5, // Assume same fare
                'buses' => $route['buses'], // Same bus for reverse route
            ]);
        }

        echo "All routes (forward and reverse) added successfully.\n";
    }
}
