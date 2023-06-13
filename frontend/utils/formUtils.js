export async function checkSingleField(component, field, data) {
  if (
    component &&
    component.validations &&
    component.className &&
    component.validationSource
  ) {
    var petition = {
      response: true,
      method: "post",
      body: {
        [field]: data,
        validationField: field,
        className: component.className,
        validationSource: component.validationSource,
      },
    };
    var response = await submitRequest(
      $larafetch("/api/v1/form/prevalidation", petition)
    );
    if (!response.data) {
      resetOneFieldErrors(component, field);
      setOneFieldErrors(component, field, response.errors);
    }
    component.sendingForm = false;
  } else {
    console.error(
      "Variables necesarias no existen en el componente checkSingleField"
    );
  }
}

export function resetOneFieldErrors(component, field) {
  if (component && component.validations && field in component.validations) {
    component.validations[field] = [];
  }
}

export function setOneFieldErrors(component, field, errors) {
  if (component && component.validations) {
    component.validations[field] = errors[field];
  }
}

export function resetErrors(component) {
  if (component && component.validations) {
    component.validations = [];
  }
}
