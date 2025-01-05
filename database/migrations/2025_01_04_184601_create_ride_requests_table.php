<?php

// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// return new class extends Migration
// {
//     /**
//      * Run the migrations.
//      */
//     public function up(): void
//     {
//         Schema::create('ride_requests', function (Blueprint $table) {
//             $table->id();
//             $table->unsignedBigInteger('user_id');
//             $table->unsignedBigInteger('end_location_id');
//             $table->timestamp('created_at');
//             $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
//             $table->foreign('end_location_id')->references('id')->on('locations')->onDelete('cascade');
//         });
//     }

//     /**
//      * Reverse the migrations.
//      */
//     public function down(): void
//     {
//         Schema::dropIfExists('ride_requests');
//     }
// };


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /** 
     
*Run the migrations.*
*@return void*/
public function up(): void{Schema::create('ride_requests', function (Blueprint $table) {$table->id();$table->unsignedBigInteger('user_id');$table->unsignedBigInteger('end_location_id');$table->timestamps();  // This will automatically create 'created_at' and 'updated_at' columns
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');$table->foreign('end_location_id')->references('id')->on('locations')->onDelete('cascade');});}

    /*** 
     
Reverse the migrations.*
@return void*/
public function down(): void{Schema::dropIfExists('ride_requests');}
};