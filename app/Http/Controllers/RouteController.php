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



namespace App\Http\Controllers;

use App\Models\Route;
use App\Models\Location;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function getShortestRoute(Request $request)
    {
        $startName = 'Badda'; // Fixed start location name

        // Fetch the start location from the database
        $startLocation = Location::where('name', $startName)->first();
        if (!$startLocation) {
            return response()->json(['error' => 'Starting location not found in the database'], 404);
        }

        $start = $startLocation->id; // Use the location ID for the start
        $endName = $request->input('destination'); // Destination name provided in the request

        // Validate the destination input
        if (!$endName) {
            return response()->json(['error' => 'Destination not provided'], 400);
        }

        // Fetch the end location from the database
        $endLocation = Location::where('name', $endName)->first();
        if (!$endLocation) {
            return response()->json(['error' => 'Destination not found in the database'], 404);
        }

        $end = $endLocation->id; // Use the location ID for the destination

        try {
            // Build the graph based on routes data from the database
            $graph = $this->buildGraph();

            // Return the graph for debugging
            return response()->json([
                'message' => 'Graph constructed successfully',
                'graph' => $graph,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    private function buildGraph()
    {
        $graph = [];
        $routes = Route::with(['startLocation', 'endLocation'])->get();

        if ($routes->isEmpty()) {
            throw new \Exception('No routes available in the database.');
        }

        foreach ($routes as $route) {
            if (!$route->startLocation || !$route->endLocation) {
                continue; // Skip invalid routes
            }

            $startId = $route->startLocation->id;
            $endId = $route->endLocation->id;

            // Ensure both start and end locations exist in the graph
            if (!isset($graph[$startId])) {
                $graph[$startId] = [];
            }

            $graph[$startId][$endId] = [
                'distance' => (float)$route->distance,
                'fare' => (float)$route->fare,
                'buses' => explode(', ', $route->buses),
            ];
        }

        // Log the graph for debugging
        file_put_contents(storage_path('logs/graph_debug.log'), json_encode($graph, JSON_PRETTY_PRINT));

        return $graph;
    }
}
