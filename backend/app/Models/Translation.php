<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'key',
        'value',
    ];
    /**
     * The validation rules for the model.
     *
     * @var array
     */
    public static $rules = [
        'code' => ['required', 'string'],
        'key' => ['required', 'string'],
        'value' => ['required', 'string'],
    ];
    public function rules()
    {
        return [
            'code' => ['required', 'string'],
            'key' => ['required', 'string'],
            'value' => ['required', 'string'],
        ];
    }
}