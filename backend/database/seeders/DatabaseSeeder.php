<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use App\Models\Post;
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

        $locales = ['en', 'es'];
        $data = [
            'en' => [
                'title' => "So she set to work, and very nearly carried it.",
                'content' => "Duchess, the Duchess! Oh! won't she be savage if I've kept her waiting!' Alice felt a little now and then, and holding it to half-past one as long as I get SOMEWHERE,' Alice added as an explanation.",
            ],
            'es' => [
                'title' => "Así que se puso manos a la obra y casi lo consigue",
                'content' => "¡La Duquesa, la Duquesa! ¡Oh, no se pondrá furiosa si la he hecho esperar! Alice sintió un poco de vez en cuando, y aguantando hasta la una y media con tal de llegar a ALGÚN sitio, añadió Alice a modo de explicación",
            ],
        ];
        for ($i = 0; $i < 20; $i++) {
            $post = new Post();
            $post->user_id = $user->id;
            $post->save();
            foreach ($locales as $locale) {
                $translation = $data[$locale];
                $post->setTranslation('title',  $translation['title'], $locale);
                $post->setTranslation('content',  $translation['content'], $locale);
            }
        }
    }
}
