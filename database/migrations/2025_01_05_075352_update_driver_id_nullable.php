<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDriverIdNullable extends Migration
{
    public function up()
    {
        Schema::table('trips', function (Blueprint $table) {
            $table->unsignedBigInteger('driver_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('trips', function (Blueprint $table) {
            $table->unsignedBigInteger('driver_id')->nullable(false)->change();
        });
    }
}
