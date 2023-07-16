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
        $this->middleware('auth:sanctum')->except('rules');
    }
    public function show(Request $request)
    {
        $user = $request->user()->load('roles.permissions', 'permissions');
        $rolePermissions = collect();
        foreach ($user->roles as $role) {
            $rolePermissions = $rolePermissions->concat($role->permissions->pluck('name'));
        }
        $userPermissions = $user->permissions->pluck('name');
        $allPermissions = $rolePermissions->concat($userPermissions)->unique();
        $user->setRelation('roles', $user->roles->pluck('name'));
        $user->unsetRelation('permissions');
        $user->all_permissions = $allPermissions;
        return response()->json($user);
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
                "message" => __("User deleted successfully.")
            ], 200);
        }
    }
    public function rules()
    {
        return response()->json(User::$rules, 200);
    }
    public function checkPermission(Request $request)
    {
        $permission = $request->input('permission');
        if ($permission) {
            if ($request->user()->can($permission)) {
                return response()->json([
                    'message' => __("User has permission."),
                ], 200);
            } else {
                return response()->json([
                    'message' => __("User does not have permission."),
                ], 422);
            }
        }
    }
    public function checkRole(Request $request)
    {
        $role = $request->input('role');
        if ($role) {
            if ($request->user()->hasRole($role)) {
                return response()->json([
                    'message' => __("User has role."),
                ], 200);
            } else {
                return response()->json([
                    'message' => __("User does not have role."),
                ], 422);
            }
        }
    }
}