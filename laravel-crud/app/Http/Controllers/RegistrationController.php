<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Registration;
use App\Models\User;

class RegistrationController extends Controller

{
    private $status     =   200;
    // --------------- [ Save Student function ] -------------
    public function registration(Request $request) {

        // validate inputs
        $validator          =       Validator::make($request->all(),
            [
                "username"      =>      "required",
                "email"         =>      "required",
                "password"      =>      "required",
                "confirm"       =>      "required"
            ]
        );

        // if validation fails
        if($validator->fails()) {
            return response()->json([
                "status" => "failed", 
                "validation_errors" => $validator->errors()],401);
        }

        $user_id        =       $request->id;
         $userArray     =       array(
        "username"            =>      $request->username,
         "email"               =>      $request->email,
         "password"            =>     $request->password,
         "confirm"           =>       $request->confirm,
         );

          $user     =       Registration::create($userArray);
            if(!is_null($user)) {            
                return response()->json([
                    "status" => $this->status, 
                    "success" => true, 
                    "message" => "Registered successfully", 
                    "data" => $user]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! failed to register."]);
            }
        }  
        
        public function login(Request $request) {

            try {
                $validator = Validator::make($request->all(), 
                [
                    'username' => 'required',
                    'password' => 'required'
                ]);

                $userArray     =       array(
               "username"            =>      $request->username,
                "password"            =>     $request->password,
                );
                

            $user  =   Registration::where('username',$request->username)->first() ;

            $check_password = $user->password;
         
            if(!is_null($user)) {
                if($request->password == $check_password){
                    return response()->json([
                        'status' => true,
                        'message' => 'User Logged In Successfully',
                    ], 200);
                }else{
                return response()->json(["status" => false, "message" => "Invalid username and password"]);
                }
            }
            else {
                return response()->json(["status"  => false, "message" => "Invalid username and password"]);
            }

            }catch (\Throwable $th) {
                    return response()->json([
                        'status' => false,
                        'message' => $th->getMessage()
                    ], 500);
        }

    }
        public function userdetails() {
            $user       =       Registration::all();
            if(count($user) > 0) {
                return response()->json(["status" => $this->status, "success" => true, "count" => count($user), "data" => $user]);
            }
            else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no record found"]);
            }

          
    
        }

        
      
 
    
}  

  