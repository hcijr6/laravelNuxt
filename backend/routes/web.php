<?php

use App\Http\Controllers\Api\TranslationController;
use Illuminate\Support\Facades\Route;
use App\Mail\OrderCreated;
use Illuminate\Support\Facades\Mail;

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

Route::get('/translations/import', [TranslationController::class, 'import']);
Route::get('/translations/export', [TranslationController::class, 'export']);

Route::get('/mailTest', function () {
    Mail::to('hcijr6@gmail.com')->send(new OrderCreated());
});

require __DIR__ . '/auth.php';
