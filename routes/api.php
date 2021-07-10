<?php

use App\Http\Controllers\Api\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('user', function (Request $request) {
    $response = new stdClass;
    if($request->user()){
        $response->code = 200;
        $response->success = true;
        $response->token = $request->user()->createToken('token')->accessToken;
        $response->result = $request->user();
        return response()->json($response, 200);
    }else{
        $response->code = 400;
        $response->success = false;
        return response()->json($response, 200);
    }
});

Route::post('login', [LoginController::class, 'login']);