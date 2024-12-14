<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Route;
use App\Models\Location;

class RouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $routes = [
            ['start' => 'Savar', 'end' => 'Hemayetpur', 'distance' => 5, 'buses' => 'Agradut, Achim'],
            ['start' => 'Hemayetpur', 'end' => 'Amin Bazar', 'distance' => 4, 'buses' => 'Agradut, Achim'],
            ['start' => 'Amin Bazar', 'end' => 'Gabtoli', 'distance' => 6, 'buses' => 'Agradut, Achim'],
            ['start' => 'Badda', 'end' => 'Rampura Bridge', 'distance' => 3, 'buses' => 'Alif, Achim'],
        ];

        foreach ($routes as $route) {
            $start = Location::where('name', $route['start'])->first();
            $end = Location::where('name', $route['end'])->first();

            Route::create([
                'start_location_id' => $start->id,
                'end_location_id' => $end->id,
                'distance' => $route['distance'],
                'fare' => $route['distance'] * 5, // Fare is 5 BDT per km
                'buses' => $route['buses'],
            ]);
        }
    }
}
