/**
 * Transform Laravel validation rules to Validator.js compatible rules.
 *
 * @param {object} rules - Laravel validation rules object.
 * @returns {object} - Transformed rules compatible with Validator.js.
 */

export function transformRules(rules,values) {
  const transformedRules = {};
  // overrideOrCustomRules = {
  //   'name':{
  //     'unique': checkIfUniqueName(ruleArgs),
  //     'exists': checkIfExistsName(ruleArgs)
  //   },
  //   'email':{
  //     'unique': checkIfUniqueEmail('email',ruleArgs),
  //   }
  // };
  for (const field in rules) {
    if (Array.isArray(rules[field])) {
      transformedRules[field] = [];
      rules[field].forEach(rule => {
        const [ruleName, ...ruleArgs] = rule.split(':');
        switch (ruleName) {
          case 'accepted':
            transformedRules[field].push(validator.equals(true));
            break;
          case 'accepted_if':
            // No direct equivalent in Validator.js
            transformedRules[field].push((value, values) => acceptedIf(value, ruleArgs[0], values[ruleArgs[0]]));
            break;
          case 'active_url':
            transformedRules[field].push(validator.isURL());
            break;
          case 'after':
            transformedRules[field].push(validator.isAfter(ruleArgs[0]));
            break;
          case 'after_or_equal':
            transformedRules[field].push(validator.isAfter(ruleArgs[0], { orEqual: true }));
            break;
          case 'alpha':
            transformedRules[field].push(validator.isAlpha());
            break;
          case 'alpha_dash':
            transformedRules[field].push(validator.matches(/^[a-zA-Z0-9_-]+$/));
            break;
          case 'alpha_num':
            transformedRules[field].push(validator.isAlphanumeric());
            break;
          case 'array':
            transformedRules[field].push(Array.isArray);
            break;
          case 'ascii':
            transformedRules[field].push(validator.isAscii());
            break;
          case 'bail':
            // No direct equivalent in Validator.js, unnecesary , validator stops the validation by default
            break;
          case 'before':
            transformedRules[field].push(validator.isBefore(ruleArgs[0]));
            break;
          case 'before_or_equal':
            transformedRules[field].push(validator.isBefore(ruleArgs[0], { orEqual: true }));
            break;
          case 'between':
            transformedRules[field].push(validator.isLength(ruleArgs[0], ruleArgs[1]));
            break;
          case 'boolean':
            transformedRules[field].push(validator.isBoolean());
            break;
          case 'confirmed':
            transformedRules[field].push(validator.equals(validator.ref(`${field}_confirmation`)));
            break;
          case 'current_password':
            // No direct equivalent in Validator.js
            break;
          case 'date':
            transformedRules[field].push(validator.isDate());
            break;
          case 'date_equals':
            transformedRules[field].push(validator.equals(ruleArgs[0]));
            break;
          case 'date_format':
            transformedRules[field].push(validator.matches(new RegExp(ruleArgs[0])));
            break;
          case 'decimal':
            transformedRules[field].push(validator.isDecimal());
            break;
          case 'declined':
            // No direct equivalent in Validator.js
            break;
          case 'declined_if':
            // No direct equivalent in Validator.js
            break;
          case 'different':
            transformedRules[field].push(validator.notEquals(ruleArgs[0]));
            break;
          case 'digits':
            transformedRules[field].push(validator.isLength(ruleArgs[0]));
            break;
          case 'digits_between':
            transformedRules[field].push(validator.isLength(ruleArgs[0], ruleArgs[1]));
            break;
          case 'distinct':
            transformedRules[field].push((value, values) => values.filter(v => v === value).length === 1);
            break;
          case 'doesnt_start_with':
            transformedRules[field].push(validator.doesntStartWith(ruleArgs[0]));
            break;
          case 'doesnt_end_with':
            transformedRules[field].push(validator.doesntEndWith(ruleArgs[0]));
            break;
          case 'email':
            transformedRules[field].push(validator.isEmail());
            break;
          case 'ends_with':
            transformedRules[field].push(validator.endsWith(ruleArgs[0]));
            break;
          case 'enum':
            transformedRules[field].push(validator.isIn(ruleArgs));
            break;
          case 'exclude':
            // No direct equivalent in Validator.js
            break;
          case 'exclude_if':
            // No direct equivalent in Validator.js
            break;
          case 'exclude_unless':
            // No direct equivalent in Validator.js
            break;
          case 'exclude_with':
            // No direct equivalent in Validator.js
            break;
          case 'exclude_without':
            // No direct equivalent in Validator.js
            break;
          case 'exists':
            // No direct equivalent in Validator.js (database validation)
            break;
          case 'filled':
            transformedRules[field].push(validator.isNotEmpty);
            break;
          case 'greater_than':
            transformedRules[field].push(validator.isFloat({ gt: parseFloat(ruleArgs[0]) }));
            break;
          case 'greater_than_or_equal':
            transformedRules[field].push(validator.isFloat({ gte: parseFloat(ruleArgs[0]) }));
            break;
          case 'in':
            transformedRules[field].push(validator.isIn(ruleArgs));
            break;
          case 'integer':
            transformedRules[field].push(validator.isInt());
            break;
          case 'ip':
            transformedRules[field].push(validator.isIP());
            break;
          case 'json':
            transformedRules[field].push(validator.isJSON());
            break;
          case 'less_than':
            transformedRules[field].push(validator.isFloat({ lt: parseFloat(ruleArgs[0]) }));
            break;
          case 'less_than_or_equal':
            transformedRules[field].push(validator.isFloat({ lte: parseFloat(ruleArgs[0]) }));
            break;
          case 'lowercase':
            transformedRules[field].push(validator.isLowercase());
            break;
          case 'mac_address':
            transformedRules[field].push(validator.isMACAddress());
            break;
          case 'max':
            transformedRules[field].push(validator.isLength({ max: parseInt(ruleArgs[0]) }));
            break;
          case 'max_digits':
            transformedRules[field].push(validator.isLength({ max: parseInt(ruleArgs[0]) }));
            break;
          case 'mimetypes':
            // No direct equivalent in Validator.js
            break;
          case 'mimetypes_by_file_extension':
            // No direct equivalent in Validator.js
            break;
          case 'min':
            transformedRules[field].push(validator.isLength({ min: parseInt(ruleArgs[0]) }));
            break;
          case 'min_digits':
            transformedRules[field].push(validator.isLength({ min: parseInt(ruleArgs[0]) }));
            break;
          case 'missing':
            // No direct equivalent in Validator.js
            break;
          case 'missing_if':
            // No direct equivalent in Validator.js
            break;
          case 'missing_unless':
            // No direct equivalent in Validator.js
            break;
          case 'missing_with':
            // No direct equivalent in Validator.js
            break;
          case 'missing_with_all':
            // No direct equivalent in Validator.js
            break;
          case 'multiple_of':
            transformedRules[field].push(validator.isDivisibleBy(parseInt(ruleArgs[0])));
            break;
          case 'not_in':
            transformedRules[field].push(validator.notIn(ruleArgs));
            break;
          case 'not_regex':
            transformedRules[field].push(validator.doesNotMatch(new RegExp(ruleArgs[0])));
            break;
          case 'nullable':
            // No direct equivalent in Validator.js
            break;
          case 'numeric':
            transformedRules[field].push(validator.isNumeric());
            break;
          case 'password':
            // No direct equivalent in Validator.js
            break;
          case 'present':
            transformedRules[field].push(validator.exists);
            break;
          case 'prohibited':
            // No direct equivalent in Validator.js
            break;
          case 'prohibited_if':
            // No direct equivalent in Validator.js
            break;
          case 'prohibited_unless':
            // No direct equivalent in Validator.js
            break;
          case 'prohibits':
            // No direct equivalent in Validator.js
            break;
          case 'regex':
            transformedRules[field].push(validator.matches(new RegExp(ruleArgs[0])));
            break;
          case 'required':
            transformedRules[field].push(validator.isNotEmpty);
            break;
          case 'required_if':
            // No direct equivalent in Validator.js
            break;
          case 'required_unless':
            // No direct equivalent in Validator.js
            break;
          case 'required_with':
            transformedRules[field].push(validator.isNotEmpty);
            break;
          case 'required_with_all':
            transformedRules[field].push(validator.isNotEmpty);
            break;
          case 'required_without':
            transformedRules[field].push(validator.isEmpty);
            break;
          case 'required_without_all':
            transformedRules[field].push(validator.isEmpty);
            break;
          case 'required_array_keys':
            // No direct equivalent in Validator.js
            break;
          case 'same':
            transformedRules[field].push(validator.equals(validator.ref(ruleArgs[0])));
            break;
          case 'size':
            transformedRules[field].push(validator.isLength(parseInt(ruleArgs[0])));
            break;
          case 'sometimes':
            // No direct equivalent in Validator.js
            break;
          case 'starts_with':
            transformedRules[field].push(validator.startsWith(ruleArgs[0]));
            break;
          case 'string':
            transformedRules[field].push(validator.isString());
            break;
          case 'timezone':
            transformedRules[field].push(validator.isTimezone());
            break;
          case 'uppercase':
            transformedRules[field].push(validator.isUppercase());
            break;
          case 'url':
            transformedRules[field].push(validator.isURL());
            break;
          case 'uuid':
            transformedRules[field].push(validator.isUUID());
            break;
          default:
            break;
        }
      });
    }
  }
  return transformedRules;
}
function acceptedIf(value, _otherField, otherValue) {
  if (otherValue === value) {
    return true;
  }
  return false;
}