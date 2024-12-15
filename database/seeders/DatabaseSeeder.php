<?php

namespace Database\Seeders; // Ensure this is defined

use Illuminate\Database\Seeder; // Import the Seeder class
use Illuminate\Support\Facades\Hash; // Import Hash for password encryption

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Check if the user already exists before inserting
        \DB::table('users')->updateOrInsert(
            ['email' => 'test@example.com'], // Match on email
            [
                'fname' => 'John', // First name
                'lname' => 'Doe', // Last name
                'phone' => '9876573210', // Use a unique phone number
                'gender' => 'male', // Gender
                'password' => Hash::make('password123'), // Hashed password
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // Call other seeders
        $this->call([
            LocationSeeder::class,
            RouteSeeder::class,
        ]);
    }
}
