<?php

// namespace App\Models;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class Route extends Model
// {
//     use HasFactory;

//     protected $fillable = ['start_location_id', 'end_location_id', 'distance', 'fare', 'buses'];

//     public function startLocation()
//     {
//         return $this->belongsTo(Location::class, 'start_location_id');
//     }

//     public function endLocation()
//     {
//         return $this->belongsTo(Location::class, 'end_location_id');
//     }
// }

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;

    protected $fillable = ['start_location_id', 'end_location_id', 'distance', 'fare', 'buses'];

    // Define relationship with start location
    public function startLocation()
    {
        return $this->belongsTo(Location::class, 'start_location_id');
    }

    // Define relationship with end location
    public function endLocation()
    {
        return $this->belongsTo(Location::class, 'end_location_id');
    }
}
