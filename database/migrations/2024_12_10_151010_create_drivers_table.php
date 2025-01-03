<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->string('nid')->unique(); // National ID
            $table->string('driving_license')->unique(); // Driving License
            $table->enum('blood_group', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
            $table->enum('dop_test', ['positive', 'negative']);
            $table->enum('vehicle_type', ['car', 'CNG']); // Type of vehicle
            $table->string('vehicle_number')->unique(); // Add this line
            $table->integer('year'); // Vehicle year
            $table->string('make'); // Vehicle make
            $table->string('model'); // Vehicle model
            $table->string('color'); // Vehicle color
            $table->string('license_plate')->unique(); // Vehicle license plate
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
