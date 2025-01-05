<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            ['name' => 'Gabtoli', 'latitude' => 23.774, 'longitude' => 90.358],
            ['name' => 'Technical', 'latitude' => 23.778, 'longitude' => 90.365],
            ['name' => 'Kallyanpur', 'latitude' => 23.789, 'longitude' => 90.377],
            ['name' => 'Shyamoli', 'latitude' => 23.761, 'longitude' => 90.390],
            ['name' => 'Farmgate', 'latitude' => 23.754, 'longitude' => 90.392],
            ['name' => 'Mohakhali', 'latitude' => 23.776, 'longitude' => 90.399],
            ['name' => 'Gulshan 1', 'latitude' => 23.778, 'longitude' => 90.403],
            ['name' => 'Wireless', 'latitude' => 23.780, 'longitude' => 90.405],
            ['name' => 'Badda', 'latitude' => 23.895, 'longitude' => 90.460],
            ['name' => 'Merul Badda', 'latitude' => 23.910, 'longitude' => 90.478],
            ['name' => 'Rampura Bridge', 'latitude' => 23.906, 'longitude' => 90.479],
            ['name' => 'Banani', 'latitude' => 23.810, 'longitude' => 90.413],
            ['name' => 'Kuril', 'latitude' => 23.831, 'longitude' => 90.415],
            ['name' => 'Airport', 'latitude' => 23.850, 'longitude' => 90.408],
            ['name' => 'Azampur', 'latitude' => 23.867, 'longitude' => 90.406],
            ['name' => 'House Building', 'latitude' => 23.876, 'longitude' => 90.402],
            ['name' => 'Abdullahpur', 'latitude' => 23.886, 'longitude' => 90.396],
            ['name' => 'Uttara', 'latitude' => 23.897, 'longitude' => 90.400],
            ['name' => 'Savar', 'latitude' => 23.841, 'longitude' => 90.257],
            ['name' => 'Mirpur 10', 'latitude' => 23.808, 'longitude' => 90.370],
            ['name' => 'Kazipara', 'latitude' => 23.810, 'longitude' => 90.367],
            ['name' => 'Shewrapara', 'latitude' => 23.813, 'longitude' => 90.363],
            ['name' => 'Agargaon', 'latitude' => 23.814, 'longitude' => 90.356],
        ];

        foreach ($locations as $location) {
            Location::firstOrCreate($location);
        }
    }
}
