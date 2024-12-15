<?php

// namespace App\Http\Controllers;

// use App\Models\Route;
// use App\Models\Location;
// use Illuminate\Http\Request;

// class RouteController extends Controller
// {
//     public function getShortestRoute(Request $request)
//     {
//         $startName = 'Badda';

//         $startLocation = Location::where('name', $startName)->first();
//         if (!$startLocation) {
//             return response()->json(['error' => 'Starting location not found in the database'], 404);
//         }

//         $start = $startLocation->id;
//         $endName = $request->input('destination');
//         if (!$endName) {
//             return response()->json(['error' => 'Destination not provided'], 400);
//         }

//         $endLocation = Location::where('name', $endName)->first();
//         if (!$endLocation) {
//             return response()->json(['error' => 'Destination not found in the database'], 404);
//         }

//         $end = $endLocation->id;

//         try {
//             $graph = $this->buildGraph();

//             if (!isset($graph[$start])) {
//                 return response()->json(['error' => 'Starting location not found in the graph'], 404);
//             }

//             if (!$this->isDestinationInGraph($graph, $end)) {
//                 return response()->json(['error' => 'Destination is not reachable from Badda'], 404);
//             }

//             $result = $this->dijkstra($graph, $start, $end);

//             if (empty($result['path']) || $result['distance'] === INF) {
//                 return response()->json(['error' => 'No valid path found between locations'], 404);
//             }

//             return response()->json($result);
//         } catch (\Exception $e) {
//             return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
//         }
//     }

//     private function buildGraph()
//     {
//         $graph = [];
//         $routes = Route::with(['startLocation', 'endLocation'])->get();

//         if ($routes->isEmpty()) {
//             throw new \Exception('No routes available in the database.');
//         }

//         foreach ($routes as $route) {
//             if (!$route->startLocation || !$route->endLocation) {
//                 continue;
//             }

//             $startId = $route->startLocation->id;
//             $endId = $route->endLocation->id;

//             if (!isset($graph[$startId])) {
//                 $graph[$startId] = [];
//             }

//             $graph[$startId][$endId] = [
//                 'distance' => (float)$route->distance,
//                 'fare' => (float)$route->fare,
//                 'buses' => explode(', ', $route->buses),
//             ];
//         }

//         file_put_contents(storage_path('logs/graph_debug.log'), json_encode($graph, JSON_PRETTY_PRINT));

//         return $graph;
//     }

//     private function isDestinationInGraph($graph, $end)
//     {
//         foreach ($graph as $edges) {
//             if (isset($edges[$end])) {
//                 return true;
//             }
//         }

//         return isset($graph[$end]);
//     }

//     private function dijkstra($graph, $start, $end)
//     {
//         $dist = [];
//         $prev = [];
//         $queue = new \SplPriorityQueue();
//         $visited = [];

//         foreach ($graph as $node => $edges) {
//             $dist[$node] = INF;
//             $prev[$node] = null;
//             $visited[$node] = false;
//         }

//         $dist[$start] = 0;
//         $queue->insert($start, 0);

//         while (!$queue->isEmpty()) {
//             $current = $queue->extract();

//             if ($visited[$current]) {
//                 continue;
//             }

//             $visited[$current] = true;

//             if (!isset($graph[$current])) {
//                 continue;
//             }

//             foreach ($graph[$current] as $neighbor => $data) {
//                 $alt = $dist[$current] + $data['distance'];
//                 if ($alt < $dist[$neighbor]) {
//                     $dist[$neighbor] = $alt;
//                     $prev[$neighbor] = $current;
//                     $queue->insert($neighbor, -$alt);
//                 }
//             }
//         }

//         $path = [];
//         $current = $end;

//         while ($current && isset($prev[$current])) {
//             array_unshift($path, $current);
//             $current = $prev[$current];
//         }

//         if ($current !== $start) {
//             return [
//                 'path' => [],
//                 'distance' => INF,
//                 'fare' => 0,
//                 'buses' => [],
//             ];
//         }

//         array_unshift($path, $start);

//         return [
//             'path' => $this->convertPathToNames($path),
//             'distance' => $dist[$end] === INF ? 0 : $dist[$end],
//             'fare' => $dist[$end] === INF ? 0 : $dist[$end] * 5,
//             'buses' => $this->extractBusDetails($path, $graph),
//         ];
//     }

//     private function convertPathToNames($path)
//     {
//         return Location::whereIn('id', $path)->pluck('name')->toArray();
//     }

//     private function extractBusDetails($path, $graph)
//     {
//         $buses = [];
//         for ($i = 0; $i < count($path) - 1; $i++) {
//             $current = $path[$i];
//             $next = $path[$i + 1];

//             if (isset($graph[$current][$next])) {
//                 $buses[$next] = $graph[$current][$next]['buses'];
//             }
//         }
//         return $buses;
//     }
// }

// namespace App\Http\Controllers;

// use App\Models\Route;
// use App\Models\Location;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Cache;
// use Illuminate\Support\Facades\Log;

// class RouteController extends Controller
// {
//     // Get direct buses
//     public function getDirectBuses(Request $request)
//     {
//         $startName = 'Mirpur 10'; // Fixed starting location
//         $endName = $request->input('destination'); // User-provided destination

//         if (!$endName) {
//             return response()->json(['error' => 'Destination not provided'], 400);
//         }

//         $startLocation = Location::where('name', $startName)->first();
//         $endLocation = Location::where('name', $endName)->first();

//         if (!$startLocation || !$endLocation) {
//             return response()->json(['error' => 'Start or destination not found in the database'], 404);
//         }

//         // Query routes where buses pass through both start and end points
//         $routes = Route::with(['startLocation', 'endLocation'])
//             ->whereIn('start_location_id', [$startLocation->id, $endLocation->id])
//             ->whereIn('end_location_id', [$startLocation->id, $endLocation->id])
//             ->get()
//             ->groupBy('buses');

//         $results = [];

//         foreach ($routes as $busName => $busRoutes) {
//             $totalDistance = 0;
//             $segmentFare = 0;

//             foreach ($busRoutes as $route) {
//                 // Check if the segment matches or forms part of the route
//                 if (
//                     ($route->start_location_id == $startLocation->id && $route->end_location_id == $endLocation->id) ||
//                     ($route->start_location_id == $endLocation->id && $route->end_location_id == $startLocation->id)
//                 ) {
//                     $totalDistance += $route->distance;
//                     $segmentFare += $route->fare;
//                 }
//             }

//             // Add bus details if a valid segment is found
//             if ($totalDistance > 0) {
//                 $results[] = [
//                     'bus_name' => $busName,
//                     'route' => [
//                         'start' => $startName,
//                         'end' => $endName,
//                     ],
//                     'total_distance' => $totalDistance,
//                     'fare' => $segmentFare,
//                 ];
//             }
//         }

//         if (empty($results)) {
//             return response()->json(['message' => 'No direct buses found.']);
//         }

//         return response()->json([
//             'message' => 'Direct buses found successfully',
//             'routes' => $results,
//         ]);
//     }





//     // Helper function: Format multi-bus routes
//     private function formatMultiBusRoutes($paths, $graph)
//     {
//         $formattedRoutes = [];

//         foreach ($paths as $path) {
//             $routeDetails = [];
//             $totalDistance = 0;
//             $totalFare = 0;

//             for ($i = 0; $i < count($path) - 1; $i++) {
//                 $start = $path[$i];
//                 $end = $path[$i + 1];

//                 $route = Route::where('start_location_id', Location::where('name', $start)->first()->id)
//                             ->where('end_location_id', Location::where('name', $end)->first()->id)
//                             ->first();

//                 if ($route) {
//                     $routeDetails[] = [
//                         'bus_name' => $route->buses,
//                         'start' => $start,
//                         'end' => $end,
//                         'distance' => $route->distance,
//                         'fare' => $route->fare,
//                     ];

//                     $totalDistance += $route->distance;
//                     $totalFare += $route->fare;
//                 }
//             }

//             if (!empty($routeDetails)) {
//                 $formattedRoutes[] = [
//                     'route' => $routeDetails,
//                     'total_distance' => $totalDistance,
//                     'total_fare' => $totalFare,
//                 ];
//             }
//         }

//         return $formattedRoutes;
//     }


//     // Get multi-bus routes
//     // Updated Multi-Bus Routes Function
//     public function getMultiBusRoutes(Request $request)
//     {
//         $startName = 'Badda';
//         $endName = $request->input('destination');

//         if (!$endName) {
//             return response()->json(['error' => 'Destination not provided'], 400);
//         }

//         $startLocation = Location::where('name', $startName)->first();
//         $endLocation = Location::where('name', $endName)->first();

//         if (!$startLocation || !$endLocation) {
//             return response()->json(['error' => 'Invalid start or destination'], 404);
//         }

//         $graph = $this->buildGraph();
//         $paths = $this->calculatePaths($startName, $endName, $graph);

//         if (empty($paths)) {
//             return response()->json(['message' => 'No multi-bus routes found.']);
//         }

//         $multiBusRoutes = [];
//         foreach ($paths as $path) {
//             $routeDetails = [];
//             $totalDistance = 0;
//             $totalFare = 0;

//             for ($i = 0; $i < count($path) - 1; $i++) {
//                 $segment = Route::whereHas('startLocation', function ($query) use ($path, $i) {
//                     $query->where('name', $path[$i]);
//                 })->whereHas('endLocation', function ($query) use ($path, $i) {
//                     $query->where('name', $path[$i + 1]);
//                 })->first();

//                 if ($segment) {
//                     $routeDetails[] = [
//                         'bus_name' => $segment->buses,
//                         'start' => $segment->startLocation->name,
//                         'end' => $segment->endLocation->name,
//                         'distance' => $segment->distance,
//                         'fare' => $segment->fare,
//                     ];
//                     $totalDistance += $segment->distance;
//                     $totalFare += $segment->fare;
//                 }
//             }

//             $multiBusRoutes[] = [
//                 'route' => $routeDetails,
//                 'total_distance' => $totalDistance,
//                 'total_fare' => $totalFare,
//             ];
//         }

//         return response()->json([
//             'message' => 'Multi-bus routes found successfully',
//             'multi_bus_routes' => $multiBusRoutes,
//         ]);
//     }



//     // Helper function: Format shortest path
//     private function formatShortestPath($path, $graph)
//     {
//         $pathDetails = [];
//         $totalDistance = 0;

//         for ($i = 0; $i < count($path) - 1; $i++) {
//             $start = $path[$i];
//             $end = $path[$i + 1];

//             $route = Route::where('start_location_id', Location::where('name', $start)->first()->id)
//                         ->where('end_location_id', Location::where('name', $end)->first()->id)
//                         ->first();

//             if ($route) {
//                 $pathDetails[] = [
//                     'start' => $start,
//                     'end' => $end,
//                     'distance' => $route->distance,
//                 ];

//                 $totalDistance += $route->distance;
//             }
//         }

//         $suggestedTransport = $totalDistance > 5 ? 'CNG' : 'Walk';
//         $estimatedCost = $suggestedTransport === 'CNG' ? $totalDistance * 10 : 0;

//         return [
//             'path' => $pathDetails,
//             'total_distance' => $totalDistance,
//             'suggested_transport' => $suggestedTransport,
//             'estimated_cost' => $estimatedCost,
//         ];
//     }


//     // Get the shortest route
//     public function getShortestRoute(Request $request)
//     {
//         $startName = 'Badda';
//         $endName = $request->input('destination');

//         if (!$endName) {
//             return response()->json(['error' => 'Destination not provided'], 400);
//         }

//         $startLocation = Location::where('name', $startName)->first();
//         $endLocation = Location::where('name', $endName)->first();

//         if (!$startLocation || !$endLocation) {
//             return response()->json(['error' => 'Start or destination not found in the database'], 404);
//         }

//         $graph = $this->buildGraph();
//         $shortestPath = $this->calculateShortestPath($startName, $endName, $graph);

//         if (!$shortestPath) {
//             return response()->json(['message' => 'No path found. Suggest taking CNG or car.']);
//         }

//         $formattedPath = $this->formatShortestPath($shortestPath, $graph);

//         return response()->json([
//             'message' => 'Shortest path found successfully',
//             'shortest_path' => $formattedPath,
//         ]);
//     }

//     // Helper function: Build graph for route data
//     private function buildGraph()
//     {
//         return Cache::remember('route_graph', 60, function () {
//             $routes = Route::all();
//             $graph = [];

//             foreach ($routes as $route) {
//                 if ($route->startLocation && $route->endLocation) {
//                     $start = $route->startLocation->name;
//                     $end = $route->endLocation->name;

//                     $graph[$start][$end] = $route->distance;
//                     $graph[$end][$start] = $route->distance;
//                 }
//             }

//             return $graph;
//         });
//     }

//     // Helper function: Calculate paths (multi-bus)
//     private function calculatePaths($start, $end, $graph)
//     {
//         $paths = [];
//         $this->dfs($graph, $start, $end, [], $paths);
//         return $paths;
//     }

//     // Depth-First Search (DFS) for multi-bus routes
//     private function dfs($graph, $current, $destination, $visited, &$paths)
//     {
//         $visited[] = $current;

//         if ($current === $destination) {
//             $paths[] = $visited;
//             return;
//         }

//         if (!isset($graph[$current])) {
//             return;
//         }

//         foreach ($graph[$current] as $neighbor => $distance) {
//             if (!in_array($neighbor, $visited)) {
//                 $this->dfs($graph, $neighbor, $destination, $visited, $paths);
//             }
//         }
//     }

//     // Helper function: Calculate shortest path using Dijkstra's algorithm
//     private function calculateShortestPath($start, $end, $graph)
//     {
//         $distances = [];
//         $previous = [];
//         $queue = [];

//         foreach ($graph as $node => $edges) {
//             $distances[$node] = PHP_INT_MAX;
//             $previous[$node] = null;
//             $queue[$node] = PHP_INT_MAX;
//         }

//         $distances[$start] = 0;
//         $queue[$start] = 0;

//         while (!empty($queue)) {
//             asort($queue); // Sort nodes by distance
//             $current = key($queue);
//             unset($queue[$current]);

//             if ($current === $end) {
//                 $path = [];
//                 while ($previous[$current] !== null) {
//                     array_unshift($path, $current);
//                     $current = $previous[$current];
//                 }
//                 array_unshift($path, $start);
//                 return $path;
//             }

//             if (!isset($graph[$current])) {
//                 continue;
//             }

//             foreach ($graph[$current] as $neighbor => $distance) {
//                 $alt = $distances[$current] + $distance;
//                 if ($alt < $distances[$neighbor]) {
//                     $distances[$neighbor] = $alt;
//                     $previous[$neighbor] = $current;
//                     $queue[$neighbor] = $alt;
//                 }
//             }
//         }

//         return null; // No path found
//     }
// }



namespace App\Http\Controllers;

use App\Models\Route;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class RouteController extends Controller

{
    
    // Get direct buses using BFS for intermediate stops
    public function getDirectBuses(Request $request)
    {
        set_time_limit(300);

        $startName = 'Mirpur 10'; // Fixed starting location
        $endName = $request->input('destination'); // User-provided destination

        if (!$endName) {
            return response()->json(['error' => 'Destination not provided'], 400);
        }

        $startLocation = Location::where('name', $startName)->first();
        $endLocation = Location::where('name', $endName)->first();

        if (!$startLocation || !$endLocation) {
            return response()->json(['error' => 'Start or destination not found in the database'], 404);
        }

        // Build a graph from route data
        $graph = $this->buildGraph();

        // Use BFS to find the path
        $path = $this->bfsFindPath($graph, $startName, $endName);

        if (!$path) {
            return response()->json(['message' => 'No direct buses found.']);
        }

        // Retrieve route details from the database
        $routeDetails = [];
        $totalDistance = 0;
        $totalFare = 0;

        for ($i = 0; $i < count($path) - 1; $i++) {
            $start = $path[$i];
            $end = $path[$i + 1];

            $route = Route::whereHas('startLocation', function ($query) use ($start) {
                $query->where('name', $start);
            })->whereHas('endLocation', function ($query) use ($end) {
                $query->where('name', $end);
            })->first();

            if ($route) {
                $routeDetails[] = [
                    'bus_name' => $route->buses,
                    'start' => $start,
                    'end' => $end,
                    'distance' => $route->distance,
                    'fare' => $route->fare,
                ];
                $totalDistance += $route->distance;
                $totalFare += $route->fare;
            }
        }

        return response()->json([
            'message' => 'Direct buses found successfully',
            'routes' => $routeDetails,
            'total_distance' => $totalDistance,
            'total_fare' => $totalFare,
        ]);
    }

    // Get multi-bus routes
    public function getMultiBusRoutes(Request $request)
    {
        set_time_limit(300);
        $startName = 'Badda';
        $endName = $request->input('destination');

        if (!$endName) {
            return response()->json(['error' => 'Destination not provided'], 400);
        }

        $startLocation = Location::where('name', $startName)->first();
        $endLocation = Location::where('name', $endName)->first();

        if (!$startLocation || !$endLocation) {
            return response()->json(['error' => 'Invalid start or destination'], 404);
        }

        $graph = $this->buildGraph();
        $paths = $this->calculatePaths($startName, $endName, $graph);

        if (empty($paths)) {
            return response()->json(['message' => 'No multi-bus routes found.']);
        }

        return response()->json([
            'message' => 'Multi-bus routes found successfully',
            'multi_bus_routes' => $this->formatMultiBusRoutes($paths, $graph),
        ]);
    }

    // Get the shortest route
    public function getShortestRoute(Request $request)
    {
        set_time_limit(300);
        $startName = 'Badda';
        $endName = $request->input('destination');

        if (!$endName) {
            return response()->json(['error' => 'Destination not provided'], 400);
        }

        $startLocation = Location::where('name', $startName)->first();
        $endLocation = Location::where('name', $endName)->first();

        if (!$startLocation || !$endLocation) {
            return response()->json(['error' => 'Start or destination not found in the database'], 404);
        }

        $graph = $this->buildGraph();
        $shortestPath = $this->calculateShortestPath($startName, $endName, $graph);

        if (!$shortestPath) {
            return response()->json(['message' => 'No path found. Suggest taking CNG or car.']);
        }

        return response()->json([
            'message' => 'Shortest path found successfully',
            'shortest_path' => $this->formatShortestPath($shortestPath, $graph),
        ]);
    }

    // Build graph for BFS and other algorithms
    private function buildGraph()
    {
        return Cache::remember('route_graph', 60, function () {
            $routes = Route::all();
            $graph = [];

            foreach ($routes as $route) {
                if ($route->startLocation && $route->endLocation) {
                    $start = $route->startLocation->name;
                    $end = $route->endLocation->name;

                    $graph[$start][] = $end;
                    $graph[$end][] = $start; // Reverse path
                }
            }

            return $graph;
        });
    }

    // BFS function to find a path
    private function bfsFindPath($graph, $start, $end)
    {
        $queue = [[$start]];
        $visited = [$start];

        while (!empty($queue)) {
            $path = array_shift($queue);
            $currentNode = end($path);

            if ($currentNode === $end) {
                return $path;
            }

            if (!isset($graph[$currentNode])) {
                continue;
            }

            foreach ($graph[$currentNode] as $neighbor) {
                if (!in_array($neighbor, $visited)) {
                    $visited[] = $neighbor;
                    $newPath = $path;
                    $newPath[] = $neighbor;
                    $queue[] = $newPath;
                }
            }
        }

        return null;
    }

    // Helper for formatting multi-bus routes
    private function formatMultiBusRoutes($paths, $graph)
    {
        $formattedRoutes = [];
        foreach ($paths as $path) {
            $totalDistance = 0;
            $totalFare = 0;

            for ($i = 0; $i < count($path) - 1; $i++) {
                $start = $path[$i];
                $end = $path[$i + 1];

                $route = Route::whereHas('startLocation', function ($q) use ($start) {
                    $q->where('name', $start);
                })->whereHas('endLocation', function ($q) use ($end) {
                    $q->where('name', $end);
                })->first();

                if ($route) {
                    $totalDistance += $route->distance;
                    $totalFare += $route->fare;
                }
            }

            $formattedRoutes[] = [
                'route' => $path,
                'total_distance' => $totalDistance,
                'total_fare' => $totalFare,
            ];
        }
        return $formattedRoutes;
    }

    // Dijkstra's algorithm for shortest path
    private function calculateShortestPath($start, $end, $graph)
    {
        $distances = [];
        $previous = [];
        $queue = [];

        foreach ($graph as $node => $edges) {
            $distances[$node] = PHP_INT_MAX;
            $previous[$node] = null;
            $queue[$node] = PHP_INT_MAX;
        }

        $distances[$start] = 0;
        $queue[$start] = 0;

        while (!empty($queue)) {
            asort($queue);
            $current = key($queue);
            unset($queue[$current]);

            if ($current === $end) {
                $path = [];
                while ($previous[$current]) {
                    array_unshift($path, $current);
                    $current = $previous[$current];
                }
                array_unshift($path, $start);
                return $path;
            }

            foreach ($graph[$current] as $neighbor) {
                $alt = $distances[$current] + 1; // Assuming all edges have weight = 1
                if ($alt < $distances[$neighbor]) {
                    $distances[$neighbor] = $alt;
                    $previous[$neighbor] = $current;
                    $queue[$neighbor] = $alt;
                }
            }
        }
        return null;
    }
}
