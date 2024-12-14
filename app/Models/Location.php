<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'latitude', 'longitude'];

    public function startRoutes()
    {
        return $this->hasMany(Route::class, 'start_location_id');
    }

    public function endRoutes()
    {
        return $this->hasMany(Route::class, 'end_location_id');
    }
}
