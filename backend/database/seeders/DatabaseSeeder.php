<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use App\Models\User;

use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        Permission::create(['name' => 'accessDashboard']);
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo('accessDashboard');

        $user = User::factory()->create([
            'name' => 'Hernán Admin',
            'email' => 'hcijr6@gmail.com',
            'password' => Hash::make('hcijr6@gmail.com')
        ]);
        $user->assignRole($admin);

    }
}