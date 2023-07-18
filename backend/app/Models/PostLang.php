<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostLang extends Model
{
    protected $table = 'post_lang';
    protected $fillable = ['locale', 'title', 'content'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
