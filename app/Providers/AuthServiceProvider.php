<?php

// AuthServiceProvider.php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // Example: Link policies to models
        'App\Models\Trip' => 'App\Policies\TripPolicy',
    ];

    public function boot()
    {
        $this->registerPolicies();

        // Define Gates (optional)
        Gate::define('access-driver-dashboard', function ($user) {
            return $user->role === 'driver';
        });
    }
}
