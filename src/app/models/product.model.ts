export interface IProduct {
  id: number;
  name: string;
  description: string;
  quantity: number;
  expire_date: Date | string;
}
