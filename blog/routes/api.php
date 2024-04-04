<?php

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/addstudent',function(){
//     $data = [
//         'message'=>"hello my name is luis",
//     ];
//     return new JsonResponse($data);
// });


//users parts
Route::post('/adduser', [UserController::class, 'adduser']);
Route::get('/showuser', [UserController::class, 'show']);
Route::get('/edituser/{id}', [UserController::class, 'edit']);
Route::put('/updateuser/{id}', [UserController::class, 'update']);
Route::delete('/deleteuser/{id}', [UserController::class, 'delete']);



// students parts

Route::post('/addstudents', [StudentController::class, 'store']);
Route::get('/showstudents', [StudentController::class, 'showstudents']);