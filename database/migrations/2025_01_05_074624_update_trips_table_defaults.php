<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTripsTableDefaults extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('trips', function (Blueprint $table) {
            // Add the status column if it does not exist
            if (!Schema::hasColumn('trips', 'status')) {
                $table->string('status')->default('created'); // Add status column with a default value
            }

            // Make other fields nullable (if needed)
            if (Schema::hasColumn('trips', 'start_lat')) {
                $table->decimal('start_lat', 10, 7)->nullable()->change();
            }
            if (Schema::hasColumn('trips', 'start_lng')) {
                $table->decimal('start_lng', 10, 7)->nullable()->change();
            }
            if (Schema::hasColumn('trips', 'destination_lat')) {
                $table->decimal('destination_lat', 10, 7)->nullable()->change();
            }
            if (Schema::hasColumn('trips', 'destination_lng')) {
                $table->decimal('destination_lng', 10, 7)->nullable()->change();
            }
            if (Schema::hasColumn('trips', 'destination_name')) {
                $table->string('destination_name')->nullable()->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('trips', function (Blueprint $table) {
            // Drop the status column if it was added
            if (Schema::hasColumn('trips', 'status')) {
                $table->dropColumn('status');
            }
        });
    }
}
