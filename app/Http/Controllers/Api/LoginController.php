<?php

namespace App\Http\Controllers\Api;

use stdClass;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $response = new stdClass;
        $user = User::where('email', $request->email)->first();
        if($user){
            if(Hash::check($request->password,$user->password)){
                $response->code = 200;
                $response->success = true;
                $response->token = $user->createToken('token')->accessToken;
                $response->result = $user;
                return response()->json($response, 200);
            }else{
                $response->code = 400;
                $response->success = false;
                $response->error = 'Incorrect Password';
                return response()->json($response, 200);  
            }
        }else{
            $response->code = 400;
            $response->success = false;
            $response->error = 'User Not Found';
            return response()->json($response, 200);
        }
    }
}
