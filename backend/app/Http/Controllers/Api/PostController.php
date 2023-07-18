<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\Post\StoreRequest;
use App\Http\Requests\Post\UpdateRequest;
use Illuminate\Support\Facades\DB;
use Validator;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    public function search(Request $request)
    {
        $langCode = $request->input('langCode');
        $searchTerm = $request->input('search');

        $posts =  Post::join('post_lang', 'posts.id', '=', 'post_lang.post_id')
            ->where('post_lang.locale', $langCode);

        if ($searchTerm) {
            DB::whereLikeAttributes($posts, ['translations.title', 'translations.content'], $searchTerm);
        }

        $results = $posts
            ->select('posts.id', 'post_lang.title', 'post_lang.content')
            ->orderByRaw("CASE WHEN post_lang.title LIKE '%{$searchTerm}%' THEN 1 ELSE 0 END + 
                       CASE WHEN post_lang.content LIKE '%{$searchTerm}%' THEN 1 ELSE 0 END DESC")
            ->limit(16)
            ->get();

        if ($results->isEmpty()) {
            return response()->json([
                'errors' => [__("There's no posts that match your search")],
            ], 404);
        }

        return response()->json($results, 200);
    }


    public function store(StoreRequest $request)
    {
        $post = new Post();
        $post->user_id = $request->input('user_id');
        $post->save();
        $post->setTranslation('title', $request->input('title'), $request->input('locale'));
        $post->setTranslation('description', $request->input('description'), $request->input('locale'));
        return response()->json($post, 201);
    }

    public function update(UpdateRequest $request, Post $post)
    {
        $post->setTranslation('title', $request->input('title'), $request->input('locale'));
        $post->setTranslation('description', $request->input('description'), $request->input('locale'));
        return response()->json($post);
    }

    public function show(Post $post)
    {
        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json(null, 204);
    }
}
