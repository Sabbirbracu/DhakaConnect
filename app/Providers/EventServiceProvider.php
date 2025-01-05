<?php
namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        'App\Events\TripLocationUpdated' => [
            'App\Listeners\SendTripLocationNotification',
        ],
        'App\Events\TripStarted' => [
            'App\Listeners\SendTripStartedNotification',
        ],
        'App\Events\TripEnded' => [
            'App\Listeners\SendTripEndedNotification',
        ],
    ];

    public function boot()
    {
        parent::boot();
    }
}