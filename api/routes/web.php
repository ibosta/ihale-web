<?php
Route::get('/csrf-cookie', fn () => response()->noContent());
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::post('/offers', [OfferController::class, 'store']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::middleware('auth')->group(function () {
        Route::get('/offers', [OfferController::class, 'index']);
        Route::get('/offers/{offer}', [OfferController::class, 'show']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});