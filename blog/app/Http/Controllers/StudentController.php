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

           $request->validate([
            'image_data' => 'required|image|mimes:jpeg,png,jpg,gif', // Example validation for image upload
            ]);

            // Get the file path
            $imagePath = $request->file('image_data')->store('images'); // Store the file in the 'images' directory


            // Create new Student instance
            $student = new Student();
            $student->fullname = $request->input('fullname');
            $student->email = $request->input('email');
            $student->address = $request->input('address');
            $student->image_data = $imagePath;
            $student->save();

            return response()->json([
                'status' => 200,
                'message' => 'Student added successfully',
            ]);
        } catch (\Exception $e) {
            // Log error
            \Log::error('Error storing student details: ' . $e->getMessage());

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

    public function delete($id){
        $student = Student::find($id);
        $student->delete();
        return response()->json([
            'status' => 200,
            'message' => 'student data delete successfully',
        ]);
    }

}
