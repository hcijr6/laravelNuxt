<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\TranslatableTrait;


class Post extends Model
{
    use TranslatableTrait;

    public function translations()
    {
        return $this->hasMany(PostLang::class, 'post_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
