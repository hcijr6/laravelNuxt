<?php

use Illuminate\Support\Facades\Route;
use App\Mail\OrderCreated;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    var_dump(['Laravel' => app()->currentLocale()]);
    app()->setLocale('es');
    var_dump(['Laravel' => app()->currentLocale()]);
    $fieldValidator = Validator::make(['name' => 'H'], [
        'name' => 'required|min:3',
    ]);
    if ($fieldValidator->fails()) {
        var_dump($fieldValidator->errors());
    }
});

Route::get('/mailTest', function () {
    Mail::to('hcijr6@gmail.com')->send(new OrderCreated());
});
require __DIR__ . '/auth.php';