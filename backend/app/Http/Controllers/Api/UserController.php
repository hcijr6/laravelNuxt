<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function __construct()
    {
        // $this->middleware('localization');
        $this->middleware('auth:sanctum')->except('rules', 'singleValidation');
    }
    public function show(Request $request)
    {
        return response()->json($request->user());
    }
    public function store(Request $request)
    {
        $request->validate(User::$rules);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json($user, 200);
    }
    public function update(Request $request, User $user)
    {
        $request->validate(User::$rules);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json($user, 200);
    }
    public function destroy(User $user)
    {
        if ($user->delete()) {
            return response()->json([
                "success" => true,
                "message" => "User deleted successfully."
            ], 200);
        }
    }
    public function rules()
    {
        return response()->json(User::$rules, 200);
    }
    public function singleValidation(Request $request)
    {
        $rules = [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ];
        $validator = Validator::make($request->all(), [
            $request->field => $rules[$request->field],
        ]);
        $validator->validate();
        return response()->json(['message' => 'Validation successfull'], 200);
    }
    public function test()
    {
        return json_encode(['test' => 'asdf']);

    }
}