<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public  function show() {
        $user = User::all();
        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }
    public function adduser(Request $req)
    {
        $user = new User();
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->save();
        return response()->json([
            'status' => 200,
            'message' => 'User added successfully',
        ]);
    }

    public function edit($id){
        $user = User::find($id);
        return response()->json([
            'status'=>200,
            'user'=> $user,
        ]);
    }   
    public function update(Request $req, $id){
        $user = User::find($id);
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->udpate();
        return response()->json([
            'status' => 200,
            'message' => 'User Update successfully',
        ]);
    }
    public function delete($id){
        $user = User::find($id);
        $user->delete();
        return response()->json([
            'status' => 200,
            'message' => 'User delete successfully',
        ]);
    }
}
