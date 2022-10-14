import { IStatusError } from '../interfaces';

const throwError = (status: number, message: string) => {
  const error = new Error(message) as IStatusError;
  error.status = status;
  return error;
};

export default throwError;