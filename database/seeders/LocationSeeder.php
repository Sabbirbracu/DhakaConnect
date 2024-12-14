<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            ['name' => 'Savar', 'latitude' => 23.841, 'longitude' => 90.257],
            ['name' => 'Hemayetpur', 'latitude' => 23.824, 'longitude' => 90.334],
            ['name' => 'Amin Bazar', 'latitude' => 23.806, 'longitude' => 90.360],
            ['name' => 'Gabtoli', 'latitude' => 23.774, 'longitude' => 90.358],
            ['name' => 'Technical', 'latitude' => 23.778, 'longitude' => 90.365],
            ['name' => 'Kallyanpur', 'latitude' => 23.789, 'longitude' => 90.377],
            ['name' => 'Shyamoli', 'latitude' => 23.761, 'longitude' => 90.390],
            ['name' => 'Badda', 'latitude' => 23.895, 'longitude' => 90.460],
            ['name' => 'Rampura Bridge', 'latitude' => 23.910, 'longitude' => 90.478],
        ];

        foreach ($locations as $location) {
            Location::updateOrCreate(['name' => $location['name']], $location);
        }
    }
}
