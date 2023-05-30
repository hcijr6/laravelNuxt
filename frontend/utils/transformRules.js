import v from "validator";

export function checkRule(input, rule, field) {
  const [ruleName, ...ruleArgs] = rule.split(':');
  switch (ruleName) {
    case 'accepted':
      var check = v.equals(input, true);
      if (check) {
        return true;
      } else {
        return getFieldErrorMessage(ruleName, field);
      }
      break;
    case 'required':
      var check = !v.isEmpty(input);
      if (check) {
        return true;
      } else {
        return getFieldErrorMessage(ruleName, field);
      }
      break;
    case 'min':
      var check = v.isLength(input, { min: parseInt(ruleArgs[0]) });
      if (check) {
        return true;
      } else {
        return getFieldErrorMessage(ruleName, field, [ruleArgs[0]]);
      }
      break;
    case 'max':
      var check = v.isLength(input, { max: parseInt(ruleArgs[0]) });
      if (check) {
        return true;
      } else {
        return getFieldErrorMessage(ruleName, field, [ruleArgs[0]]);
      }
      break;
    case 'string':
      if (typeof input === 'string') {
        return true;
      } else {
        return getFieldErrorMessage(ruleName, field);
      }
      break;
    default:
      return 'RULE NOT FOUNDED';
      break;
  }
}
function getFieldErrorMessage(ruleName, field, ruleArgs = false, type = 'string') {
  if (ruleArgs) {
    var messages = getAllValidationMessages(field, ruleArgs);
  } else {
    var messages = getAllValidationMessages(field);
  }
  if (ruleName in messages) {
    if (typeof messages[ruleName] == 'object') {
      if (type in messages[ruleName]) {
        return messages[ruleName][type];
      }
    } else {
      return messages[ruleName];
    }
  }
  return 'Unknown rule or args';
}
function getAllValidationMessages(field, args = ['unknown', 'unknown']) {
  return {
    'accepted': 'The ' + field + ' field must be accepted.',
    'accepted_if': 'The ' + field + ' field must be accepted when ' + args[0] + ' is ' + args[1] + '.',
    'active_url': 'The ' + field + ' field must be a valid URL.',
    'after': 'The ' + field + ' field must be a date after ' + args[0] + '.',
    'after_or_equal': 'The ' + field + ' field must be a date after or equal to ' + args[0] + '.',
    'alpha': 'The ' + field + ' field must only contain letters.',
    'alpha_dash': 'The ' + field + ' field must only contain letters, numbers, dashes, and underscores.',
    'alpha_num': 'The ' + field + ' field must only contain letters and numbers.',
    'array': 'The ' + field + ' field must be an array.',
    'ascii': 'The ' + field + ' field must only contain single-byte alphanumeric characters and symbols.',
    'before': 'The ' + field + ' field must be a date before ' + args[0] + '.',
    'before_or_equal': 'The ' + field + ' field must be a date before or equal to ' + args[0] + '.',
    'between': {
      'array': 'The ' + field + ' field must have between ' + args[0] + ' and ' + args[1] + ' items.',
      'file': 'The ' + field + ' field must be between ' + args[0] + ' and ' + args[1] + ' kilobytes.',
      'numeric': 'The ' + field + ' field must be between ' + args[0] + ' and ' + args[1] + '.',
      'string': 'The ' + field + ' field must be between ' + args[0] + ' and ' + args[1] + ' characters.',
    },
    'boolean': 'The ' + field + ' field must be true or false.',
    'confirmed': 'The ' + field + ' field confirmation does not match.',
    'current_password': 'The password is incorrect.',
    'date': 'The ' + field + ' field must be a valid date.',
    'date_equals': 'The ' + field + ' field must be a date equal to ' + args[0] + '.',
    'date_format': 'The ' + field + ' field must match the format ' + args[0] + '.',
    'decimal': 'The ' + field + ' field must have ' + args[0] + ' decimal places.',
    'declined': 'The ' + field + ' field must be declined.',
    'declined_if': 'The ' + field + ' field must be declined when ' + args[0] + ' is ' + args[1] + '.',
    'different': 'The ' + field + ' field and ' + args[0] + ' must be different.',
    'digits': 'The ' + field + ' field must be ' + args[0] + ' digits.',
    'digits_between': 'The ' + field + ' field must be between ' + args[0] + ' and ' + args[1] + ' digits.',
    'dimensions': 'The ' + field + ' field has invalid image dimensions.',
    'distinct': 'The ' + field + ' field has a duplicate value.',
    'doesnt_end_with': 'The ' + field + ' field must not end with one of the following: ' + args[0] + '.',
    'doesnt_start_with': 'The ' + field + ' field must not start with one of the following: ' + args[0] + '.',
    'email': 'The ' + field + ' field must be a valid email address.',
    'ends_with': 'The ' + field + ' field must end with one of the following: ' + args[0] + '.',
    'enum': 'The selected ' + field + ' is invalid.',
    'exists': 'The selected ' + field + ' is invalid.',
    'file': 'The ' + field + ' field must be a file.',
    'filled': 'The ' + field + ' field must have a value.',
    'gt': {
      'array': 'The ' + field + ' field must have more than ' + args[0] + ' items.',
      'file': 'The ' + field + ' field must be greater than ' + args[0] + ' kilobytes.',
      'numeric': 'The ' + field + ' field must be greater than ' + args[0] + '.',
      'string': 'The ' + field + ' field must be greater than ' + args[0] + ' characters.',
    },
    'gte': {
      'array': 'The ' + field + ' field must have ' + args[0] + ' items or more.',
      'file': 'The ' + field + ' field must be greater than or equal to ' + args[0] + ' kilobytes.',
      'numeric': 'The ' + field + ' field must be greater than or equal to ' + args[0] + '.',
      'string': 'The ' + field + ' field must be greater than or equal to ' + args[0] + ' characters.',
    },
    'image': 'The ' + field + ' field must be an image.',
    'in': 'The selected ' + field + ' is invalid.',
    'in_array': 'The ' + field + ' field must exist in ' + args[0] + '.',
    'integer': 'The ' + field + ' field must be an integer.',
    'ip': 'The ' + field + ' field must be a valid IP address.',
    'ipv4': 'The ' + field + ' field must be a valid IPv4 address.',
    'ipv6': 'The ' + field + ' field must be a valid IPv6 address.',
    'json': 'The ' + field + ' field must be a valid JSON string.',
    'lowercase': 'The ' + field + ' field must be lowercase.',
    'lt': {
      'array': 'The ' + field + ' field must have less than ' + args[0] + ' items.',
      'file': 'The ' + field + ' field must be less than ' + args[0] + ' kilobytes.',
      'numeric': 'The ' + field + ' field must be less than ' + args[0] + '.',
      'string': 'The ' + field + ' field must be less than ' + args[0] + ' characters.',
    },
    'lte': {
      'array': 'The ' + field + ' field must not have more than ' + args[0] + ' items.',
      'file': 'The ' + field + ' field must be less than or equal to ' + args[0] + ' kilobytes.',
      'numeric': 'The ' + field + ' field must be less than or equal to ' + args[0] + '.',
      'string': 'The ' + field + ' field must be less than or equal to ' + args[0] + ' characters.',
    },
    'mac_address': 'The ' + field + ' field must be a valid MAC address.',
    'max': {
      'array': 'The ' + field + ' field must not have more than ' + args[0] + ' items.',
      'file': 'The ' + field + ' field must not be greater than ' + args[0] + ' kilobytes.',
      'numeric': 'The ' + field + ' field must not be greater than ' + args[0] + '.',
      'string': 'The ' + field + ' field must not be greater than ' + args[0] + ' characters.',
    },
    'max_digits': 'The ' + field + ' field must not have more than ' + args[0] + ' digits.',
    'mimes': 'The ' + field + ' field must be a file of type: ' + args[0] + '.',
    'mimetypes': 'The ' + field + ' field must be a file of type: ' + args[0] + '.',
    'min': {
      'array': 'The ' + field + ' field must have at least ' + args[0] + ' items.',
      'file': 'The ' + field + ' field must be at least ' + args[0] + ' kilobytes.',
      'numeric': 'The ' + field + ' field must be at least ' + args[0] + '.',
      'string': 'The ' + field + ' field must be at least ' + args[0] + ' characters.',
    },
    'min_digits': 'The ' + field + ' field must have at least ' + args[0] + ' digits.',
    'missing': 'The ' + field + ' field must be missing.',
    'missing_if': 'The ' + field + ' field must be missing when ' + args[0] + ' is ' + args[1] + '.',
    'missing_unless': 'The ' + field + ' field must be missing unless ' + args[0] + ' is ' + args[1] + '.',
    'missing_with': 'The ' + field + ' field must be missing when ' + args[0] + ' is present.',
    'missing_with_all': 'The ' + field + ' field must be missing when ' + args[0] + ' are present.',
    'multiple_of': 'The ' + field + ' field must be a multiple of ' + args[0] + '.',
    'not_in': 'The selected ' + field + ' is invalid.',
    'not_regex': 'The ' + field + ' field format is invalid.',
    'numeric': 'The ' + field + ' field must be a number.',
    'password': {
      'letters': 'The ' + field + ' field must contain at least one letter.',
      'mixed': 'The ' + field + ' field must contain at least one uppercase and one lowercase letter.',
      'numbers': 'The ' + field + ' field must contain at least one number.',
      'symbols': 'The ' + field + ' field must contain at least one symbol.',
      'uncompromised': 'The given ' + field + ' has appeared in a data leak. Please choose a different ' + field + '.',
    },
    'present': 'The ' + field + ' field must be present.',
    'prohibited': 'The ' + field + ' field is prohibited.',
    'prohibited_if': 'The ' + field + ' field is prohibited when ' + args[0] + ' is ' + args[1] + '.',
    'prohibited_unless': 'The ' + field + ' field is prohibited unless ' + args[0] + ' is in ' + args[1] + '.',
    'prohibits': 'The ' + field + ' field prohibits ' + args[0] + ' from being present.',
    'regex': 'The ' + field + ' field format is invalid.',
    'required': 'The ' + field + ' field is required.',
    'required_array_keys': 'The ' + field + ' field must contain entries for: ' + args[0] + '.',
    'required_if': 'The ' + field + ' field is required when ' + args[0] + ' is ' + args[1] + '.',
    'required_if_accepted': 'The ' + field + ' field is required when ' + args[0] + ' is accepted.',
    'required_unless': 'The ' + field + ' field is required unless ' + args[0] + ' is in ' + args[1] + '.',
    'required_with': 'The ' + field + ' field is required when ' + args[0] + ' is present.',
    'required_with_all': 'The ' + field + ' field is required when ' + args[0] + ' are present.',
    'required_without': 'The ' + field + ' field is required when ' + args[0] + ' is not present.',
    'required_without_all': 'The ' + field + ' field is required when none of ' + args[0] + ' are present.',
    'same': 'The ' + field + ' field must match ' + args[0] + '.',
    'size': {
      'array': 'The ' + field + ' field must contain ' + args[0] + ' items.',
      'file': 'The ' + field + ' field must be ' + args[0] + ' kilobytes.',
      'numeric': 'The ' + field + ' field must be ' + args[0] + '.',
      'string': 'The ' + field + ' field must be ' + args[0] + ' characters.',
    },
    'starts_with': 'The ' + field + ' field must start with one of the following: ' + args[0] + '.',
    'string': 'The ' + field + ' field must be a string.',
    'timezone': 'The ' + field + ' field must be a valid timezone.',
    'unique': 'The ' + field + ' has already been taken.',
    'uploaded': 'The ' + field + ' failed to upload.',
    'uppercase': 'The ' + field + ' field must be uppercase.',
    'url': 'The ' + field + ' field must be a valid URL.',
    'ulid': 'The ' + field + ' field must be a valid ULID.',
    'uuid': 'The ' + field + ' field must be a valid UUID.',
  }
}

  // /**
//  * Transform Laravel validation rules to Validator.js compatible rules.
//  *
//  * @param {object} rules - Laravel validation rules object.
//  * @returns {object} - Transformed rules compatible with Validator.js.
//  */
//   // overrideOrCustomRules = {
//   //   'name':{
//   //     'unique': checkIfUniqueName(ruleArgs),
//   //     'exists': checkIfExistsName(ruleArgs)
//   //   },
//   //   'email':{
//   //     'unique': checkIfUniqueEmail('email',ruleArgs),
//   //   }
//   // };
// export function transformRules(rules,values) {
//   const transformedRules = {};
//   for (const field in rules) {
//     if (Array.isArray(rules[field])) {
//       transformedRules[field] = [];
//       rules[field].forEach(rule : {
//         const [ruleName, ...ruleArgs] = rule.split(':');
//         switch (ruleName) {
//           case 'accepted':
//             transformedRules[field].push(validator.equals(true));
//             break;
//           case 'accepted_if':
//             // No direct equivalent in Validator.js
//             // transformedRules[field].push((value, values) : acceptedIf(value, ruleArgs[0], values[ruleArgs[0]]));
//             break;
//           case 'active_url':
//             transformedRules[field].push(validator.isURL());
//             break;
//           case 'after':
//             transformedRules[field].push(validator.isAfter(ruleArgs[0]));
//             break;
//           case 'after_or_equal':
//             transformedRules[field].push(validator.isAfter(ruleArgs[0], { orEqual: true }));
//             break;
//           case 'alpha':
//             transformedRules[field].push(validator.isAlpha());
//             break;
//           case 'alpha_dash':
//             transformedRules[field].push(validator.matches(/^[a-zA-Z0-9_-]+$/));
//             break;
//           case 'alpha_num':
//             transformedRules[field].push(validator.isAlphanumeric());
//             break;
//           case 'array':
//             transformedRules[field].push(Array.isArray);
//             break;
//           case 'ascii':
//             transformedRules[field].push(validator.isAscii());
//             break;
//           case 'bail':
//             // No direct equivalent in Validator.js, unnecesary , validator stops the validation by default
//             break;
//           case 'before':
//             transformedRules[field].push(validator.isBefore(ruleArgs[0]));
//             break;
//           case 'before_or_equal':
//             transformedRules[field].push(validator.isBefore(ruleArgs[0], { orEqual: true }));
//             break;
//           case 'between':
//             transformedRules[field].push(validator.isLength(ruleArgs[0], ruleArgs[1]));
//             break;
//           case 'boolean':
//             transformedRules[field].push(validator.isBoolean());
//             break;
//           case 'confirmed':
//             transformedRules[field].push(validator.equals(validator.ref(`${field}_confirmation`)));
//             break;
//           case 'current_password':
//             // No direct equivalent in Validator.js
//             break;
//           case 'date':
//             transformedRules[field].push(validator.isDate());
//             break;
//           case 'date_equals':
//             transformedRules[field].push(validator.equals(ruleArgs[0]));
//             break;
//           case 'date_format':
//             transformedRules[field].push(validator.matches(new RegExp(ruleArgs[0])));
//             break;
//           case 'decimal':
//             transformedRules[field].push(validator.isDecimal());
//             break;
//           case 'declined':
//             // No direct equivalent in Validator.js
//             break;
//           case 'declined_if':
//             // No direct equivalent in Validator.js
//             break;
//           case 'different':
//             transformedRules[field].push(validator.notEquals(ruleArgs[0]));
//             break;
//           case 'digits':
//             transformedRules[field].push(validator.isLength(ruleArgs[0]));
//             break;
//           case 'digits_between':
//             transformedRules[field].push(validator.isLength(ruleArgs[0], ruleArgs[1]));
//             break;
//           case 'distinct':
//             // transformedRules[field].push((value, values) : values.filter(v : v === value).length === 1);
//             break;
//           case 'doesnt_start_with':
//             transformedRules[field].push(validator.doesntStartWith(ruleArgs[0]));
//             break;
//           case 'doesnt_end_with':
//             transformedRules[field].push(validator.doesntEndWith(ruleArgs[0]));
//             break;
//           case 'email':
//             transformedRules[field].push(validator.isEmail());
//             break;
//           case 'ends_with':
//             transformedRules[field].push(validator.endsWith(ruleArgs[0]));
//             break;
//           case 'enum':
//             transformedRules[field].push(validator.isIn(ruleArgs));
//             break;
//           case 'exclude':
//             // No direct equivalent in Validator.js
//             break;
//           case 'exclude_if':
//             // No direct equivalent in Validator.js
//             break;
//           case 'exclude_unless':
//             // No direct equivalent in Validator.js
//             break;
//           case 'exclude_with':
//             // No direct equivalent in Validator.js
//             break;
//           case 'exclude_without':
//             // No direct equivalent in Validator.js
//             break;
//           case 'exists':
//             // No direct equivalent in Validator.js (database validation)
//             break;
//           case 'filled':
//             transformedRules[field].push(validator.isNotEmpty);
//             break;
//           case 'greater_than':
//             transformedRules[field].push(validator.isFloat({ gt: parseFloat(ruleArgs[0]) }));
//             break;
//           case 'greater_than_or_equal':
//             transformedRules[field].push(validator.isFloat({ gte: parseFloat(ruleArgs[0]) }));
//             break;
//           case 'in':
//             transformedRules[field].push(validator.isIn(ruleArgs));
//             break;
//           case 'integer':
//             transformedRules[field].push(validator.isInt());
//             break;
//           case 'ip':
//             transformedRules[field].push(validator.isIP());
//             break;
//           case 'json':
//             transformedRules[field].push(validator.isJSON());
//             break;
//           case 'less_than':
//             transformedRules[field].push(validator.isFloat({ lt: parseFloat(ruleArgs[0]) }));
//             break;
//           case 'less_than_or_equal':
//             transformedRules[field].push(validator.isFloat({ lte: parseFloat(ruleArgs[0]) }));
//             break;
//           case 'lowercase':
//             transformedRules[field].push(validator.isLowercase());
//             break;
//           case 'mac_address':
//             transformedRules[field].push(validator.isMACAddress());
//             break;
//           case 'max':
//             transformedRules[field].push(validator.isLength({ max: parseInt(ruleArgs[0]) }));
//             break;
//           case 'max_digits':
//             transformedRules[field].push(validator.isLength({ max: parseInt(ruleArgs[0]) }));
//             break;
//           case 'mimetypes':
//             // No direct equivalent in Validator.js
//             break;
//           case 'mimetypes_by_file_extension':
//             // No direct equivalent in Validator.js
//             break;
//           case 'min':
//             transformedRules[field].push(validator.isLength({ min: parseInt(ruleArgs[0]) }));
//             break;
//           case 'min_digits':
//             transformedRules[field].push(validator.isLength({ min: parseInt(ruleArgs[0]) }));
//             break;
//           case 'missing':
//             // No direct equivalent in Validator.js
//             break;
//           case 'missing_if':
//             // No direct equivalent in Validator.js
//             break;
//           case 'missing_unless':
//             // No direct equivalent in Validator.js
//             break;
//           case 'missing_with':
//             // No direct equivalent in Validator.js
//             break;
//           case 'missing_with_all':
//             // No direct equivalent in Validator.js
//             break;
//           case 'multiple_of':
//             transformedRules[field].push(validator.isDivisibleBy(parseInt(ruleArgs[0])));
//             break;
//           case 'not_in':
//             transformedRules[field].push(validator.notIn(ruleArgs));
//             break;
//           case 'not_regex':
//             transformedRules[field].push(validator.doesNotMatch(new RegExp(ruleArgs[0])));
//             break;
//           case 'nullable':
//             // No direct equivalent in Validator.js
//             break;
//           case 'numeric':
//             transformedRules[field].push(validator.isNumeric());
//             break;
//           case 'password':
//             // No direct equivalent in Validator.js
//             break;
//           case 'present':
//             transformedRules[field].push(validator.exists);
//             break;
//           case 'prohibited':
//             // No direct equivalent in Validator.js
//             break;
//           case 'prohibited_if':
//             // No direct equivalent in Validator.js
//             break;
//           case 'prohibited_unless':
//             // No direct equivalent in Validator.js
//             break;
//           case 'prohibits':
//             // No direct equivalent in Validator.js
//             break;
//           case 'regex':
//             transformedRules[field].push(validator.matches(new RegExp(ruleArgs[0])));
//             break;
//           case 'required':
//             transformedRules[field].push(validator.isNotEmpty);
//             break;
//           case 'required_if':
//             // No direct equivalent in Validator.js
//             break;
//           case 'required_unless':
//             // No direct equivalent in Validator.js
//             break;
//           case 'required_with':
//             transformedRules[field].push(validator.isNotEmpty);
//             break;
//           case 'required_with_all':
//             transformedRules[field].push(validator.isNotEmpty);
//             break;
//           case 'required_without':
//             transformedRules[field].push(validator.isEmpty);
//             break;
//           case 'required_without_all':
//             transformedRules[field].push(validator.isEmpty);
//             break;
//           case 'required_array_keys':
//             // No direct equivalent in Validator.js
//             break;
//           case 'same':
//             transformedRules[field].push(validator.equals(validator.ref(ruleArgs[0])));
//             break;
//           case 'size':
//             transformedRules[field].push(validator.isLength(parseInt(ruleArgs[0])));
//             break;
//           case 'sometimes':
//             // No direct equivalent in Validator.js
//             break;
//           case 'starts_with':
//             transformedRules[field].push(validator.startsWith(ruleArgs[0]));
//             break;
//           case 'string':
//             transformedRules[field].push(validator.isString());
//             break;
//           case 'timezone':
//             transformedRules[field].push(validator.isTimezone());
//             break;
//           case 'uppercase':
//             transformedRules[field].push(validator.isUppercase());
//             break;
//           case 'url':
//             transformedRules[field].push(validator.isURL());
//             break;
//           case 'uuid':
//             transformedRules[field].push(validator.isUUID());
//             break;
//           default:
//             break;
//         }
//       });
//     }
//   }
//   return transformedRules;
// }
// function acceptedIf(value, _otherField, otherValue) {
//   if (otherValue === value) {
//     return true;
//   }
//   return false;
// }