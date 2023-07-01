<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Localization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // dd(['asdf' => 'asfd']);
        /** 
         * requests hasHeader is used to check the Accept-Language header from the REST API's
         */
        if ($request->hasHeader("Content-Language")) {
            /**
             * If Accept-Language header found then set it to the default locale
             */
            app()->setLocale($request->header("Content-Language"));
        }
        return $next($request);
    }
}