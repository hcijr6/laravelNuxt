<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PrevalidateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'v1'], function () {
    Route::post('/form/prevalidation', [PrevalidateController::class, 'validateRequest'])->name('form.prevalidation');
    Route::get('/form/test', [PrevalidateController::class, 'test'])->name('form.test');
    Route::get('/user', [UserController::class, 'show'])->name('users.show');
    Route::resource('users', UserController::class)->except(['create', 'edit']);
    Route::get('/user/rules', [UserController::class, 'rules'])->name('users.rules');
    Route::post('/user/validate', [UserController::class, 'singleValidation'])->name('users.validate');
});