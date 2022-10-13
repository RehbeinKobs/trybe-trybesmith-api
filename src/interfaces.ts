export interface IProduct {
  id?: number;
  name: string;
  amount: string;
  orderId?: number;
}

export interface IStatusError extends Error {
  status: number,
}