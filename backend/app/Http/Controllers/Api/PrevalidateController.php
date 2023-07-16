<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;
use App\Models;

class PrevalidateController extends Controller
{
    /**
     * Perform validation based on the request parameters.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateRequest(Request $request)
    {
        $className = $request->input('className');
        $validationField = $request->input('validationField');
        $validationSource = $request->input('validationSource', 'Model');
        $validateAllFields = $request->has('validateAllFields');

        // Check if className and validationField are present in the request
        if (!$className || (!$validationField && !$validateAllFields)) {
            return response()->json(['error' => 'Invalid request. Please provide className and either validationField or validateAllFields.'], 422);
        }

        // Get the request class based on validationSource
        $requestClass = $this->getRequestClass($className, $validationSource);
        // echo $requestClass;
        if (!$requestClass) {
            return response()->json(['error' => 'Invalid request. Invalid className - ' . $className . ' or validationSource. - ' . $validationSource], 422);
        }

        // Get the validation rules from the request class
        $requestClass = new $requestClass;
        $rules = $requestClass->rules();

        if ($validateAllFields) {
            // Perform validation for the entire request data
            $validator = Validator::make($request->all(), $rules);
            $validator->validate();

        } else {
            // Check if the validationField exists in the rules
            if (!isset($rules[$validationField])) {
                return response()->json(['error' => 'Invalid field. The specified validationField does not exist.'], 422);
            }
            $confirmedKey = array_search("confirmed", $rules[$validationField]);
            if ($confirmedKey !== false) {
                unset($rules[$validationField][$confirmedKey]);
            }

            // Perform validation for the specified field
            $fieldValidator = Validator::make($request->only($validationField), [
                $validationField => $rules[$validationField],
            ]);
            $fieldValidator->validate();
        }

        // Return success message if validation is successful
        return response()->json(['message' => 'Validation successful.'], 200);
    }

    /**
     * Get the request class based on the className and validationSource.
     *
     * @param  string  $className
     * @param  string  $validationSource
     * @return string|null
     */
    private function getRequestClass($className, $validationSource)
    {
        $namespace = ($validationSource == 'Request') ? 'App\\Http\\Requests\\' : 'App\\Models\\';
        $requestClass = $namespace . $className;

        // Check if the request class exists and has a "rules" method
        if (!class_exists($requestClass) || !method_exists($requestClass, 'rules')) {
            return null;
        }

        return $requestClass;
    }

    public function test()
    {
        var_dump(['Laravel' => app()->currentLocale()]);
        app()->setLocale('es');
        var_dump(['Laravel' => app()->currentLocale()]);
        $fieldValidator = Validator::make(['name' => 'H'], [
            'name' => 'required|min:3',
        ]);
        if ($fieldValidator->fails()) {
            var_dump($fieldValidator->errors());
        }
    }
}