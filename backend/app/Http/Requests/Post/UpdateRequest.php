<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public static function rules(): array
    {
        return [
            'title' => 'required|string',
            'content' => 'required|string',
            'locale' => 'required'
        ];
    }
}
