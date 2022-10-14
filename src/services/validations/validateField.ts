import throwError from '../../utils/throwError';

export const validateFieldString = (field: string, name: string, min: number) => {
  if (!field) throw throwError(400, `"${name}" is required`);
  if (typeof field !== 'string') throw throwError(422, `"${name}" must be a string`);
  if (field.length < min) {
    throw throwError(422, `"${name}" length must be at least ${min} characters long`);
  }
};

export const validateFieldNumber = (field: number, name: string, min: number) => {
  if (field === undefined) throw throwError(400, `"${name}" is required`);
  if (typeof field !== 'number') throw throwError(422, `"${name}" must be a number`);
  if (field < min) throw throwError(422, `"${name}" must be greater than or equal to ${min}`);
};
