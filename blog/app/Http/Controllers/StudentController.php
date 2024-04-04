<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\DB; // Import DB facade

class StudentController extends Controller
{
    public function store(Request $request){
        try {
            
            if (!$request->hasFile('image_data')) {
                throw new \Exception('No image file found in request.');
            }

            // Get file data
            $imageData = file_get_contents($request->file('image_data')->getRealPath());

            // Create new Student instance
            $student = new Student();
            $student->fullname = $request->input('fullname');
            $student->email = $request->input('email');
            $student->address = $request->input('address');
            $student->image_data = $imageData;
            $student->save();

            return response()->json([
                'status' => 200,
                'message' => 'Student added successfully',
            ]);
        } catch (\Exception $e) {
            // Log error
            \Log::error('Error storing student: ' . $e->getMessage());

            // Return error response
            return response()->json([
                'status' => 500,
                'message' => 'Internal server error. Please try again later.',
            ], 500);
        }
    }

    public function showstudents(){
        $student = Student::all();
        return response()->json([
            'status' => 200,
            'student' => $student,
        ]);
    }

}
