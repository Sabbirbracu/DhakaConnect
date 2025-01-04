<?php

// namespace App\Models;

// // use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Foundation\Auth\User as Authenticatable;
// use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
// use Illuminate\Support\Facades\Hash; // Import the Hash facade

// class User extends Authenticatable
// {
//     use HasApiTokens, HasFactory, Notifiable;

//     /**
//      * The attributes that are mass assignable.
//      *
//      * @var array<int, string>
//      */
//     protected $fillable = [
//         'fname',
//         'lname',
//         'phone',
//         'email',
//         'password',
//         'gender',
//         'role', // Add this
//         'login_code'
//     ];
    

//     /**
//      * The attributes that should be hidden for serialization.
//      *
//      * @var array<int, string>
//      */
//     protected $hidden = [
//         'password',
//         'remember_token',
//     ];

//     /**
//      * Boot method to handle model events.
//      */
//     protected static function boot()
//     {
//         parent::boot();

//         static::creating(function ($user) {
//             if (isset($user->password)) {
//                 $user->password = Hash::make($user->password);
//             }
//         });

//         static::updating(function ($user) {
//             if ($user->isDirty('password')) {
//                 $user->password = Hash::make($user->password);
//             }
//         });
//     }

//     public function routeNotificationForTwilio()
//     {
//         return $this->phone;
//     }

//     public function driver()
//     {
//         return $this->hasOne(Driver::class);
//     }

//     public function trips()
//     {
//         return $this->hasMany(Trip::class);
//     }
// }


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'fname',
        'lname',
        'phone',
        'email',
        'password',
        'gender',
        'role', // Add this to differentiate users and drivers
        'login_code'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected static function boot()
    {
        parent::boot();

        // static::creating(function ($user) {
        //     if (isset($user->password)) {
        //         $user->password = Hash::make($user->password);
        //     }
        //     if (!isset($user->role)) {
        //         $user->role = 'user'; // Default to 'user'
        //     }
        // });

        // static::updating(function ($user) {
        //     if ($user->isDirty('password')) {
        //         $user->password = Hash::make($user->password);
        //     }
        // });
    }

    public function driver()
    {
        return $this->hasOne(Driver::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
}
