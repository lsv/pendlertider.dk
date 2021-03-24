export interface FormErrorsInterface {
  [key: string]: string[]
}

interface ValidationInterface {
  field: string
  errors: string[]
}

interface JsonValidation {
  validations: Array<ValidationInterface> | null
}

export default function (json: JsonValidation): FormErrorsInterface | null {
  if (Array.isArray(json?.validations)) {
    const errors = {}
    json.validations.forEach((validations: ValidationInterface) => {
      // @ts-ignore
      errors[validations.field] = validations.errors
    })
    return errors
  }

  return null
}
