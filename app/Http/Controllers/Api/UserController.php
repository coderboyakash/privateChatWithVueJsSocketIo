<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use stdClass;

class UserController extends Controller
{
    public function getAllusers(Request $request)
    {
        $response = new stdClass;
        $response->code = 200;
        $response->success = true;
        $response->result = User::where('id', '!=', auth()->id())->get();
        return response()->json($response, 200);
    }
    public function getUser(Request $request)
    {
        $response = new stdClass;
        $response->code = 200;
        $response->success = true;
        $response->result = User::find($request->id);
        return response()->json($response, 200);
    }
}
