<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('start_location_id');
            $table->unsignedBigInteger('end_location_id');
            $table->decimal('distance', 8, 2);
            $table->decimal('fare', 8, 2);
            $table->string('buses'); // Comma-separated bus names
            $table->timestamps();
        
            $table->foreign('start_location_id')->references('id')->on('locations');
            $table->foreign('end_location_id')->references('id')->on('locations');      
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('routes');
    }
};
