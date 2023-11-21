import { ValidationError } from "class-validator";

interface ValidationErrorMessage {
  field: string;
  message: string;
}
export default function formatValidationErrors(
  errors: ValidationError[]
): string {
  const errorMessages: ValidationErrorMessage[] = [];

  errors.forEach((error) => {
    const constraints = Object.values(error.constraints || {});
    constraints.forEach((constraint) => {
      errorMessages.push({
        field: error.property,
        message: constraint,
      });
    });
  });

  const formattedMessage = errorMessages
    .map((error) => `${error.field}: ${error.message}`)
    .join(", ");

  return `Validation failed. Details: ${formattedMessage}`;
}
