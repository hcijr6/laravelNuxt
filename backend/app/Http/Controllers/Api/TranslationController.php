<?php
namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Translation;
use Illuminate\Support\Facades\File;

class TranslationController extends Controller
 {
    public function __construct()
 {
        $this->middleware( 'auth:sanctum' )->except( [ 'saveTranslations', 'exportTranslations', 'processJson', 'getLastTranslations' ] );
    }
    public $langs = [ 'en', 'es' ];

    public function index()
 {
        $translations = Translation::all();
        return response()->json( $translations );
    }

    public function store( Request $request )
 {
        $validatedData = $request->validate( Translation::$rules );
        $translation = Translation::create( $validatedData );
        return response()->json( $translation, 201 );
    }

    public function show( $id )
 {
        $translation = Translation::findOrFail( $id );
        return response()->json( $translation );
    }

    public function update( Request $request, $id )
 {
        $validatedData = $request->validate( Translation::$rules );
        $translation = Translation::findOrFail( $id );
        $translation->update( $validatedData );
        return response()->json( $translation, 200 );
    }

    public function destroy( $id )
 {
        Translation::findOrFail( $id )->delete();
        return response()->json( null, 204 );
    }

    public function searchEloquent( Request $request )
 {
        // Get the value of the 'code' parameter from the request
        $langCode = $request->input( 'langCode' );
        // Get the value of the 'search' parameter from the request
        $searchTerm = $request->input( 'search' );
        // Create an instance of the Eloquent query for translations
        $translations = Translation::query();
        // Apply langCode filter if provided and not 'All'
        if ( $langCode && $langCode != 'all' ) {
            $translations->where( 'code', $langCode );
        }
        // Apply search term filter if provided
        if ( $searchTerm ) {
            $translations->whereLike( [ 'key', 'value' ], $searchTerm );
        }
        // Limit the number of results to 5
        $translations->limit( 16 );
        // Get the results of the query
        $results = $translations->get();
        // Check if no results were found
        if ( $results->isEmpty() ) {
            return response()->json( [
                'errors' => [ __( "There's no translations that match your search" ) ],
            ], 404 );
        }
        // Return the results in JSON format
        return response()->json( [
            'message' => __( 'Translations found' ),
            'data' => $results,
        ], 200 );
    }

    public function search( Request $request )
 {
        $langCode = $request->input( 'langCode' );
        $searchTerm = $request->input( 'search' );

        $translations = Translation::query();

        if ( $langCode && $langCode != 'all' ) {
            $translations->where( 'code', $langCode );
        }

        if ( $searchTerm ) {
            DB::whereLikeAttributes( $translations, [ 'key', 'value' ], $searchTerm );
        }

        $results = $translations->limit( 16 )->get();

        if ( $results->isEmpty() ) {
            return response()->json( [
                'errors' => [ __( "There's no translations that match your search" ) ],
            ], 404 );
        }

        return response()->json( [
            'message' => __( 'Translations found' ),
            'data' => $results,
        ], 200 );
    }

    public function processJson()
 {
        foreach ( $this->langs as $key => $lang ) {
            $filePath = resource_path( 'lang/' . $lang . '.json' );
            $json = File::get( $filePath );
            $translations = json_decode( $json, true );
            $this->saveTranslations( $translations, null, $lang );
        }
    }

    public function saveTranslations( $translations, $parentKey = '', $langCode )
 {
        foreach ( $translations as $key => $value ) {
            $fullKey = $parentKey . $key;

            if ( is_array( $value ) ) {
                $this->saveTranslations( $value, $fullKey . '.', $langCode );
            } else {
                if ( is_array( $translations[ $key ] ) ) {
                    foreach ( $translations[ $key ] as $index => $item ) {
                        $subKey = $fullKey . '.' . ( $index + 1 );
                        Translation::create( [
                            'key' => $subKey,
                            'value' => $item,
                            'code' => $langCode
                        ] );
                    }
                } else {
                    Translation::create( [
                        'key' => $fullKey,
                        'value' => $value,
                        'code' => $langCode
                    ] );
                }
            }
        }
    }

    public function exportTranslations()
 {
        foreach ( $this->langs as $key => $lang ) {
            $translations = Translation::where( 'code', $lang )->get();
            $data = [];
            foreach ( $translations as $translation ) {
                $keys = explode( '.', $translation->key );
                $current = &$data;
                foreach ( $keys as $key ) {
                    if ( !isset( $current[ $key ] ) ) {
                        $current[ $key ] = [];
                    }
                    $current = &$current[ $key ];
                }
                $current = $translation->value;
            }
            $json = json_encode( $data, JSON_UNESCAPED_UNICODE );
            $file = resource_path( 'lang/' . $lang . '_export.json' );
            file_put_contents( $file, $json );
        }
    }

    public function getLastTranslations( $lang )
 {
        $translations = Translation::where( 'code', $lang )->get();
        if ( $translations->isEmpty() ) {
            return response()->json( [
                'message' => __( "There's no translations assigned to this code - '" . $lang . "'" ),
            ], 422 );
        }
        $data = [];
        foreach ( $translations as $translation ) {
            $keys = explode( '.', $translation->key );
            $current = &$data;
            foreach ( $keys as $key ) {
                if ( !isset( $current[ $key ] ) ) {
                    $current[ $key ] = [];
                }
                $current = &$current[ $key ];
            }
            $current = $translation->value;
        }
        $body = [
            'data' => $data
        ];
        return response()->json( $body, 200 );
    }
}