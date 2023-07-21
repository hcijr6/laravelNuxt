<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\PrevalidateController;
use App\Http\Controllers\Api\TranslationController;

Route::group(['prefix' => 'v1'], function () {
    Route::post('/form/prevalidation', [PrevalidateController::class, 'validateRequest'])->name('form.prevalidation');
    Route::get('/form/test', [UserController::class, 'test'])->name('form.test');

    Route::get('/user', [UserController::class, 'show'])->name('users.show');
    Route::resource('users', UserController::class)->except(['create', 'edit', 'show']);
    Route::get('/user/rules', [UserController::class, 'rules'])->name('users.rules');
    Route::post('/user/validate', [UserController::class, 'singleValidation'])->name('users.validate');
    Route::post('/user/checkRole', [UserController::class, 'checkRole'])->name('users.checkRole');
    Route::post('/user/checkPermission', [UserController::class, 'checkPermission'])->name('users.checkPermission');

    Route::apiResource('/translation', TranslationController::class);
    Route::get('/translations/last/{lang}', [TranslationController::class, 'getLastTranslations']);
    Route::post('/translations/search', [TranslationController::class, 'search']);

    
    Route::apiResource('/post', PostController::class);
    Route::post('/posts/search', [PostController::class, 'search']);
    Route::get('/post/{post}/{locale}', [PostController::class, 'showLang']);
});
